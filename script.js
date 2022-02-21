const endPoint = 'https://restcountries.com/v2/all';
const searchForm = document.querySelector('.search-box');
const searchInt = document.querySelector('.searchbar');
const searchResult = document.querySelector('.search-results');
const resultContainer = document.querySelector('.result-container');
const cardsContainer = document.querySelector('.main-container');
let counteries = [];
const history = [];

const fetchData = async () => {
  const response = await fetch(endPoint);
  const data = await response.json();
  counteries.push(...data);
};
fetchData();

const findMathes = (intput, cunts) => {
  return cunts.filter(place => {
    const regex = RegExp(intput, 'gi');
    return place.name.match(regex);
  });
};

const displayCountry = (country) => {
  return `
    <div class="counry-info">
      <div class="general-info">
        <h3>Country name: <span>${country.name}</span></h3>
        <p>Area <span>${country.area}</span> h</p>
        <p>Capital City: <span>${country.capital}</span></p>
        <p>Population: <span>${country.population}</span></p>
      </div>
      <div class="flag-container">
      <img src=${country.flag} alt="flag">
      </div>
    </div>
  `
};

const displayCard = (country) => {
  return `
    <div class="card">
      <h2>${country.name}</h2>
      <img src=${country.flag} alt="">
    </div>
  `
}

const displayAllCards = (arr) => {
    return arr.map((obj) => {
     return displayCard(obj)
    }).join('');
};

const displayMatches = (e) => {
  const matchedList = findMathes(e.target.value, counteries);
    searchResult.innerHTML = matchedList.map((place) => {
    return `<li class="resultItems">${place.name}</li>`
  }).join('');

  const results = document.querySelectorAll(".resultItems");
  results.forEach(result => {
    result.addEventListener('click', getInput)
  });
};

const getInput = (e) => {
  searchInt.value = e.target.innerText;
  searchResult.innerHTML = '';
};


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = findMathes(searchInt.value, counteries);
  const html = displayCountry(data[0]);
  history.push(data[0]);
  resultContainer.innerHTML = html;
  cardsContainer.innerHTML = displayAllCards(history);
  searchResult.innerHTML = '';
  searchForm.reset();
})


searchInt.addEventListener('change', displayMatches);
searchInt.addEventListener('keydown', displayMatches);
