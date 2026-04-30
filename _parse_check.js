const fs = require('fs');
const src = fs.readFileSync('C:/Users/tiida/Desktop/Capple-farm-app/app.js','utf8');
try {
  new Function(src);
  console.log('parse-ok');
} catch (e) {
  console.log('parse-error');
  console.log(e.message);
  if (e.stack) console.log(e.stack.split('\n')[0]);
}
