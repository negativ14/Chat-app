import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface User {
    email: string;
    username: string;
    fullName: string;
    password: string;
    profilePic?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AuthState {
    authUser: null | User,
    isSigningUp: boolean,
    isLoggingIn: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
    checkAuth: () => Promise<void>,
    signup: (formData: any) => Promise<boolean>,
    login: (formData: any) => Promise<void>,
    logout: () => Promise<void>,
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data })
        } catch (error) {
            console.log("Error while authentication", error);
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data: any) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);

            console.log(response.data);

            if (response.data.message.includes('successfully')) {
                toast.success("Account created successfully");
                return true;
            }
            else {
                toast.error(response.data.message)
                return false;
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An unexpected error occurred");
            return false;
        } finally {
            set({ isSigningUp: false });
        }
    },

    
    login: async (data: any) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data });
            console.log(response.data);

            if (response.data.message.includes('successfully')) {
                toast.success("Logged In successfully");
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An unexpected error occurred");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");
            Navigate({to:'/login'})
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    },

}))

