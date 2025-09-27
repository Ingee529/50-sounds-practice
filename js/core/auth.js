// js/core/auth.js
import { emit } from './events.js';
import { getState, patch } from './state.js';
import { API_BASE } from './config.js';

const STORAGE_KEY = 'app_auth_v1';
const TOKEN_REFRESH_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours before expiry
let refreshTimer = null;

function restoreFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    const { user, token, tokenExp } = JSON.parse(raw);
    
    // 檢查 token 是否已過期
    if (token && tokenExp && Date.now() > tokenExp * 1000) {
      console.log('[auth] Token已過期，自動清除');
      localStorage.removeItem(STORAGE_KEY);
      return { user: null, token: null };
    }
    
    return { user: user || null, token: token || null, tokenExp: tokenExp || null };
  } catch {
    return { user: null, token: null };
  }
}

function persist({ user, token, tokenExp = null }) {
  try { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token, tokenExp })); 
  } catch {}
}

/**
 * 解析 JWT token 獲取過期時間
 */
function parseTokenExp(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp || null;
  } catch {
    return null;
  }
}

export async function initAuth() {
  const { user, token, tokenExp } = restoreFromStorage();
  // 用 patch 寫入 auth 區塊
  patch({ auth: { inited: true, user: user || null, token: token || null, tokenExp: tokenExp || null } });
  
  // 設置自動刷新定時器
  if (token && tokenExp) {
    scheduleTokenRefresh(tokenExp);
  }
  
  emit('auth:inited');
}

export function loginSuccess({ user, token }) {
  const prev = getState().auth?.user || null;
  const tokenExp = parseTokenExp(token);
  
  patch({ auth: { inited: true, user, token: token || null, tokenExp } });
  persist({ user, token: token || null, tokenExp });
  
  // 設置自動刷新定時器
  if (token && tokenExp) {
    scheduleTokenRefresh(tokenExp);
  }
  
  emit('auth:user.changed', { previous: { user: prev }, current: { user } });
}

export function logoutSuccess() {
  const prev = getState().auth?.user || null;
  
  // 清除刷新定時器
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
  
  patch({ auth: { inited: true, user: null, token: null, tokenExp: null } });
  persist({ user: null, token: null, tokenExp: null });
  emit('auth:user.changed', { previous: { user: prev }, current: { user: null } });
}

/**
 * 設置 Token 自動刷新定時器
 */
function scheduleTokenRefresh(tokenExp) {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
  
  const now = Date.now();
  const expTime = tokenExp * 1000;
  const refreshTime = expTime - TOKEN_REFRESH_THRESHOLD;
  
  if (refreshTime > now) {
    const delay = refreshTime - now;
    console.log(`[auth] Token將在 ${new Date(refreshTime).toLocaleString()} 自動刷新`);
    
    refreshTimer = setTimeout(async () => {
      console.log('[auth] 開始自動刷新 Token...');
      try {
        await refreshToken();
      } catch (error) {
        console.error('[auth] Token 自動刷新失敗:', error);
        // 通知用戶需要重新登入
        emit('auth:token.expired');
      }
    }, delay);
  } else {
    console.log('[auth] Token已過期或即將過期，建議立即刷新');
  }
}

/**
 * 刷新 Token
 */
export async function refreshToken() {
  const state = getState();
  const { token } = state.auth || {};
  
  if (!token) {
    throw new Error('沒有可刷新的 Token');
  }
  
  try {
    const response = await fetch(`${API_BASE}/auth/refresh/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 401) {
      throw new Error('Token已失效，需要重新登入');
    }
    
    if (!response.ok) {
      throw new Error(`刷新失敗: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.token) {
      console.log('[auth] Token 刷新成功');
      const user = state.auth.user;
      loginSuccess({ user, token: data.token });
      emit('auth:token.refreshed');
      return data.token;
    } else {
      throw new Error(data.message || '刷新失敗');
    }
  } catch (error) {
    console.error('[auth] Token 刷新失敗:', error);
    throw error;
  }
}

/**
 * 檢查 Token 是否即將過期
 */
export function isTokenNearExpiry() {
  const state = getState();
  const { tokenExp } = state.auth || {};
  
  if (!tokenExp) return false;
  
  const now = Date.now();
  const expTime = tokenExp * 1000;
  const nearExpiry = expTime - TOKEN_REFRESH_THRESHOLD;
  
  return now >= nearExpiry;
}

/**
 * 手動刷新 Token（供 UI 調用）
 */
export async function manualRefreshToken() {
  try {
    emit('auth:refreshing');
    await refreshToken();
    emit('auth:refresh.success');
  } catch (error) {
    emit('auth:refresh.failed', { error });
    throw error;
  }
}