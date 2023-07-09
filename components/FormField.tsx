type FieldProps = {
	type?: string;
	title: string;
	state: string;
	placeholder: string;
	isTextArea?: boolean;
	setState: (value: string) => void;
};

const FormField = ({
	type,
	title,
	state,
	placeholder,
	isTextArea,
	setState,
}: FieldProps) => {
	return (
		<div className='flex-col w-full gap-4 flex_start'>
			<label className='w-full text-gray-100'>{title}</label>

			{isTextArea ? (
				<textarea
					placeholder={placeholder}
					value={state}
					className='form__field-input'
					onChange={(e) => setState(e.target.value)}
					required
				/>
			) : (
				<input
					type={type || 'text'}
					placeholder={placeholder}
					value={state}
					className='form__field-input'
					onChange={(e) => setState(e.target.value)}
					required
				/>
			)}
		</div>
	);
};

export default FormField;
