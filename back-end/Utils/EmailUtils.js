const net = require('net');
const Base64 = require('js-base64').Base64;

const username = 'system@giaphanguoiviet.com';
const password = 'weJFW732fqijojAWFHOhr4WFWFHO327uHUFWIH';

const systemEmail = net.createConnection({
    port: 587,
    host: 'mail.giaphanguoiviet.com'
});

systemEmail.on('connect', () => {

    systemEmail.write("ehlo giaphanguoiviet.com\r\n");

    systemEmail.write("auth login\r\n");

    systemEmail.write(Base64.encode(username) + "\r\n");

    systemEmail.write(Base64.encode(password) + "\r\n");

    systemEmail.write("mail from: <system@giaphanguoiviet.com>\r\n");

    systemEmail.write("rcpt to: <nanhtuan1003@gmail.com>\r\n");

    systemEmail.write("data\r\n");

    systemEmail.write("Subject: test subject\r\n");

    systemEmail.write("\r\n");

    systemEmail.write("test text\r\n");

    systemEmail.write(".\r\n");

    systemEmail.write("quit\r\n");

    systemEmail.end();

});

const sendEmail = (objData) => {
    try {
        console.log(objData);
        systemEmail.on('connect', () => {
            console.log("connect");
            systemEmail.write("ehlo giaphanguoiviet.com\r\n");

            systemEmail.write("auth login\r\n");

            systemEmail.write(Base64.encode(username) + "\r\n");

            systemEmail.write(Base64.encode(password) + "\r\n");

            systemEmail.write("mail from: <system@giaphanguoiviet.com>\r\n");

            systemEmail.write(`rcpt to: <${objData.to}>\r\n`);

            systemEmail.write("data\r\n");

            systemEmail.write(`Subject: ${objData.subject}\r\n`);

            systemEmail.write("\r\n");

            systemEmail.write(`${objData.text}\r\n`);

            systemEmail.write(".\r\n");

            systemEmail.write("quit\r\n");
        });
        return true;
    } catch (error) {
        console.log("error : " + error);
        return false;
    }


}
module.exports = { systemEmail, sendEmail };