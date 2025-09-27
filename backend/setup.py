#!/usr/bin/env python3
"""
Django 專案設置腳本
"""
import os
import sys
import subprocess
from pathlib import Path

def create_env_file():
    """建立 .env 檔案"""
    env_example = Path('.env.example')
    env_file = Path('.env')
    
    if not env_file.exists() and env_example.exists():
        print("📝 建立 .env 檔案...")
        env_content = env_example.read_text()
        
        # 產生隨機 Secret Key
        from django.core.management.utils import get_random_secret_key
        secret_key = get_random_secret_key()
        env_content = env_content.replace('your-secret-key-here', secret_key)
        env_content = env_content.replace('your-jwt-secret-key', get_random_secret_key())
        
        env_file.write_text(env_content)
        print("✅ .env 檔案建立完成")
        print("⚠️  請修改 .env 檔案中的資料庫設定")
    else:
        print("📁 .env 檔案已存在")

def install_requirements():
    """安裝套件"""
    print("📦 安裝 Python 套件...")
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
    print("✅ 套件安裝完成")

def migrate_database():
    """執行資料庫遷移"""
    print("🗄️  執行資料庫遷移...")
    os.system('python manage.py makemigrations accounts')
    os.system('python manage.py makemigrations practice')
    os.system('python manage.py migrate')
    print("✅ 資料庫遷移完成")

def create_superuser():
    """建立超級使用者"""
    print("👤 是否要建立超級使用者? (y/n): ", end='')
    if input().lower() == 'y':
        os.system('python manage.py createsuperuser')

def main():
    """主函數"""
    print("🚀 Django 專案設置開始...")
    
    try:
        create_env_file()
        install_requirements()
        migrate_database()
        create_superuser()
        
        print("\n✅ 專案設置完成！")
        print("📋 下一步：")
        print("   1. 修改 .env 檔案中的資料庫設定")
        print("   2. 執行 python manage.py runserver 啟動開發伺服器")
        print("   3. 訪問 http://127.0.0.1:8000/admin/ 管理後台")
        
    except Exception as e:
        print(f"❌ 設置失敗: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()