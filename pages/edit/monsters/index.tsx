import { NextPage } from "next";
import MOCK_DATA from "constants/MOCK_ASSETS";
import { createRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { ExclamationIcon, SearchIcon } from "@heroicons/react/outline";

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
					return monster.stats.some((stat) => stat.name === tag);
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
				<div className="card-primary">
					<div className="sub-header-primary">Tags</div>
					<div className="mt-1 card-secondary">
						<div className="relative w-min">
							<div className="absolute right-0 h-full p-1 w-max ">
								<SearchIcon className="w-full h-full" />
							</div>
							<input
								placeholder="Search for a tag..."
								onChange={(e) => setTagQuery(e.target.value)}
								className="px-1 rounded-sm text-md"
							/>
						</div>
						<hr className="my-1 bg-white" />
						<div className="flex flex-wrap gap-1">
							{filteredTags.length === 0 ? (
								<div className="flex text-gray-100 rounded-sm shadow-md">No tag found with given keyword</div>
							) : (
								filteredTags.map((tag, index) => (
									<div
										onClick={() => handleSelectTag(tagRefs.current[index])}
										className="p-1 py-0 bg-gray-100 rounded-sm shadow-md cursor-pointer"
										key={index}
									>
										<div className="flex items-center">
											<input
												ref={tagRefs.current[index]}
												type="checkbox"
												className="mr-1"
												value={tag}
												checked={selectedTags.includes(tag)}
											/>
											<p className="mt-0.5 text-sm font-semibold select-none">{tag.toUpperCase()}</p>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
				<div
					className="grid gap-1 p-1 mt-2 bg-gray-200 rounded-sm"
					style={{ gridTemplateColumns: `150px ${selectedTags.length === 0 ? "" : `repeat(${selectedTags.length}, 1fr)`}` }}
				>
					{filteredMonsters.length === 0 ? (
						<div className={`flex items-center col-span-${selectedTags.length < 1 ? 2 : "full"} grid-cell`}>
							<ExclamationIcon width={20} height={20} className="mr-1" />
							<p className="mb-0.5">
								{selectedTags.length === 0 ? "Please select atleast one tag." : "Could not find any monsters with given tags."}
							</p>
						</div>
					) : (
						<>
							<div className="col-start-1 row-start-1" />
							{selectedTags.map((tag, index) => (
								<div key={`tag-${index}`} className="row-start-1 grid-cell">
									{tag.toUpperCase()}
								</div>
							))}
							{filteredMonsters.map((monster) => {
								return (
									<>
										<div key={monster.id} className="col-start-1 grid-cell">
											{monster.name.toUpperCase()}
										</div>
										{selectedTags.map((tag, index) => (
											<input
												type="number"
												key={`input-${index}`}
												className="w-full px-1 font-black rounded-sm font-input"
												style={{ lineHeight: "0" }}
												placeholder={tag}
												defaultValue={monster.stats.find((stat) => stat.name.toUpperCase() === tag.toUpperCase())?.value}
											/>
										))}
									</>
								);
							})}
						</>
					)}
				</div>
			</div>
			<div className="w-1/2 text-white card-secondary">second screen</div>
		</div>
	);
};

export default EditMonsters;
