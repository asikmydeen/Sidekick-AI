#!/usr/bin/env node
/**
 * Build script for Chrome Web Store
 * - Increments version
 * - Regenerates icons from sidekick-ai.ico if sips available (macOS)
 * - Builds with Vite (minified + obfuscated)
 * - Uses Chrome manifest (manifest.chrome.json)
 * - Removes dev key if present
 * - Creates zip
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  console.log(`${colors.cyan}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

/**
 * Increment patch version (e.g., 2.1.0 -> 2.1.1)
 */
function incrementVersion(version) {
  const parts = version.split('.');
  parts[2] = parseInt(parts[2], 10) + 1;
  return parts.join('.');
}

/**
 * Read and parse JSON file
 */
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * Write JSON file with pretty formatting
 */
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

/**
 * Try to regenerate icons from .ico file using sips (macOS)
 */
function regenerateIcons() {
  const icoPath = path.join(ROOT_DIR, 'sidekick-ai.ico');
  
  if (!fs.existsSync(icoPath)) {
    log('  No sidekick-ai.ico found, skipping icon regeneration', colors.yellow);
    return false;
  }

  try {
    // Check if sips is available (macOS only)
    execSync('which sips', { stdio: 'pipe' });
    
    const sizes = [16, 48, 128];
    for (const size of sizes) {
      const outputPath = path.join(ROOT_DIR, `icon${size}.png`);
      // Note: sips doesn't work directly with .ico files
      // This is a placeholder - in practice you'd need ImageMagick or similar
      log(`  Icon regeneration requires ImageMagick (convert command)`, colors.yellow);
      return false;
    }
    return true;
  } catch (e) {
    log('  sips not available, skipping icon regeneration', colors.yellow);
    return false;
  }
}

/**
 * Create a zip file from directory
 */
function createZip(sourceDir, outputPath) {
  const absoluteSource = path.resolve(sourceDir);
  const absoluteOutput = path.resolve(outputPath);
  
  // Remove existing zip if present
  if (fs.existsSync(absoluteOutput)) {
    fs.unlinkSync(absoluteOutput);
  }
  
  // Use zip command (available on macOS and Linux)
  execSync(`cd "${absoluteSource}" && zip -r "${absoluteOutput}" .`, { stdio: 'pipe' });
}

/**
 * Get directory size in bytes
 */
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        walkDir(filePath);
      } else {
        totalSize += stats.size;
      }
    }
  }
  
  walkDir(dirPath);
  return totalSize;
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * Main build function
 */
async function build() {
  console.log('\n' + colors.bright + '═══════════════════════════════════════════════════════════════' + colors.reset);
  console.log(colors.bright + '  Sidekick AI - Chrome Web Store Build' + colors.reset);
  console.log(colors.bright + '═══════════════════════════════════════════════════════════════' + colors.reset + '\n');

  const startTime = Date.now();
  const distDir = path.join(ROOT_DIR, 'dist-chrome');

  try {
    // Step 1: Read and increment version
    logStep('1/6', 'Incrementing version...');
    
    const manifestPath = path.join(ROOT_DIR, 'manifest.json');
    const chromeManifestPath = path.join(ROOT_DIR, 'manifest.chrome.json');
    const firefoxManifestPath = path.join(ROOT_DIR, 'manifest.firefox.json');
    
    const manifest = readJson(manifestPath);
    const oldVersion = manifest.version;
    const newVersion = incrementVersion(oldVersion);
    
    // Update all manifest files
    manifest.version = newVersion;
    writeJson(manifestPath, manifest);
    
    if (fs.existsSync(chromeManifestPath)) {
      const chromeManifest = readJson(chromeManifestPath);
      chromeManifest.version = newVersion;
      writeJson(chromeManifestPath, chromeManifest);
    }
    
    if (fs.existsSync(firefoxManifestPath)) {
      const firefoxManifest = readJson(firefoxManifestPath);
      firefoxManifest.version = newVersion;
      writeJson(firefoxManifestPath, firefoxManifest);
    }
    
    logSuccess(`Version: ${oldVersion} → ${newVersion}`);

    // Step 2: Try to regenerate icons
    logStep('2/6', 'Checking icons...');
    regenerateIcons();
    logSuccess('Icons checked');

    // Step 3: Clean dist directory
    logStep('3/6', 'Cleaning dist-chrome directory...');
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
    }
    logSuccess('Cleaned dist-chrome');

    // Step 4: Run Vite build
    logStep('4/6', 'Building with Vite (minified + obfuscated)...');
    execSync('npx vite build --config vite.config.store.js', {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });
    logSuccess('Vite build complete');

    // Step 5: Remove dev key from manifest if present
    logStep('5/6', 'Processing manifest...');
    const distManifestPath = path.join(distDir, 'manifest.json');
    
    if (fs.existsSync(distManifestPath)) {
      const distManifest = readJson(distManifestPath);
      
      if (distManifest.key) {
        delete distManifest.key;
        writeJson(distManifestPath, distManifest);
        logSuccess('Removed dev key from manifest');
      } else {
        logSuccess('Manifest ready (no dev key present)');
      }
    }

    // Step 6: Create zip
    logStep('6/6', 'Creating zip archive...');
    const zipName = `sidekick-ai-chrome-v${newVersion}.zip`;
    const zipPath = path.join(ROOT_DIR, zipName);
    createZip(distDir, zipPath);
    logSuccess(`Created ${zipName}`);

    // Build summary
    const endTime = Date.now();
    const buildTime = ((endTime - startTime) / 1000).toFixed(2);
    const distSize = getDirectorySize(distDir);
    const zipSize = fs.statSync(zipPath).size;

    console.log('\n' + colors.bright + '═══════════════════════════════════════════════════════════════' + colors.reset);
    console.log(colors.green + colors.bright + '  ✓ BUILD SUCCESSFUL' + colors.reset);
    console.log(colors.bright + '═══════════════════════════════════════════════════════════════' + colors.reset);
    console.log(`
  ${colors.cyan}Version:${colors.reset}     ${newVersion}
  ${colors.cyan}Build time:${colors.reset}  ${buildTime}s
  ${colors.cyan}Dist size:${colors.reset}   ${formatBytes(distSize)}
  ${colors.cyan}Zip size:${colors.reset}    ${formatBytes(zipSize)}
  ${colors.cyan}Output:${colors.reset}      ${zipName}

  ${colors.yellow}Next steps:${colors.reset}
  1. Test the extension by loading dist-chrome/ in chrome://extensions
  2. Upload ${zipName} to Chrome Web Store Developer Dashboard
`);

  } catch (error) {
    console.log('\n' + colors.red + colors.bright + '═══════════════════════════════════════════════════════════════' + colors.reset);
    console.log(colors.red + colors.bright + '  ✗ BUILD FAILED' + colors.reset);
    console.log(colors.red + colors.bright + '═══════════════════════════════════════════════════════════════' + colors.reset);
    logError(error.message);
    process.exit(1);
  }
}

// Run the build
build();