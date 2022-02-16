// Pure function
function add(num1, num2) {
  return num1 + num2;
}

console.log(add(3, 3));
console.log(add(7, 7));

// Start impure functions
function addRandom(num1) {
  return num1 + (Math.random() * 100);
}

console.log(addRandom(5));

// Producing side effects also is an impure function
let previousResult = 0;

function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;
  previousResult = sum;
  return sum;
}

// Side effects on an array
console.log(addMoreNumbers(1, 5));

const hobbies = ['Sports', 'Cooking'];

function printHobbies(h) {
  h.push('Reading');
  console.log(h);
}

printHobbies(hobbies);
// End impure functions

// Factory function
function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }
  // Return a pointer of this function
  return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));

// Closures
let userName = 'Said';

function greetUser() {
  // let name = 'Gaby';
  console.log('Hi ' + name);
}

let name = 'Eduardo';
userName = 'Kaled';

greetUser();

// Recursion
function powerOf(x, n) {
  return n === 1 ? x : x * powerOf(x, n - 1);
}

console.log(powerOf(2, 3));

// Advanced Recursion
const mySelf = {
  name: 'Said',
  friends: [
    {
      name: 'Kaled',
      friends: [
        {
          name: 'Serv',
          friends: [
            {
              name: 'Baca'
            },
            {
              name: 'Chu'
            }
          ]
        }
      ],
    },
    {
      name: 'Jorge',
      friends: [
        {
          name: 'Jaime'
        }
      ]
    }
  ]
};

function getFriendNames(person) {
  const collectedNames = [];

  // Check if a person has friends
  if ( !person.friends ) {
    return [];
  }

  for ( const friend of person.friends ){
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }

  return collectedNames;
}

console.log(getFriendNames(mySelf));