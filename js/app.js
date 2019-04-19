
var searchInput = document.querySelector('#search');
var result      = document.querySelector('#result-movie');


document.querySelector('#form-search').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if(!searchInput.value.trim()){
        return false;
    }

    getMovie(searchInput.value);
});


function getMovie(searchValue){
    
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=4eb50057`)
        .then(res => {
            return res.json();
        })
        .then(data => {           
            if(data.Response === "True"){
                searchInput.value = '';
                result.innerHTML = '';
                data.Search.forEach(AddToHtml);
                
            }else{
                result.innerHTML = 'Movie Not Found ! please search again';
            }
        })
        .catch(err => console.log(err))
}

function AddToHtml(item){
    console.log(item);

    let list  = '';
    var image = '';
    if(item.Poster === "N/A"){
        image = 'https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=547';
    }else{
        image = item.Poster;
    }

    list += `
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">${item.Title}</h5>
                <p class="card-text">Year: ${item.Year}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
        `;
    result.innerHTML += list;
}