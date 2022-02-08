const button = document.querySelector('button');

// button.onclick = function() {

// };

// const buttonClickHandler = (event) => {
//     // event.target.disabled = true;
//     console.log(event);
//     console.log(event.target.id);
// };

// const anotherButtonClickHandler = () => {
//     console.log('This was clicked!');
// };

// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

// button.addEventListener('click', buttonClickHandler);

// setTimeout(() => {
//     button.removeEventListener('click', buttonClickHandler);
// }, 2000);

// const boundFn = buttonClickHandler.bind(this);
// button.forEach(btn => {
//     btn.addEventListener('mouseenter', buttonClickHandler);
// });

// window.addEventListener('scroll', event => {
//     console.log(event);
// });

const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
});

const div = document.querySelector('div');
div.addEventListener('mouseenter', event => {
    console.log('CLICK DIV');
    console.log(event);
});

button.addEventListener('click', function (event) {
    event.stopPropagation();
    console.log('CLICK BUTTON');
    console.log(event);
    console.log(this);
});



const listItems = document.querySelectorAll('li');
const list = document.querySelector('ul');

list.addEventListener('click', event => {
    event.target.closest('li').classList.toggle('highlight');
    //form.submit();
});

// listItems.forEach(listenItem => {
//     listenItem.addEventListener('click', event => {
//         event.target.classList.toggle('highlight');
//     });
// });
