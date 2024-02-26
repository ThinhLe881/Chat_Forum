import { loginFields } from '../constants/FormFields';
import useLoginUser from '../hooks/useLoginUser';
import FormAction from './form/FormAction';
import FormAlert from './form/FormAlert';
import FormFooter from './form/FormFooter';
import FormInput from './form/FormInput';

const LoginForm = () => {
	const { inputState, apiSuccess, apiStatus, loading, handleChange, handleSubmit } =
		useLoginUser();

	return (
		<form
			className='space-y-2'
			onSubmit={handleSubmit}
		>
			<div>
				{loginFields.map((field) => (
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
					/>
				))}
			</div>
			<FormFooter />
			<FormAction
				handler={handleSubmit}
				text='Log In'
				loading={loading}
			/>
			<FormAlert
				text={apiStatus}
				success={apiSuccess}
			/>
		</form>
	);
};

export default LoginForm;
