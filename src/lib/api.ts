import axios from 'axios';
import { User, Post, Comment, ApiResponse } from '@/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = <T>(error: unknown): ApiResponse<T> => {
  const message = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || 
                 (error as Error)?.message || 
                 'Unknown error occurred';
  return {
    success: false,
    error: message,
  } as ApiResponse<T>;
};

export const userApi = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    try {
      const response = await api.get<User[]>('/users');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export const postApi = {
  getPosts: async (): Promise<ApiResponse<Post[]>> => {
    try {
      const response = await api.get<Post[]>('/posts');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  getPostsByUserId: async (userId: number): Promise<ApiResponse<Post[]>> => {
    try {
      const response = await api.get<Post[]>(`/posts?userId=${userId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  getPostById: async (id: number): Promise<ApiResponse<Post>> => {
    try {
      const response = await api.get<Post>(`/posts/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  createPost: async (post: Omit<Post, 'id'>): Promise<ApiResponse<Post>> => {
    try {
      const response = await api.post<Post>('/posts', post);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<ApiResponse<Post>> => {
    try {
      const response = await api.put<Post>(`/posts/${id}`, post);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  deletePost: async (id: number): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/posts/${id}`);
      return {
        success: true,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export const commentApi = {
  getCommentsByPostId: async (postId: number): Promise<ApiResponse<Comment[]>> => {
    try {
      const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export const formApi = {
  submitFormData: async (formData: FormData): Promise<ApiResponse<unknown>> => {
    try {
      // Симуляция загрузки на jsonplaceholder
      const textData = formData.get('textInput') as string;
      const file = formData.get('file') as File;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        data: {
          message: 'Form submitted successfully',
          textInput: textData,
          fileName: file?.name || 'No file',
          fileSize: file?.size || 0,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};