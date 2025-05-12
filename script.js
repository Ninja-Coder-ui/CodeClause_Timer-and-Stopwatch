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
var timerMilliseconds = 0; // Add milliseconds for stopwatch
var isTimerRunning = false; // Flag to track if timer/stopwatch is running
var timerModal; // Timer modal instance

console.clear();

// Initialize the page to hide control buttons
window.onload = function() {
    showTime(); // Default to time view when page loads
    
    // Initialize timer modal
    if (typeof createTimerModal === 'function') {
        timerModal = createTimerModal();
        
        // Listen for timer set events from the modal
        document.addEventListener('timerSet', function(e) {
            // Get values from the event
            timerHours = e.detail.hours;
            timerMinutes = e.detail.minutes;
            timerSeconds = e.detail.seconds;
            
            console.log("Timer set with values:", timerHours, timerMinutes, timerSeconds);
            
            // Update display
            updateTimerDisplay();
            
            // Start the timer
            timer = setInterval(goTimer, 1000);
            isTimerRunning = true;
            
            // Update status indicator
            const statusEl = document.getElementById("timerStatus");
            if (statusEl) {
                statusEl.textContent = "Running";
                statusEl.style.color = "#4CAF50";
            }
        });
    }
};

function displayTime() {
	date = new Date();
	seconds = date.getSeconds();
	minutes = date.getMinutes();
	hours = date.getHours();
	if (minutes < 10) {
		minutes = ("0" + minutes);
	}
	// Keep 24-hour format
	if (hours < 10) {
		hours = ("0" + hours);
	}
	if (seconds < 10) {
		seconds = ("0" + seconds);
	}
	time.innerHTML = hours + ":" + minutes;
	secondsD.innerHTML = seconds;
}

function showTime() {
		// Stop any running timer/stopwatch when switching views
		clearInterval(timer);
		isTimerRunning = false;
		
		time.style.display = "inline";
		secondsD.style.display = "inline";
		timerPage.style.display = "none";
		stopwatchWrap.style.display = "none";
		timerSD.style.display = "none";
		type1.style.backgroundColor = "";
		type2.style.backgroundColor = "";
		type3.style.backgroundColor = "";
		// Hide control buttons for Time mode
		document.getElementById("stop").style.display = "none";
		document.getElementById("reset").style.display = "none";
		document.getElementById("start").style.display = "none";
		console.log("Time is displayed");
}
function showTimer() {
		// Stop any running timer/stopwatch when switching views
		clearInterval(timer);
		isTimerRunning = false;
		
		// Display timer interface - hide time display
		time.style.display = "none";
		secondsD.style.display = "none";
		stopwatchWrap.style.display = "none";
		timerSD.style.display = "inline";
		timerPage.style.display = "inline";
		
		// Highlight the Timer tab
		type1.style.backgroundColor = "#c7c7c7";
		type2.style.backgroundColor = "grey";
		type3.style.backgroundColor = "#c7c7c7";
		
		// Show control buttons for Timer mode
		document.getElementById("stop").style.display = "block";
		document.getElementById("reset").style.display = "block";
		document.getElementById("start").style.display = "block";
		console.log("Timer is displayed");
		timerType = 1;
		
		// Reset timer values
		timerHours = 0;
		timerMinutes = 0;
		timerSeconds = 0;
				// Update both main display and timer-specific display
		timerSD.innerHTML = "00";		if (document.getElementById("timerNum")) {
			document.getElementById("timerNum").innerHTML = "00:00";
		}
		
		// Initialize status indicator
		const statusEl = document.getElementById("timerStatus");
		if (statusEl) {
			statusEl.textContent = "Ready";
			statusEl.style.color = "#4CAF50";
		}
}
function showStopwatch() {
		// Stop any running timer/stopwatch when switching views
		clearInterval(timer);
		isTimerRunning = false;
		
		time.style.display = "none";
		secondsD.style.display = "none";
		timerPage.style.display = "none";
		stopwatchWrap.style.display = "inline";
		timerSD.style.display = "inline";
		type1.style.backgroundColor = "#c7c7c7";
		type2.style.backgroundColor = "#c7c7c7";
		type3.style.backgroundColor = "grey";
		// Show control buttons for Stopwatch mode
		document.getElementById("stop").style.display = "block";
		document.getElementById("reset").style.display = "block";
		document.getElementById("start").style.display = "block";
		console.log("Stopwatch is displayed");
		timerType = 2;
				// Reset stopwatch values
		timerSeconds = 0;
		timerMinutes = 0;
		timerMilliseconds = 0;
		timerSD.innerHTML = "00";
		time.innerHTML = "00:00";
		
		// Initialize status indicator
		const statusEl = document.getElementById("stopwatchStatus");
		if (statusEl) {
			statusEl.textContent = "Ready";
			statusEl.style.color = "#4CAF50";
		}
}

