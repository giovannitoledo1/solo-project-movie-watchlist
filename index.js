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
searchBtnElm.addEventListener('click', function(){
    function renderContent(){
        let html = ""
        startExploringWrapperElm.style.marginTop = '100px'
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
                    <hr/>
                </div>     
            `
        }
        startExploringWrapperElm.innerHTML = html
    }

    fetch(`http://www.omdbapi.com/?t=${searchInputElm.value}&apikey=f895ed9b`)
        .then(res => res.json())
        .then(data=> {
            console.log("Printing the data.search: " + data.Plot)
            movie.title.unshift(data.Title)
            movie.year.unshift(data.Year)
            movie.poster.unshift(data.Poster)
            movie.plot.unshift(data.Plot)
            renderContent();
        // console.log(title, length)
        // console.log(movie.plot)
        })
        .catch(err => {
            console.log(err)
        })
})


