let rowData = document.getElementById('rowData');
let searchContainer = document.getElementById('searchInputs');
/*############################### Side Navbar Section ###########################################*/
$('.sideNav').css('left', -$('.links').outerWidth(true))
$('.navbar-toggler').on('click',function(){
    $('.navbar-toggler-icon i').toggleClass('fa-bars fa-xmark')
})

$(window).on('scroll', function(){
    if($(window).scrollTop() >= 300){
        $('nav').removeClass('bottom-0')
        $('nav').addClass('top-0')
    } else{
        $('nav').addClass('bottom-0')
        $('nav').removeClass('top-0')
    }
})

$('.open').on('click', function(){
    let sideNavbarLeft = $('.sideNav').css('left');
    let linksWidth = $('.links').outerWidth(true);
    $(this).toggleClass('fa-bars fa-xmark')

    if(sideNavbarLeft == "0px"){
        $('.sideNav').animate({left : -linksWidth},100)
        $('.links li').animate({top: "100px",opacity: '0'},100)
    } else{
        $('.sideNav').animate({left : '0px'},100)
        for (let i = 0; i < 5; i++) {
            $('.links li').eq(i).animate({top: "0px",opacity: "1"},(i + 5) * 50)
        }
    }
})
/*############################### Display Search Seaction ###########################################*/
function displaySearch(){
    box = `
        <div class="col-lg-6 my-3">
            <input oninput='getMealsByName(this.value)' class="form-control" type="search" name="search" placeholder="Search By Name...">
        </div>
        <div class="col-lg-6 my-3">
            <input oninput='getMealsByName(this.value)' maxlength='1' class="form-control" type="search" name="search" placeholder="Search By First Letter...">
        </div>
    `
    searchContainer.innerHTML = box
    rowData.innerHTML = '';
    $('.sideNav').css('left', -$('.links').outerWidth(true))
    $('.open').toggleClass('fa-bars fa-xmark')
}
$('.search').on('click',displaySearch)

async function getMealsByName(searchName){
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`),
        response = await api.json(),
        data = response.meals;
    if(data){
        displayMeals(data)
    } else{
        displayMeals([])
    }
}

async function getMealsByLetter(searchLetter){
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchLetter}`),
        response = await api.json(),
        data = response.meals;
    if(data){
        displayMeals(data)
    } else{
        displayMeals([])
    }
}
/*############################### Data When Website Reload ###########################################*/
async function getDataReload(){
    rowData.innerHTML = ''
    $('.loading').css('display', 'flex')
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`),
        response= await api.json(),
        data = response.meals;
        displayDataReload(data)
    $('.loading').fadeOut(500)
}
function displayDataReload(data){
    box = '';
    for (let i = 0; i < data.length; i++) {
        box +=`
            <div class="col-lg-3 col-md-6">
                <div onclick='getIdMeals("${data[i].idMeal}")' class="homeBox position-relative rounded-2">
                    <img src="${data[i].strMealThumb}" class="w-100" alt="${data[i].strMeal}">
                    <div class="overlay text-black position-absolute start-0 w-100 h-100 d-flex justify-content-start align-items-center">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    rowData.innerHTML = box;
    searchContainer.innerHTML = ''
}
getDataReload()

