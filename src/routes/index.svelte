<script lang="ts">
	import { onMount } from 'svelte';
	import TimeWorker from '$lib/worker/time-worker?worker';
	// import StartScreen from 'src/lib/components/startScreen.svelte';
	let timer: Worker;

	onMount(async () => {
		timer = new TimeWorker();
		timer.onmessage = (e) => {
			timerCount = +e.data;
		};
	});

	let timerCount: number = 0;

	$: dispTimer = Math.floor(timerCount / 1000);
	$: dispHours = Math.floor(dispTimer / 3600);
	$: dispMinutes = Math.floor((dispTimer - dispHours * 3600) / 60);
	$: dispSeconds = dispTimer - dispHours * 3600 - dispMinutes * 60;

	const startTimer = () => {
		timer.postMessage({ action: 'start', value: 22, current: 12000 });
	};
	const stopTimer = () => {
		timer.postMessage({ action: 'stop', value: 0, current: 0 });
	};
</script>

<svelte:head>Flowcus - Time Management</svelte:head>
<p>{('0' + dispHours).slice(-2)}:{('0' + dispMinutes).slice(-2)}:{('0' + dispSeconds).slice(-2)}</p>
<button on:click={startTimer}>Start</button>
<button on:click={stopTimer}>Stop</button>
