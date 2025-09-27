// Template Loader - 模板動態載入系統
// 負責載入和快取 HTML 模板片段

// 模板快取
const templateCache = new Map();

/**
 * 載入 HTML 模板
 * @param {string} templateName - 模板名稱 (不包含副檔名)
 * @returns {Promise<string>} - 模板 HTML 內容
 */
export async function loadTemplate(templateName) {
    // 檢查快取
    if (templateCache.has(templateName)) {
        console.log(`📄 [template] Using cached template: ${templateName}`);
        return templateCache.get(templateName);
    }
    
    try {
        console.log(`📄 [template] Loading template: ${templateName}`);
        
        const response = await fetch(`templates/${templateName}.html`);
        
        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // 存入快取
        templateCache.set(templateName, html);
        
        console.log(`✅ [template] Template loaded and cached: ${templateName}`);
        return html;
        
    } catch (error) {
        console.error(`❌ [template] Failed to load template ${templateName}:`, error);
        throw error;
    }
}

/**
 * 載入模板並插入到指定容器
 * @param {string} templateName - 模板名稱
 * @param {string|HTMLElement} container - 容器選擇器或元素
 * @returns {Promise<void>}
 */
export async function renderTemplate(templateName, container) {
    try {
        const html = await loadTemplate(templateName);
        
        const containerEl = typeof container === 'string' ? 
            document.querySelector(container) : container;
            
        if (!containerEl) {
            throw new Error(`Container not found: ${container}`);
        }
        
        containerEl.innerHTML = html;
        
        console.log(`🎨 [template] Template rendered: ${templateName} -> ${container}`);
        
    } catch (error) {
        console.error(`❌ [template] Failed to render template ${templateName}:`, error);
        throw error;
    }
}

/**
 * 預載入模板（可選的效能優化）
 * @param {string[]} templateNames - 要預載入的模板名稱列表
 * @returns {Promise<void>}
 */
export async function preloadTemplates(templateNames) {
    console.log(`📦 [template] Preloading ${templateNames.length} templates...`);
    
    try {
        await Promise.all(templateNames.map(loadTemplate));
        console.log(`✅ [template] All templates preloaded successfully`);
    } catch (error) {
        console.warn(`⚠️ [template] Some templates failed to preload:`, error);
    }
}

/**
 * 清除模板快取
 * @param {string} [templateName] - 要清除的特定模板，不提供則清除全部
 */
export function clearTemplateCache(templateName = null) {
    if (templateName) {
        templateCache.delete(templateName);
        console.log(`🗑️ [template] Cleared cache for: ${templateName}`);
    } else {
        templateCache.clear();
        console.log(`🗑️ [template] Cleared all template cache`);
    }
}

/**
 * 獲取快取統計資訊（開發用）
 * @returns {Object} 快取統計
 */
export function getCacheStats() {
    return {
        size: templateCache.size,
        templates: Array.from(templateCache.keys())
    };
}

// 開發工具
if (typeof window !== 'undefined' && 
    ['localhost','127.0.0.1','[::1]'].includes(location.hostname)) {
    
    window.debugTemplates = function() {
        console.log('📄 Template Loader Debug:');
        const stats = getCacheStats();
        console.log('📊 Cache size:', stats.size);
        console.log('📝 Cached templates:', stats.templates);
        console.log('💡 Available functions:');
        console.log('  - loadTemplate(name)');
        console.log('  - renderTemplate(name, container)');
        console.log('  - preloadTemplates([...names])');
        console.log('  - clearTemplateCache(name?)');
    };
} 