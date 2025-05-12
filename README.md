# Timer and Stopwatch Application

A clean, responsive web application that provides Time, Timer, and Stopwatch functionality in one simple interface.

## Features

- **Time Display**: Shows the current time in 24-hour format
- **Timer**: Customizable countdown timer with hours, minutes, and seconds
- **Stopwatch**: Precision stopwatch with millisecond accuracy
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modal Dialogs**: User-friendly input for timer settings and notifications
- **Visual Feedback**: Clear indications when operations are completed

## How to Use

### Time Mode
- Click the "Time" button to display the current time
- Time is shown in 24-hour format with seconds

### Timer Mode
- Click the "Timer" button to switch to timer mode
- Click "Start" to open the timer settings modal
- Set your desired hours, minutes, and seconds
- Click "Start Timer" to begin the countdown
- Use "Stop" to pause and "Reset" to clear the timer
- When the timer completes, a notification will appear

### Stopwatch Mode
- Click the "Stopwatch" button to switch to stopwatch mode
- Click "Start" to begin the stopwatch
- Use "Stop" to pause and "Reset" to clear the stopwatch
- The stopwatch displays minutes, seconds, and centiseconds

## Installation

1. Clone the repository or download the source code
2. No build process required - it's pure HTML, CSS, and JavaScript
3. Open `index.html` in your web browser to run the application
4. For development, any standard text editor or IDE will work

## Technical Implementation

- Built with pure HTML, CSS, and JavaScript (no external libraries)
- Responsive design using CSS Grid and Flexbox
- Modal dialogs for improved user experience
- Custom-styled UI components

## Project Structure

- `index.html`: Main application HTML file
- `style.css`: Contains all styling for the application
- `script.js`: Core timer and stopwatch functionality
- `timer_modal.js`: Timer input modal implementation

## Browser Compatibility

This application works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Performance Considerations

- The application is lightweight and loads quickly
- Stopwatch precision is limited to centiseconds (1/100 of a second)
- Timer accuracy depends on the browser's setTimeout/setInterval implementation

## Future Enhancements

- Add sound alerts when timer completes
- Add lap functionality to stopwatch
- Save timer presets for quick access
- Implement a dark/light theme toggle
- Add keyboard shortcuts for common actions
- Create a progressive web app (PWA) version for offline use

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-source and available under the MIT License.

## Acknowledgments

- Built as part of the CodeClause Internship Program
- Special thanks to all contributors and testers
