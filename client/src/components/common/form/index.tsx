import {
	Button,
	ButtonProps,
	ComponentWithAs,
	Input,
	InputProps,
} from '@chakra-ui/react';
import { FieldConfig, useField } from 'formik';

export const LoginInput: ComponentWithAs<'input', InputProps> = (props) => {
	const [field] = useField({
		name: (props as FieldConfig<string>).name,
		type: props.type,
	});
	return (
		<Input
			{...props}
			{...field}
			borderRadius='0'
			mb='4px'
			_placeholder={{ fontSize: '13px' }}
			fontSize='12px'
			autoComplete='off'
		/>
	);
};

export const LoginButton: ComponentWithAs<'button', ButtonProps> = ({
	children,
	...rest
}) => {
	return (
		<Button
			{...rest}
			borderRadius='0'
			fontSize='12px'
			h='8'
			px='3'
			textTransform='uppercase'
		>
			{children}
		</Button>
	);
};
