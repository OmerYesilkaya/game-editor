import { SetStateAction } from "react";
import { SearchCircleIcon } from "@heroicons/react/outline";

type SearchInputPropTypes = {
	query: string;
	setQuery: React.Dispatch<SetStateAction<string>>;
	placeholder: string;
	isLoading: boolean;
};

const SearchInput: React.FC<SearchInputPropTypes> = ({ query, setQuery, placeholder, isLoading }) => {
	return (
		<div className="relative flex items-center my-1">
			<input
				className=" px-1.5 w-full pr-5 border-2 rounded-md"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholder}
				maxLength={50}
			/>
			<div className="absolute right-2">{isLoading ? <div>...</div> : <SearchCircleIcon className="w-5 h-5" />}</div>
		</div>
	);
};

export default SearchInput;
