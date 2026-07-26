const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = {
  moe: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Emblem_of_India.svg/150px-Emblem_of_India.svg.png',
  symbiosis: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Symbiosis_International_University_logo.svg/200px-Symbiosis_International_University_logo.svg.png',
  maha60: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Cornell_University_Logo.svg/200px-Cornell_University_Logo.svg.png',
  sharjah: 'https://srtip.ae/wp-content/uploads/2020/09/SRTIP-Logo-new-1.png',
  unesco: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/UNESCO_logo_2021.svg/250px-UNESCO_logo_2021.svg.png',
  mitadt: 'https://www.mituniversity.ac.in/assets/images/logo.png',
  western: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Western_University_Logo.svg/250px-Western_University_Logo.svg.png',
  dyp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/D._Y._Patil_International_University_Logo.png/200px-D._Y._Patil_International_University_Logo.png',
  azure: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/200px-Microsoft_Azure.svg.png',
  fisa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/World_Rowing_FISA_logo.svg/200px-World_Rowing_FISA_logo.svg.png',
  iic: 'https://iic.mic.gov.in/assets/html/images/logo.png',
  atal: 'https://aim.gov.in/assets/images/aim-logo.png',
  sidtm: 'https://sidtm.edu.in/images/sidtm_logo.png',
  pratham: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Pratham_Logo.svg/250px-Pratham_Logo.svg.png',
  cummins: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Cummins_logo.svg/200px-Cummins_logo.svg.png',
  mitcon: 'https://mitconindia.com/wp-content/uploads/2021/04/mitcon-logo.png',
  birla: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Aditya_Birla_Group_Logo.svg/200px-Aditya_Birla_Group_Logo.svg.png',
  kenskyora: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Japanese_Katakana_letter_Ke.svg/150px-Japanese_Katakana_letter_Ke.svg.png',
  greentech: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ecology_Logo.svg/150px-Ecology_Logo.svg.png'
};

const publicDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function download(name, url) {
  const ext = url.endsWith('.png') ? '.png' : url.endsWith('.jpg') ? '.jpg' : '.svg';
  const dest = path.join(publicDir, `${name}${ext}`);
  const file = fs.createWriteStream(dest);

  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  https.get(url, options, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
      // Follow redirect
      download(name, response.headers.location);
      return;
    }
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}${ext} successfully`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}:`, err.message);
  });
}

Object.entries(logos).forEach(([name, url]) => {
  download(name, url);
});
