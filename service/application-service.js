const ApplicationModel = require('../models/application-model')
const {models} = require("mongoose");
const mailService = require("./mail-service");
const userService = require('./user-service')
const generatePassword = require('password-generator');
const UserModel = require("../models/user-model");
const ApiError = require("../errors/api-error");

class ApplicationService {
    async create(email, last_name, first_name, patronymic='', fio_boss, division, position, work_experience, achievements, motivation_letter, status='accepted') {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким email уже подавал заявку')
        }
        const application = await ApplicationModel.create({email, last_name, first_name, patronymic, fio_boss,
            division, position, work_experience, achievements, motivation_letter, status})
        await mailService.sendAcceptedMail(email)
        return application
    }

    async approve(email) {
        const application = await ApplicationModel.findOne({email})
        if (!application) {
            throw ApiError.BadRequest('Заявки с таким email не существует')
        }
        application.status = 'approved'
        await application.save()
        const password = generatePassword(8)
        try {
            await userService.registration(email, password)
        } catch (e) {
            console.log(e)
        }
        await mailService.sendApprovedMail(email, password, `${process.env.API_UPL}/api/login`)
    }

    async refuse(email) {
        const application = await ApplicationModel.findOne({email})
        if (!application) {
            throw ApiError.BadRequest('Заявки с таким email не существует')
        }
        application.status = 'refused'
        await application.save()
        await mailService.sendRefusalMail(email)
    }

    async check(email) {
        const application = await ApplicationModel.findOne({email})
        if (!application) {
            throw ApiError.BadRequest('Заявки с таким email не существует')
        }
        let messageStatus
        switch (application.status){
            case 'accepted':
                messageStatus = 'Ваша заявка находится на рассмотрении'
                break
            case 'approved':
                messageStatus = 'Ваша заявка одобрена'
                break
            case 'refused':
                messageStatus = 'Ваша заявка отклонена'
                break
        }
        return {status: application.status, message: messageStatus}
    }
}

module.exports = new ApplicationService()