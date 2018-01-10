const path = require('path');

const mimeTypes = {
   'css': 'text/css',
   'gif': 'image/gif',
   'html': 'text/html',
   'ico': 'image/x-icon',
   'jpeg': 'image/jpeg',
   'jpg': 'image/jpeg',
   'js': 'text/javascript',
   'json': 'application/json',
   'pdf': 'application/pdf',
   'png': 'image/png',
   'svg': 'image/svg+xml',
   'tiff': 'image/tiff',
   'txt': 'text/aplain',
   'wmv': 'video/x-ms-wmv',
   'wma': 'audio/x-ms-wma',
   'xml': 'text/xml',
   'swf': 'application/x-shockwave-flash'
}

module.exports = (filePath) =>{
  let ext = path.extname(filePath)
      .split('.')
      .pop();
  if(!ext) {
    ext = filePath
  }

  return mimeTypes[ext] || mimeTypes['txt']
} 