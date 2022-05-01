const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {

    
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            // Replace JSON.parse()
            // response.text();
            // response.blob();
            return response.json();
        } else {
            return response.json().then(errorData => {
                console.log(errorData);
                throw new Error('Something went wrong - server-side!');
            });
        }
    })
    .catch(error => {
        console.log(error);
        throw new Error('Something went wrong!');
    });

    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();

    //     xhr.setRequestHeader('Content-Type', 'application/json');

    //     xhr.open(method, url);

    //     // Parses the response to JSON
    //     xhr.responseType = 'json';

    //     xhr.onload = function() {
    //         if (xhr.status >= 200 && xhr.status < 300){
    //             resolve(xhr.response);
    //         } else {
    //             reject (new Error('Something went wrong :|'));
    //         }
    //     };

    //     xhr.onerror = function() {
    //         console.log(xhr.response);
    //         console.log(xhr.status);
    //     }

    //     xhr.send(JSON.stringify(data));
    // });

    // return promise;
}

async function fetchPosts() {
    try {
        const responseData = await sendHttpRequest(
            'GET', 
            'https://jsonplaceholder.typicode.com/posts'
        );
    
        const listOfPosts = responseData;
        //listElement.replaceChildren();
        for (const post of listOfPosts) {
            // Using the html template and performing a deep clone
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('P').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.appendChild(postEl);
        }
    } catch(error) {
        alert(error.message);
    }
}

async function createPost(title, content) {
    const userId = crypto.randomUUID();
    const post = {
        title: title,
        body: content,
        userId: userId
    }
    
    post_request = await sendHttpRequest(
        'POST', 
        'https://jsonplaceholder.typicode.com/posts',
        post
    );
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;

    createPost(enteredTitle, enteredContent)
});

postList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
});