const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = {
  gpay: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlepay.svg',
  phonepe: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/phonepe.svg',
  paytm: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/paytm.svg',
  bhim: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/bhim.svg'
};

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

Object.entries(logos).forEach(([name, url]) => {
  const file = fs.createWriteStream(path.join(publicDir, `${name}.svg`));
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}.svg successfully`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}:`, err.message);
  });
});
