import axios from 'axios';

export default async function registerUserApi(registerState: { [id: string]: string }): Promise<any> {
  const response = await axios.post('/auth/register', {
    name: registerState['username'],
    email: registerState['email'],
    password: registerState['password'],
  });
  return response.data;
};