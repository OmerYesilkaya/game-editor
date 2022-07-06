import cn from "classnames";

import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import { useWindowBounds } from "hooks";
import { Common } from "components";

type Props = {
    title: string;
    noContent: React.ReactElement | null;
    width: number;
    height: number;
    isActive: boolean;
    order: number;
};

const FloatingWindow: React.FC<Props> = ({ title, noContent, width, height, isActive, order, children }) => {
    const bounds = useWindowBounds();
    // Navbar height
    height = height + 46;

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const borderWidth = 4;
    const bind = useDrag(({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }), {
        bounds: {
            left: bounds.left + (width / 2 + borderWidth),
            right: bounds.right - (width / 2 + borderWidth),
            top: bounds.top + (height / 2 + borderWidth) + 10, // 10 here is for top menu bar
            bottom: bounds.bottom - (height / 2 + borderWidth),
        },
    });

    return (
        <animated.div
            className={cn(
                `w-[${width}px] h-[${height}px] max-h-[${height}px] rounded-sm absolute bg-zinc-dark border-zinc-200 select-none menu-card-pattern transition-opacity z-[1${order}] overflow-hidden`,
                {
                    "pointer-events-none opacity-0": !isActive,
                }
            )}
            style={{ x, y, borderWidth }}
        >
            {children ? (
                <div className="h-full w-full flex flex-col overflow-y-auto">
                    <Common.Header className="rounded-none border-4 border-zinc-900 px-1.5 py-0 text-xl sticky top-0 touch-none z-[2]" {...bind()}>
                        <div className="flex items-center justify-between">{title}</div>
                    </Common.Header>
                    <div className={cn("w-full h-full flex flex-col overflow-y-auto")}>{children}</div>
                </div>
            ) : (
                <div
                    {...bind()}
                    className="border-dashed border-2 w-full h-full text-white font-default flex flex-col items-center justify-center  touch-none"
                >
                    {noContent}
                </div>
            )}
        </animated.div>
    );
};

export default FloatingWindow;
