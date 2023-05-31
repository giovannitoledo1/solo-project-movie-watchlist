const searchBtnElm = document.getElementById('search-btn');
const searchInputElm = document.getElementById('search-input');
const startExploringWrapperElm = document.getElementById('start-exploring-wrapper')
let html = "";
const movie = {
    title: [],
    year: [],
    poster: [],
    plot: []
}

function renderContent(){
    let html = ""
    startExploringWrapperElm.style.marginTop = '50px'
    for (let i =0; i < movie.title.length; i++){
        html += `
            <div class="movie-container">
                <div id="poster-container">
                    <img id="poster" src="${movie.poster[i]}" />
                </div>
                <div id="movie-detials-container">
                    <h3 id="title">${movie.title[i]}</h3>
                    <p id"description">${movie.year[i]}</p>
                    <p id="plot">${movie.plot[i]}</p>
                </div> 
            </div>
            <hr/>  
        `
    }
    startExploringWrapperElm.innerHTML = html
}

function noMovieFound(){
    startExploringWrapperElm.innerHTML = `
        <h3 id="title">Unable to find what you're looking for.<br>
            Please try aother search.
        </h3> 
    `
}

searchBtnElm.addEventListener('click', function(){
    if(searchInputElm.value === ""){
        noMovieFound()
    } else {
    fetch(`http://www.omdbapi.com/?t=${searchInputElm.value}&apikey=f895ed9b`)
        .then(res => res.json())
        .then(data=> {
                movie.title.unshift(data.Title)
                movie.year.unshift(data.Year)
                movie.poster.unshift(data.Poster)
                movie.plot.unshift(data.Plot)
                renderContent();            
        })
        .catch(err => {
            // noMovieFound()
        })
    }
})