function stop() {
	clearInterval(timer);
	isTimerRunning = false;
	console.log("Stopped timers");
	
	// Update status indicators
	if (timerType === 1) {
		const statusEl = document.getElementById("timerStatus");
		if (statusEl) {
			statusEl.textContent = "Paused";
			statusEl.style.color = "#ff9800";
		}
	} else if (timerType === 2) {
		const statusEl = document.getElementById("stopwatchStatus");
		if (statusEl) {
			statusEl.textContent = "Paused";
			statusEl.style.color = "#ff9800";
		}
	}
}
function reset() {
	clearInterval(timer);
	isTimerRunning = false; // Reset the timer running flag
	
	if (timerType === 1) {
		// Reset timer to zero
		timerSeconds = 0;
		timerMinutes = 0;
		timerHours = 0;
		timerSD.innerHTML = "00";
		time.innerHTML = "00:00";
		
		// Update status
		const statusEl = document.getElementById("timerStatus");
		if (statusEl) {
			statusEl.textContent = "Ready";
			statusEl.style.color = "#4CAF50";
		}
	} else {
		// Reset stopwatch
		timerSeconds = 0;
		timerMinutes = 0;
		timerMilliseconds = 0;
		timerSD.innerHTML = "00";
		time.innerHTML = "00:00";
		
		// Also update stopwatch-specific elements if they exist
		if (document.getElementById("stopNum")) {
			document.getElementById("stopNum").innerHTML = "00:00";
		}
		
		// Update status
		const statusEl = document.getElementById("stopwatchStatus");
		if (statusEl) {
			statusEl.textContent = "Ready";
			statusEl.style.color = "#4CAF50";
		}
	}
	
	console.log("Reset Timers");
}
function start() {
	// Check if any timer/stopwatch is already running
	if(isTimerRunning) {
		alert("Please stop the current timer/stopwatch before starting a new one.");
		return;
	}
	
	if (timerType === 1) {
		// Open the timer modal to get input from user
		if (timerModal) {
			timerModal.open();
		} else {
			console.error("Timer modal not initialized!");
			
			// Fallback to default behavior if modal isn't available
			timerHours = 0;
			timerMinutes = 1;
			timerSeconds = 0;
			
			updateTimerDisplay();
			timer = setInterval(goTimer, 1000);
			isTimerRunning = true;
			
			const statusEl = document.getElementById("timerStatus");
			if (statusEl) {
				statusEl.textContent = "Running";
				statusEl.style.color = "#4CAF50";
			}
		}
	} else {
		// Start stopwatch - update every 10ms for millisecond precision
		timer = setInterval(goStopwatch, 10);
		isTimerRunning = true;
		
		// Update status
		const statusEl = document.getElementById("stopwatchStatus");
		if (statusEl) {
			statusEl.textContent = "Running";
			statusEl.style.color = "#4CAF50";
		}
	}
}

