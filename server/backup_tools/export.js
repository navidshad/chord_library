const exec = require('child_process').exec;  

let title = 'Goranee';
let date = new Date();
let outputDir = require('path').join(__dirname, `${title}_${date.toISOString()}`);
let mongoBaseConnectionString = process.env.MONGODB_URL;

let dbList = [
  {
    name:'mrest_cms',
    fullUrl:`${mongoBaseConnectionString}/mrest_cms`,
    collections: ['auths', 'permissions'],
  },
  {
    name:'mrest_chord',
    fullUrl:`${mongoBaseConnectionString}/mrest_chord`,
    collections: ['chords', 'keysignatures', 'tables', 'types'],
  },
  {
    name:'mrest_tab',
    fullUrl:`${mongoBaseConnectionString}/mrest_tab`,
    collections: ['artists', 'genres', 'songs'],
  }
];

function makeBackupFromCollection (dbName, url, collection) 
{
  return new Promise((done, reject) => {
    let fileDir = require('path').join(outputDir, `${dbName} ${collection}.json`);
    let command = `mongoexport --uri="${url}" --collection="${collection}" --out="${fileDir}"`;
    exec(command, (err, stdout, stderr) => {
      if(err) reject(err);
      else done(stdout || stderr);
    });
  });
}

function startBackUp() {
  return new Promise(async (done, reject) => {

    try {
      for(let index in dbList) {
        let dbDetail = dbList[index];
         for(let colectionIndex in dbDetail.collections) {
           let colection = dbDetail.collections[colectionIndex];
           await makeBackupFromCollection(dbDetail.name, dbDetail.fullUrl, colection)
           .then((r) => {
            //  console.info('#========================== ', dbDetail.name, colection, ' backup has been done.');
            //  console.log(r);
           }).catch(err => {
             console.warn('#=========== error ======== ', dbDetail.name, colection, ' backup has not been done.');
             console.error(err);
             throw err;
           });
         }
      }
    } catch (error) {
      reject(error)
    }

    done(outputDir);
  });
}

// startBackUp();
module.exports.startBackUp = startBackUp;
