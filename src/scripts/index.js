import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './components/cardElement'
import data from '../DATA.json' ;

const { restaurants } = data;
const PopularSection = document.getElementById("popular");

restaurants.forEach(resto => {
    let CardElement = document.createElement("card-element");

    CardElement.setAttribute("id", resto.id)
    CardElement.setAttribute("image", resto.pictureId)
    CardElement.setAttribute("name", resto.name)
    CardElement.setAttribute("rating", resto.rating)
    CardElement.setAttribute("city", resto.city)

    PopularSection.appendChild(CardElement)
});

let btnDropdown = document.getElementById("btn-dropdown")
let menuDropdown = document.getElementById("dropdown-menu")
btnDropdown.addEventListener("click", function(e){
    if(menuDropdown.classList.contains("show")){
        menuDropdown.classList.remove("show")
        menuDropdown.classList.add("hide")
    }else{
        menuDropdown.classList.remove("hide")
        menuDropdown.classList.add("show")
    }
})

const scrollLeft = function () {  
    setTimeout(function () {
    slider.scrollTo(slider.scrollLeft + 600, window.scrollY);
    }, 10);
};

const scrollRight = function () {  
    setTimeout(function () {
    slider.scrollTo(slider.scrollLeft - 600, window.scrollY);
    }, 10);
};

let nextBtn = document.getElementById("right-arrow")
let prevBtn = document.getElementById("left-arrow")
let slider = document.getElementById("popular")
nextBtn.addEventListener("click", scrollLeft);
prevBtn.addEventListener("click", scrollRight);