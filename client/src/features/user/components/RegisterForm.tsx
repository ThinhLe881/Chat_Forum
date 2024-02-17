import { registerFields } from '../constants/FormFields';
import useRegisterUser from '../hooks/useRegisterUser';
import FormAction from './form/FormAction';
import FormAlert from './form/FormAlert';
import FormInput from './form/FormInput';

const RegisterForm = () => {
	const { inputState, errorState, apiSuccess, apiStatus, loading, handleChange, handleSubmit } =
		useRegisterUser();

	return (
		<form onSubmit={handleSubmit}>
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
						errorText={errorState ? errorState[field.id] : ''}
					/>
				))}
			</div>
			<FormAction
				handler={handleSubmit}
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
