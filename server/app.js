const ModularRest = require('@modular-rest/server');
const koaStatic = require('koa-static-server');
const Path = require('path');

const dotenv = require('dotenv');
dotenv.config({
  path: require('path').join(__dirname, '../.env')
});

const { generateVerificationCode } = require('./src/services/sender/service');

global.rootPath = __dirname;

function run() {
    return ModularRest.createRest({
        port: '80',
        componentDirectory: Path.join(__dirname, 'src/services'),
        uploadDirectory: Path.join(__dirname, 'uploads'),
        mongo: {
            mongoBaseAddress: process.env.MONGODB_URL,
            dbPrefix: 'mrest_'
        },
        // cors: {
        //     origin: 'http://localhost:3000'
        // },
        dontListen: true,
        verificationCodeGeneratorMethod: generateVerificationCode,
        onBeforeInit: (app) => {
            app.use(koaStatic({
                rootDir: Path.join(__dirname, 'backups'), 
                rootPath: '/backup-files/', 
            }));
        }
    })
}

// run();
module.exports = run;