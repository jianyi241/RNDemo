import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Token存储键
const TOKEN_KEY = 'auth_token';

// 接口响应类型
interface ApiResponse {
  code: number;
  message: string;
  data: any;
  token?: string;
}

// 获取token
const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('获取token失败:', error);
    return null;
  }
};

// 保存token
const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('保存token失败:', error);
  }
};

// 创建axios实例
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000
});

// 登录接口
export const login = async (userName: string, password: string): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append('userName', userName);
  formData.append('password', password);
  
  try {
    const response = await api.post('/user/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // 保存token
    // if (response.data && response.data.token) {
    //   await saveToken(response.data.token);
    // }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 获取用户信息接口
export const getUserInfo = async (): Promise<ApiResponse> => {
  try {
    const token = await getToken();
    const response = await api.get('/user/getUserInfo', {
      headers: {
        auth: token
      }
    });
    return response.data;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

// 清除token
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('清除token失败:', error);
  }
};

export default {
  login,
  getUserInfo,
  logout
}; 