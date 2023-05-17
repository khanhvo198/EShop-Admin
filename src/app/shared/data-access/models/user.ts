export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
}

export interface ResponseUserApi {
  results: number;
  data: {
    users?: User[];
    doc?: User;
  };
  status: 'success';
}
