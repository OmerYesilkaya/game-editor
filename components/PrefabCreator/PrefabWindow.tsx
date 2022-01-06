import { HTMLAttributes, useEffect, useState } from "react";

import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import cn from "classnames";

import { useWindowBounds, useResponsive } from "@app/hooks";
import { PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { usePrefabStore } from "@app/store";
import { Prefab } from "@app/types";
import { CubeTransparentIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import Common from "components/Common";

type ButtonProps = {
	themeColor: string;
	variant?: "outline" | "default";
} & HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, themeColor, variant = "default", ...restProps }) => {
	return (
		<button
			onClick={() => console.log("click")}
			className={cn(`w-7 h-7 rounded-sm bg-${themeColor}-500 transition  shadow-md `, {
				[`bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white`]: variant === "default",
				[`bg-transparent border-2 border-${themeColor}-500 hover:bg-${themeColor}-500 hover:border-white text-${themeColor}-500 hover:text-white`]:
					variant === "outline",
			})}
			{...restProps}
		>
			{children}
		</button>
	);
};

const PrefabWindow: React.FC = () => {
	const { prefabs, activePrefabId } = usePrefabStore((state) => ({ activePrefabId: state.activePrefabId, prefabs: state.prefabs }));
	const [prefab, setPrefab] = useState<Prefab | null>(null);
	const bounds = useWindowBounds();
	const { isXS, isSM, isMD } = useResponsive();
	const isSmallDevice = isXS || isSM || isMD;

	const themeColor = "rose";

	const WINDOW_WIDTH = isSmallDevice ? 350 : 400;
	const WINDOW_HEIGHT = isSmallDevice ? 550 : 500;

	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const borderWidth = 4;
	const bind = useDrag(({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }), {
		bounds: {
			left: bounds.left + (WINDOW_WIDTH / 2 + borderWidth),
			right: bounds.right - (WINDOW_WIDTH / 2 + borderWidth),
			top: bounds.top + (WINDOW_HEIGHT / 2 + borderWidth),
			bottom: bounds.bottom - (WINDOW_HEIGHT / 2 + borderWidth),
		},
	});

	useEffect(() => {
		const activePrefab = prefabs.find((prefab) => prefab.internalId === activePrefabId);
		if (!activePrefab) return;
		setPrefab(activePrefab);
	}, [activePrefabId]);

	return (
		<animated.div
			className={`w-[${WINDOW_WIDTH}px] h-[${WINDOW_HEIGHT}px] max-h-[${WINDOW_HEIGHT}px] rounded-sm absolute z-50 touch-none border-zinc-200  p-1 select-none menu-card-pattern`}
			style={{ x, y, borderWidth }}
		>
			{prefab ? (
				<div className="h-full w-full flex flex-col overflow-y-auto">
					<Common.Header className="rounded-none border-4 border-zinc-900 px-2 py-0 text-lg sticky top-0 z-30" {...bind()}>
						<div className="flex items-center justify-between">
							<span>{prefab.name}</span>
							<div className="flex items-center gap-x-1">
								<Button themeColor={themeColor} title="Collapse All">
									<EyeIcon className="w-full h-full p-1" />
								</Button>
							</div>
						</div>
					</Common.Header>
					<PrefabCreatorComponents.ActivePrefab prefab={prefab} themeColor={themeColor} />
				</div>
			) : (
				<div {...bind()} className="border-dashed border-2 w-full h-full text-white font-default flex flex-col items-center justify-center">
					<CubeTransparentIcon className="w-24 h-24 mb-4" />
					<span className="text-2xl font-bold mb-2">No active prefab</span>
					<span className="w-2/3 text-center">Please select a prefab from the panel on the left</span>
				</div>
			)}
		</animated.div>
	);
};

export default PrefabWindow;
