const fs = require('fs');
const path = require('path');

// 复制 logo.png 到各个平台的图标目录
const sourceLogo = path.join(__dirname, '../src/assets/icon/logo.png');

// iOS 图标尺寸
const iosSizes = [
  { size: 20, scale: 2, filename: 'Icon-App-20x20@2x.png' },
  { size: 20, scale: 3, filename: 'Icon-App-20x20@3x.png' },
  { size: 29, scale: 2, filename: 'Icon-App-29x29@2x.png' },
  { size: 29, scale: 3, filename: 'Icon-App-29x29@3x.png' },
  { size: 40, scale: 2, filename: 'Icon-App-40x40@2x.png' },
  { size: 40, scale: 3, filename: 'Icon-App-40x40@3x.png' },
  { size: 60, scale: 2, filename: 'Icon-App-60x60@2x.png' },
  { size: 60, scale: 3, filename: 'Icon-App-60x60@3x.png' },
  { size: 1024, scale: 1, filename: 'Icon-App-1024x1024@1x.png' }
];

// Android 图标尺寸
const androidSizes = [
  { size: 48, density: 'mdpi', filename: 'ic_launcher.png' },
  { size: 72, density: 'hdpi', filename: 'ic_launcher.png' },
  { size: 96, density: 'xhdpi', filename: 'ic_launcher.png' },
  { size: 144, density: 'xxhdpi', filename: 'ic_launcher.png' },
  { size: 192, density: 'xxxhdpi', filename: 'ic_launcher.png' }
];

console.log('开始生成应用图标...');

// 复制到 iOS 目录
const iosIconDir = path.join(__dirname, '../ios/RNDemo/Images.xcassets/AppIcon.appiconset');
iosSizes.forEach(({ filename }) => {
  const destPath = path.join(iosIconDir, filename);
  if (fs.existsSync(sourceLogo)) {
    fs.copyFileSync(sourceLogo, destPath);
    console.log(`✅ 已复制到 iOS: ${filename}`);
  }
});

// 复制到 Android 目录
androidSizes.forEach(({ density, filename }) => {
  const androidIconDir = path.join(__dirname, `../android/app/src/main/res/mipmap-${density}`);
  const destPath = path.join(androidIconDir, filename);
  if (fs.existsSync(sourceLogo)) {
    fs.copyFileSync(sourceLogo, destPath);
    console.log(`✅ 已复制到 Android ${density}: ${filename}`);
  }
});

console.log('图标生成完成！');
console.log('注意：您可能需要手动调整图标尺寸以符合各平台的要求。'); 