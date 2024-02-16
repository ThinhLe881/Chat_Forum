import { registerFields } from '../constants/FormFields';
import useRegisterUser from '../hooks/useRegisterUser';
import FormAction from './form/FormAction';
import FormAlert from './form/FormAlert';
import FormInput from './form/FormInput';

let fieldsText: { [id: string]: string } = {};
let fieldsError: { [id: string]: string } = {};
registerFields.forEach((field) => (fieldsText[field.id] = ''));
registerFields.forEach((field) => (fieldsError[field.id] = ''));

const RegisterForm = () => {
	const { inputState, errorState, apiSuccess, apiStatus, loading, handleChange, handleRegister } =
		useRegisterUser();

	return (
		<form onSubmit={handleRegister}>
			<div>
				{registerFields.map((field) => (
					<FormInput
						key={field.id}
						handleChange={handleChange}
						value={inputState[field.id]}
						labelText={field.labelText}
						labelFor={field.labelFor}
						id={field.id}
						name={field.name}
						type={field.type}
						isRequired={field.isRequired}
						placeholder={field.placeholder}
						errorText={errorState[field.id]}
					/>
				))}
			</div>
			<FormAction
				handler={handleRegister}
				text={'Sign Up'}
				loading={loading}
			/>
			<FormAlert
				text={apiStatus}
				success={apiSuccess}
			/>
		</form>
	);
};

export default RegisterForm;
