import Link from "next/link";

type MenuItemPropTypes = {
    title?: string;
    icon?: JSX.Element;
    url?: string;
};

const MenuItem: React.FC<MenuItemPropTypes> = ({ icon, title, url }) => {
    return (
        <Link href={url ?? "/"} passHref={true}>
            <div className="menu-card-primary w-96 p-2">
                <div className="flex flex-col items-center justify-center w-full h-full text-white">
                    <div className="w-32 h-32">{icon}</div>
                    <p className="flex w-full justify-center py-1 pt-1.5 text-sm leading-4 font-bold  text-zinc-200 rounded-md shadow-md font-default navbar-pattern">
                        {title?.toUpperCase()}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MenuItem;
