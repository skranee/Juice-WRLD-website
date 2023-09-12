import nodemailer from 'nodemailer'
class MailService {
    async sendActivationMail (to, link) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Project JWW account activation on ' + process.env.API_URL,
            text: '',
            html:
            `
                <div>
                    <h1>Click here to activate your account</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

export default new MailService();