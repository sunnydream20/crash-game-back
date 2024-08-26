/** @format */

const data = [
  { amount: 10, critical: 3 },
  { amount: 10, critical: 4.3 },
  { amount: 100, critical: 2.8 },
  { amount: 60, critical: 2 },
  { amount: 200, critical: 3.3 },
];

// Function to simulate a crash game
function generateCrashValue(users) {
  const totalDeposit = users.reduce((sum, user) => sum + user.deposit, 0);

  // Define weights based on critical values and deposits
  const criticalValues = data.map((item) => item.critical);
  const weights = criticalValues.map(
    (critical) => (critical * totalDeposit) / 100
  ); // Adjust weight by totalDeposit

  // Normalizing weights to sum to 1
  const sumOfWeights = weights.reduce((sum, weight) => sum + weight, 0);
  const probabilities = weights.map((weight) => weight / sumOfWeights);

  // Generate a random float between 0 and 1
  const randomValue = Math.random();

  // Calculate the crash point based on random value and probabilities
  let cumulativeProbability = 0;
  let crashPoint = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue < cumulativeProbability) {
      crashPoint = criticalValues[i]; // select crash point from critical values
      break;
    }
  }

  return crashPoint; // return the crash point based on the weighted random generation
}

// Simulate user deposits
const users = [
  { id: 1, deposit: 5 },
  { id: 2, deposit: 20 },
  { id: 3, deposit: 50 },
  { id: 4, deposit: 100 },
];

// Generate the crash value based on user deposits
const crashValue = generateCrashValue(users);
console.log("Crash Value:", crashValue);
