const { smtpTransport } = require('./nodemailer');

function getRandomString(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function sendMail(email, code) {

    let message = 'کد تایید ایمیل شما: ';

    let mailOption = {
        to: email,
        subject: 'goranee.ir - تایید ایمیل',
        text: message + code,
    }

    // console.table(mailOption);

    return new Promise((done, reject) => {
        smtpTransport.sendMail(mailOption, (error, info) => {
            if (error) reject(error)
            else done(info)
        })
    })
}

exports.generateVerificationCode = (id, idType) => {
    const code = getRandomString(5);

    sendMail(id, code)
    
    return code;
}