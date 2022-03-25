// Represent a decimal number into binary
console.log((5).toString(2));

// Produces a number between 0 and 1
Math.random();

function randomInBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(randomInBetween(5, 10));

function productDescription(strings, productName, productPrice) {
    // All characters without the JS literals
    console.log(strings);
    // First parameter
    console.log(productName);
    // Second parameter
    console.log(productPrice);

    let priceCategory = 'pretty cheap regarding its price';
    if (productPrice > 20) {
        priceCategory = 'fairly priced';
    }
    return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
    //return {name: productName, productPrice: productPrice} you can return an object
}

prodName = 'JavaScript Course';
prodPrice = 29.99;
// JS will call the function and pass the template literal as three arguments
const productOutput = productDescription`This product (${prodName}) is ${prodPrice}`;
console.log(productOutput);

const userInput = 'testtest.com';
const regex = /^\S+@\S+\.\S+$/;
console.log('Email Validation: ' + regex.test(userInput));

const regex2 = /.ello/;
console.log(regex2.test('Jhello'));

console.log(regex2.exec('Hi! jello'));

console.log('Hi! jello'.match(regex2));