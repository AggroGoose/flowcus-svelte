export type CustomSettings = {
	alternate: { alternating: boolean; every: number; time: number };
	break: number;
	extra: number;
	recap: number;
	warmup: number;
	work: number;
};

export type MainStore = {
	goal: {
		description: string;
		completed: boolean;
	};
	status: {
		started: boolean;
		finished: boolean;
		currentWork: number;
		felt: string;
		accomplished: string;
	};
	subTasks: {
		task: string;
		completed: boolean;
	}[];
	timeSettings: {
		type: 'default' | 'pomodoro' | 'arcadian' | 'custom';
		alternate: { alternating: boolean; every: number; time: number };
		break: number;
		extra: number;
		prep: number;
		recap: number;
		warmup: number;
		work: number;
	};
	timeRecord: {
		worked: number;
		breaked: number;
		felt: string;
		accomplished: string;
	}[];
};

export type TimerStore = {
	stage: 'break' | 'prep' | 'work';
	secondary: 'extra' | 'none' | 'recap' | 'warmup';
	iteration: {
		current: number;
		total: number;
	};
};
