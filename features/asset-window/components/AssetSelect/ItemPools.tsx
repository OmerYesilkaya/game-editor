import { api } from "@core/hooks";
import { useSelectedInput } from "@prefab-editor/hooks";

const ItemPools: React.FC = () => {
	const { data: itemPools } = api.useGetItemPools();
	const { updateInput } = useSelectedInput();

	if (!itemPools) return null;

	function handleSelect(id: number) {
		updateInput(id);
	}

	return (
		<div className="flex flex-col gap-y-px">
			{itemPools.length > 0
				? itemPools.map((itemPool) => (
						<button
							type="button"
							key={itemPool.id}
							className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
							title={itemPool.name}
							onClick={() => handleSelect(itemPool.id)}
						>
							{itemPool.name}
						</button>
				  ))
				: "No item pools found"}
		</div>
	);
};

export default ItemPools;
