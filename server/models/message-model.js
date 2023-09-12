import {Schema, model} from 'mongoose'

const messageSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    message: {type: String, required: true},
    isAnswered: {type: Boolean, default: false}
})

export default model('Message', messageSchema);