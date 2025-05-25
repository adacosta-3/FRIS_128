export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
  }
  
  export interface ErrorProps {
    message: string;
  }
  