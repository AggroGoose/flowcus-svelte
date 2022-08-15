let myTimer: ReturnType<typeof setInterval>;

self.onmessage = function (e) {
	const { action, limit, current } = e.data;
	if (action === 'stop') {
		clearInterval(myTimer);
		return;
	}

	if (action === 'start') {
		clearInterval(myTimer);
		let i = current;
		let start = performance.now() - current;

		myTimer = setInterval(function () {
			i = performance.now() - start;
			postMessage(i);

			if (Math.floor(i / 1000) >= limit) {
				clearInterval(myTimer);
			}
		}, 1000);
	}
};

export {};
