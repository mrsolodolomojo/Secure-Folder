@echo off
echo ===================================================
echo Samsung Secure Folder Replica - Android APK Builder
echo ===================================================
echo.
echo [1/4] Installing npm dependencies...
call npm install
echo.
echo [2/4] Building production web bundle...
call npm run build
echo.
echo [3/4] Setting up Capacitor Android platform...
if not exist "android" (
    call npx cap add android
) else (
    call npx cap sync android
)
echo.
echo [4/4] Compiling Debug APK via Gradle...
cd android
call gradlew.bat assembleDebug
cd ..
echo.
echo ===================================================
echo DONE! Your APK is located at:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo ===================================================
pause
