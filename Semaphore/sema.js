// Define stoplight states
const stoplightStates = ['green', 'amber', 'red', 'amber'];

// Function to update the stoplight state
function updateStoplight() {
    const lights = document.querySelectorAll('.light');

    // Reset all lights to default color
    lights.forEach(light => {
        light.style.backgroundColor = 'grey';
    });

    // Set the active light based on the current state
    const currentState = stoplightStates.shift();
    document.querySelector(`.${currentState}`).style.backgroundColor = currentState;

    // Rotate the states array to simulate the stoplight changing states
    stoplightStates.push(currentState);

    // Pause or run the car animations based on the stoplight state
    if (currentState === 'red' || currentState === 'amber') {
        document.querySelector('.car1').style.animationPlayState = 'paused';
        document.querySelector('.car2').style.animationPlayState = 'paused';
    } else {
        document.querySelector('.car1').style.animationPlayState = 'running';
        document.querySelector('.car2').style.animationPlayState = 'running';
    }
}

// Set an interval to update the stoplight state every 3 seconds
setInterval(updateStoplight, 3000);

// Initial update
updateStoplight();
