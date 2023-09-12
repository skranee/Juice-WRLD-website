import {Schema, model} from 'mongoose'

const achievementModel = new Schema({
    text: {type: String, required: true, unique: true}
})

export default model('Achievement', achievementModel)