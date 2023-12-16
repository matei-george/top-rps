// The logic of the game.

"use strict";

// Return a random computer choice
function getComputerChoice() {
   const arr = ["rock", "paper", "scissors"];
   const randomChoice = Math.round(Math.random() * 2);
   return arr[randomChoice];
}

// Gets the player choice
let playerSelection = "";
let computerSelection = "";
let result;
let rounds;
let playedRounds = 1;

setGameLength(selectedRounds);

function getRockChoice() {
   playerSelection = "rock";
   computerSelection = getComputerChoice();
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
}
function getPaperChoice() {
   playerSelection = "paper";
   computerSelection = getComputerChoice();
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
}
function getScissorsChoice() {
   playerSelection = "scissors";
   computerSelection = getComputerChoice();
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
}

function gameLogic(playerSelection, computerSelection) {
   if (playerSelection === computerSelection) return "tie";
   if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
   )
      return "player wins";
   else return "computer wins";
}

function setOutput(textOutput) {
   const text = document.querySelector(".action__output");
   text.textContent = textOutput;
}

function trackScore() {
   let playerScore = Number(document.querySelector(".player-score").textContent);
   let cpuScore = Number(document.querySelector(".cpu-score").textContent);
   if (result === "player wins") {
      playerScore += 1;
      document.querySelector(".player-score").textContent = playerScore;
   } else if (result === "computer wins") {
      cpuScore += 1;
      document.querySelector(".cpu-score").textContent = cpuScore;
   }
   return "finished";
}
function trackRounds() {
   const gameState = trackScore();
   if (gameState && playedRounds < rounds) playedRounds++;
   else setOutput("Game Over!");
}
