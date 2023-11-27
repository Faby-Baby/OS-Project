

// Function to update info text
function updateRaceConditionInfo() {
    document.getElementById("RaceConditionInfo").innerText = "Race Condition Occurred!";
    RaceConditionInfo.style.color = "red"; // Change color to red
}

// Add an event listener to the second stick figure to trigger the update
document.querySelector('.stick-figure2').addEventListener('animationend', updateRaceConditionInfo);