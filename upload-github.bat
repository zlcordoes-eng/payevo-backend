@echo off
echo ========================================
echo  Subindo Backend para o GitHub
echo ========================================
echo.

REM Inicializa o repositório Git
git init

REM Adiciona todos os arquivos
git add .

REM Faz o primeiro commit
git commit -m "Backend Payevo - Primeiro commit"

REM Pede a URL do repositório
echo.
echo Copie a URL do seu repositório do GitHub
echo Exemplo: https://github.com/SEU-USUARIO/payevo-backend.git
echo.
set /p REPO_URL="Cole a URL aqui: "

REM Adiciona o remote
git branch -M main
git remote add origin %REPO_URL%

REM Faz o push
git push -u origin main

echo.
echo ========================================
echo  Upload concluido!
echo  Agora va para o Railway!
echo ========================================
pause
