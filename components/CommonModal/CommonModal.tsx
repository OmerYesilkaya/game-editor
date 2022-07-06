import { Dialog } from "@headlessui/react";
import React from "react";

type Props = { isOpen: boolean; setIsOpen: (value: boolean) => void; title: string; icon: JSX.Element };

const Modal: React.FC<Props> = ({ title, icon, isOpen, setIsOpen, children }) => {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[999]">
            <div className="relative flex flex-col justify-center items-center w-1/2 h-1/2 bg-zinc-900 border-2 border-zinc-100 rounded-md z-20 overflow-hidden">
                <div className="w-full menu-card-pattern text-zinc-100 font-bold font-default text-xl px-2 py-1 shadow-md flex items-center">
                    <div className="mr-1">{icon}</div>
                    {title}
                </div>
                {children}
            </div>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-90 z-10" />
        </Dialog>
    );
};

export default Modal;
