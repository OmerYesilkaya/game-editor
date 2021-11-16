import { useRouter } from "next/dist/client/router";

const ViewMonster = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div>{id}</div>;
};

export default ViewMonster;
