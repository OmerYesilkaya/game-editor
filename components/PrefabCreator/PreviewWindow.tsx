import { Common } from "@app/components";

import DummyTexture from "public/assets/images/Player.png";

const PreviewWindow: React.FC = () => {
	return (
		<div className="w-96 h-60 rounded-sm border-4 bg-zinc-800 absolute top-4 right-4 z-50 overflow-hidden">
			<Common.AnimationPlayer texture={DummyTexture} width={340} height={232} />
		</div>
	);
};

export default PreviewWindow;
