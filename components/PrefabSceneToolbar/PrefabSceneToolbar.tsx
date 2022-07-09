import { useState } from "react";

import cn from "classnames";

import { CursorClickIcon, HandIcon } from "@heroicons/react/solid";
import { BiReset, BiScreenshot, BiShapeCircle, BiShapeSquare, BiShapeTriangle } from "react-icons/bi";

import { usePrefabEditorStore } from "@app/store";
import { EditorMode } from "@app/types";

const Button: React.FC<any> = ({ name, icon, onClick, isActive }) => {
    return (
        <button
            disabled={isActive}
            className={cn("w-7 h-7 rounded-sm p-0.5 text-white transition-all border flex items-center justify-center", {
                "bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500 border-zinc-700": !isActive,
                "bg-zinc-900 border-zinc-400": isActive,
            })}
            onClick={onClick}
            title={name}
        >
            {icon}
        </button>
    );
};

const Toolbar: React.FC = () => {
    const setEditorMode = usePrefabEditorStore((state) => state.setEditorMode);
    const [activeButtonId, setActiveButtonId] = useState("");
    function onButtonClick(id: string, mode: EditorMode) {
        setEditorMode(mode);
        setActiveButtonId(id);
    }

    const buttons = [
        { id: "button-1", name: "Default", icon: <CursorClickIcon />, onClick: () => onButtonClick("button-1", EditorMode.Default) },
        { id: "button-2", name: "Move", icon: <HandIcon />, onClick: () => onButtonClick("button-2", EditorMode.Drag) },
        {
            id: "button-3",
            name: "Square Collision",
            icon: <BiShapeSquare className="w-full h-full" />,
            onClick: () => onButtonClick("button-3", EditorMode.RectCollider),
        },
        {
            id: "button-4",
            name: "Square Collision",
            icon: <BiReset className="w-full h-full" />,
            onClick: () => onButtonClick("button-4", EditorMode.Rotate),
        },
        {
            id: "button-5",
            name: "Square Collision",
            icon: <BiScreenshot className="w-full h-full" />,
            onClick: () => onButtonClick("button-5", EditorMode.Scale),
        },
        {
            id: "button-6",
            name: "Circle Collision",
            icon: <BiShapeCircle className="w-full h-full" />,
            onClick: () => onButtonClick("button-6", EditorMode.CircleCollider),
        },
        {
            id: "button-7",
            name: "Triangle Collision",
            icon: <BiShapeTriangle className="w-full h-full" />,
            onClick: () => onButtonClick("button-7", EditorMode.TriangleCollider),
        },
    ];

    return (
        <div className="absolute top-1 right-1 bg-zinc-800 rounded-sm shadow-md p-1 flex flex-col gap-y-1 z-10">
            {buttons.map((button) => (
                <Button key={button.id} {...button} isActive={activeButtonId === button.id} />
            ))}
        </div>
    );
};

export default Toolbar;
