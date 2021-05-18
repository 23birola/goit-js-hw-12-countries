import './sass/main.scss';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const refs = {
  searchCountry: document.querySelector('#country'),
  countryContainer: document.querySelector('.country')
};

refs.searchCountry.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
  const searchQuery = e.target.value;
  refs.countryContainer.innerHTML = "";

  fetchCountries(searchQuery) 
  .then(renderResult)
  .catch(onFetchError);
}

function renderResult(markup) {
  return refs.countryContainer.innerHTML = markup;
}

function onFetchError(error) {
  console.log(error);
}
