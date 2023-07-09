'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type ProjectCardProps = {
	id: string;
	image: string;
	name: string;
	title: string;
	avatarUrl: string;
	userId: string;
};

const ProjectCard = ({
	id,
	image,
	name,
	title,
	avatarUrl,
	userId,
}: ProjectCardProps) => {
	const [randomLikes, setRandomLikes] = useState(0);
	const [randomViews, setRandomViews] = useState('');

	useEffect(() => {
		setRandomLikes(Math.floor(Math.random() * 10000));
		setRandomViews(
			String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k')
		);
	}, []);

	return (
		<div className='flex-col flex_center rounded-2xl drop-shadow-card'>
			<Link
				href={`/project/${id}`}
				className='relative w-full h-full flex_center group'
			>
				<Image
					src={image}
					alt='Project Image'
					width={300}
					height={260}
					className='object-cover w-full h-full rounded-2xl'
				/>
				<div className='hidden group-hover:flex profile__card-title'>
					<p className='w-full'>{title}</p>
				</div>
			</Link>

			<div className='w-full px-2 mt-3 text-sm font-semibold flex_between'>
				<Link href={`/profile/${userId}`}>
					<div className='gap-2 flex_center'>
						<Image
							src={avatarUrl}
							width={24}
							height={24}
							className='rounded-full'
							alt='Profile Image'
						/>
						<p>{name}</p>
					</div>
				</Link>

				<div className='gap-3 flex_center'>
					<div className='gap-2 flex_center'>
						<Image
							src='/hearth.svg'
							width={13}
							height={12}
							alt='heart'
						/>
						<p className='text-sm'>{randomLikes}</p>
					</div>
					<div className='gap-2 flex_center'>
						<Image
							src='/eye.svg'
							width={12}
							height={9}
							alt='heart'
						/>
						<p className='text-sm'>{randomViews}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
