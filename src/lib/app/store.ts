import { writable } from 'svelte/store';
import type { MainStore, CustomSettings } from './storeTypes';

function flowcusStore() {
	const initObject: MainStore = {
		goal: { description: '', completed: false },
		status: {
			started: false,
			finished: false,
			currentWork: 0,
			accomplished: '',
			felt: ''
		},
		subTasks: [],
		timeSettings: {
			type: 'default',
			alternate: { alternating: false, every: 0, time: 0 },
			break: 0,
			extra: 0,
			prep: 0,
			recap: 0,
			warmup: 0,
			work: 0
		},
		timeRecord: []
	};
	const store = writable(initObject);

	return {
		set: store.set,
		subscribe: store.subscribe,

		/*
####################################################################
####################### TIMER INITIALIZATION #######################
####################################################################
*/
		setDefault: store.update((state) => {
			state.timeSettings.type = 'default';
			state.timeSettings.alternate = { alternating: true, every: 2, time: 1920 };
			state.timeSettings.break = 960;
			state.timeSettings.prep = 600;
			state.timeSettings.recap = 120;
			state.timeSettings.warmup = 240;
			state.timeSettings.work = 2640;

			return state;
		}),
		setPomodoro: store.update((state) => {
			state.timeSettings.type = 'pomodoro';
			state.timeSettings.alternate = { alternating: true, every: 4, time: 1200 };
			state.timeSettings.break = 300;
			state.timeSettings.prep = 600;
			state.timeSettings.recap = 120;
			state.timeSettings.warmup = 120;
			state.timeSettings.work = 1500;

			return state;
		}),
		setArcadian: store.update((state) => {
			state.timeSettings.type = 'default';
			state.timeSettings.break = 1200;
			state.timeSettings.prep = 600;
			state.timeSettings.recap = 120;
			state.timeSettings.warmup = 300;
			state.timeSettings.work = 4050;

			return state;
		}),
		setCustom: (data: CustomSettings) => {
			store.update((state) => {
				state.timeSettings.type = 'custom';
				state.timeSettings.alternate = data.alternate;
				state.timeSettings.break = data.break;
				state.timeSettings.prep = 600;
				state.timeSettings.recap = data.recap;
				state.timeSettings.warmup = data.warmup;
				state.timeSettings.work = data.work;

				return state;
			});
		},

		/*
####################################################################
########################### GOAL UPDATES ###########################
####################################################################
*/
		setGoal: (data: string) => {
			store.update((state) => {
				state.goal.description = data;
				return state;
			});
		},
		addSubTask: (data: string) => {
			store.update((state) => {
				const subTask = { task: data, completed: false };
				state.subTasks.push(subTask);
				return state;
			});
		},
		completeGoal: store.update((state) => {
			state.goal.completed = true;
			return state;
		}),
		toggleSubTask: (index: number) => {
			store.update((state) => {
				state.subTasks[index].completed = !state.subTasks[index].completed;
				return state;
			});
		},

		/*
####################################################################
########################### TIMER EVENTS ###########################
####################################################################
*/
		startFlow: store.update((state) => {
			state.status.started = true;
			return state;
		}),
		breakCycle: (data: { felt: string; accomplished: string; worked: number }) => {
			store.update((state) => {
				state.status.accomplished = data.accomplished;
				state.status.felt = data.felt;
				state.status.currentWork = data.worked;
				return state;
			});
		},
		endCycle: (data: number) => {
			store.update((state) => {
				const cycleRecord = {
					worked: state.status.currentWork,
					breaked: data,
					accomplished: state.status.accomplished,
					felt: state.status.felt
				};
				state.timeRecord.push(cycleRecord);
				return state;
			});
		}
	};
}

export const flowStore = flowcusStore();
