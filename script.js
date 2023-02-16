var date = new Date();
var seconds = date.getSeconds();
var minutes = date.getMinutes();
var hours = date.getHours();
var clock = setInterval(displayTime, 1000);
var time = (document.getElementById("timeDisplay"));
var secondsD = (document.getElementById("seconds"));
var type1 = (document.getElementById("Time"));
var type2 = (document.getElementById("Timer"));
var type3 = (document.getElementById("Stopwatch"));
var timerPage = (document.getElementById("timerWrap"));
var stopwatchWrap = (document.getElementById("stopwatchWrap"));
var timerSD = (document.getElementById("timeSeconds"));
var timer;
var timerSeconds = 0;
var timerSeconds2 = 0;
var timerMinutes = 0;
var timerMinutes2 = 0;
var timerHours = 0;
var timerHours2 = 0;
var timerType;

console.clear();

function displayTime() {
	date = new Date();
	seconds = date.getSeconds();
	minutes = date.getMinutes();
	hours = date.getHours();
	if (minutes < 10) {
		minutes = ("0" + minutes);
	}
	if (hours >= 13) {
		hours = (hours - 12);
	}
	if (seconds < 10) {
		seconds = ("0" + seconds);
	}
	time.innerHTML = hours + ":" + minutes;
	secondsD.innerHTML = seconds;
}

function showTime() {
		time.style.display = "inline";
		secondsD.style.display = "inline";
		timerPage.style.display = "none";
		stopwatchWrap.style.display = "none";
		timerSD.style.display = "none";
		type1.style.backgroundColor = "";
		type2.style.backgroundColor = "";
		type3.style.backgroundColor = "";
		console.log("Time is displayed");
}
function showTimer() {
		time.style.display = "none";
		secondsD.style.display = "none";
		stopwatchWrap.style.display = "none";
		timerSD.style.display = "inline";
		timerPage.style.display = "inline";
		type1.style.backgroundColor = "#c7c7c7";
		type2.style.backgroundColor = "grey";
		type3.style.backgroundColor = "#c7c7c7";
		console.log("Timer is displayed");
		timerType = 1;
}
function showStopwatch() {
		time.style.display = "none";
		secondsD.style.display = "none";
		timerPage.style.display = "none";
		stopwatchWrap.style.display = "inline";
		timerSD.style.display = "inline";
		type1.style.backgroundColor = "#c7c7c7";
		type2.style.backgroundColor = "#c7c7c7";
		type3.style.backgroundColor = "grey";
		console.log("Stopwatch is displayed");
		timerType = 2;
}

function stop() {
	clearInterval(timer);
	console.log("Stopped timers");
}
function reset() {
	timerSeconds = 0;
	clearInterval(timer);
	timerSD.innerHTML = "00";
	console.log("Reset Timers");
}
function start() {
	if (timerType === 1) {
		timer = setInterval(goTimer, 1000);
	} else {
		timer = setInterval(goStopwatch, 1000);
	}
}

function goTimer() {
	// timerSeconds += 1;
	// timerSD.innerHTML = timerSeconds;
}

function goStopwatch() {
	timerSeconds += 1;
	console.log("Seconds: "+timerSeconds);
	if (timerSeconds < 10) {
		timerSeconds2 = ("0" + timerSeconds);
		timerSD.innerHTML = timerSeconds2;
	} else {
		timerSD.innerHTML = timerSeconds;
	}
	if (timerSeconds === 59) {
		timerSeconds = 0;
		timerMinutes += 1;
	}
	if (timerMinutes === 60) {
		timerMinutes = 0;
		timerHours += 1;
	}
	if (timerMinutes < 10) {
		timerMinutes2 = ("0"+timerMinutes);
		time.innerHTML = timerHours + ":" + timerMinutes2;
	} else {
		time.innerHTML = timerHours + ":" + timerMinutes;
	}
	if (timerHours < 10) {
		timerHours2 = ("0"+timerHours);
		time.innerHTML = timerHours2 + ":" + timerMinutes;
	} else {
		time.innerHTML = timerHours + ":" + timerMinutes;
	}
	console.log("Stopwatch updated");
}