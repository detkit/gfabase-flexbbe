'use client';

import { deleteProjects, fetchToken } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
	projectId: string;
};

const ProjectActions = ({ projectId }: Props) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const handleDeleteProject = async () => {
		setIsDeleting(true);

		const { token } = await fetchToken();

		try {
			await deleteProjects(projectId, token);

			router.push('/');
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<Link
				href={`/edit-project/${projectId}`}
				className='flex_center edit__action-btn'
			>
				<Image src='/pencile.svg' width={15} height={15} alt='edit' />
			</Link>

			<button
				type='button'
				className={`flex_center delete__action-btn ${
					isDeleting ? 'bg-gray' : 'bg-primary-green'
				}`}
				onClick={handleDeleteProject}
			>
				<Image src='/trash.svg' width={15} height={15} alt='delete' />
			</button>
		</>
	);
};

export default ProjectActions;
