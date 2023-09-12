import { defineStore } from 'pinia';
import router from '../router';
import { apiLogin } from '../config/api/auth';
import { useSpinnerStore } from './spinner';

interface IUser {
  _id: string,
  name: string,
  lastName: string,
  email: string,
  telephone: number,
  premium: boolean,
  birthday: Date,
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
    updateUser(user: IUser, token: string = '', tokenExpires: number = 0) {
      this.user = user;
      this.token = token;
      this.tokenExpires = tokenExpires;
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpires', tokenExpires.toString());
      localStorage.setItem('user', JSON.stringify(user));
    },

    userLogged(token: string = '', tokenExpires: number = 0, user: string = '') {
      this.logged = true;
      this.token = token;
      this.tokenExpires = tokenExpires;
      this.user = JSON.parse(user);
    },

    async login(payload: object = {}) {
      const spinnerStore = useSpinnerStore();
      spinnerStore.switchSpinner(true);
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
      } finally {
        spinnerStore.switchSpinner(false);
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