const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\b5e5b2d7-71c5-4a69-a5e2-6458cc5be479';
const destDir = 'c:\\Users\\DELL\\OneDrive\\Desktop\\AIG-WEBSITE\\public\\logos';

const mapping = {
  'media__1781592388995.png': 'maha60.png',
  'media__1781592428513.png': 'sharjah.png',
  'media__1781592439219.png': 'unesco.png',
  'media__1781592491484.png': 'western.png'
};

Object.entries(mapping).forEach(([srcName, destName]) => {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcName} to ${destName}`);
  } catch (err) {
    console.error(`Error copying ${srcName}:`, err.message);
  }
});
