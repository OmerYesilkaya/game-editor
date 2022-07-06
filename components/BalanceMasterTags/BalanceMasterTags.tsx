import { Dispatch, MutableRefObject, SetStateAction } from "react";

import { SearchIcon } from "@heroicons/react/outline";

type TagsPropTypes = {
    filteredTags: string[];
    setTagQuery: Dispatch<SetStateAction<string>>;
    selectedTags: string[];
    handleSelectTag: (ref: MutableRefObject<HTMLInputElement>) => void;
    tagRefs: MutableRefObject<never[]>;
};

const Tags: React.FC<TagsPropTypes> = ({ filteredTags, setTagQuery, selectedTags, handleSelectTag, tagRefs }) => {
    return (
        <div className="card-primary">
            <div className="sub-header-primary">Tags</div>
            <div className="mt-1 card-secondary">
                <div className="relative w-min">
                    <div className="absolute right-0 h-full p-1 w-max ">
                        <SearchIcon className="w-full h-full" />
                    </div>
                    <input placeholder="Search for a tag..." onChange={(e) => setTagQuery(e.target.value)} className="px-1 rounded-sm text-md" />
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
                                        defaultChecked={selectedTags.includes(tag)}
                                    />
                                    <p className="mt-0.5 text-sm font-semibold select-none">{tag.toUpperCase()}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tags;
