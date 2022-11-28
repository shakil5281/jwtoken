const mongoose = require('mongoose')

const crudSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ["active", "inactive"],
        default: "inactive",
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString('en-UK',{
        day: 'numeric',
        year: 'numeric',
        month: 'numeric',}),
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
},{versionKey: false })

const Crud = mongoose.model('Crud', crudSchema)

module.exports = Crud;
