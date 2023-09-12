export default class AnswerDto { //probably isn't needed
    answer;
    messageId;
    id;
    userId;
    isAnswered;

    constructor(model) {
        this.answer = model.answer;
        this.id = model._id;
        this.messageId = model.messageId;
        this.userId = model.userId;
        this.isAnswered = model.isAnswered;
    }
}