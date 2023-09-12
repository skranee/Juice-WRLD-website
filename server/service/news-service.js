import newsModel from "../models/news-model.js";

class newsService {
    async makeNews (text, image) {
        const newNews = await newsModel.create({text: text, image: image})
        return newNews;
    }

    async getNews () {
        const news = await newsModel.find();
        return news;
    }
}

export default new newsService();