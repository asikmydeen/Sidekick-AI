#!/usr/bin/env node
/**
 * Build script for Firefox Add-ons (AMO)
 * - Uses same version as Chrome (does not increment)
 * - Builds with Vite (minified, NO obfuscation - AMO requirement)
 * - Uses Firefox manifest (manifest.firefox.json)
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
  magenta: '\x1b[35m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  console.log(`${colors.magenta}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logNote(message) {
  console.log(`${colors.yellow}ℹ${colors.reset} ${message}`);
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
  console.log(colors.bright + '  Sidekick AI - Firefox Add-ons (AMO) Build' + colors.reset);
  console.log(colors.bright + '═══════════════════════════════════════════════════════════════' + colors.reset + '\n');

  const startTime = Date.now();
  const distDir = path.join(ROOT_DIR, 'dist-firefox');

  try {
    // Step 1: Read version and sync Firefox manifest
    logStep('1/5', 'Reading version and syncing manifests...');
    
    const manifestPath = path.join(ROOT_DIR, 'manifest.json');
    const firefoxManifestPath = path.join(ROOT_DIR, 'manifest.firefox.json');
    
    const manifest = readJson(manifestPath);
    const version = manifest.version;
    
    // Ensure Firefox manifest has same version
    if (fs.existsSync(firefoxManifestPath)) {
      const firefoxManifest = readJson(firefoxManifestPath);
      if (firefoxManifest.version !== version) {
        firefoxManifest.version = version;
        writeJson(firefoxManifestPath, firefoxManifest);
        logSuccess(`Synced Firefox manifest version to ${version}`);
      } else {
        logSuccess(`Version: ${version} (already synced)`);
      }
    } else {
      logError('manifest.firefox.json not found!');
      process.exit(1);
    }

    // Step 2: Clean dist directory
    logStep('2/5', 'Cleaning dist-firefox directory...');
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
    }
    logSuccess('Cleaned dist-firefox');

    // Step 3: Run Vite build (no obfuscation)
    logStep('3/5', 'Building with Vite (minified, readable code for AMO)...');
    execSync('npx vite build --config vite.config.firefox.js', {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });
    logSuccess('Vite build complete');

    // Step 4: Verify Firefox manifest structure
    logStep('4/5', 'Verifying Firefox manifest...');
    const distManifestPath = path.join(distDir, 'manifest.json');
    
    if (fs.existsSync(distManifestPath)) {
      const distManifest = readJson(distManifestPath);
      
      // Verify Firefox-specific fields
      const hasGeckoSettings = distManifest.browser_specific_settings?.gecko;
      const hasSidebarAction = distManifest.sidebar_action;
      const hasBackgroundScripts = Array.isArray(distManifest.background?.scripts);
      
      if (hasGeckoSettings && hasSidebarAction && hasBackgroundScripts) {
        logSuccess('Firefox manifest structure verified');
      } else {
        logNote('Some Firefox-specific fields may be missing:');
        if (!hasGeckoSettings) logNote('  - browser_specific_settings.gecko');
        if (!hasSidebarAction) logNote('  - sidebar_action');
        if (!hasBackgroundScripts) logNote('  - background.scripts (array format)');
      }
    }

    // Step 5: Create zip
    logStep('5/5', 'Creating zip archive...');
    const zipName = `sidekick-ai-firefox-v${version}.zip`;
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
  ${colors.magenta}Version:${colors.reset}     ${version}
  ${colors.magenta}Build time:${colors.reset}  ${buildTime}s
  ${colors.magenta}Dist size:${colors.reset}   ${formatBytes(distSize)}
  ${colors.magenta}Zip size:${colors.reset}    ${formatBytes(zipSize)}
  ${colors.magenta}Output:${colors.reset}      ${zipName}

  ${colors.yellow}AMO Submission Notes:${colors.reset}
  • Code is minified but NOT obfuscated (readable for review)
  • Variable names are preserved for easier code review
  • No source code submission required (code is readable)
  
  ${colors.yellow}Next steps:${colors.reset}
  1. Test the extension in Firefox: about:debugging → Load Temporary Add-on
  2. Upload ${zipName} to Firefox Add-ons Developer Hub
     https://addons.mozilla.org/developers/
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