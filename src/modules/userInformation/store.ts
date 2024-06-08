import { toast } from "@/toast/toast";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import Error from "next/error";
import { useContext } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { MessageEnum } from "../toastInformation/store";
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
    email: string;
    id: string;
    // name: string;
    // last_name: string;
}

interface UserState {
    user: IUser | null,
    isAuth: boolean,
    setAuth: (param: boolean) => void,
    setUser: (user: IUser) => void,
    fetchLogin: (email: string, password: string) => void,
    fetchRegistration: (name: string, last_name: string, email: string, password: string) => void,
    fetchReloadPage: () => Promise<void>,
    logout: () => void,
    setRefreshToken: (token: string) => void,
    setAccessToken: (token: string) => void
}

const useUserStore = create<UserState>()(devtools(immer((set, get) => ({
    user: null,
    isAuth: false,
    setAuth: (action: boolean) => set(() => ({
        isAuth: action,
    })),
    setUser: (user: IUser) => set(() => ({
        user: user,
    })),
    setRefreshToken(refreshToken: string) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30); // Устанавливаем срок действия куки на 30 дней
        document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly`;
    },
    setAccessToken(accessToken: string) {
        const expirationTime = new Date().getTime() + (60 * 60 * 1000); // 1 час в миллисекундах
        const tokenData = {
          value: accessToken,
          expiration: expirationTime
        };
        localStorage.setItem('accessToken', JSON.stringify(tokenData));
    },
    logout: () => {
        localStorage.removeItem('authToken');
        document.cookie = 'refreshToken=; Max-Age=0; path=/;';
        set(() => ({
            user: null,
            isAuth: false,
        }));
    },
    fetchReloadPage: async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if(token) {
                console.log("THIS IS TOOOKEN: ", token)
                const response = await axios.get("http://localhost:3500/api/get-user", {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                // Handle successful login
                const newUser = response.data.values.user;
                get().setAuth(true)
  
                set({ user: newUser });
                set({ isAuth: true }); // Set authentication flag if successful
            } 
            //set({ message: response.data.values.message });
        } catch (error: any) {
            throw new Error (error.response?.data?.message || error.message);
        }
    },    
    fetchLogin: async (email: string, password: string) => {
        try {
          const response = await axios.post("http://localhost:3500/api/auth/login", {
            email,
            password,
          });
          // Handle successful login
          const newUser = response.data.values.user;
          const token = response.data.values.token;
          console.log("INFO: ", response.data.values);
          //set({ message: response.data.values.message });

          get().setRefreshToken(token)
          get().setAccessToken(token)

          get().setAuth(true)

          set({ user: newUser });
          set({ isAuth: true }); // Set authentication flag if successful
          
          toast({type: MessageEnum.success, message: "Login is success", id: uuidv4()})
          axios.defaults.headers.common['Authorization'] = token;
          console.log("THIS IS COOKE", document.cookie)

        } catch (error: any) {
          toast({type: MessageEnum.error, message: error.response?.data?.values?.message, id: uuidv4()})
          throw new Error (error.response?.data?.message || error.message);
        }
      },
    fetchRegistration: async (name: string, last_name: string, email: string, password: string) => {
        try {
            const response = await axios.post(
                "http://localhost:3500/api/auth/register",
                {
                    name: name,
                    last_name: last_name,
                    email: email,
                    password: password
                }
            );
            const newUser = response.data.values.user;
            const token = response.data.values.token;
            console.log("new user: ", newUser)
            

            get().setAuth(true)
            
            set({ user: newUser })
            set({ isAuth: true })
        } catch (error: any) {
            toast({type: MessageEnum.error, message: error.response?.data?.values?.message, id: uuidv4()})
            throw new Error (error.response?.data?.message || error.message);
        }
    }
})), { name: 'userStore', version: 1 }))

export default useUserStore