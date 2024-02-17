import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { registerFields } from '../constants/FormFields';
import { AuthenticationFormHook } from '../constants/Interface';
import { emailRegex, passwordRegex, usernameRegex } from '../constants/Regex';
import registerUserApi from '../services/registerUserApi';

let fieldsText: { [id: string]: string } = Object.fromEntries(registerFields.map((field) => [field.id, '']));
let fieldsError: { [id: string]: string } = Object.fromEntries(registerFields.map((field) => [field.id, '']));

export default function useRegisterUser(): AuthenticationFormHook {
	const [inputState, setInputState] = useState(fieldsText);
	const [errorState, setErrorState] = useState(fieldsError);
	const [apiSuccess, setApiSuccess] = useState(false);
	const [apiStatus, setApiStatus] = useState('');
	const mutation = useMutation(registerUserApi);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setApiStatus('');
		setInputState({ ...inputState, [e.target.id]: e.target.value });
	};

	const verifyField = (field: string, regex: RegExp, errorMessage: string): boolean => {
		const isValid = regex.test(inputState[field]);
		fieldsError[field] = isValid ? '' : errorMessage;
		return isValid;
	};

	const verifyUsername = () => verifyField('username', usernameRegex, 'Username has to be at least 6 characters long');
	const verifyEmail = () => verifyField('email', emailRegex, 'Please use a valid email address');
	const verifyPassword = () => verifyField(
		'password',
		passwordRegex,
		'Password has to use at least: 1 number, 1 capital letter, 1 lowercase letter, 1 special character, and 8 characters long'
	);

	function confirmPassword() {
		const isValid = inputState['password'] === inputState['confirm-password'];
		fieldsError['confirm-password'] = isValid ? '' : 'Passwords do not match';
		return isValid;
	};

	const registerUser = useCallback(async () => {
		try {
			await mutation.mutateAsync(inputState);
			setApiStatus('Your account has been created successfully');
			setApiSuccess(true);
		} catch (err) {
			if (err instanceof AxiosError)
				setApiStatus(err.response ? err.response.data : err.message);
			setApiSuccess(false);
		}
	}, [mutation, inputState]);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const usernameValid = verifyUsername();
		const emailValid = verifyEmail();
		const passwordValid = verifyPassword();
		if (usernameValid && emailValid && passwordValid && confirmPassword())
			registerUser();
		setErrorState({ ...fieldsError });
	};

	return {
		inputState,
		errorState,
		apiSuccess,
		apiStatus,
		loading: mutation.isLoading,
		handleChange,
		handleSubmit,
	};
}