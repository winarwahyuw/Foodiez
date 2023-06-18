import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import './components/cardElement';
import data from '../DATA.json';

const { restaurants } = data;
const PopularSection = document.getElementById('popular');
const btnDropdown = document.getElementById('btn-dropdown');
const menuDropdown = document.getElementById('dropdown-menu');
const nextBtn = document.getElementById('right-arrow');
const prevBtn = document.getElementById('left-arrow');
const slider = document.getElementById('popular');

restaurants.forEach((resto) => {
  const CardElement = document.createElement('card-element');

  CardElement.setAttribute('card-element', resto.id);
  CardElement.setAttribute('image', resto.pictureId);
  CardElement.setAttribute('name', resto.name);
  CardElement.setAttribute('rating', resto.rating);
  CardElement.setAttribute('city', resto.city);

  PopularSection.appendChild(CardElement);
});

btnDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
  if (menuDropdown.classList.contains('show')) {
    menuDropdown.classList.remove('show');
    menuDropdown.classList.add('hide');
  } else {
    menuDropdown.classList.remove('hide');
    menuDropdown.classList.add('show');
  }
});

function scrollLeft() {
  setTimeout(() => {
    slider.scrollTo(slider.scrollLeft + 600, window.scrollY);
  }, 10);
}

function scrollRight() {
  setTimeout(() => {
    slider.scrollTo(slider.scrollLeft - 600, window.scrollY);
  }, 10);
}

nextBtn.addEventListener('click', scrollLeft);
prevBtn.addEventListener('click', scrollRight);
