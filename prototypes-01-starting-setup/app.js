class AgedPerson{
    printAge() {
        console.log(this.age);
    }
}

class Person extends AgedPerson{
    name = 'Said';

    constructor() {
        super();
        this.age = 28;
    }

    greet() {
        console.log(
            'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
        );
    }
}

// const p = new Person();
// console.log(p);

const course = { // new Object()
    title: 'JS The Complete Course',
    rating: 5
};

console.dir(course.__proto__);
// More official way of checking __proto__
console.log(Object.getPrototypeOf(course));
// You can override the prototype of any object
Object.setPrototypeOf(course, {
    ...Object.getPrototypeOf(course),
    printRating: function() {
        console.log(`${this.rating}/5`);
    }
});

course.printRating();
console.log(Object.getPrototypeOf(course));

const student = Object.create({
    printProgress: function() {
        console.log(this.progress);
    }
}, {
    name: {
        value: 'Said'
    }
});
// Object.defineProperty(student, 'progress', {
//     configurable: true,
//     enumerable: true,
//     value: 0.8,
//     writable: false
// });
console.log(student);



// function Person() {
//     this.age = 30;
//     this.name = 'Said';
//     this.greet = function() {
//         console.log(
//             'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
//         );
//     };
// }

// Person.prototype = {
//     printAge(){
//         console.log(this.age);
//     }
// };

// Person.prototype.printAge = function () {
//     console.log(this.age);
// };

// const person = new Person();
// console.dir(person);
// person.greet();
// person.printAge();
// console.log(person.__proto__);
// console.log(person.toString());
// const p2 = new person.__proto__.constructor();
// console.log(p2);

// console.log(person.__proto__ === Person.prototype);
// console.dir(Person);