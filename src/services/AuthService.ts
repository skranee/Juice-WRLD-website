import $api from '../http'
import {Axios, AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {CheckResponse} from "../models/response/CheckResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password}, {withCredentials: true});
    }

    static async registration(email:string , password: string, role: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {email, password, role}, {withCredentials: true});
    }

    static async logout(): Promise<void> {
        return $api.post('/logout', {withCredentials: true});
    }

    static async changePassword(email: string, newPassword: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.put<AuthResponse>('/update', {email, newPassword}, {withCredentials: true});
    }

    static async checkPassword(email: string, password: string): Promise<AxiosResponse<CheckResponse>> {
        return $api.post('/check', {email, password}, {withCredentials: true});
    }
}