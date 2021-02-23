const ModularRest = require('@modular-rest/server');
const Path = require('path');
const { generateVerificationCode } = require('./src/services/sender/service');

function run() {
    return ModularRest.createRest({
        port: '3001',
        componentDirectory: Path.join(__dirname, 'src/services'),
        uploadDirectory: Path.join(__dirname, 'uploads'),
        // cors: {
        //     origin: 'http://localhost:3000'
        // },
        dontListen: false,
        verificationCodeGeneratorMethod: generateVerificationCode,
    })
}

run();
module.exports = run;