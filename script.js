/*
 * Clock App
 * Author: Richard Coucoules
 * Adapted from exercise written by Morten Rand-Hendriksen
 * November 1, 2019
 *
 * Clock app that mimics functionality of phone apps. Includes digital/analog
 *   clock, timer, and stopwatch.
 *
 * Notes: The clocks on the rendered page increment manually/programmatically
 *    and are, therefore, prone to desync from the actual time if they run for
 *    extended periods. This manual incrementation of the clock primarily
 *    prevents graphical errors in the analog clock and secondarily prevents
 *    desyncing errors between the analog and digital clocks.
*/


// --------------------- Clock logic --------------------- //
	const HOURHAND = document.querySelector("#hour");
	const MINUTEHAND = document.querySelector("#minute");
	const SECONDHAND = document.querySelector("#second");
	const DIGITALCLOCK = document.querySelector("#digital-clock");

	//Digital clock functions
	function Time(hour, min, sec, am) {
		// Defines and constructs Time class, used in displaying the digital clock.
		// Contains hour, minute, second as integers and a boolean, am, to indicate day/night.
		this.hour = hour;
		this.min = min;
		this.sec = sec;
		this.am = am;
	}

	function initTime() {
		// Instantiates a Time object with attributes assigned according to the user's current time.
		var now = new Date();
		var hour = now.getHours() % 12;
		hour = (hour == 0) ? 12 : hour;
		var min = now.getMinutes();
		var sec = now.getSeconds();
		var ampm = (Math.floor(now.getHours() / 12) == 0);
		return new Time(hour, min, sec, ampm);
	}

	function updateTime(timeobj) {
		// Manually increments an input Time object by one second.
		// Using this function keeps the analog and digital clocks in sync.
		if (timeobj.sec == 59) {
			timeobj.sec = 0;
			if (timeobj.min == 59) {
				timeobj.min = 0;
				if (timeobj.hour == 12) {
					timeobj.hour = 1;
				}
				else if (timeobj.hour == 11) {
					timeobj.am = !timeobj.am;
					timeobj.hour += 1;
				}
				else { // if timeobj.hour != 11 or 12
					timeobj.hour += 1;
				}
			}
			else{ // if timeobj.min != 59
				timeobj.min += 1;
			}
		}
		else { // if timeobj.sec != 59
			timeobj.sec += 1;
		}
	}

	function writeTimeStr(timeobj, clockelement) {
		// Writes the formatted contents of the Time object timeobj into the element clockelement.
		outstr = (timeobj.hour < 10) ? "0" + timeobj.hour + ":": timeobj.hour + ":";
		outstr += (timeobj.min < 10) ? "0" + timeobj.min + ":" : timeobj.min + ":";
		outstr += (timeobj.sec < 10) ? "0" + timeobj.sec : timeobj.sec;
		outstr += timeobj.am ? " AM" : " PM";
		clockelement.innerHTML = outstr;
	}
	// End digital clock functions

	// Analog clock functions
	function initAngles() {
		// Calculates the appropriate angles for the hour, minute, and second hands in degrees.
		// Outputs the degree values as an array in the [h, m, s] format.
		var now = new Date();
		var hourangle = ((now.getHours() % 12) + (now.getMinutes() / 60) + (now.getSeconds() / 3600)) * (360 / 12);
		var minangle = (now.getMinutes() + (now.getSeconds() / 60)) * 360 / 60;
		var secangle = now.getSeconds() * 360 / 60;
		return [hourangle, minangle, secangle];
	}


	function updateAngleArray(hmsanglearray) {
		// Manually increments the angles in hmsanglearray by the number of degrees corresponding to one second.
		// Fixes the issue where, if the angle values are tied to the time values in a Date object, the hands
		//   reset to 12 o'clock by spinning counterclockwise around the entire face of the clock.
		hmsanglearray[0] += 360 * (1/12) * (1/3600);
		hmsanglearray[1] += 360 * (1/60) * (1/60);
		hmsanglearray[2] += 360 * (1/60);
		return hmsanglearray;
	}

	function setAngle(hourhand, minhand, sechand, hmsanglearray) {
		// Applies the appropriatee transforms to the html elements containing hourhand, minutehand, and sechand.
		// For some reason, hourhand.style.transform = ... doesn't work.
		hourhand.setAttribute("style", ("transform: rotate(" + hmsanglearray[0] + "deg);"));
		minhand.setAttribute("style", ("transform: rotate(" + hmsanglearray[1] + "deg);"));
		sechand.setAttribute("style", ("transform: rotate(" + hmsanglearray[2] + "deg);"));
	}
	// End analog clock functions

	function updateClockPage(timeobj, hmsarray) {
		// Performs all subroutines to update clock values in memory and on page.
		updateAngleArray(hmsarray);
		updateTime(timeobj);
		setAngle(HOURHAND, MINUTEHAND, SECONDHAND, hmsarray);
		writeTimeStr(timeobj, DIGITALCLOCK);
	}
