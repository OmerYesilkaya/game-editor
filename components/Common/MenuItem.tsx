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
			<div className="menu-card-primary w-52 h-52">
				<div className="flex flex-col items-center justify-center w-full h-full text-white pb-7">
					{image ? (
						<div className="relative w-3/4 h-3/4">
							<Image src={image} layout="fill" objectFit="contain" alt={title} />
						</div>
					) : (
						<PhotographIcon width="6rem" height="6rem" color="black" />
					)}
					<p className="absolute flex justify-center w-11/12 px-3 py-1 text-xl font-bold text-center text-black bg-white rounded-md shadow-md font-default bottom-2">
						{title}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default MenuItem;
