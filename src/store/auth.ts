import { defineStore } from 'pinia';
import router from '../router';
import { apiLogin } from '../config/api/auth';

interface IUser {
  _id: string,
  name: string,
  lastName: string,
  email: string,
  telephone: number,
  premium: boolean,
  birthDate: Date,
  imageProfile: string,
  location: object,
  entryDate: Date,
  lastSession: Date,
  role: number,
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    logged: false,
    token: '',
    tokenExpires: 0,
    user: <IUser>({})
  }),

  getters: {
    isLogged: (state) => state.logged,
  },

  actions: {
    userLogged(token: string = '', tokenExpires: number = 0, user: string = '') {
      this.logged = true;
      this.token = token;
      this.tokenExpires = tokenExpires;
      this.user = JSON.parse(user);
      router.push('/');
    },

    async login(payload: object = {}) {
      try {
        const response = await apiLogin(payload);
        this.logged = true;
        this.token = response.token.token;
        this.tokenExpires = response.token.expiresIn;
        this.user = response.userDB;
        localStorage.setItem('token', response.token.token);
        localStorage.setItem('tokenExpires', response.token.expiresIn);
        localStorage.setItem('user', JSON.stringify(response.userDB));
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      this.logged = false;
      this.token = '';
      this.tokenExpires = 0;
      this.user = <IUser>({});
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  }
});