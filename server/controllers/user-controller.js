import userService from "../service/user-service.js"
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error.js";
import MessageService from "../service/message-service.js";
import messageService from "../service/message-service.js";
import newsService from "../service/news-service.js";

class UserController {
    async registration (req, res, next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password} = req.body
            let role;
            if(req.body.role !== undefined) {
                role = req.body.role;
            }
            const userData = await userService.registration(email, password, role);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async login (req, res, next) {
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async logout (req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async activate (req, res, next) {
        try{
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
        }
    }
    async refresh (req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async getUsers (req, res, next) { //not used function
        try{
            const users = await userService.getAllUsers();
            return res.json(users)
        } catch (e) {
            next(e);
        }
    }

    async changePassword (req, res, next) {
        try {
            const {email, newPassword} = req.body;
            const userData = await userService.changePassword(email, newPassword);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }

    async checkPassword (req, res, next) {
        try {
            const {email, password} = req.body;
            const result = await userService.checkPassword(email, password);
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async sendMessage (req, res, next) {
        try {
            const {email, message} = req.body;
            const response = await userService.sendMessage(email, message);
            return res.json(response);
        } catch(e) {
            next(e);
        }
    }

    async getAllMessages (req, res, next) {
        try {
            const messages = await MessageService.getAllMessages();
            return res.json(messages);
        } catch(e) {
            next(e)
        }
    }

    async answerMessage (req, res, next) {
        try {
            const {userId, messageId, answer} = req.body;
            const answerData = await userService.answerMessage(userId, messageId, answer);
            return res.json(answerData);
        } catch(e) {
            next(e);
        }
    }

    async getAllAnswers (req, res, next) {
        try {
            const answers = await messageService.getAllAnswers();
            return res.json(answers)
        } catch (e) {
            next(e);
        }
    }

    async readMessage (req, res, next) {
        try {
            const {messageId} = req.body;
            const readMessage = await messageService.readAnswer(messageId)

            return readMessage;
        } catch(e) {
            next(e);
        }
    }

    async makeNews (req, res, next) {
        try {
            const {text} = req.body;
            const image = req.files.image;

            if (!image) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const imageBuffer = image.data;
            const imgBase64 = imageBuffer.toString('base64');

            const news = await newsService.makeNews(text, imgBase64);
            return res.status(201).json(news);
        } catch (e) {
            next(e);
        }
    }

    async getNews (req, res, next) {
        try {
            const news = await newsService.getNews();
            return res.json(news);
        } catch (e) {
            next(e);
        }
    }

    async makeAchievement (req, res, next) {
        try {
            const {text} = req.body;
            const newAchievement = await userService.makeAchievement(text);
            return res.json(newAchievement);
        } catch (e) {
            next(e);
        }
    }

    async getGallery (req, res, next) {
        try {
            const gallery = await userService.getGallery();
            return res.json(gallery);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();