/*############################### Display Category Section ###########################################*/
async function getCategory(){
    rowData.innerHTML = ''
    $('.loading').css('display', 'flex')
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`),
        response = await api.json(),
        data = response.categories
        displayCategory(data)
    $('.loading').fadeOut(500)
}
function displayCategory(dataCategory){
    box = ''
    for (let i = 0; i < dataCategory.length; i++) {
        box += `
            <div class="col-lg-3 col-md-6">
                <div onclick='getCategoryMeals("${dataCategory[i].strCategory}")' class="homeBox position-relative text-center rounded-2">
                    <img src="${dataCategory[i].strCategoryThumb}" class="w-100" alt="">
                    <div class="overlay text-black position-absolute start-0 w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                        <h3 class='pt-3'>${dataCategory[i].strCategory}</h3>
                        <p>${dataCategory[i].strCategoryDescription.split(' ').slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        `
    }
    rowData.innerHTML = box
    searchContainer.innerHTML = ''
}
$('.category').on('click',function(){
    getCategory()
    $('.sideNav').css('left', -$('.links').outerWidth(true))
    $('.open').toggleClass('fa-bars fa-xmark')
})

/*############################### Display Area Section ###########################################*/
async function getArea(){
    rowData.innerHTML = ''
    $('.loading').css('display', 'flex')
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`),
        response = await api.json(),
        data = response.meals
        displayArea(data)
    $('.loading').fadeOut(500)
}
function displayArea(dataArea){
    box = '';
    for (let i = 0; i < dataArea.length; i++) {
        box += `
            <div class="col-lg-3 col-md-6">
                <div onclick="getAreaMeals('${dataArea[i].strArea}')" class="homeBox position-relative text-center p-3 rounded-2">
                    <i class="fa-solid fa-house-laptop"></i>
                    <h3>${dataArea[i].strArea}</h3>
                </div>
            </div>
        `
    }
    rowData.innerHTML = box
    searchContainer.innerHTML = ''
}
$('.area').on('click',function(){
    getArea()
    $('.sideNav').css('left', -$('.links').outerWidth(true))
    $('.open').toggleClass('fa-bars fa-xmark')
})

/*############################### Display Ingredients Section ###########################################*/
async function getIngredients(){
    rowData.innerHTML = ''
    $('.loading').css('display', 'flex')
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`),
        response = await api.json(),
        data = response.meals
        displayIngredients(data)
    $('.loading').fadeOut(500)
}
function  displayIngredients(dataIngredients){
    box = '';
    for (let i = 0; i < dataIngredients.length; i++) {
        if(dataIngredients[i].strDescription !== null){
            if(dataIngredients[i].strDescription !== ""){
                box += `
                    <div class="col-lg-3 col-md-6">
                        <div onclick="getIngredientsMeals('${dataIngredients[i].strIngredient}')" class="homeBox position-relative text-center py-3 rounded-2">
                            <i class="fa-solid fa-drumstick-bite"></i>
                            <h3>${dataIngredients[i].strIngredient}</h3>
                            <p class='p-0'>${dataIngredients[i].strDescription.split(' ').slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                `
            }
        }
        
    }
    rowData.innerHTML = box
    searchContainer.innerHTML = ''
}
$('.ingredients').on('click',function(){
    getIngredients();
    $('.sideNav').css('left', -$('.links').outerWidth(true))
    $('.open').toggleClass('fa-bars fa-xmark')
})
/*############################### Get All Categories Meals ###########################################*/
async function getCategoryMeals(category){
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`),
        response = await api.json(),
        data = response.meals.slice(0,20);
    displayMeals(data)
}
/*############################### Get All Areas Meals ###########################################*/
async function getAreaMeals(area){
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`),
        response = await api.json(),
        data = response.meals.slice(0,20);
    displayMeals(data)
}
/*############################### Get All ingredients Meals ###########################################*/
async function getIngredientsMeals(ingredients){
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`),
        response = await api.json(),
        data = response.meals.slice(0,20);
    displayMeals(data)
}
/*############################### Display All Categories/ Areas/ Ingredients Meals ###########################################*/
function displayMeals(dataMeals){
    let box = '';
    for (let i = 0; i < dataMeals.length; i++) {
        box += `
            <div class="col-lg-3 col-md-6">
                <div onclick='getIdMeals("${dataMeals[i].idMeal}")' class="homeBox position-relative rounded-2">
                    <img src="${dataMeals[i].strMealThumb}" class="w-100" alt="${dataMeals[i].strMeal}">
                    <div class="overlay text-black position-absolute start-0 w-100 h-100 d-flex justify-content-start align-items-center">
                        <h3>${dataMeals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    rowData.innerHTML = box
}
/*############################### Get And Display All Meals Details ###########################################*/
async function getIdMeals(idMeals){
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`),
        response = await api.json(),
        data = response.meals[0]
        displayDetails(data)
}

