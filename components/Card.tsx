import Image from "next/image";
import Link from "next/link";

type CardPropTypes = {
	title: string;
	image: string;
	url: string;
};

const Card: React.FC<CardPropTypes> = ({ image, title, url }) => {
	return (
		<Link href={url} passHref={true}>
			<div className="w-24 h-24 bg-purple-300 rounded-lg shadow-lg">
				<div className="flex items-center justify-center w-full h-full">
					<Image src={image} layout="fill" objectFit="cover" alt={title} />
				</div>
			</div>
		</Link>
	);
};

export default Card;
