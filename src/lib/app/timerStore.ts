import { writable } from 'svelte/store';
import type { TimerStore } from './storeTypes';

export function timerStore() {
	const initObject: TimerStore = {
		stage: 'prep',
		secondary: 'none',
		iteration: { current: 0, total: 0 }
	};

	const timer = writable(initObject);

	return {
		set: timer.set,
		subscribe: timer.subscribe,
		startWork: timer.update((state) => {
			state.stage = 'work';
			state.secondary = 'none';
			return state;
		}),
		startRecap: timer.update((state) => {
			state.secondary = 'recap';
			return state;
		}),
		startBreak: timer.update((state) => {
			state.stage = 'work';
			state.secondary = 'none';
			return state;
		}),
		startWarmup: timer.update((state) => {
			state.secondary = 'warmup';
			return state;
		}),
		setIterations: (data: number) => {
			timer.update((state) => {
				state.iteration.total = data;
				return state;
			});
		},
		newCycle: timer.update((state) => {
			state.iteration.current += 1;
			return state;
		})
	};
}
