import {Schema, model} from 'mongoose'

const newsSchema = new Schema({
    text: {type: String, required: true},
    image: {type: String, required: true}
})

export default model('news', newsSchema)