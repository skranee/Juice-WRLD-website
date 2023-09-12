import {Schema, model} from 'mongoose'

const answerSchema = new Schema({
    answer: {type: String, required: true},
    messageId: {type: String, required: true, unique: true}, //
    userId: {type: Schema.Types.ObjectId, required: true},
    isRead: {type: Boolean, default: false}
})

export default model('Answer', answerSchema);