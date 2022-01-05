const testResults = [1, 5.3, 1.5, 10.99, 1.5, -5, 10];
const storedResults = testResults.concat([3.99, 2]);

testResults.push(666);
console.log(testResults, storedResults);

const personData = [{name: 'Max'}, {name: 'Manuel'}];
console.log();

// Stops after the first match
const manuel = personData.find((person, index, persons) => {
    console.log(persons);
    return person.name === 'Manuel';
});

manuel.name = 'Anna';

console.log(manuel, personData);

// Returns the index of the searched value on reference values
const maxIndex = personData.findIndex((person, index, persons) => {
    console.log(persons);
    return person.name === 'Max';
});

console.log(maxIndex);

const max = personData.find( ({ name }) => name === 'Max' );
console.log(max);