// ------------------- End clock logic ------------------- //




// ------------------- Stopwatch logic ------------------- //

	const STOPWATCHELEMENT = document.querySelector("#stopwatch")
	var stopwatch = [0, 0, 0, 0];
	var interval;

	// Add leading zero to numbers 9 or below (purely for aesthetics):
	function leadingZero(time) {
		if (time <= 9 && String(time).length < 2) {
			time = "0" + time;
		}
		if (time == 0) {
			time = "00";
		}
		return time;
	}

	// Run a standard minute/second/hundredths timer:
	function runStopwatch(stopwatchArray, stopwatchElement) {
		stopwatchArray[3]++;
		stopwatchArray[0] = Math.floor(stopwatchArray[3] / 6000);
		stopwatchArray[1] = Math.floor((stopwatchArray[3] / 100) - (stopwatchArray[0] * 60));
		stopwatchArray[2] = stopwatchArray[3] % 100;
		let stopwatchReading = leadingZero(stopwatchArray[0]) + ":" + leadingZero(stopwatchArray[1]) + "." + leadingZero(stopwatchArray[2]);
		stopwatchElement.innerHTML = stopwatchReading;
	}

	// Start the timer:
	function startStopwatch() {
			interval = setInterval(() => { runStopwatch(stopwatch, STOPWATCHELEMENT) }, 10);
	}

	function stopStopwatch() {
			clearInterval(interval);
	}

	// Reset everything:
	function resetStopwatch() {
		stopwatch = [0, 0, 0, 0];
		clearInterval(interval);
		interval = null;
		STOPWATCHELEMENT.innerHTML = "00:00.00";
	}

// ----------------- End stopwatch logic ----------------- //





// --------------------- Timer logic --------------------- //

	const TIMERHOURS = document.querySelector("#timer-h");
	const TIMERMINS = document.querySelector("#timer-m");
	const TIMERSECS = document.querySelector("#timer-s");

	function Timer(hour, min, sec) {
		this.hour = hour;
		this.min = min;
		this.sec = sec;
		this.interval = null;
	}

	function runTimer(timerIn) {
		if (timerIn.sec == 0) {
			if (timerIn.min == 0) {
				if (timerIn.hour == 0){
					stopTimer(timerIn);
					alert("Time's up!");
					resetTimer(timerIn);
					changeVisibility(TIMERSTARTBUTTON, TIMERSTOPBUTTON);
				}
				else { // if timer.hour != 0
					timerIn.hour -= 1;
					timerIn.min = 59;
					timerIn.sec = 59;
				}
			}
			else { // if timer.min != 0
				timerIn.min -= 1;
				timerIn.sec = 59;
			}
		}
		else { // if timer.sec != 0
			timerIn.sec -= 1;
		}

		TIMERHOURS.value = leadingZero(timerIn.hour);
		TIMERMINS.value = leadingZero(timerIn.min);
		TIMERSECS.value = leadingZero(timerIn.sec);
	}

	function startTimer(timerIn) {
		TIMERHOURS.setAttribute("disabled", "true");
		TIMERMINS.setAttribute("disabled", "true");
		TIMERSECS.setAttribute("disabled", "true");
		return setInterval(() => {runTimer(timerIn)}, 1000);
	}

	function stopTimer(timerIn) {
		clearInterval(timerIn.interval);
	}

	function resetTimer(timerIn) {
		clearInterval(timerIn.interval);
		timerIn.inteerval = null;
		TIMERHOURS.removeAttribute("disabled");
		TIMERHOURS.value = null;
		TIMERMINS.removeAttribute("disabled");
		TIMERMINS.value = null;
		TIMERSECS.removeAttribute("disabled");
		TIMERSECS.value = null;
	}

	function initTimer() {
		var timer = new Timer(TIMERHOURS.value, TIMERMINS.value, TIMERSECS.value);
		timer.interval = startTimer(timer);
		return timer;
	}


// ------------------- End timer logic ------------------- //






