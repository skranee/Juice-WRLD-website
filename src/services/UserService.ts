import $api from '../http'
import {AxiosResponse} from "axios";
import IUser from "../models/IUser";
import IMessage from "../models/IMessage";
import IAnswer from "../models/IAnswer";
import INews from "../models/INews";
import IAchievement from "../models/IAchievement";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

    static sendMessage(email: string, message: string) : Promise<AxiosResponse<void>> {
        return $api.post('/send', {email, message}, {withCredentials: true});
    }

    static fetchMessages(): Promise<AxiosResponse<IMessage[]>> {
        return $api.get<IMessage[]>('/messages');
    }

    static answerMessage(userId: string, messageId: string, answer: string): Promise<AxiosResponse<void>> {
        return $api.post('/answer', {userId, messageId, answer}, {withCredentials: true});
    }

    static fetchAnswers(): Promise<AxiosResponse<IAnswer[]>> {
        return $api.get<IAnswer[]>('/answers');
    }

    static readAnswer(messageId: string): Promise<void> {
        return $api.put('/read', {messageId}, {withCredentials: true});
    }

    static makeNews(formData: FormData): Promise<void> {
        return $api.post('/makenews', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static getNews (): Promise<AxiosResponse<INews[]>> {
        return $api.get<INews[]>('/news');
    }

    static makeAchievement (text: string): Promise<AxiosResponse<void>> {
        return $api.post('/achieve', {text}, {withCredentials: true});
    }

    static getGallery (): Promise<AxiosResponse<IAchievement[]>> {
        return $api.get<IAchievement[]>('/gallery');
    }
}