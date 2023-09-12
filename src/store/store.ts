import IUser from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import UserService from "../services/UserService";
import IAnswer from "../models/IAnswer";
import IMessage from "../models/IMessage";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response) //!!!
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            localStorage.setItem('role', this.user.role)
            return response.status;
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string, role = 'user') {
        try {
            const response = await AuthService.registration(email, password, role);
            console.log(response) //!!!
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            if(response.status === 200) { //!!!!!!!!!!!!!!!!!!!
                window.location.replace('http://localhost:5001/mainpage')
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth () {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true)
            this.setUser(response.data.user);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async changePassword (email: string, newPassword: string) {
        try {
            const response = await AuthService.changePassword(email, newPassword);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            if(response.status === 200) {  //!!!!!!!!!!!!!!!
                console.log('Password successfully changed!')
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkPassword (email: string, password: string) {
        try {
            const response = await AuthService.checkPassword(email, password);
            if(response.data.isEqual) {
                return true
            }
            else if(!response.data.isEqual) {
                return false
            }
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async sendMessage (email:string, message: string) {
        try {
            const response = await UserService.sendMessage(email, message);
            return response;
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async getAllMessages (): Promise<IMessage[] | undefined> {
        try {
            const response = await UserService.fetchMessages();
            return response.data.filter(item => !item.isAnswered);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async sendAnswer (userId: string, messageId: string, answer: string) {
        try {
            const response = await UserService.answerMessage(userId, messageId, answer);
            return response;
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async getAllAnswers (): Promise<IAnswer [] | undefined> {
        try {
            const response = await UserService.fetchAnswers();
            return response.data.filter(item => item.userId === this.user.id && !item.isRead);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async readAnswer (messageId: string) {
        try {
            const response = UserService.readAnswer(messageId);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async makeNews (formData: FormData) {
        try {
            const response = await UserService.makeNews(formData);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async getNews () {
        try {
            const news = await UserService.getNews();
            return news.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async makeAchievement (text: string) {
        try {
            const newAchievement = await UserService.makeAchievement(text);
            return newAchievement;
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async getGallery () {
        try {
            const gallery = await UserService.getGallery();
            console.log(gallery.data)
            return gallery.data.map(item => item.text);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }
}