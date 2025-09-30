import { create } from 'zustand';
import { User, Post, ModalFormData, WebSocketMessage, LoadingState } from '@/types';

export type AppState = {
  users: User[];
  selectedUser: User | null;
  
  posts: Post[];
  
  isModalOpen: boolean;
  modalData: ModalFormData;
  
  messages: WebSocketMessage[];
  isConnected: boolean;
  
  usersLoading: LoadingState;
  postsLoading: LoadingState;
  
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;

  setPosts: (posts: Post[]) => void;

  setModalOpen: (isOpen: boolean) => void;
  setModalData: (data: ModalFormData) => void;

  addMessage: (message: WebSocketMessage) => void;
  setConnected: (isConnected: boolean) => void;

  setUsersLoading: (loading: LoadingState) => void;
  setPostsLoading: (loading: LoadingState) => void;

  clearMessages: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  users: [],
  selectedUser: null,
  posts: [],
  isModalOpen: false,
  modalData: { textInput: '', file: null },
  messages: [],
  isConnected: false,
  usersLoading: { isLoading: false, error: null },
  postsLoading: { isLoading: false, error: null },

  setUsers: (users) => set({ users }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setPosts: (posts) => set({ posts }),
  setModalOpen: (isModalOpen) => set({ isModalOpen }),
  setModalData: (modalData) => set({ modalData }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setConnected: (isConnected) => set({ isConnected }),
  setUsersLoading: (usersLoading) => set({ usersLoading }),
  setPostsLoading: (postsLoading) => set({ postsLoading }),
  clearMessages: () => set({ messages: [] }),
}));