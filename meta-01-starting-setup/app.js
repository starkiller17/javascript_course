const uid = Symbol('uid');
console.log(uid);

const user = {
  [uid]: 'p1',
  name: 'Said',
  age: 28,
  [Symbol.toStringTag]: 'User Object'
};

user[uid] = 'p3';

user.id = 'p2';

console.log(user[Symbol('uid')]);

console.log(Symbol('uid') === Symbol('uid'));

console.log(user.toString());

const company = {
  // curEmployee: 0,
  employees: ['Max', 'Manu', 'Said', 'Sandy'],
  // This method makes the object iterable
  // next() {
  //   if (this.curEmployee >= this.employees.length) {
  //     return { value: this.curEmployee, done: true }
  //   }
    
  //   const returnValue = {
  //     value: this.employees[this.curEmployee],
  //     done: false,
  //   };
  //   this.curEmployee++;

  //   return returnValue;
  // },
  // Generator
  [Symbol.iterator]: function* employeeGenerator() {
    let currentEmployee = 0;

    while(currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
  }
};

for (const employee of company) {
  console.log(employee);
}

// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());

// const it = company.getEmployee();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// const course = {
//   title: 'JavaScript  - The Complete Guide.'
// };

// Reflect.defineProperty(course, 'price', {})

// Reflect.setPrototypeOf(course, {toString() {return this.title;}});
// console.log(course.toString());

const course = {
  title: 'JavaScript  - The Complete Guide.'
};

const courseHandler = {
  // This method is executed whenever a value is going to be read
  get(obj, propertyName) {
    console.log(propertyName);
    if(propertyName === 'length') {
      return 0;
    }
    return obj[propertyName] || 'NOT FOUND';
  },
  set(obj, propertyName, newValue) {
    console.log('Sending data...');
    if (propertyName === 'rating') {
      return;
    }
    obj[propertyName] = newValue;
  }
};

// Creates a new proxy object
// pCourse will use all the defined traps on courseHandler
const pCourse = new Proxy(course, courseHandler);
pCourse.rating = 666;
console.log(pCourse.title);
console.log(pCourse.length, pCourse.rating);
console.log(course, pCourse);