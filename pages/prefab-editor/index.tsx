import { NextPage } from "next";
import Link from "next/link";

import { Common, PrefabEditor } from "components";

const Welcome: NextPage = () => {
    return (
        <Common.Center className="relative w-full h-full flex gap-1 bg-zinc-dark">
            <div className="w-1/2 h-2/3 flex flex-col items-center">
                <h2 className="font-default font-bold text-3xl text-zinc-100 mb-3">Welcome to Prefab Editor</h2>
                <div className="w-full h-px my-4 bg-zinc-900 shadow-md" />
                <h4 className="text-zinc-500 my-3 font-default font-light text-sm">EDIT AN EXISTING PREFAB</h4>
                <div className="w-full h-full bg-zinc-800 shadow-lg rounded-sm bg-opacity-20">
                    <PrefabEditor.Prefabs />
                </div>
                <h4 className="text-zinc-600 my-3 font-default font-light text-sm">OR</h4>
                <Link href="prefab-editor/new">
                    <button className="px-5 py-3.5 rounded-sm shadow-lg bg-emerald-600 text-white font-default font-semibold text-sm transition hover:bg-emerald-700 border border-emerald-900 hover:border-emerald-400 active:bg-emerald-800 active:border-emerald-900 active:text-emerald-500">
                        CREATE A NEW ONE
                    </button>
                </Link>
            </div>
        </Common.Center>
    );
};

export default Welcome;
