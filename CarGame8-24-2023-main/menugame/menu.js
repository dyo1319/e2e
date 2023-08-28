
function startGame() {
    // Redirect to the game page with a placeholder for the score
    window.location.href = '../ingame/game.html?score=0'; // 0 is a placeholder score
}

function resetGame() {

    window.location.href = 'menu.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the score from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentScore = urlParams.get('score');

    // Update the score display
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (currentScore !== null) {
        scoreDisplay.textContent = `Your Last Score is: ${currentScore}`;
    }
});
