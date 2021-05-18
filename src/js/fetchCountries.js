import countryCardTemplate from '../templates/country-card.hbs';
import countriesListTemplate from '../templates/countries-list.hbs';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

const BASE_URL = 'https://restcountries.eu';

export default function fetchCountries(searchQuery) {
 return fetch(`${BASE_URL}/rest/v2/name/${searchQuery}`)
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
}