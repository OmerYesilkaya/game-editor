import { CubeTransparentIcon } from "@heroicons/react/outline";

type Props = {
    size?: "large" | "medium" | "small";
};

const NoPrefab: React.FC<Props> = ({ size = "medium" }) => {
    const lookUp = {
        large: {
            iconSize: 24,
            fontSize: "2xl",
        },
        medium: {
            iconSize: 16,
            fontSize: "xl",
        },
        small: {
            iconSize: 12,
            fontSize: "lg",
        },
    };

    return (
        <div className="border-dashed border-2 w-full h-0 grow text-white font-default flex flex-col items-center justify-center">
            <CubeTransparentIcon className={`w-${lookUp[size].iconSize} h-${lookUp[size].iconSize} mb-${Math.ceil(lookUp[size].iconSize / 6)}`} />
            <span className={`text-${lookUp[size].fontSize} font-bold mb-2`}>No active prefab</span>
            <span className="w-2/3 text-center">Please select a prefab from the scene window</span>
        </div>
    );
};

export default NoPrefab;
