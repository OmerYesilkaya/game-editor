export type Stat = {
	name: string;
	value: number;
};

export type MonsterType = {
	id: string;
	stats: Stat[];
	name: string;
};
