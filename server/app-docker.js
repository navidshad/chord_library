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
        port: 81,
        componentDirectory: join(__dirname, 'src/services'),
        uploadDirectory: join(__dirname, 'uploads'),
        mongo: {
            mongoBaseAddress: 'mongodb://localhost:27017',
            dbPrefix: 'mrest_'
        },
        // cors: {
        //     origin: 'http://localhost:3000'
        // },
        verificationCodeGeneratorMethod: generateVerificationCode,
        onBeforeInit: (app) => {

            // Add Health cheker route
            let Router = require('koa-router');
            let healthCheck = new Router();
            healthCheck.get('/health', (ctx) => ctx.body = 'success')
            app.use(healthCheck.routes());

            // Add static dirs
            app.use(koaStatic({
                rootDir: join(__dirname, 'backups'),
                rootPath: '/backup-files/',
            }));
        }
    })
}

run();