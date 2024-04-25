
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from '../http/index';

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
            // console.log('loginResponse', response);
            console.log('loginAccessToken', response.data.accessToken);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log('login', error);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            // console.log('registrationResponse', response);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
        } catch (error) {
            console.log('registration', error);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log('logout', response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (error) {
            console.log('registration', error);
        }
    }

    // async checkAuth() {
    //     this.setLoading(true);
    //     try {
    //         const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
    //         const { accessToken, refreshToken, user } = response.data;

    //         console.log('accessToken:', accessToken);
    //         console.log('refreshToken:', refreshToken);
    //         console.log('user:', user);


    //         console.log('checkAuthResponse', response.data.accessToken);
    //         localStorage.setItem('token', response.data.accessToken);
    //         console.log('checkAuthLocalStorage.setItem', localStorage.setItem('token', response.data.accessToken));
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (error) {
    //         console.log('checkAuth', error);
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }

    // async checkAuth() {
    //     this.setLoading(true);
    //     try {
    //         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

    //         console.log('checkAuthResponse', response.data.accessToken);
    //         localStorage.setItem('token', response.data.accessToken);
    //         console.log('checkAuthLocalStorage.setItem', localStorage.setItem('token', response.data.accessToken));
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (error) {
    //         console.log('checkAuth', error);
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }

    // async checkAuth() {
    //     this.setLoading(true);
    //     try {
    //         const response = await axios.get(`${API_URL}/refresh`, {
    //             params: {
    //                 accessToken: accessToken
    //             }
    //         });

    //         console.log('checkAuthResponse', response.data.accessToken);
    //         localStorage.setItem('token', response.data.accessToken);
    //         console.log('checkAuthLocalStorage.setItem', localStorage.setItem('token', response.data.accessToken));
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (error) {
    //         console.log('checkAuth', error);
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }

    // async checkAuth() {
    //     this.setLoading(true);
    //     try {
    //         const response = await AuthService.checkAuth(accessToken);
    //         console.log('checkAuthResponse', response);
    //         localStorage.setItem('token', response.data.accessToken);
    //         console.log('checkAuthLocalStorage.setItem', localStorage.setItem('token', response.data.accessToken));
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (error) {
    //         console.log('checkAuth', error);
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }

    // const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
}