const applicationService = require('../../service/application/application-service')
const {validationResult} = require("express-validator");
const ApiError = require("../../errors/api-error");
const userService = require("../../service/user/user-service");

class ApplicationController {

    create = async (req, res, next) => {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, last_name, first_name, patronymic, fio_boss, division, position, work_experience, achievements, motivation_letter} = req.body;
            const applicationData = await applicationService.create(email, last_name, first_name, patronymic, fio_boss, division, position, work_experience, achievements, motivation_letter)
            return res.json(applicationData)
        } catch (e) {
            next(e)
        }
    }

    approve = async (req, res, next) => {
        try{
            const {email} = req.body;
            await applicationService.approve(email)
            console.log('заявка одоберна')
            return res.json('заявка одоберна')
        } catch (e) {
            next(e)
        }
    }

    refuse = async (req, res, next) => {
        try{
            const {email} = req.body;
            await applicationService.refuse(email)
            console.log('заявка отклонена')
            return res.json('заявка отклонена')
        } catch (e) {
            next(e)
        }
    }

    check = async (req, res, next) => {
        try{
            const {email} = req.body;
            const statusApplication = await applicationService.check(email)
            return res.json(statusApplication)
        } catch (e) {
            next(e)
        }
    }
}

module.exports= new ApplicationController()