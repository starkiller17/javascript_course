// Sets
const ids = new Set(['Hi', 'From', 'Set']);
ids.add(3);
if ( ids.has('id') ) {
    ids.delete('Hi');
}

for (const entry of ids.values() ) {
    console.log(entry);
}

console.log(ids.has(1));

// Maps

const person1 = {name: 'Said'};
const person2 = {name: 'Sandy'};

// [[ key, value ]]
const personData = new Map([[ person1, [{data: 'yesterday', price: 10}] ]]);

personData.set(person2, [{ date: 'two weeks ago', price: 100 }]);

console.log(personData);
console.log(personData.get(person1));

for (const [key, value] of personData.entries()) {
    console.log(key, value);
    //console.log(entry);
}

// Getting only keys
for ( const key of personData.keys() ){
    console.log(key);
}
console.log(personData.size);

// WeakSet
let p = {name: 'Said'};
const people = new WeakSet();

people.add(p);

console.log(people);


// WeakMap
const peopleData = new WeakMap();
peopleData.set(p, 'Extra info');
p = null;

console.log(peopleData);