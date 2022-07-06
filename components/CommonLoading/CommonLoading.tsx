import { animated, useTransition, config } from "@react-spring/web";
import { SetStateAction } from "react";

type Props = {
    show: boolean;
    setShow: React.Dispatch<SetStateAction<boolean>>;
};

const Loading: React.FC<Props> = ({ show, setShow }) => {
    const transitions = useTransition(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.gentle,
        onRest: () => setShow(false),
    });

    return transitions(
        (styles, item) =>
            item && (
                <animated.div
                    className="w-full h-full absolute left-0 top-0 bg-zinc-200 flex items-center justify-center font-black text-black font-default text-lg"
                    style={styles}
                >
                    LOADING...
                </animated.div>
            )
    );
};

export default Loading;
