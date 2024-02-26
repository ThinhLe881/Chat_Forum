import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { loginFields } from '../constants/FormFields';
import { AuthenticationFormHook } from '../constants/Interface';
import authenticateUserApi from '../services/authenticateUserApi';

let fieldsText: { [id: string]: string } = Object.fromEntries(loginFields.map((field) => [field.id, '']));

export default function useLoginUser(): AuthenticationFormHook {
    const [inputState, setInputState] = useState(fieldsText);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [apiStatus, setApiStatus] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const mutation = useMutation(authenticateUserApi);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setApiStatus('');
        setInputState({ ...inputState, [e.target.id]: e.target.value });
    };

    const authenticateUser = useCallback(async () => {
        try {
            const data = await mutation.mutateAsync(inputState);
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.id);
            setApiSuccess(true);
            setAuth(true);
            navigate('/', { replace: true });
        } catch (err) {
            if (err instanceof AxiosError)
                err.response ? setApiStatus(err.response.data) : setApiStatus(err.message);
            setApiSuccess(false);
        }
    }, [mutation, inputState]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        authenticateUser();
    };

    return {
        inputState,
        apiSuccess,
        apiStatus,
        loading: mutation.isLoading,
        handleChange,
        handleSubmit,
    };
}