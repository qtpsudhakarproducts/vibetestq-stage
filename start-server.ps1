# Local Documentation Server
# Run this script to preview documentation locally before pushing to GitHub
# URLs work the same as on GitHub Pages (no .html extension needed)

Write-Host "Starting local documentation server..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is available
$nodeAvailable = Get-Command node -ErrorAction SilentlyContinue

if ($nodeAvailable) {
    Write-Host "Using Node.js server (GitHub Pages compatible URLs)..." -ForegroundColor Yellow
    Write-Host "Server running at: http://localhost:8000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
    Write-Host ""
    node preview-server.js
}
else {
    Write-Host "Node.js not found. Using Python server..." -ForegroundColor Yellow
    Write-Host "Note: You'll need to use .html extensions (e.g., /training.html)" -ForegroundColor Yellow
    Write-Host "Server running at: http://localhost:8000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
    Write-Host ""
    py -m http.server 8000
}
