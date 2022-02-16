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
        <div className="relative flex w-full items-center text-white mt-1">
            <input
                className="px-1 w-full pr-5 rounded-sm h-6 text-sm font-default font-bold focus:outline-none bg-zinc-800 border border-zinc-300"
                value={query.toUpperCase()}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder.toUpperCase()}
                maxLength={50}
            />
            <div className="absolute right-1">{isLoading ? <div>...</div> : <SearchCircleIcon className="w-5 h-5" />}</div>
        </div>
    );
};

export default SearchInput;
