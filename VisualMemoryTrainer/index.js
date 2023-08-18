const slider = document.querySelector("#slider");
const timeSlider = document.querySelector('#slider2');
const levelDisplay = document.querySelector(".level-display");
const squaresDiv = document.querySelector(".squares");
const startButton = document.querySelector(".start-button");
const loseScreen = document.querySelector(".lose-screen");
const winScreen = document.querySelector(".win-screen");
const endButtons = document.querySelectorAll(".end-button");
let squares = document.querySelectorAll(".square");
let previousLevel = 0;
let correctTiles = 0;
let gameStarted = false;

const levels = [0, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8];

slider.addEventListener('change', () => {
    changeScreen();
});

slider2.addEventListener("change", () => levelDisplay.textContent = `${slider.value} (${timeSlider.value} ms)`);

startButton.addEventListener("click", () => {
    if (levelDisplay.textContent == "Select A Level") return;
    let randomCorrectTiles = getRandom(correctTiles);
    gameStarted = true;
    playGame(randomCorrectTiles);
});

endButtons.forEach(b => b.addEventListener("click", () => reset()));

function playGame(randomCorrectTiles) {
    
    let clicked = 0;
    let incorrectCount = 0;
    console.log("game starting");
    squares = document.querySelectorAll(".square");
    showCorrectTiles(randomCorrectTiles, squares);

    squares.forEach(square => {
        square.addEventListener("click", () => {
            if (square.classList.contains("clicked")) return;
            square.classList.add("clicked");
            clicked++;
            console.log(clicked);
            if (randomCorrectTiles.indexOf(Number(square.id)) !== -1)
            {
                console.log("clicked a correct tile");
                square.style.backgroundColor = "white";
                if (randomCorrectTiles.length + incorrectCount === clicked) endScreen(true);
            }
            else {
                incorrectCount++;
                square.style.backgroundColor = "rgb(51, 51, 51)";
                if (incorrectCount === 3) endScreen(false);
            }
        });
    });

}

function getRandom(n) {
    let randomCorrectTiles = [];
    for (let i = 0; i < n; i++)
    {
        let randomValue = (Math.floor(Math.random() * (levels[slider.value] * levels[slider.value])));
        console.log(randomValue);
        console.log(randomCorrectTiles.includes(randomValue));
        // could use a set but that's probably worse for memory
        if (randomCorrectTiles.indexOf(randomValue) !== -1) i--;
        else randomCorrectTiles.push(randomValue);

    }
    console.log(randomCorrectTiles);

    return randomCorrectTiles;
}

function endScreen(win) {
    if (win)
    {
        winScreen.style.visibility = "visible";
    }
    else{
        loseScreen.style.visibility = "visible";
    }
}

function reset() {
    winScreen.style.visibility = "hidden";
    loseScreen.style.visibility = "hidden";
    gameStarted = false;
    changeScreen();

}

function changeScreen() {
    levelDisplay.textContent = `${slider.value} (${timeSlider.value} ms)`;
    correctTiles = Number(slider.value) + 2;
    while(squaresDiv.hasChildNodes())
    {
        squaresDiv.removeChild(squaresDiv.lastChild);
    }
    for (let i = 0 ; i < levels[slider.value] * levels[slider.value]; i++)
    {
        const square = document.createElement("div");
        square.className = "square";
        square.id = i;
        squaresDiv.appendChild(square);
    }
    squaresDiv.style.grid = `repeat(${levels[slider.value]}, 1fr) / repeat(${levels[slider.value]}, 1fr)`;
    previousLevel = slider.value;
}

function showCorrectTiles(randomCorrectTiles, squares){
    squares.forEach(square => {
        if (randomCorrectTiles.includes(Number(square.id))) square.style.backgroundColor = "white";
    });
    setTimeout(stopShowingCorrectTiles, Number(timeSlider.value), randomCorrectTiles, squares);
}

function stopShowingCorrectTiles(randomCorrectTiles, squares){
    squares.forEach(square => {
        if (randomCorrectTiles.includes(Number(square.id))) square.style.backgroundColor = "rgb(0, 0, 100, .1)";
    });
}