// --------------------- Link logic --------------------- //
	function changeVisibility(elementToUnhide, elementToHide) {
		if (Array.isArray(elementToUnhide)) {
			for (i = 0; i < elementToUnhide.length; i++) {
				elementToUnhide[i].classList.remove("hidden");
			}
		}
		else {
			elementToUnhide.classList.remove("hidden");
		}

		if (Array.isArray(elementToHide)) {
			for (i = 0; i < elementToHide.length; i++) {
				elementToHide[i].classList.add("hidden");
			}
		}
		else {
			elementToHide.classList.add("hidden");
		}
	}

	function selectLink(elementToSelect, elementArrayToDeselect) {
		elementToSelect.classList.add("selected");
		for (i = 0; i < elementArrayToDeselect.length; i++){
			elementArrayToDeselect[i].classList.remove("selected");
		}
	}
// ------------------- End link logic ------------------- //






// --------------------- Main program --------------------- //
	function runClock() {
		let time = initTime();
		let angles = initAngles();
		return setInterval(updateClockPage, 1000, time, angles);
	}

	let clock = runClock();
	let timer;

	const CLOCKLINK = document.querySelector("#clock-link");
	const STOPWATCHLINK = document.querySelector("#stopwatch-link");
	const TIMERLINK = document.querySelector("#timer-link");
	const CLOCKBOX = document.querySelector(".clock-box");
	const STOPWATCHBOX = document.querySelector(".stopwatch-box");
	const TIMERBOX = document.querySelector(".timer-box");

	const STOPWATCHSTARTBUTTON = document.querySelector("#stopwatch-start");
	const STOPWATCHSTOPBUTTON = document.querySelector("#stopwatch-stop");
	const STOPWATCHRESUMEBUTTON = document.querySelector("#stopwatch-resume");
	const STOPWATCHRESETBUTTON = document.querySelector("#stopwatch-reset");
	// const STOPWATCHLAPBUTTON = document.querySelector("#stopwatch-lap");

	const TIMERSTARTBUTTON = document.querySelector("#timer-start");
	const TIMERSTOPBUTTON = document.querySelector("#timer-stop");
	const TIMERCANCELBUTTON = document.querySelector("#timer-cancel");

	CLOCKLINK.addEventListener("click", () => {
		changeVisibility(CLOCKBOX, [STOPWATCHBOX, TIMERBOX]);
		selectLink(CLOCKLINK, [STOPWATCHLINK, TIMERLINK]);
		clearInterval(clock);
		clock = null;
		clock = runClock();
	} );

	STOPWATCHLINK.addEventListener("click", () => {
		changeVisibility(STOPWATCHBOX, [CLOCKBOX, TIMERBOX]);
		selectLink(STOPWATCHLINK, [CLOCKLINK, TIMERLINK]);
	} );

	TIMERLINK.addEventListener("click", () => {
		changeVisibility(TIMERBOX, [CLOCKBOX, STOPWATCHBOX]);
		selectLink(TIMERLINK, [STOPWATCHLINK, CLOCKLINK]);
	} );

	STOPWATCHSTARTBUTTON.addEventListener("click", () => {
		changeVisibility(STOPWATCHSTOPBUTTON, STOPWATCHSTARTBUTTON);
		startStopwatch();
	} );

	STOPWATCHSTOPBUTTON.addEventListener("click", () => {
		changeVisibility([STOPWATCHRESUMEBUTTON, STOPWATCHRESETBUTTON], STOPWATCHSTOPBUTTON);
		stopStopwatch();
	} );

	STOPWATCHRESUMEBUTTON.addEventListener("click", () => {
		changeVisibility(STOPWATCHSTOPBUTTON, [STOPWATCHRESUMEBUTTON, STOPWATCHRESETBUTTON]);
		startStopwatch();
	} );

	STOPWATCHRESETBUTTON.addEventListener("click", () => {
		changeVisibility(STOPWATCHSTARTBUTTON, [STOPWATCHRESUMEBUTTON, STOPWATCHRESETBUTTON]);
		resetStopwatch();
	} );

	TIMERSTARTBUTTON.addEventListener("click", () => {
		changeVisibility(TIMERSTOPBUTTON, TIMERSTARTBUTTON);
		timer = initTimer();
	} );

	TIMERSTOPBUTTON.addEventListener("click", () => {
		changeVisibility(TIMERSTARTBUTTON, TIMERSTOPBUTTON);
		stopTimer(timer);
	} );

	TIMERCANCELBUTTON.addEventListener("click", () => {
		changeVisibility(TIMERSTARTBUTTON, TIMERSTOPBUTTON);
		resetTimer(timer);
	} );