function goTimer() {
    // Check if the timer is already at 0
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
        clearInterval(timer);
        isTimerRunning = false; // Reset the running flag when timer finishes
        
        // Update status
        const statusEl = document.getElementById("timerStatus");
        if (statusEl) {
            statusEl.textContent = "Completed!";
            statusEl.style.color = "#ff5252";
            statusEl.style.fontWeight = "bold";
        }
        
        // Create and show completion notification
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '30px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '15px 30px';
        notification.style.borderRadius = '50px';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        notification.style.fontWeight = 'bold';
        notification.style.fontSize = '18px';
        notification.style.zIndex = '2000';        notification.style.animation = 'timerFadeIn 0.3s, timerPulse 2s infinite';
        notification.textContent = '⏰ Timer Complete!';
        document.body.appendChild(notification);
        
        // Add animation styles if they don't exist
        if (!document.getElementById('timerAnimationStyles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'timerAnimationStyles';
            styleEl.textContent = `
                @keyframes timerFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes timerFadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(20px); }
                }
                @keyframes timerPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(styleEl);
        }
        
        // Visual flash effect
        const flashOverlay = document.createElement('div');
        flashOverlay.style.position = 'fixed';
        flashOverlay.style.top = '0';
        flashOverlay.style.left = '0';
        flashOverlay.style.width = '100%';
        flashOverlay.style.height = '100%';
        flashOverlay.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
        flashOverlay.style.zIndex = '1500';
        flashOverlay.style.animation = 'timerFadeIn 0.3s';
        document.body.appendChild(flashOverlay);
          // Remove notification and flash overlay after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'timerFadeOut 0.3s';
            flashOverlay.style.animation = 'timerFadeOut 0.3s';
            
            setTimeout(() => {
                document.body.removeChild(notification);
                document.body.removeChild(flashOverlay);
            }, 300);
        }, 3000);
        
        return;
    }
    
    // Countdown logic
    if (timerSeconds > 0) {
        timerSeconds--;
    } else {
        if (timerMinutes > 0) {
            timerMinutes--;
            timerSeconds = 59;
        } else if (timerHours > 0) {
            timerHours--;
            timerMinutes = 59;
            timerSeconds = 59;
        }
    }
    
    // Visual feedback for the last 10 seconds
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds <= 10) {
        // Make the display blink during the final countdown
        const timerDisplay = document.getElementById("timerNum");
        if (timerDisplay) {
            timerDisplay.style.color = timerSeconds % 2 === 0 ? '#ff5252' : '#333';
            timerDisplay.style.fontSize = timerSeconds % 2 === 0 ? '110%' : '100%';
        }
    }
    
    console.log("Timer: " + timerHours + ":" + timerMinutes + ":" + timerSeconds);
    
    // Update the display with the new values
    updateTimerDisplay();
}

function goStopwatch() {
    // Increment milliseconds by 10 (since we're calling this function every 10ms)
    timerMilliseconds += 10;
    
    // Check if we need to increment seconds
    if (timerMilliseconds >= 1000) {
        timerMilliseconds = 0;
        timerSeconds += 1;
        
        // Check if we need to increment minutes
        if (timerSeconds >= 60) {
            timerSeconds = 0;
            timerMinutes += 1;
        }
    }
    
    // Format for display
    let displayMilliseconds = Math.floor(timerMilliseconds / 10); // Only show 2 digits (centiseconds)
    let formattedMilliseconds = displayMilliseconds < 10 ? "0" + displayMilliseconds : displayMilliseconds;
    let formattedSeconds = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
    let formattedMinutes = timerMinutes < 10 ? "0" + timerMinutes : timerMinutes;
    
    // Update only the stopwatch-specific elements
    document.getElementById("timeSeconds").innerHTML = formattedMilliseconds;
    
    // Update stopwatch-specific elements
    if (document.getElementById("stopNum")) {
        document.getElementById("stopNum").innerHTML = formattedMinutes + ":" + formattedSeconds;
    }
    
    console.log("Stopwatch updated: " + formattedMinutes + ":" + formattedSeconds + "." + formattedMilliseconds);
}

// Note: createTimerInputModal function has been moved to new_timer_modal.js

function updateTimerDisplay() {
    // Format hours and minutes for display
    if (timerMinutes < 10) {
        timerMinutes2 = "0" + timerMinutes;
    } else {
        timerMinutes2 = timerMinutes;
    }
    
    if (timerHours < 10) {
        timerHours2 = "0" + timerHours;
    } else {
        timerHours2 = timerHours;
    }
    
    // Format seconds for display
    if (timerSeconds < 10) {
        timerSeconds2 = "0" + timerSeconds;
    } else {
        timerSeconds2 = timerSeconds;
    }
    
    // Update UI based on which mode is active (timer or stopwatch)
    if (timerType === 1) { // Timer mode
        // Update UI - update the timer display elements
        timerSD.innerHTML = timerSeconds2;
        
        // Update timer-specific element if it exists
        if (document.getElementById("timerNum")) {
            document.getElementById("timerNum").innerHTML = timerHours2 + ":" + timerMinutes2;
        }
    } else if (timerType === 2) { // Stopwatch mode
        // For stopwatch mode, we handle display in the goStopwatch function
        // This is because stopwatch needs milliseconds precision
    }
}