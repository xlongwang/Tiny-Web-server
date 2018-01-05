const fs = require('fs');
const { promisify } = require('util');
const path =require('path');
const stat = promisify(fs.stat);
const Handlebars = require('handlebars');
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig')

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath, 'urf-8');
const template = Handlebars.compile(source);

module.exports = async function(req, res, filePath) {
  try{
    const stats = await stat(filePath);
    if(stats.isFile()){
      res.statusCode = 200;      
      res.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(filePath).pipe(res);
      }else if(stats.isDirectory()){
        const files = await readdir(filePath);
        res.statusCode = 200;      
        res.setHeader('Content-Type', 'text/plain');

        const data = {
           title: path.basename(filePath),
           dir: path.relative(config.root, filePath),
           files
        }

        res.end(template(data));
      }
     }catch(ex){
       res.statusCode = 404;      
       res.setHeader('Content-Type', 'text/plain');
       res.end(`${filePath} is not a directory or file!`);
     }
}