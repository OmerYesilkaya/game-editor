import type { NextPage } from "next";

import { AdjustmentsIcon, CubeTransparentIcon } from "@heroicons/react/outline";

import { Common } from "components";

const Home: NextPage = () => {
    return (
        <Common.Center className="w-full h-full flex-col gap-4 text-white">
            <Common.Center className="w-full h-full">
                <div className="flex gap-x-2">
                    <Common.MenuItem
                        title="Balance Master"
                        icon={<AdjustmentsIcon className="w-full h-full text-zinc-200" />}
                        url="/balance-master"
                    />
                    <Common.MenuItem
                        title="Prefab Creator"
                        icon={<CubeTransparentIcon className="w-full h-full text-zinc-200" />}
                        url="/prefab-editor"
                    />
                </div>
            </Common.Center>
        </Common.Center>
    );
};

export default Home;
