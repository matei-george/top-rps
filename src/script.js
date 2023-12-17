// The logic of the game.

"use strict";

// Return a random computer choice
function getComputerChoice() {
   const arr = ["rock", "paper", "scissors"];
   const randomChoice = Math.round(Math.random() * 2);
   return arr[randomChoice];
}

// Displays the computer choice in a div.
function showComputerChoice(computerSelection) {
   let computerChoice;
   if (computerSelection === "rock") {
      computerChoice = document.querySelector(".c__rock-image");
      computerChoice.style.display = "inline-block";
      computerChoice = document.querySelector(".c__paper-image");
      computerChoice.style.display = "none";
      computerChoice = document.querySelector(".c__scissors-image");
      computerChoice.style.display = "none";
   } else if (computerSelection === "paper") {
      computerChoice = document.querySelector(".c__rock-image");
      computerChoice.style.display = "none";
      computerChoice = document.querySelector(".c__paper-image");
      computerChoice.style.display = "inline-block";
      computerChoice = document.querySelector(".c__scissors-image");
      computerChoice.style.display = "none";
   } else if (computerSelection === "scissors") {
      computerChoice = document.querySelector(".c__rock-image");
      computerChoice.style.display = "none";
      computerChoice = document.querySelector(".c__paper-image");
      computerChoice.style.display = "none";
      computerChoice = document.querySelector(".c__scissors-image");
      computerChoice.style.display = "inline-block";
   }
}

// Gets the player choice
let playerSelection = "";
let computerSelection = "";
let result;
let rounds;
let playedRounds = 1;

// variable used for sleep function
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Rounds functions
async function getBo3() {
   rounds = 3;
   setOutput("Best of 3 selected!");
   await sleep(3000);
   setOutput("Select your choice to start!");
   document.querySelector(".game__choices-container").style.display = "grid";
}
async function getBo5() {
   rounds = 5;
   setOutput("Best of 5 selected!");
   await sleep(3000);
   setOutput("Select your choice to start!");
   document.querySelector(".game__choices-container").style.display = "grid";
}
async function getInfinite() {
   rounds = Infinity;
   setOutput("Infinite mode selected!");
   await sleep(3000);
   setOutput("Select your choice to start!");
   document.querySelector(".game__choices-container").style.display = "grid";
}

// Player display and logic functions
async function getRockChoice() {
   playerSelection = "rock";
   let playerStyle = document.querySelector(".p__paper-image");
   playerStyle.style.display = "none";
   playerStyle = document.querySelector(".p__scissors-image");
   playerStyle.style.display = "none";
   playerStyle = document.querySelector(".p__rock-image");
   playerStyle.style.display = "inline-block";
   computerSelection = getComputerChoice();
   showComputerChoice(computerSelection);
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
}
async function getPaperChoice() {
   playerSelection = "paper";
   let playerStyle = document.querySelector(".p__paper-image");
   playerStyle.style.display = "inline-block";
   playerStyle = document.querySelector(".p__scissors-image");
   playerStyle.style.display = "none";
   playerStyle = document.querySelector(".p__rock-image");
   playerStyle.style.display = "none";
   computerSelection = getComputerChoice();
   showComputerChoice(computerSelection);
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
}
async function getScissorsChoice() {
   playerSelection = "scissors";
   let playerStyle = document.querySelector(".p__paper-image");
   playerStyle.style.display = "none";
   playerStyle = document.querySelector(".p__scissors-image");
   playerStyle.style.display = "inline-block";
   playerStyle = document.querySelector(".p__rock-image");
   playerStyle.style.display = "none";
   computerSelection = getComputerChoice();
   showComputerChoice(computerSelection);
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
}

// The game logic function
function gameLogic(playerSelection, computerSelection) {
   if (playerSelection === computerSelection) return "Both players clash with equal forces! It's a draw!";
   if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
   )
      return "The player has a stronger hand, the win is awarded!";
   else return "The computer is at an advantage this time, cpu wins!";
}

// Sets the text output when a round is finished
function setOutput(textOutput) {
   const text = document.querySelector(".action__output");
   text.textContent = textOutput;
}

// Tracks the score when a round is finished
function trackScore() {
   let playerScore = Number(document.querySelector(".player-score").textContent);
   let cpuScore = Number(document.querySelector(".cpu-score").textContent);
   if (result === "The player has a stronger hand, the win is awarded!") {
      playerScore += 1;
      document.querySelector(".player-score").textContent = playerScore;
   } else if (result === "The computer is at an advantage this time, cpu wins!") {
      cpuScore += 1;
      document.querySelector(".cpu-score").textContent = cpuScore;
   }
   return "finished";
}

// Tracks the amount of rounds played after one is finished. Includes game over screen.
async function trackRounds() {
   const gameState = trackScore();
   if (gameState && playedRounds <= rounds) playedRounds++;
   else {
      await sleep(2000);
      setOutput("Game Over!");
      await sleep(2000);
      document.querySelector(".game__choices-container").style.display = "none";
      await sleep(2000);
      document.querySelector(".player-score").textContent = 0;
      document.querySelector(".cpu-score").textContent = 0;
   }
}
