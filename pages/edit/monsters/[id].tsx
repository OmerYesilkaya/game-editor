import { useRouter } from "next/dist/client/router";

const EditMonster = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div>{id}</div>;
};

export default EditMonster;
