import { SetStateAction, useEffect, useRef } from "react";

type EditableTextPropTypes = {
    value: string;
    onChange: (value: string) => void;
    handleNameBlur: () => void;
    placeholder: string;
    isEditable: boolean;
    setIsEditable: React.Dispatch<SetStateAction<boolean>>;
};

const EditableText: React.FC<EditableTextPropTypes> = ({ value, placeholder, onChange, handleNameBlur, isEditable, setIsEditable }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleEnter(e: KeyboardEvent) {
            if (!inputRef.current) return;
            if (inputRef.current === document.activeElement && e.key === "Enter") {
                inputRef.current.blur();
            }
        }
        window.addEventListener("keydown", handleEnter);
        return () => window.removeEventListener("keydown", handleEnter);
    }, []);

    return (
        <div className="flex w-full items-center justify-between pr-0.5 mr-1 rounded-sm">
            {isEditable ? (
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                    spellCheck={false}
                    onBlur={() => {
                        setIsEditable(false);
                        handleNameBlur();
                    }}
                    className="font-black text-lg text-white bg-zinc-900 bg-opacity-40 h-7 w-full capitalize pl-1"
                    placeholder={placeholder}
                />
            ) : (
                <span className="font-black text-lg text-white capitalize w-full pl-1" onClick={() => setIsEditable(true)}>
                    {value ?? placeholder}
                </span>
            )}
        </div>
    );
};

export default EditableText;
