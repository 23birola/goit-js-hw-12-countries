import './sass/main.scss';
import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import countryCardTemplate from './templates/country-card.hbs';
import countriesListTemplate from './templates/countries-list.hbs';

// import fetchCountries from './js/fetchCountries'
const BASE_URL = 'https://restcountries.eu'
const refs = {
  searchCountry: document.querySelector('#country'),
  countryContainer: document.querySelector('.country')
};

refs.searchCountry.addEventListener('input', debounce(fetchCountries, 1000));

function fetchCountries(e) {
  refs.countryContainer.innerHTML = "";
  let countryQuery = e.target.value;
  fetch(`${BASE_URL}/rest/v2/name/${countryQuery}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(error);
  })
    .then(data => {
    if (data.length > 10) {
        defaultModules.set(PNotifyMobile, {});
        alert({
            text: 'Too many matches found. Please enter a more specific query'
        });
        throw new Error(error);
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