function displayDetails(details){
    let Allingredient = '';
    for (let i = 0; i <= 20; i++) {
        if(details[`strIngredient${i}`]){
            Allingredient += `<li class="spanMeasure">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
        }
    }

    let allTage = details.strTags?.split(',')

    if(!allTage){
        allTage = []
    }

    let strTags = '';
    for (let i = 0; i < allTage.length; i++) {
        strTags += `<li class="spanTags">${allTage[i]}</li>`
    }

    box = `
        <div class='col-12'>
            <div class='goBack text-end'>
                <i class="fa-regular fa-circle-xmark text-white fs-2"></i>
            </div>
        </div>
        <div class="col-md-4 text-white">
            <div class="image-meals rounded-2 animate__animated animate__fadeInDown">
                <img src="${details.strMealThumb}" class="w-100 image-detalis rounded-2" alt="${details.strMeal}">
                <h3 class='mt-3'>${details.strMeal}</h3>
            </div>
        </div>
        <div class="col-md-8 text-white">
            <div class="data-meals animate__animated animate__fadeInUp">
                <h3>Instructions</h3>
                <p>${details.strInstructions}</p>
                <h6>Area : <span>${details.strArea}</span></h6>
                <h6>Category : <span>${details.strCategory}</span></h6>
                <h6 class='d-flex flex-wrap gap-3'>Recipes : </h6>
                <ul class="p-0 d-flex g-3 flex-wrap">${Allingredient}</ul>
                <h6>Tags : </h6>
                <ul class="p-0 d-flex g-3 flex-wrap">${strTags}</ul>
                <button class="btn sourceBtn"><a href='${details.strSource}'>Source</a></button>
                <button class="btn youtubeBtn"><a href='${details.strYoutube}'>Youtube</a></button>
            </div>
        </div>
    `
    rowData.innerHTML = box
    searchContainer.innerHTML = ''
    $('.fa-circle-xmark').on('click',function(){
        getDataReload()
    })
}
/*############################### Display Contact-Us Seaction And Validtion Inputs ###########################################*/
let userNameInput = false
let userEmailInput = false
let userPhoneInput = false
let userAgeInput = false
let userPasswordInput = false
let repasswordInput = false

function displayContact(){
    let box = `
        <div class="col-md-6">
            <input oninput='validateInputs()' id='userNameInput' class="form-control" type="text" name="userName" placeholder="Enter Your Name...">
            <p id='nameAlert'class="animate__animated d-none text-danger text-center fw-bold mt-2 fs-5">Special characters and numbers not allowed</p>
        </div>
        <div class="col-md-6">
            <input oninput='validateInputs()' id='userEmailInput' class="form-control" type="email" name="userEmail" placeholder="Enter Your Email...">
            <p id='emailAlert' class="animate__animated d-none text-danger text-center fw-bold mt-2 fs-5">Email not valid *exemple@yyy.zzz</p>
        </div>
        <div class="col-md-6">
            <input oninput='validateInputs()' id='userPhoneInput' class="form-control" type="number" name="userPhone" placeholder="Enter Your Phone...">
            <p id='phoneAlert' class="animate__animated d-none text-danger text-center fw-bold mt-2 fs-5">Enter valid Phone Number</p>
        </div>
        <div class="col-md-6">
            <input oninput='validateInputs()' id='userAgeInput' class="form-control" type="number" name="userAge" maxlength='2' placeholder="Enter Your Age...">
            <p id='ageAlert' class="animate__animated d-none text-danger text-center fw-bold mt-2 fs-5">Enter valid age</p>
        </div>
        <div class="col-md-6">
            <input oninput='validateInputs()' id='userPasswordInput' class="form-control" type="password" name="userPassword" placeholder="Enter Your Password...">
            <p id='passwordAlert' class="animate__animated d-none text-danger text-center fw-bold mt-2 fs-5">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        </div>
        <div class="col-md-6">
            <input oninput='validateInputs()' id='repasswordInput' class="form-control" type="password" name="repassword" placeholder="Repassword...">
            <p id='repasswordAlert' class="animate__animated d-none text-danger text-center fw-bold mt-2 fs-5">Enter valid repassword</p>
        </div>
        <button id="btnSubmit" class="btn btn-outline-danger w-50 mx-auto fw-bold" disabled>Submit</button>        
    `
    rowData.innerHTML = box
    searchContainer.innerHTML = '';

    $('#userNameInput').on('focus',function(){
        userNameInput = true
    })
    $('#userEmailInput').on('focus',function(){
        userEmailInput = true
    })
    $('#userPhoneInput').on('focus',function(){
        userPhoneInput = true
    })
    $('#userAgeInput').on('focus',function(){
        userAgeInput = true
    })
    $('#userPasswordInput').on('focus',function(){
        userPasswordInput = true
    })
    $('#repasswordInput').on('focus',function(){
        repasswordInput = true
    })

}

function validateInputs(){
    if(userNameInput){
        if(validationName()){
            document.getElementById('nameAlert').classList.replace('animate__bounceIn', 'd-none')
        } else{
            document.getElementById('nameAlert').classList.replace('d-none', 'animate__bounceIn')
        }
    }
    if(userEmailInput){
        if(validationEmail()){
            document.getElementById('emailAlert').classList.replace('animate__bounceIn', 'd-none')
        } else{
            document.getElementById('emailAlert').classList.replace('d-none', 'animate__bounceIn')
        }
    }
    if(userPhoneInput){
        if(validationPhone()){
            document.getElementById('phoneAlert').classList.replace('animate__bounceIn', 'd-none')
        } else{
            document.getElementById('phoneAlert').classList.replace('d-none', 'animate__bounceIn')
        }
    }
    if(userAgeInput){
        if(validationAge()){
            document.getElementById('ageAlert').classList.replace('animate__bounceIn', 'd-none')
        } else{
            document.getElementById('ageAlert').classList.replace('d-none', 'animate__bounceIn')
        }
    }
    if(repasswordInput){
        if(validationPassword()){
            document.getElementById('passwordAlert').classList.replace('animate__bounceIn', 'd-none')
        } else{
            document.getElementById('passwordAlert').classList.replace('d-none', 'animate__bounceIn')
        }
    }
    if(repasswordInput){
        if(validationRepassword()){
            document.getElementById('repasswordAlert').classList.replace('animate__bounceIn', 'd-none')
        } else{
            document.getElementById('repasswordAlert').classList.replace('d-none', 'animate__bounceIn')
        }
    }

    if(validationName()&&
    validationEmail()&&
    validationPhone()&&
    validationAge()&&
    validationPassword()&&
    validationRepassword()){
        $('#btnSubmit').removeAttr('disabled')
        $('#btnSubmit').on('click',function(){
            $('.model').removeClass('d-none').addClass('d-flex animate__fadeIn')
            $('.load-model').fadeOut(3000,function(){
                $('.done').fadeIn(2000,function(){
                    $('.model').removeClass('d-flex').addClass('d-none')
                    getDataReload()
                })
            })
        })
    } else {
        $('#btnSubmit').attr('disabled')
    }
}

function validationName(){
    return (/^[a-zA-z]{3,}$/.test(document.getElementById("userNameInput").value))
}
function validationEmail(){
    return (/^\w{2,}@\w{2,}\.\w{2,}$/.test(document.getElementById("userEmailInput").value))
}
function validationPhone(){
    return (/^(002|02)?[0-9]{11,}$/.test(document.getElementById("userPhoneInput").value))
}
function validationAge(){
    return (/^[1-9][0-9]{0,1}$/.test(document.getElementById("userAgeInput").value))
}
function validationPassword(){
    return (/^.{8,}$/.test(document.getElementById("userPasswordInput").value))
}
function validationRepassword(){
    return document.getElementById("userPasswordInput").value == document.getElementById("repasswordInput").value
}

$('.contact-us').on('click',function(){
    displayContact()
    $('.sideNav').css('left', -$('.links').outerWidth(true))
    $('.open').toggleClass('fa-bars fa-xmark')
})