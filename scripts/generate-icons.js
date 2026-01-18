#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceIcon = path.join(__dirname, '../public/images/DocVault Logo.ico');
const publicDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'icon-192x192-maskable.png', size: 192 },
  { name: 'icon-512x512-maskable.png', size: 512 },
  { name: 'apple-icon.png', size: 180 },
];

async function generateIcons() {
  try {
    console.log('Generating PWA icons from DocVault Logo.ico...');

    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'cover',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${name}`);
    }

    // Generate favicon.ico from the source (copy it)
    const faviconSource = sourceIcon;
    const faviconDest = path.join(publicDir, 'favicon.ico');
    
    if (!fs.existsSync(faviconDest)) {
      fs.copyFileSync(faviconSource, faviconDest);
      console.log('✓ Copied favicon.ico');
    }

    console.log('\n✅ All PWA icons generated successfully!');
    console.log('Your app is now ready to be installed as a PWA!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
