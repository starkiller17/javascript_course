// const testResults = [1, 5.3, 1.5, 10.99, 1.5, -5, 10];
// const storedResults = testResults.concat([3.99, 2]);

// testResults.push(666);
// console.log(testResults, storedResults);

// const personData = [{name: 'Max'}, {name: 'Manuel'}];
// console.log();

// // Stops after the first match
// const manuel = personData.find((person, index, persons) => {
//     console.log(persons);
//     return person.name === 'Manuel';
// });

// manuel.name = 'Anna';

// console.log(manuel, personData);

// // Returns the index of the searched value on reference values
// const maxIndex = personData.findIndex((person, index, persons) => {
//     console.log(persons);
//     return person.name === 'Max';
// });

// console.log(maxIndex);

// const max = personData.find( ({ name }) => name === 'Max' );
// console.log(max);
const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;
const taxAdjustedPrices = [];

prices.forEach((price, index, prices) => {
    taxAdjustedPrices.push(price * (1 + tax));
});

const taxAdjPrices = prices.map((price, index, prices) => {
    const priceObj = { index: index, taxAdjPrice: price * (1 + tax) };
    return priceObj;
});

console.log(taxAdjustedPrices);
console.log(taxAdjPrices);

const sortedPrices = prices.sort( (a,b) => {
    if ( a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        return -1;
    }
});

console.log(sortedPrices);

// FILTER
const filteredArray = prices.filter( (price, index, prices) => {
    return price > 6;
});

console.log(filteredArray);

const sum = prices.reduce((previousValue, currentValue, currenIndex, prices) => {
    // For first execution is 0 + the first elemento of the array
    return previousValue + currentValue;
}, 0);

console.log(sum);

// Split and Join
const data = 'new york;10.99;2000';
const nameFragments = ['Said', 'Mendez'];

const transformedData = data.split(';');
const joinedData = nameFragments.join(' ');
console.log(transformedData);
console.log(joinedData);

// spread operator
const copiedNameFragments = [...nameFragments];
nameFragments.push('Mickey');
console.log(copiedNameFragments, nameFragments)

// Math.min works with a list of objects, separated by commas
console.log(Math.min(1, 5, -3));
// Using it with variables
console.log(Math.min(...prices));

const persons = [{name: 'said', age: 28}, {name: 'sandy', age: 32}];
// Creates a new array but using the same references for the objects
// copiedPersons = [...persons]
// Create a whole new array with new objects
const copiedPersons = [...persons.map(person => ({ name: person.name, age: person.age }))];

// This change will be reflected as it is pointing to same reference
persons[0].age = 27;
console.log(persons, copiedPersons);

// Array Destructuring
const nameData = ['Said', 'Mendez', 'Mr', 28, 'City 2016'];
//const firstName = nameData[0];
//const lastName = nameData[1];

// The spread operator assigns all elements in the array that were not covered by the previous variables on the destructuring
const [ firstName, lastName, ...otherInformation ] = nameData;
console.log(firstName, lastName, otherInformation);
