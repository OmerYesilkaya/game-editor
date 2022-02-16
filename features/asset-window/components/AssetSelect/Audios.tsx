import { MicrophoneIcon } from "@heroicons/react/outline";

import { api } from "@core/hooks";
import { useSelectedInput } from "@prefab-editor/hooks";

const Audios: React.FC = () => {
	const { data: audios } = api.useGetAudios();
	const { updateInput } = useSelectedInput();

	if (!audios) return null;

	function handleSelect(id: number) {
		updateInput(id);
	}

	function handlePointerEnter(id: number) {
		console.log("audio hover");
	}

	function handlePointerOut() {
		console.log("audio hover out");
	}

	return (
		<div className="flex flex-col gap-y-px grow">
			{audios.length > 0 ? (
				audios.map((audio) => (
					<button
						type="button"
						key={audio.id}
						className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
						title={audio.name}
						onClick={() => handleSelect(audio.id)}
						onPointerEnter={() => handlePointerEnter(audio.id)}
						onPointerOut={() => handlePointerOut()}
					>
						{audio.name}
					</button>
				))
			) : (
				<div className="grow flex items-center justify-center flex-col gap-y-1">
					<h2 className="uppercase text-xl font-bold">No audio found</h2>
					<MicrophoneIcon className="w-12 h-12" />
				</div>
			)}
		</div>
	);
};

export default Audios;
