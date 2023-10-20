const { Schema, model } = require('mongoose')

const ApplicationSchema = new Schema({
    email: {type: String, unique: true, required: true},
    first_name:{type: String, required: true},
    last_name:{type: String, required: true},
    patronymic:{type: String},
    fio_boss:{type: String, required: true},
    division:{type: String, required: true},
    position:{type: String, required: true},
    work_experience:{
        years:{type: Number, required: true},
        months: {type: Number, required: true}
    },
    achievements:{type: String, required: true},
    motivation_letter:{type: String, required: true},
    status: {type: String, enum: ['accepted', 'approved', 'refused'], required: true}

})

module.exports = model('Application', ApplicationSchema)