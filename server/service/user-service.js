import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
import mailService from '../service/mail-service.js'
import UserDto from "../dtos/user-dto.js";
import { v4 as uuidv4 } from 'uuid';
import ApiError from "../exceptions/api-error.js";
import TokenService from "../service/token-service.js";
import MessageService from "./message-service.js";
import achievementModel from "../models/achievement-model.js";

class UserService {
    async registration(email, password, role){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`User with email ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()

        const user = await UserModel.create({email, password: hashPassword, activationLink, role})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)


        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Invalid activation link')
        }
        user.isActivated = true
        await user.save();
    }

    async login (email, password) {
        const user = await UserModel.findOne({email});
        if(!user) {
            throw ApiError.BadRequest(`User with this email was not found`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers () {
        const users = await UserModel.find();
        return users;
    }

    async changePassword (email, newPassword) {
        const user = await UserModel.findOne({email});

        const hashPassword = await bcrypt.hash(newPassword, 3);
        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        user.password = hashPassword;

        await user.save();

        return {...tokens, user: userDto}
    }

    async checkPassword (email, password) {
        const user = await UserModel.findOne({email});
        const isPassEqual = await bcrypt.compare(password, user.password);
        return {isEqual: isPassEqual}
    }

    async sendMessage(email, message) {
        const user = await UserModel.findOne({email});
        const userDto = new UserDto(user);
        const savedMessage = await MessageService.saveMessage(userDto.id, message);
        return savedMessage;
    }

    async answerMessage (userId, messageId, answer) {
        const user = await UserModel.findById(userId);
        const userDto = new UserDto(user);
        const answered = await MessageService.answerMessage(userDto.id, messageId, answer);
        return answered;
    }

    async makeAchievement (text) {
        const newAchievement = await achievementModel.create({text: text});
        return newAchievement;
    }

    async getGallery () {
        const gallery = await achievementModel.find();
        return gallery;
    }
}

export default new UserService();