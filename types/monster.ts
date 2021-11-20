export type Stat = {
	[key: string]: number;
};

export type MonsterType = {
	id: string;
	stats: Stat[];
	name: string;
};
