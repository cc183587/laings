# Pack project code (excluding large directories and databases)
$srcDir = "c:\Users\J.s\WorkBuddy\20260323021915"
$zipPath = "c:\Users\J.s\WorkBuddy\laings-code-backup.zip"

# Exclude list
$exclude = @(
    "node_modules",
    ".git",
    ".workbuddy",
    "android-app\.gradle",
    "android-app\app\build",
    "android-app\local.properties",
    "android-app\.idea",
    "android-app\app\.cxx",
    "android-app\build",
    "factory-backend\database"
)

# Get all files
$files = Get-ChildItem -Path $srcDir -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
    $fullPath = $_.FullName
    $relativePath = $fullPath.Substring($srcDir.Length + 1)
    $shouldExclude = $false

    foreach ($ex in $exclude) {
        if ($relativePath -match [regex]::Escape($ex)) {
            $shouldExclude = $true
            break
        }
    }
    -not $shouldExclude
}

# Create zip
$files | Compress-Archive -DestinationPath $zipPath -CompressionLevel Optimal -Force

# Show result
$size = (Get-Item $zipPath).Length / 1MB
Write-Host "Done!"
Write-Host "Location: $zipPath"
Write-Host "Size: $([math]::Round($size, 2)) MB"
Write-Host "Files: $($files.Count)"
