const nodemailer = require('nodemailer')

class MailService  {

    constructor() {
        this.transporter = nodemailer.createTransport(({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }))
    }

    // Уведомление о принятия заявки на рассмотрение
    async sendAcceptedMail (to) {
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to,
            subject: 'Заявка на обучение принята к рассмотрению',
            text: '',
            html:
                `
                 <div>
                    <h1>Корпоративный университет Совкомбанк</h1>
                    <br>
                    <h4>Вы подали заявку на платформе Корпоративного университета Совкомбанка.</h4>
                    <br>
                    <h4>Благодарим Вас за проявленный интерес к нашей учебной программе.</h4>
                    <p>Ваша заявка будет рассмотрена в ближайшее время. Мы пришлем письмо с принятым решением.</p>
                    <br>
                    <p>Если Вы не подавали заявку, просто проигнорируйте это письмо.</p>
                    <br>
                    <p>C уважением, Совкомбанк</p>
                 </div>
            `
        })
    }

    // Утверждение заявки, отпрвка данных для входа
    async sendApprovedMail (to, password, link) {
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to,
            subject: 'Ваша заявка на обучение принята!',
            text: '',
            html:
                `
                 <div>
                 <h1>Корпоративный университет Совкомбанк</h1>
                    <h4>Ваша заявка одобрена!</h4>
                    <p>Ваши данные для входа:</p>
                    <p>email: ${to}</p>
                    <p>password: ${password}</p>
                    
                    <p>Чтобы войти,перейдите по ссылке <a href="${link}">${link}</a></p>
                    <br>
                    <p>C уважением, Совкомбанк</p>
                    
                 </div>
            `
        })
    }

    // Отказ заявки
    async sendRefusalMail (to ) {
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to,
            subject: 'Ваша заявка на обучение отклонена.',
            text: '',
            html:
                `
                 <div>
                    <h1>Корпоративный университет Совкомбанк</h1>
                    <h4>Ваша заявка отклонена!</h4>
                    <br>
                    <p>C уважением, Совкомбанк</p>
                 </div>
            `
        })
    }
}

module.exports = new MailService()