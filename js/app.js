const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const wetherInfoWrapper = document.querySelector(".wether-info-wrapper");
const togglePopup = document.querySelector(".how-to-search");
const popUp = document.querySelector(".popup-btn");
const autoCompleteDiv = document.querySelector(".auto-complete");
const divAutocomplete = document.querySelector(".div-autocomplete");

// api fetch functions ===================================================================================================

function fetchData(city) {
  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=4b70f43105f5259724d51cac64829096&query=${city}`
  )
    .then(response => response.json())
    .then(data => generateHTML(data));
}

// end api fetch functions ===================================================================================================

let resultsCursor = -1;
let icons = [];
const listOfCapitals = [
  "Tirana",
  "Kabul",
  "Algiers",
  "Andorra la Vella",
  "Luanda",
  "Saint John's",
  "Buenos Aires",
  "Yerevan",
  "Canberra",
  "Vienna",
  "Baku",
  "Nassau",
  "Manama",
  "Dhaka",
  "Bridgetown",
  "Minsk",
  "Brussels",
  "Belmopan",
  "Porto-Novo",
  "Thimphu",
  "La Paz",
  "Sucre",
  "Sarajevo",
  "Gaborone",
  "Brasilia",
  "Bandar Seri Begawan",
  "Sofia",
  "Ouagadougou",
  "Bujumbura",
  "Phnom Penh",
  "Yaounde",
  "Ottawa",
  "Praia",
  "Bangui",
  "N'Djamena",
  "Santiago",
  "Beijing",
  "Bogota",
  "Moroni",
  "Brazzaville",
  "Kinshasa",
  "San Jose",
  "Yamoussoukro",
  "Abidjan",
  "Zagreb",
  "Havana",
  "Nicosia",
  "Prague",
  "Copenhagen",
  "Djibouti",
  "Roseau",
  "Santo Domingo",
  "Dili",
  "Quito",
  "Cairo",
  "San Salvador",
  "Malabo",
  "Asmara",
  "Tallinn",
  "Addis Ababa",
  "Suva",
  "Helsinki",
  "Paris",
  "Libreville",
  "Banjul",
  "Tbilisi",
  "Berlin",
  "Accra",
  "Athens",
  "Saint George's",
  "Guatemala City",
  "Conakry",
  "Bissau",
  "Georgetown",
  "Port-au-Prince",
  "Tegucigalpa",
  "Budapest",
  "Reykjavik",
  "New Delhi",
  "Jakarta",
  "Tehran",
  "Baghdad",
  "Dublin",
  "Jerusalem",
  "Rome",
  "Kingston",
  "Tokyo",
  "Amman",
  "Astana",
  "Nairobi",
  "Tarawa Atol",
  "Pyongyang",
  "Seoul",
  "Pristina",
  "Kuwait City",
  "Bishkek",
  "Vientiane",
  "Riga",
  "Beirut",
  "Maseru",
  "Monrovia",
  "Tripoli",
  "Vaduz",
  "Vilnius",
  "Luxembourg",
  "Skopje",
  "Antananarivo",
  "Lilongwe",
  "Kuala Lumpur",
  "Male",
  "Bamako",
  "Valletta",
  "Majuro",
  "Nouakchott",
  "Port Louis",
  "Mexico City",
  "Palikir",
  "Chisinau",
  "Monaco",
  "Ulaanbaatar",
  "Podgorica",
  "Rabat",
  "Maputo",
  "Naypyidaw",
  "Windhoek",
  "Yaren",
  "Kathmandu",
  "Amsterdam",
  "Wellington",
  "Managua",
  "Niamey",
  "Abuja",
  "Oslo",
  "Muscat",
  "Islamabad",
  "Melekeok",
  "Panama City",
  "Port Moresby",
  "Asuncion",
  "Lima",
  "Manila",
  "Warsaw",
  "Lisbon",
  "Doha",
  "Bucharest",
  "Moscow",
  "Kigali",
  "Basseterre",
  "Castries",
  "Kingstown",
  "Apia",
  "San Marino",
  "Sao Tome",
  "Riyadh",
  "Dakar",
  "Belgrade",
  "Victoria",
  "Freetown",
  "Singapore",
  "Bratislava",
  "Ljubljana",
  "Honiara",
  "Mogadishu",
  "Pretoria",
  "Bloemfontein",
  "Juba",
  "Madrid",
  "Sri Jayewardenepura Kotte",
  "Khartoum",
  "Paramaribo",
  "Mbabane",
  "Stockholm",
  "Bern",
  "Damascus",
  "Taipei",
  "Dushanbe",
  "Dodoma",
  "Bangkok",
  "Lome",
  "Nuku'alofa",
  "Port-of-Spain",
  "Tunis",
  "Ankara",
  "Ashgabat",
  "Funafuti",
  "Kampala",
  "Kiev",
  "Abu Dhabi",
  "London",
  "Washington D.C.",
  "Montevideo",
  "Tashkent",
  "Port-Vila",
  "Vatican City",
  "Caracas",
  "Hanoi",
  "Sanaa",
  "Lusaka",
  "Harare"
];

weatherCodes = [
  {
    code: 113,
    description: "Clear/Sunny"
  },

  {
    code: 116,
    description: "Partly Cloudy"
  },

  {
    code: 119,
    description: "Cloudy"
  },

  {
    code: 122,
    description: "Overcast"
  },

  {
    code: 143,
    description: "Mist"
  },

  {
    code: 176,
    description: "Patchy rain nearby"
  },

  {
    code: 179,
    description: "Patchy snow nearby"
  },

  {
    code: 182,
    description: "Patchy sleet nearby"
  },

  {
    code: 185,
    description: "Patchy freezing drizzle nearby"
  },

  {
    code: 200,
    description: "Thundery outbreaks in nearby"
  },

  {
    code: 227,
    description: "Blowing snow"
  },

  {
    code: 230,
    description: "Blizzard"
  },

  {
    code: 248,
    description: "Fog"
  },

  {
    code: 260,
    description: "Freezing fog"
  },

  {
    code: 263,
    description: "Patchy light drizzle"
  },

  {
    code: 266,
    description: "Light drizzle"
  },

  {
    code: 281,
    description: "Freezing drizzle"
  },

  {
    code: 284,
    description: "Heavy freezing drizzle"
  },

  {
    code: 293,
    description: "Patchy light rain"
  },

  {
    code: 296,
    description: "Light rain"
  },

  {
    code: 299,
    description: "Moderate rain at times"
  },

  {
    code: 302,
    description: "Moderate rain"
  },

  {
    code: 305,
    description: "Heavy rain at times"
  },

  {
    code: 308,
    description: "Heavy rain"
  },

  {
    code: 311,
    description: "Light freezing rain"
  },

  {
    code: 314,
    description: "Moderate or Heavy freezing rain"
  },

  {
    code: 317,
    description: "Light sleet"
  },

  {
    code: 323,
    description: "Patchy light snow"
  },

  {
    code: 326,
    description: "Light snow"
  },

  {
    code: 329,
    description: "Patchy moderate snow"
  },

  {
    code: 332,
    description: "Moderate snow"
  },

  {
    code: 335,
    description: "Patchy heavy snow"
  },

  {
    code: 338,
    description: "Heavy snow"
  },

  {
    code: 350,
    description: "Ice pellets"
  },

  {
    code: 353,
    description: "Light rain shower"
  },

  {
    code: 356,
    description: "Moderate or heavy rain shower"
  },

  {
    code: 359,
    description: "Torrential rain shower"
  },

  {
    code: 362,
    description: "Light sleet showers"
  },

  {
    code: 365,
    description: "Moderate or heavy sleet showers"
  },

  {
    code: 368,
    description: "Light snow showers"
  },

  {
    code: 371,
    description: "Moderate or heavy snow showers"
  },

  {
    code: 374,
    description: "Light showers of ice pellets"
  },

  {
    code: 377,
    description: "Moderate or heavy showers of ice pellets"
  },

  {
    code: 386,
    description: "Patchy light rain in area with thunder"
  },

  {
    code: 389,
    description: "Moderate or heavy rain in area with thunder"
  },

  {
    code: 392,
    description: "Patchy light snow in area with thunder"
  },

  {
    code: 395,
    description: "Moderate or heavy snow in area with thunder"
  }
];

// generate html functions ========================================================================================================

function generateHTML(data) {
  wetherInfoWrapper.innerHTML = "";
  const value = Object.entries(data);
  value.concat(data);
  // console.log("Console.log: ", value[1][0]);
  // for (let i = 0; i < value.length; i++) {}
  if (value[1][0] != "error") {
    icons.push(value[2][1].weather_icons);
    let div = document.createElement("div");
    div.classList = "info-card";
    wetherInfoWrapper.appendChild(div);
    div.innerHTML = `
    <div class="temperature">

    <div class="temperature-header"></div>
                                          
          <div class="wrapper-weather-icons"><img class="icons-weather" src="${iconWeather(
            icons
          )}"></div>
          <ul class="city-list">
          <li class="code-title">${weatherCode(value[2][1].weather_code)}</li>
          <li class="city-title"><i class="fas fa-city logo"></i>${
            value[1][1].name
          }</li>
          <li class="country-title"><i class="fas fa-globe-asia logo"></i> ${
            value[1][1].country
          }</li>
          </ul>
           <hr>
          <div class="col">
          <h3 class="list-button">Detailed Information</h3>
          <ul class="temp-wrap list-show">
          <li class="title-space"><i class="fas fa-temperature-low logo"> </i><span class="font-title"> FeelsLike: </span></li>
          <li class="temp">${value[2][1].feelslike}&#8451;</li>
          <li class="title-space"><i class="fas fa-cloud logo"></i><span class="font-title"> Cloudcover: </span> </li>
          <li class="temp">${value[2][1].cloudcover}%</li>
          <li class="title-space"><i class="fas fa-tint logo"></i><span class="font-title"> Precipitation: </span> </li>
          <li class="temp">${value[2][1].precip}%</li>
          </ul>
          <div class="wall"></div>
          <ul class="temp-wrap order">
          <li class="temp-title temp"><i class="fas fa-temperature-low logo-temp logo"></i><span class="font-title"> Temp: </span></li>
          <li class="temp-text temp">${value[2][1].temperature}&#8451;</li>
          <li class="title-time font"><i class="far fa-clock logo"></i><span class="font-title"> LocalTime: </span> ${formatTime(
            value[1][1].localtime
          )}</li>
          <li class="font title-date"><i class="fas fa-calendar-alt logo"></i><span class="font-title"> Date: </span> ${formatDate(
            value[1][1].localtime
          )}</li>
          </ul>
           <hr class="order">
          <div class="wall"></div>
          <ul class="temp-wrap list-show">
          <li class="title-space"><i class="fas fa-wind logo"></i><span class="font-title"> Wind Speed: </span></li>
          <li class="temp"> ${value[2][1].wind_speed} km/h</li>
          <li class="title-space"><i class="fas fa-smog logo"></i><span class="font-title"> Visibility: </span></li>
          <li class="temp">${value[2][1].visibility} km</li>
          <li class="title-space"><i class="fab fa-cloudscale logo"></i><span class="font-title"> Atm Pressure: </span> </li>
          <li class="temp">${value[2][1].pressure} mbar</li>
          </ul>
       </div>
    </div> `;
  } else {
    return;
  }
}
// end generate html functions ====================================================================================================

// icon weather functions ========================================================================================================

function iconWeather(url) {
  let str = "";
  for (let i = 0; i < url.length; i++) {
    const element = url[i];
    str = element[0];
  }
  // console.log("From iconWeather function: ", str);
  return str;
}

// end icon weather functions ===============================================================================================

// date functions ==============================================================================================================

function formatTime(data) {
  return `${data[11]}${data[12]}${data[13]}${data[14]}${data[15]}`;
}

function formatDate(data) {
  return `${data[8]}${data[9]}${data[7]}${data[5]}${data[6]}${data[4]}${data[0]}${data[1]}${data[2]}${data[3]}`;
}

// end date functions ===========================================================================================================

// weaterCode functions ==============================================================================================================

function weatherCode(code) {
  let codes;
  weatherCodes.forEach(element => {
    if (element.code === code) {
      codes = element.description;
    }
  });

  return codes;
}
// end weaterCode functions =========================================================================================================

// filtering and autocopmlete functions =========================================================================================

function autoComplete(list) {
  divAutocomplete.innerHTML = "";
  divAutocomplete.classList.add("show");
  let valueInput = input.value.toLowerCase();

  filterList = list.filter(lists => {
    return lists.toLowerCase().indexOf(valueInput) > -1;
  });

  if (filterList.length == 0) {
    divAutocomplete.classList.remove("show");
    divAutocomplete.innerHTML = "";
  }
  filterList.slice(0, 5).forEach(element => {
    let div = document.createElement("DIV");
    div.classList = "list-mutch";
    divAutocomplete.appendChild(div);
    div.innerHTML = element;
    if (valueInput === "") {
      divAutocomplete.classList.remove("show");
      divAutocomplete.innerHTML = "";
    } else {
      divAutocomplete.classList.add("show");
    }
  });
}

// end filtering and autocopmlete functions ========================================================================================

// cursor arrow for autocomplete functions ========================================================================================

const listMutch = document.querySelector(".list-mutch");

const resetCursor = () => {
  for (let i = 0; i < divAutocomplete.children.length; i++) {
    divAutocomplete.children[i].classList.remove("selected");
  }
};

// end cursor arrow for autocomplete functions =====================================================================================

// eventListeners

const btnClose = document.querySelector(".btn-close");
const backdrop = document.querySelector(".backdrop");
const modalMessage = document.querySelector(".modal");
const wrapperAll = document.querySelector(".wrapper");
const header = document.querySelector("header");
const headerH1 = document.querySelector("header h1");
const footer = document.querySelector("footer");

btnClose.addEventListener("click", e => {
  backdrop.style.display = "none";
  modalMessage.style.display = "none";
  header.style.display = "block";
  wrapperAll.style.display = "block";
  footer.style.display = "block";
  // header title animation

  var textWrapper = document.querySelector(".ml9 .letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: false })
    .add({
      targets: ".ml9 .letter",
      duration: 500
    })
    .add({
      targets: ".ml9 .letter",
      scale: [0, 1],
      duration: 1500,
      elasticity: 600,
      delay: (el, i) => 45 * (i + 1)
    })
    .add({
      targets: ".ml9",
      opacity: 1,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });

  // end header title animation
});

input.addEventListener("keyup", () => {
  autoComplete(listOfCapitals);
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

input.addEventListener("keyup", e => {
  if (e.key === "ArrowDown") {
    resetCursor();
    if (resultsCursor < divAutocomplete.children.length - 1) {
      resultsCursor++;
    } else {
      resultsCursor = 0;
    }
    if (divAutocomplete.children[resultsCursor] != undefined) {
      divAutocomplete.children[resultsCursor].classList.add("selected");
    }
    return;
  }

  if (e.key === "ArrowUp") {
    resetCursor();
    if (resultsCursor > 0) {
      resultsCursor--;
    } else {
      resultsCursor = divAutocomplete.children.length - 1;
    }
    if (divAutocomplete.children[resultsCursor] != undefined) {
      divAutocomplete.children[resultsCursor].classList.add("selected");
    }
    return;
  }

  if (e.key === "Enter") {
    resetCursor();
    if (
      input.value != divAutocomplete.children[resultsCursor] &&
      divAutocomplete.children[resultsCursor] != undefined
    ) {
      input.value = divAutocomplete.children[resultsCursor].innerHTML;
      divAutocomplete.classList.remove("show");
      resultsCursor = -1;
    }
    return;
  }
});

document.addEventListener("mouseover", e => {
  if (e.target.classList.contains("list-mutch")) {
    resetCursor();
    resultsCursor = -1;
  }
});

document.addEventListener("click", e => {
  if (e.target.classList == "list-mutch") {
    input.value = e.target.innerHTML;
    divAutocomplete.classList.remove("show");
  }
});

btn.addEventListener("click", e => {
  let inputValue = input.value.toLowerCase();
  fetchData(inputValue);
  input.value = "";
});

popUp.addEventListener("click", e => {
  togglePopup.classList.toggle("show-popup");
});

document.addEventListener("click", e => {
  if (e.target.classList != "popup-btn") {
    togglePopup.classList.remove("show-popup");
  }
  if (e.target != input) {
    divAutocomplete.classList.remove("show");
  }
});

document.addEventListener("click", e => {
  if (e.target.classList == "list-button") {
    const listShow = document.querySelectorAll(".list-show");
    listShow.forEach(element => {
      element.classList.toggle("show");
    });
  }
});