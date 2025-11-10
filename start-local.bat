@echo off
chcp 65001 >nul
echo ========================================
echo  🚀 Iniciando Backend Payevo
echo ========================================
echo.

REM Verifica se o Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não está instalado!
    echo.
    echo Por favor, instale o Node.js:
    echo https://nodejs.org/
    echo.
    echo Baixe a versão LTS (recomendada)
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js encontrado: 
node -v
echo.

REM Verifica se já instalou as dependências
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    echo Aguarde, isso leva ~30 segundos...
    echo.
    call npm install
    echo.
    echo ✓ Dependências instaladas!
    echo.
)

echo ========================================
echo  ✓ Backend rodando!
echo ========================================
echo.
echo 🌐 Acesse: http://localhost:3000/health
echo.
echo Para PARAR o servidor, aperte Ctrl+C
echo.
echo ========================================
echo.

REM Inicia o servidor
node index.js
