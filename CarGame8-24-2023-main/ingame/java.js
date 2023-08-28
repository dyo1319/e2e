let fuel = 100; // Initial fuel level
let score = 0;
let health = 100; // Initial health
let previousCarPosition = 0;
const gameArea = document.querySelector('.CarGame'); // Replace '.CarGame' with the actual class or ID of your game area element
// Get a reference to the audio element
const backgroundMusic = document.getElementById('backgroundMusic');

// Function to play the music
function playMusic() {
    backgroundMusic.play();
}

/*
// Play the music automatically when the page loads
window.addEventListener('load', playMusic); */

const player = {
    speed: 5, // Adjust the speed as needed
    x: 0, // Initial x position
    y: 0, // Initial y position
    start: false // Whether the game has started or not
};
const scoreDisplay = document.querySelector('.Score');
// Get references to the car element and the container
const car = document.querySelector('.car');
const container = document.querySelector('.max-area');
const fuelDisplay = document.querySelector('.fuel-percentage');
const healthDisplay = document.querySelector('.health-bar');
healthDisplay.textContent = `Health: ${health}`;

// Set initial car position
let carHorizontalPosition = 50; // 50% - centered
let carVerticalPosition = 0; // Start lower on the screen

// Calculate the maximum and minimum positions for the car
const maxHorizontalCarPosition = 96 - (car.offsetWidth / container.offsetWidth) * 100;
const minCarPosition = 0;
const maxVerticalCarPosition = 96 - (car.offsetHeight / container.offsetHeight) * 100;
const minVerticalCarPosition = 0;

// Track the state of arrow keys
let leftKey = false;
let rightKey = false;
let upKey = false;
let downKey = false;

// Set the car's position
function setCarPosition() {
    car.style.left = carHorizontalPosition + '%';
    car.style.bottom = carVerticalPosition + '%';
}

// Handle keydown and keyup events for arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = true;
    } else if (event.key === 'ArrowRight') {
        rightKey = true;
    } else if (event.key === 'ArrowUp') {
        upKey = true;
    } else if (event.key === 'ArrowDown') {
        downKey = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = false;
    } else if (event.key === 'ArrowRight') {
        rightKey = false;
    } else if (event.key === 'ArrowUp') {
        upKey = false;
    } else if (event.key === 'ArrowDown') {
        downKey = false;
    }
});

let lastPosition = 0;
let isMovingForward = true;

function updateScore(currentCarPosition) {
    const distanceTraveled = currentCarPosition - lastPosition;

    if (distanceTraveled > 0 && isMovingForward) {
        const scoreIncrease = distanceTraveled * 0.5; // Adjust this factor as needed
        score += scoreIncrease;
        
        // Update the best score if the current score is higher
        updateBestScore(Math.floor(score));
    }

    lastPosition = currentCarPosition;

    scoreDisplay.textContent = `Score: ${Math.floor(score)}`;
}
function updateBestScore(newScore) {
    // Retrieve the previous best score from localStorage
    const previousBestScore = localStorage.getItem('bestScore');

    // If there's no previous best score or the new score is higher, update and save it
    if (!previousBestScore || newScore > parseFloat(previousBestScore)) {
        localStorage.setItem('bestScore', newScore);
    }
}

// Update car position based on arrow key state
function updateCarPosition() {
    if (leftKey) {
        carHorizontalPosition -= 0.6;
        if (carHorizontalPosition < minCarPosition) {
            carHorizontalPosition = minCarPosition;
        }
    }
    if (rightKey) {
        carHorizontalPosition += 0.6;
        if (carHorizontalPosition > maxHorizontalCarPosition) {
            carHorizontalPosition = maxHorizontalCarPosition;
        }
    }
    if (upKey) {
        carVerticalPosition += 0.7;
        if (carVerticalPosition > maxVerticalCarPosition) {
            carVerticalPosition = maxVerticalCarPosition;
        }
        if (upKey || downKey) {
            isMovingForward = upKey; // Set isMovingForward to true when moving up
        } else {
            isMovingForward = false;
        }
    }
    if (downKey) {
        carVerticalPosition -= 0.6;
        if (carVerticalPosition < minVerticalCarPosition) {
            carVerticalPosition = minVerticalCarPosition;
        }
    }
    setCarPosition();
}
function getCurrentCarPosition() {
    const carStyle = getComputedStyle(car);
    return parseFloat(carStyle.bottom);
}

// Update car position on each frame
function animate() {
    updateFuel();
    updateCarPosition();
    const currentCarPosition = getCurrentCarPosition();
    updateScore(currentCarPosition);
    requestAnimationFrame(animate);
}

// Initial car position setup
setCarPosition();
animate();

// Get references to the line elements
const leftLine = document.querySelector('.leftline');
const rightLine = document.querySelector('.rightline');
const lines = document.querySelector('.lines');
const lines2 = document.querySelector('.lines2');

// Initialize the position variables
let leftLinePosition = 0;
let rightLinePosition = 0;
let linesPosition = 0;
let lines2Position = 0;

