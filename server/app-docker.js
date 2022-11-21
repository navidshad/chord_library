const ModularRest = require('@modular-rest/server');
const koaStatic = require('koa-static-server');
const {
    join
} = require('path');

const {
    generateVerificationCode
} = require('./src/services/sender/service.js');

global.rootPath = __dirname;

function run() {
    return ModularRest.createRest({
        port: '8080',
        componentDirectory: join(__dirname, 'src/services'),
        uploadDirectory: join(__dirname, 'uploads'),
        mongo: {
            mongoBaseAddress: 'mongodb://mongo:27017',
            dbPrefix: 'mrest_'
        },
        // cors: {
        //     origin: 'http://localhost:3000'
        // },
        dontListen: true,
        verificationCodeGeneratorMethod: generateVerificationCode,
        onBeforeInit: (app) => {
            // Add Health cheker route
            let Router = require('koa-router');
            let healthCheck = new Router();
            healthCheck.get('/health', (ctx) => ctx.body = 'success')

            // Add static dirs
            app.use(koaStatic({
                rootDir: join(__dirname, 'backups'),
                rootPath: '/backup-files/',
            }));
        }
    })
}

run();