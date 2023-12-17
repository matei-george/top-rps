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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

async function getRockChoice() {
   playerSelection = "rock";
   let playerStyle = document.querySelector(".p__paper-image");
   playerStyle.style.display = "none";
   playerStyle = document.querySelector(".p__scissors-image");
   playerStyle.style.display = "none";
   playerStyle = document.querySelector(".p__rock-image");
   playerStyle.style.display = "inline-block";
   computerSelection = getComputerChoice();
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
}
async function getPaperChoice() {
   playerSelection = "paper";
   const playerStyle = document.querySelector(".p__paper-image");
   playerStyle.style.display = "inline-block";
   computerSelection = getComputerChoice();
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
   await sleep(3000);
   playerStyle.style.display = "none";
}
async function getScissorsChoice() {
   playerSelection = "scissors";
   const playerStyle = document.querySelector(".p__scissors-image");
   playerStyle.style.display = "inline-block";
   computerSelection = getComputerChoice();
   result = gameLogic(playerSelection, computerSelection);
   setOutput(result);
   trackRounds();
   await sleep(3000);
   playerStyle.style.display = "none";
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
