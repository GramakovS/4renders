export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type ModalFormData = {
  textInput: string;
  file: File | null;
};

export type WebSocketMessage = {
  id: string;
  type: 'user' | 'system';
  message: string;
  timestamp: Date;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  success: boolean;
};

export type LoadingState = {
  isLoading: boolean;
  error: string | null;
};