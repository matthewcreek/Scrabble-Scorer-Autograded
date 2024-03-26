// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   let word = input.question("Enter a word to score: ")
   return word;
};

let simpleScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = word.length;
   return letterPoints;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowelArr = ['A','E','I','O','U'];
   let points = 0;
   for (let i = 0; i < word.length; i++){
      if (vowelArr.includes(word[i])) {
         points = points + 3
      } else {
         points = points + 1
      }
   }
   return points;
};

let scrabbleScorer;

const scoringAlgorithms = [
   {
      name: 'Simple',
      description: 'Each letter is worth 1 point.',
      scoringFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scoringFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scoringFunction: oldScrabbleScorer
   }];

function scorerPrompt(word) {
   console.log('What scoring method would you like to use? \n')
   console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`)
   console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`)
   console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`)
   let scorerChoice = input.question(`Enter 0, 1, or 2: `)
   if (scorerChoice === '0'){
      return `Score for ${word}: ${scoringAlgorithms[0].scoringFunction(word)}`;
   } else if (scorerChoice === '1') {
      return `Score for ${word}: ${scoringAlgorithms[1].scoringFunction(word)}`;
   } else if (scorerChoice === '2') {
      return `Score for ${word}: ${scoringAlgorithms[2].scoringFunction(word)}`;
   } else return 'Invalid choice'
}

function transform(structureObj) {
   //iterate through the old point structure using a for...in and within that for...in use a for loop to add values of that point structure to a new point structure
   let newStructure = {}
   for (pointValue in structureObj) {
      structureObj[pointValue] = structureObj[pointValue].join('').toLowerCase().split('');
      for (let i = 0; i < structureObj[pointValue].length; i++){
         newStructure[structureObj[pointValue][i]] = Number(pointValue)
      }
   }
   console.log(newStructure)
   return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let score = scorerPrompt(word);
   // console.log(transform(oldPointStructure))
   console.log(score)
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
