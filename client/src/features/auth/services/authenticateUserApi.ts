import axios from 'axios';

export default async function authenticateUserApi(inputState: { [id: string]: string }): Promise<any> {
    const res = await axios.post('/auth/login', {
        email: inputState['email'],
        password: inputState['password'],
    });

    return res.data;
};