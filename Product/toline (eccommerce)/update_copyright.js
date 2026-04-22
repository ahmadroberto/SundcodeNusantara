// Update all HTML files to remove Google Fonts and add copyright
const fs = require('fs');
const path = require('path');

const BASE = String.raw`D:\My Project\Produk\Template\toline (eccommerce)`;
const htmlFiles = fs.readdirSync(BASE).filter(f => f.endsWith('.html'));

console.log('🔄 Updating HTML files...\n');

htmlFiles.forEach(file => {
  const filePath = path.join(BASE, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove Google Fonts links
  content = content.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>/g, '');
  content = content.replace(/<link[^>]*fonts\.gstatic\.com[^>]*>/g, '');
  
  // Add copyright comment at top if not exists
  if (!content.includes('Sundcode Nusantara')) {
    content = content.replace('<!DOCTYPE html>', 
`<!DOCTYPE html>
<!-- 
  TOLINE E-COMMERCE TEMPLATE
  Copyright (c) 2024 PT Sundcode Nusantara
  Licensed under MIT License
  Developer: PT Sundcode Nusantara
-->`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${file}`);
});

console.log(`\n✅ Updated ${htmlFiles.length} files!`);
console.log('📝 Removed all Google Fonts dependencies');
console.log('📝 Added copyright notices');
