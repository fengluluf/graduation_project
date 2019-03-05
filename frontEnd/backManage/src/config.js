import base from './util/base'
export const develop = false;
// export const develop = true;
//export const baseUrl = 'http://localhost:8080/EconomicDaily';
// export const baseUrl = 'http://118.144.88.221:8040';
export const baseUrl = 'http://118.144.88.221:8040'; // 线上
// export const baseUrl = 'http://192.168.43.251:8040'; 
// export const baseUrl = 'http://192.168.43.74:8040'; 
// export const baseUrl = 'http://10.243.10.252:8040';
// export const baseUrl = 'http://10.243.9.95:8040'; // 刘志鹏

export var isLogin = base.getCookie('ECO_USER_LOGIN_COOKIE_KEY') || '';
export const version = '1.0'