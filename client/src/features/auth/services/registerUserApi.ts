import axios from 'axios';

export default async function registerUserApi(inputState: { [id: string]: string }): Promise<any> {
  const res = await axios.post('/auth/register', {
    name: inputState['username'],
    email: inputState['email'],
    password: inputState['password'],
  });

  return res.data;
};