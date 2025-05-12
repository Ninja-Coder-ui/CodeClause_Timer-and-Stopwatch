// Timer Input Modal
function createTimerModal() {
    // Create modal styles
    const styleEl = document.createElement('style');
    styleEl.id = 'timerModalStyles';
    styleEl.textContent = `
        .timer-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .timer-modal {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 400px;
            padding: 30px;
            text-align: center;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .timer-modal-title {
            font-size: 28px;
            margin-top: 0;
            margin-bottom: 25px;
            color: #333;
            font-weight: 500;
        }
        
        .timer-input-wrapper {
            display: flex;
            flex-direction: column;
            margin-bottom: 25px;
        }
        
        .timer-input-labels {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-bottom: 5px;
        }
        
        .timer-input-label {
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-bottom: 5px;
        }
        
        .timer-input-fields {
            display: grid;
            grid-template-columns: 1fr auto 1fr auto 1fr;
            align-items: center;
            gap: 5px;
        }
        
        .timer-input {
            width: 100%;
            height: 60px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 28px;
            text-align: center;
            padding: 0;
            -moz-appearance: textfield;
        }
        
        .timer-input:focus {
            border-color: #4285f4;
            outline: none;
            box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.3);
        }
        
        .timer-input::-webkit-inner-spin-button, 
        .timer-input::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            margin: 0;
        }
        
        .timer-colon {
            font-size: 28px;
            font-weight: bold;
            color: #333;
        }
        
        .timer-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }
        
        .timer-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .timer-cancel-btn {
            background-color: #f1f1f1;
            color: #333;
        }
        
        .timer-cancel-btn:hover {
            background-color: #e1e1e1;
        }
        
        .timer-start-btn {
            background-color: #4CAF50;
            color: white;
            min-width: 120px;
        }
        
        .timer-start-btn:hover {
            background-color: #45a049;
        }
          @media (max-width: 480px) {
            .timer-modal {
                padding: 20px 15px;
                width: 95%;
            }
            
            .timer-modal-title {
                font-size: 24px;
                margin-bottom: 20px;
            }
            
            .timer-input {
                height: 50px;
                font-size: 24px;
            }
            
            .timer-colon {
                font-size: 24px;
            }
            
            .timer-btn {
                padding: 10px 15px;
                font-size: 14px;
            }
        }
        
        @media (max-width: 360px) {
            .timer-modal {
                padding: 15px 10px;
            }
            
            .timer-modal-title {
                font-size: 22px;
                margin-bottom: 15px;
            }
            
            .timer-input {
                height: 45px;
                font-size: 22px;
            }
            
            .timer-colon {
                font-size: 22px;
            }
            
            .timer-input-wrapper {
                margin-bottom: 15px;
            }
            
            .timer-btn {
                padding: 8px 12px;
                font-size: 13px;
            }
        }
    `;
    
    document.head.appendChild(styleEl);
    
    // Create modal HTML elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'timer-modal-overlay';
    
    const modalContainer = document.createElement('div');
    modalContainer.className = 'timer-modal';
    
    // Build modal content
    modalContainer.innerHTML = `
        <h2 class="timer-modal-title">Set Timer</h2>
        
        <div class="timer-input-wrapper">
            <div class="timer-input-labels">
                <label class="timer-input-label">Hours</label>
                <label class="timer-input-label">Minutes</label>
                <label class="timer-input-label">Seconds</label>
            </div>
              <div class="timer-input-fields">
                <input type="number" id="timer-hours" min="0" max="23" value="00" class="timer-input">
                <span class="timer-colon">:</span>
                <input type="number" id="timer-minutes" min="0" max="59" value="00" class="timer-input">
                <span class="timer-colon">:</span>
                <input type="number" id="timer-seconds" min="0" max="59" value="00" class="timer-input">
            </div>
        </div>
        
        <div class="timer-buttons">
            <button class="timer-btn timer-cancel-btn" id="timer-cancel">Cancel</button>
            <button class="timer-btn timer-start-btn" id="timer-start">Start Timer</button>
        </div>
    `;
    
    // Add modal to the DOM
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);
    
    // Set up event handlers
    const hoursInput = document.getElementById('timer-hours');
    const minutesInput = document.getElementById('timer-minutes');
    const secondsInput = document.getElementById('timer-seconds');
    const cancelBtn = document.getElementById('timer-cancel');
    const startBtn = document.getElementById('timer-start');
      // Input validation functions
    function validateInput(input, max) {
        const value = parseInt(input.value, 10);
        if (isNaN(value) || value < 0) {
            input.value = '00';
        } else if (value > max) {
            input.value = max.toString();
        } else {
            // Format with leading zero if needed (for 24-hour format display)
            input.value = value < 10 ? '0' + value : value.toString();
        }
    }
    
    // Add validation to inputs
    hoursInput.addEventListener('input', () => validateInput(hoursInput, 23));
    minutesInput.addEventListener('input', () => validateInput(minutesInput, 59));
    secondsInput.addEventListener('input', () => validateInput(secondsInput, 59));
    
    // Focus handling
    [hoursInput, minutesInput, secondsInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.select();
        });
          // Arrow key support
        input.addEventListener('keydown', function(e) {
            const max = this === hoursInput ? 23 : 59;
            const value = parseInt(this.value, 10) || 0;
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const newValue = value < max ? (value + 1) : max;
                // Format with leading zero if needed (for 24-hour format display)
                this.value = newValue < 10 ? '0' + newValue : newValue.toString();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const newValue = value > 0 ? (value - 1) : 0;
                // Format with leading zero if needed (for 24-hour format display)
                this.value = newValue < 10 ? '0' + newValue : newValue.toString();
            }
        });
    });
    
    // Cancel button handler
    cancelBtn.addEventListener('click', () => {
        close();
    });
    
    // Start button handler
    startBtn.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value, 10) || 0;
        const minutes = parseInt(minutesInput.value, 10) || 0;
        const seconds = parseInt(secondsInput.value, 10) || 0;
        
        // Verify at least one field has a value greater than 0
        if (hours === 0 && minutes === 0 && seconds === 0) {
            // Visual feedback for empty timer
            [hoursInput, minutesInput, secondsInput].forEach(input => {
                input.style.borderColor = '#ff5252';
                setTimeout(() => {
                    input.style.borderColor = '#ddd';
                }, 800);
            });
            return;
        }
        
        // Dispatch custom event with timer values
        const timerEvent = new CustomEvent('timerSet', {
            bubbles: true,
            detail: { hours, minutes, seconds }
        });
        document.dispatchEvent(timerEvent);
        
        // Close the modal
        close();
    });
    
    // Close when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            close();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            close();
        }
    });
    
    // Close function
    function close() {
        modalOverlay.style.display = 'none';
    }
      // Return the modal interface
    return {
        open: function() {
            // Reset input values with leading zeros for 24-hour format display
            hoursInput.value = '00';
            minutesInput.value = '00';
            secondsInput.value = '00';
            
            // Show the modal
            modalOverlay.style.display = 'flex';
            
            // Focus on minutes by default (most commonly used)
            setTimeout(() => minutesInput.focus(), 100);
        },
        close: close
    };
}
