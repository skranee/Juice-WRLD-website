import MessageModel from "../models/message-model.js";
import AnswerModel from "../models/answer-model.js";

class MessageService {
    async saveMessage (userId, message) {
        const newMessage = await MessageModel.create({user: userId, message: message})
        return newMessage;
    }

    async getAllMessages () {
        const messages = await MessageModel.find();
        return messages;
    }

    async answerMessage (userId, messageId, answer) {
        const message = await MessageModel.findById(messageId);
        message.isAnswered = true;
        await message.save();

        const newAnswer = await AnswerModel.create({userId: userId, messageId: messageId, answer: answer})
        return newAnswer;
    }

    async getAllAnswers() {
        const answers = await AnswerModel.find();
        return answers;
    }

    async readAnswer (messageId) { //not responding, probably need fix
        const answer = await AnswerModel.findOne({messageId: messageId});
        answer.isRead = true;

        await answer.save();

        return answer;
    }
}

export default new MessageService();