import Link from "next/link";
import Image from "next/image";
import { PhotographIcon } from "@heroicons/react/outline";

type MenuItemPropTypes = {
	title?: string;
	image?: string;
	url?: string;
};

const MenuItem: React.FC<MenuItemPropTypes> = ({ image, title, url }) => {
	return (
		<Link href={url ?? "/"} passHref={true}>
			<div className="card-pattern relative w-52 h-52 border-4 border-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transform-gpu hover:-translate-y-2 transition-all">
				<div className="flex flex-col items-center justify-center pb-7 w-full h-full text-white">
					{image ? (
						<div className="relative w-3/4 h-3/4">
							<Image src={image} layout="fill" objectFit="contain" alt={title} />
						</div>
					) : (
						<PhotographIcon width="6rem" height="6rem" />
					)}
					<p className="absolute bottom-2 flex justify-center px-3 py-1 w-11/12 text-center text-black font-header text-xl font-bold bg-white rounded-md shadow-md">
						{title}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default MenuItem;
