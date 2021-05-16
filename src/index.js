import './sass/main.scss';
import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import countryCardTemplate from './templates/country-card.hbs';
import countriesListTemplate from './templates/countries-list.hbs';

// import fetchCountries from './js/fetchCountries'

const refs = {
  searchCountry: document.querySelector('#country'),
  countryContainer: document.querySelector('.country')
};
// console.log(refs.searchCountry.textContent);

refs.searchCountry.addEventListener('input', debounce(fetchCountries, 1000));

function fetchCountries(e) {
  console.log(e.target.value);
  let countryQuery = e.target.value;
  fetch(`https://restcountries.eu/rest/v2/name/${countryQuery}`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (data.length > 10) {
        defaultModules.set(PNotifyMobile, {});
        alert({
            text: 'Too many matches found. Please enter a more specific query'
        });
      throw "error";
    }
    if (data.length > 1) {
      return countriesListTemplate(data);
    }
    return countryCardTemplate(data);
  })
  .then(markup => { return refs.countryContainer.innerHTML = markup;})
  .catch(error => {
    console.log(error);
  });
}
