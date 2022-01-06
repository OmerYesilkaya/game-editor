import cn from "classnames";

import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import { useWindowBounds } from "@app/hooks";
import Common from "components/Common";

type Props = {
	title: string;
	noContent: React.ReactElement;
	width: number;
	height: number;
	isActive: boolean;
};

const Window: React.FC<Props> = ({ title, noContent, width, height, isActive, children }) => {
	const bounds = useWindowBounds();

	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const borderWidth = 4;
	const bind = useDrag(({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }), {
		bounds: {
			left: bounds.left + (width / 2 + borderWidth),
			right: bounds.right - (width / 2 + borderWidth),
			top: bounds.top + (height / 2 + borderWidth),
			bottom: bounds.bottom - (height / 2 + borderWidth),
		},
	});

	return (
		<animated.div
			className={cn(
				`w-[${width}px] h-[${height}px] max-h-[${height}px] rounded-sm absolute z-50 touch-none border-zinc-200 select-none menu-card-pattern transition-opacity`,
				{
					"pointer-events-none opacity-0": !isActive,
				}
			)}
			style={{ x, y, borderWidth }}
		>
			{children ? (
				<div className="h-full w-full flex flex-col overflow-y-auto">
					<Common.Header className="rounded-none border-4 border-zinc-900 px-2 py-0 text-lg" {...bind()}>
						<div className="flex items-center justify-between">
							<span>{title}</span>
						</div>
					</Common.Header>
					<div className="w-full h-full flex flex-col overflow-y-auto pb-1 px-1">{children}</div>
				</div>
			) : (
				<div {...bind()} className="border-dashed border-2 w-full h-full text-white font-default flex flex-col items-center justify-center">
					{noContent}
				</div>
			)}
		</animated.div>
	);
};

export default Window;
