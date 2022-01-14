const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';
    
    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieElement = document.createElement('li');
        const { info, ...otherProperties } = movie;
        const { title: movieTitle } = info;
        
        let { getFormattedTitle } = movie;
        //getFormattedTitle = getFormattedTitle.bind(movie);
        let text = getFormattedTitle.call(movie) + ' - ';
        
        console.log(otherProperties);
        
        for(const key in info) {
            if (key !== 'title' && key !== '_title') {
                text = text + `${key}: ${info[key]}`;
            }
        }
        movieElement.textContent = text;
        movieList.append(movieElement);
    });
};

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;
    
    // if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
    //     return
    // }

    const newMovie = {
        info: {
            set title(val) {
                if (val.trim() === '') {
                    this._title = 'DEFAULT';
                    return;
                }
                // Using _title reference to the internal property
                this._title = val;
            },
            get title() {
                return this._title;
            },
            [extraName]: extraValue
        },
        id: Math.random().toString(),
        getFormattedTitle() {
            return this.info.title.toUpperCase();
        }
    };

    // Executes the setter
    newMovie.info.title = title;
    // Executes the getter
    console.log(newMovie.info.title);
    movies.push(newMovie);
    renderMovies();
};

const searchMovieHandler = () => {
    console.log(this);
    const filterTitle = document.getElementById('filter-title').value;
    renderMovies(filterTitle);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);