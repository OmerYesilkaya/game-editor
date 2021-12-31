import { NextPage } from "next";
import MOCK_DATA from "constants/MOCK_ASSETS";
import { createRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { Monsters } from "@app/components";

const allTags = ["Health", "Shield", "Armor", "JumpSpeed", "JumpDistance", "DamageOverTime"];

const EditMonsters: NextPage = () => {
	const tagRefs = useRef([]);
	const [selectedTags, setSelectedTags] = useState(new Array<string>());
	const [filteredTags, setFilteredTags] = useState(allTags);
	const [filteredMonsters, setFilteredMonsters] = useState(MOCK_DATA.MONSTERS);
	const [tagQuery, setTagQuery] = useState<string>("");

	function handleSelectTag(ref: MutableRefObject<HTMLInputElement>) {
		if (!ref.current) return;
		const value = ref.current.value;
		setSelectedTags((prev) => {
			if (prev.includes(value)) return prev.filter((x) => x !== value);
			return [...prev, value];
		});
	}

	useEffect(() => {
		setFilteredTags(allTags.filter((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase())));
	}, [tagQuery]);

	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredMonsters([]);
			return;
		}
		setFilteredMonsters(
			MOCK_DATA.MONSTERS.filter((monster) => {
				const truthMap = selectedTags.map((tag) => {
					return monster.stats.some((stat: any) => stat.name === tag);
				});

				return truthMap.filter(Boolean).length === selectedTags.length;
			})
		);
	}, [selectedTags]);

	useEffect(() => {
		tagRefs.current = filteredTags.map((_, i) => tagRefs.current[i] ?? createRef());
	}, [filteredTags]);

	return (
		<div className="flex w-full gap-2 p-2">
			<div className="flex flex-col w-1/2">
				<Monsters.Edit.Tags
					filteredTags={filteredTags}
					handleSelectTag={handleSelectTag}
					selectedTags={selectedTags}
					setTagQuery={setTagQuery}
					tagRefs={tagRefs}
				/>
				<Monsters.Edit.StatGrid selectedTags={selectedTags} filteredMonsters={filteredMonsters} />
			</div>
			<div className="w-1/2 text-white card-secondary">second screen</div>
		</div>
	);
};

export default EditMonsters;
