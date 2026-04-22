// Replace SVG placeholder images with CSS gradient divs
const fs = require('fs');
const path = require('path');

const BASE = String.raw`D:\My Project\Produk\Template\toline (eccommerce)`;
const htmlFiles = fs.readdirSync(BASE).filter(f => f.endsWith('.html'));

console.log('🎨 Replacing SVG placeholders with CSS gradients...\n');

let totalReplacements = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(BASE, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;
  
  // Replace SVG data URIs with div placeholders
  const svgRegex = /src="data:image\/svg\+xml,[^"]*"/g;
  
  // Different replacements based on context
  content = content.replace(/<img src="data:image\/svg\+xml,%3Csvg[^>]*%3E%3Crect fill='[^']*'[^/]*\/%3E[^%]*%3E%3C\/svg%3E" alt="([^"]*)"[^>]*class="([^"]*)"[^>]*>/g, (match, alt, className) => {
    fileReplacements++;
    return `<div class="${className} img-placeholder" aria-label="${alt}">${alt}</div>`;
  });
  
  content = content.replace(/<img src="data:image\/svg\+xml,[^"]*" alt="([^"]*)"[^>]*>/g, (match, alt) => {
    fileReplacements++;
    return `<div class="img-placeholder" aria-label="${alt}">${alt}</div>`;
  });
  
  // Replace specific image contexts
  content = content.replace(/class="hero-image-main"[^>]*>[^<]*/g, 'class="hero-image-main img-placeholder hero">Hero Image');
  content = content.replace(/class="testimonial-avatar"[^>]*>[^<]*/g, 'class="testimonial-avatar img-placeholder" style="width:48px;height:48px;border-radius:50%"');
  
  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${file} (${fileReplacements} replacements)`);
    totalReplacements += fileReplacements;
  }
});

console.log(`\n✅ Made ${totalReplacements} replacements across ${htmlFiles.length} files!`);
console.log('🎨 All placeholders now use pure CSS gradients');
