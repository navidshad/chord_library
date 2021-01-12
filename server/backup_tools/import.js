const exec = require('child_process').exec;
const fs = require('fs');

let filesDir = require('path').join(__dirname, 'files');
let dbConnectionStr = process.env.MONGO;
//'mongodb://@localhost:27017/';

function ImportFile (fileDir, db, coll) 
{
  return new Promise((done, reject) => {

    let url = dbConnectionStr + db;
    let command = `mongoimport --uri="${url}" --collection="${coll}" --file="${fileDir}"`;
    
    exec(command, (err, stdout, stderr) => {
      if(err) reject(err);
      else done(stdout || stderr);
    });
  });
}

async function startImportProccess(files) {
  for(let index in files) {
    let fileName = files[index];
    let dbName = 'melodyko_' + fileName.split(' ')[0];
    let collection = fileName.split(' ')[1].split('.')[0];
    
    let fileDir = require('path').join(filesDir, fileName);
    
      await ImportFile(fileDir, dbName, collection)
       .then((r) => {
         console.info('#========================== ', fileName, ' import has been done.');
         console.log(r);
       }).catch(err => {
         console.warn('#=========== error ======== ', fileName, ' import has not been done.');
         console.error(err);
       });
    
  }
}

let files = [fs.readdirSync(filesDir)[14]];
startImportProccess(files);