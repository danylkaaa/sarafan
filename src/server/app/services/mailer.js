const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`
    }
});

module.exports = {
    sendInvite: (sender, receiver, token, url) => {
        let mail = {
            from: process.env.EMAIL,
            to: receiver,
            subject: "You are invited",
            html: `<a href="${url}/invite?token=${token}">Click to accept invite from ${sender}</a>`
        };
        transporter.sendMail(mail, (err, info) => {console.log(err); console.log(info)});
        console.log(`<a href="${url}/${token}">Click to accept invite from ${sender}</a>`);
    }
};