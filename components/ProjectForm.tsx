'use client';

import { ProjectInterface, SessionInterface } from '@/common.types';
import { categoryFilters } from '@/constants';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import Button from './Button';
import CustomerMenu from './CustomerMenu';
import FormField from './FormField';

type FormProps = {
	type: string;
	session: SessionInterface;
	project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: FormProps) => {
	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [form, setForm] = useState({
		title: project?.title || '',
		description: project?.description || '',
		image: project?.image || '',
		liveSiteUrl: project?.liveSiteUrl || '',
		githubUrl: project?.githubUrl || '',
		category: project?.category || '',
	});

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsSubmitting(true);

		const { token } = await fetchToken();

		try {
			if (type === 'create') {
				await createNewProject(form, session?.user?.id, token);

				router.push('/');
			}

			if (type === 'edit') {
				await updateProject(form, project?.id as string, token);

				router.push('/');
			}
		} catch (error) {
			alert(
				`Failed to ${
					type === 'create' ? 'create' : 'edit'
				} a project. Try again!`
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const file = e.target.files?.[0];

		if (!file) return;

		if (!file.type.includes('image')) {
			return alert('Please upload an image file');
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			const result = reader.result as string;

			handleStateChange('image', result);
		};
	};

	const handleStateChange = (fieldName: string, value: string) => {
		setForm((prevState) => ({ ...prevState, [fieldName]: value }));
	};

	return (
		<form onSubmit={handleFormSubmit} className='flex_start form'>
			<div className='flex_start form-image__container'>
				<label
					htmlFor='poster'
					className='flex_center form-image__label'
				>
					{!form.image && 'Choose a poster for your project'}
				</label>
				<input
					type='file'
					id='image'
					accept='image/'
					required={type === 'create'}
					className='form-image__input'
					onChange={handleInput}
				/>
				{form.image && (
					<Image
						src={form.image}
						className='z-20 object-contain sm:p-10'
						alt='Project Thumbnail'
						fill
					/>
				)}
			</div>

			<FormField
				title='Title'
				state={form.title}
				placeholder='Flexibble'
				setState={(value) => handleStateChange('title', value)}
			/>
			<FormField
				title='Description'
				state={form.description}
				placeholder='Showcase and discover remakable developer'
				setState={(value) => handleStateChange('description', value)}
			/>
			<FormField
				type='url'
				title='Website Url'
				state={form.liveSiteUrl}
				placeholder='http://placeholder.com'
				setState={(value) => handleStateChange('liveSiteUrl', value)}
			/>
			<FormField
				type='url'
				title='Github URL'
				state={form.githubUrl}
				placeholder='https://github.com/detkit'
				setState={(value) => handleStateChange('githubUrl', value)}
			/>

			<CustomerMenu
				title='Category'
				state={form.category}
				filters={categoryFilters}
				setState={(value) => handleStateChange('category', value)}
			/>

			<div className='w-full flex_start'>
				<Button
					title={
						isSubmitting
							? `
                  ${type === 'create' ? 'Creating' : 'Editing'}`
							: `${type === 'create' ? 'Create' : 'Edit'}`
					}
					type='submit'
					leftIcon={isSubmitting ? '' : '/plus.svg'}
					isSubmitting={isSubmitting}
				/>
			</div>
		</form>
	);
};

export default ProjectForm;
