type User = {
	id: string;
	name: string;
	email?: string;
	posts?: number;
	comments?: number;
	votes?: number;
};

export type { User };
