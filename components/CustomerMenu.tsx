import { Menu } from '@headlessui/react';
import Image from 'next/image';

type CustomerProps = {
	title: string;
	state: string;
	filters: Array<string>;
	setState: (value: string) => void;
};

const CustomerMenu = ({ title, state, filters, setState }: CustomerProps) => {
	return (
		<div className='relative flex-col w-full flex_start gap-7'>
			<label htmlFor={title} className='w-full text-gray-100'>
				{title}
			</label>
			<Menu as='div' className='relative self-start'>
				<div>
					<Menu.Button className='flex_center custom__menu-btn'>
						{state || 'Select a category'}
						<Image
							src='/arrow-down.svg'
							width={10}
							height={5}
							alt='Arrow Down'
						/>
					</Menu.Button>
				</div>
				<Menu.Items className='flex_start custom__menu-items'>
					{filters.map((tag) => (
						<Menu.Item key={tag}>
							<button
								type='button'
								value={tag}
								className='custom__menu-item'
								onClick={(e) => setState(e.currentTarget.value)}
							>
								{tag}
							</button>
						</Menu.Item>
					))}
				</Menu.Items>
			</Menu>
		</div>
	);
};

export default CustomerMenu;