// Function to move the road lines
// Define an array to store the positions of lines2 elements
const lines2Positions = [200, 0, -200, -400]; // Adjust these values as needed
const leftLinePositions = [200, 0, -200, -400];
const rightLinePositions = [200, 0, -200, -400];
const linesPositions = [200, 0, -200, -400];
function moveRoadLines() {
    // Update the positions of lines2 elements
    for (let i = 0; i < lines2Positions.length; i++) {
        lines2Positions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (lines2Positions[i] > screenHeight) {
            lines2Positions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const lines2Element = document.getElementById(`lines2-${i + 1}`);
        lines2Element.style.top = lines2Positions[i] + 'px';
    }///
    for (let i = 0; i < leftLinePositions.length; i++) {
        leftLinePositions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (leftLinePositions[i] > screenHeight) {
            leftLinePositions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const leftLinePositionsElement = document.getElementById(`leftline-${i + 1}`);
        leftLinePositionsElement.style.top = leftLinePositions[i] + 'px';
    }///
    for (let i = 0; i < rightLinePositions.length; i++) {
        rightLinePositions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (rightLinePositions[i] > screenHeight) {
            rightLinePositions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const rightLinePositionsElement = document.getElementById(`rightline-${i + 1}`);
        rightLinePositionsElement.style.top = rightLinePositions[i] + 'px';
    }///
    for (let i = 0; i < linesPositions.length; i++) {
        linesPositions[i] += 5; // Adjust the speed as needed

        // Check if a lines2 element has reached the bottom of the screen
        const screenHeight = window.innerHeight;
        if (linesPositions[i] > screenHeight) {
            linesPositions[i] = -100; // Reset to the top
        }

        // Apply the updated positions to the corresponding lines2 element
        const linesPositionsElement = document.getElementById(`lines-${i + 1}`);
        linesPositionsElement.style.top = linesPositions[i] + 'px';
    }///
}

// Call the moveRoadLines function at a regular interval (e.g., every 16ms)
setInterval(moveRoadLines, 16);


document.addEventListener("DOMContentLoaded", function () {
    const enemyCarsContainer = document.querySelector(".enemy-cars-container");
    const carType = "../gamepics/car3.png"; // Use a single image URL

    const numberOfCars = 13; // Increase the number of enemy cars

    const containerWidth = enemyCarsContainer.offsetWidth;
    const containerHeight = enemyCarsContainer.offsetHeight;

    const cars = [];
    const minDistance = 110;
    
    const carSpeed = 4; // Adjust the speed here

    for (let i = 0; i < numberOfCars; i++) {
        const enemyCar = document.createElement("div");
        enemyCar.className = "enemy-car";

        // Set background image
        enemyCar.style.backgroundImage = `url(${carType})`;

        let carTop, carLeft;
        let collision;

        do {
            carTop = Math.random() * (containerHeight - 100); 
            carLeft = Math.random() * (containerWidth - 50); 

            collision = false;

            for (const car of cars) {
                if (
                    carTop < car.top + 100 + minDistance && 
                    carTop + 100 + minDistance > car.top && 
                    carLeft < car.left + 50 + minDistance && 
                    carLeft + 50 + minDistance > car.left
                ) {
                    collision = true;
                    break;
                }
            }
        } while (collision);

        cars.push({ top: carTop, left: carLeft });

        enemyCar.style.top = carTop + "px";
        enemyCar.style.left = carLeft + "px";

        enemyCarsContainer.appendChild(enemyCar);
    }

    function moveCars() {
        const carElements = document.querySelectorAll(".enemy-car");
        carElements.forEach((car, index) => {
            car.style.top = (parseInt(car.style.top) + carSpeed) + "px";
            if (parseInt(car.style.top) > containerHeight) {
                car.style.top = "-100px";
            }
        });

        requestAnimationFrame(moveCars);
    }

    moveCars();
});


function updateFuel() {
    // Deduct a small amount of fuel (adjust as needed)
    fuel -= 0.05; // You can change this value to control fuel consumption rate

    // Check if fuel goes below zero
    if (fuel < 0) {
        fuel = 0; // Set it to zero to prevent negative values
    }

    // Update the fuel display on the screen
    fuelDisplay.textContent = `Fuel: ${fuel.toFixed(1)}%`;

    // Check if the fuel is depleted
    if (fuel === 0) {
        // Implement game over logic or handle out-of-fuel conditions
        gameOver();
    }

    // Check fuel level and apply CSS class for color change
    if (fuel < 20) {
        fuelDisplay.classList.remove('medium-fuel');
        fuelDisplay.classList.add('low-fuel');
    } else if (fuel < 50) {
        fuelDisplay.classList.remove('low-fuel');
        fuelDisplay.classList.add('medium-fuel');
    } else {
        fuelDisplay.classList.remove('low-fuel', 'medium-fuel');
    }
}

function handleCollision() {
    // Reduce player's health
    health -= 1; // Adjust the health reduction as needed

    // Update the health display
    healthDisplay.textContent = `Health: ${health}`;

    // Check if the player's health reaches zero
    if (health <= 0) {
        // Game over logic (e.g., stop the game, show a game over message)
        gameOver();
    }

    // Check health level and apply CSS class for color change
    if (health < 30) {
        healthDisplay.classList.remove('medium-health');
        healthDisplay.classList.add('low-health');
    } else if (health < 70) {
        healthDisplay.classList.remove('low-health');
        healthDisplay.classList.add('medium-health');
    } else {
        healthDisplay.classList.remove('low-health', 'medium-health');
    }
}

function gameOver() {
    // Stop the game (e.g., stop animation, remove event listeners)
    // Display a game over message
    window.location.href = '../menugame/menu.html?score=' + score;
    const currentScore = Math.floor(score);
    const newWebPageURL = `../menugame/menu.html?score=${currentScore}`;
    window.location.href = newWebPageURL;
    // Reset the game if needed (reset player position, score, health, etc.)
    resetGame();
}
function resetGame() {
    score = 0; // Reset score
    health = 100; // Reset health
    // Reset other game variables and elements as needed
    // Restart the game loop and update the display
    // ...
}

