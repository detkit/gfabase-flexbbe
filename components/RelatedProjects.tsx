import { ProjectInterface, UserProfile } from '@/common.types';
import { getUserProjects } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	userId: string;
	projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
	const result = (await getUserProjects(userId)) as { user?: UserProfile };

	const filteredProjects = result?.user?.projects?.edges?.filter(
		({ node }: { node: ProjectInterface }) => node?.id !== projectId
	);

	if (filteredProjects?.length === 0) return null;

	return (
		<section className='flex flex-col w-full mt-32'>
			<div className='flexBetween'>
				<p className='text-base font-bold'>
					More by {result?.user?.name}
				</p>
				<Link
					href={`/profile/${result?.user?.id}`}
					className='text-base text-primary-green'
				>
					View All
				</Link>
			</div>

			<div className='related__projects-grid'>
				{filteredProjects?.map(
					({ node }: { node: ProjectInterface }) => (
						<div className='flex_center related__project-card drop-shadow-card'>
							<Link
								href={`/project/${node?.id}`}
								className='relative w-full h-full flex_center group'
							>
								<Image
									src={node?.image}
									width={414}
									height={314}
									className='object-cover w-full h-full rounded-2xl'
									alt='project image'
								/>

								<div className='hidden group-hover:flex related__project-card_title'>
									<p className='w-full'>{node?.title}</p>
								</div>
							</Link>
						</div>
					)
				)}
			</div>
		</section>
	);
};

export default RelatedProjects;
