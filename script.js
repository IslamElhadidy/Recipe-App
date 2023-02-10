// www.themealdb.com/api/json/v1/1/lookup.php?i={id}
// www.themealdb.com/api/json/v1/1/filter.php?i={searchTerm}

// Variables
 let searchInput = document.querySelector('.search-input')
 let searchBtn = document.querySelector('#search-button')
 let resultArea = document.querySelector('.results');
 let recipeDetails = document.querySelector('.details')
 
//  Events
searchBtn.addEventListener('click', getRecipes)
resultArea.addEventListener('click' , getRecipeDetails)
recipeDetails.addEventListener('click', closeDataInfo)

function getRecipes() {
    let searchTerm = searchInput.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`

    fetch(apiUrl)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        displayRecipes(data)
    })
}



function displayRecipes(recipes) {
    resultArea.innerHTML = ''
    if (recipes.meals === null) {
        resultArea.innerHTML = alert('Please Write Correct Data Name')
        window.location.reload();
    }
    else {
        
        recipes.meals.map((recipe) => {
            resultArea.innerHTML += `
            <div class="card-info">
                <div class="image">
                    <img src="${recipe.strMealThumb}" alt="">
                </div>
                <div class="info">
                    <h2>${recipe.strMeal}</h2>
                    <a href="#" class='rec-detail' data-id=${recipe.idMeal}>Get Details</a>
                </div>
            </div>
            `
        } )
    }
}


function getRecipeDetails(e) {
    if(e.target.classList.contains('rec-detail')) {
        let idData = e.target.getAttribute('data-id');
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idData}`;

        fetch(apiUrl)
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            DisplayRecipeDetails(data)
        })
    }
}

function DisplayRecipeDetails(recipeItem) {
    recipeDetails.innerHTML = '';
    let item = recipeItem.meals[0];
    recipeDetails.classList.remove('show-details')
    recipeDetails.innerHTML = `
        <i class="fa-solid fa-circle-xmark"></i>
        <h3>${item.strMeal}</h3>
        <span>Instruction ..</span>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}" target="_blank" >Watch Video</a>
    `
}


function closeDataInfo(e) {
    if(e.target.classList.contains('fa-circle-xmark')) {
        recipeDetails.classList.add('show-details')
    }
}