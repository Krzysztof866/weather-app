const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');


const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=74010a6e021d61f14cf4a47b55968c75';
const units = '&units=metric';
let city;
let url;


const getWeather = () => {
    city = (!input.value) ? 'Krakow' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather);

            cityName.textContent = res.data.name;
            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';

            warning.textContent = '';
            input.value = '';

            if (status.id >= 200 && status.id <= 232) {
                photo.setAttribute('src', "img/thunderstorm.svg");
                weather.textContent = 'burzowo';
            } else if (status.id >= 300 && status.id <= 321) {
                photo.setAttribute('src', "img/drizzle.svg");
                weather.textContent = 'mżawka';
            } else if (status.id >= 500 && status.id <= 531) {
                photo.setAttribute('src', "img/rain.svg");
                weather.textContent = 'deszczowo';
            } else if (status.id >= 600 && status.id <= 622) {
                photo.setAttribute('src', "img/snow.svg");
                weather.textContent = 'śnieżnie';
            } else if (status.id >= 801 && status.id <= 804) {
                photo.setAttribute('src', "img/cloud.svg");
                weather.textContent = 'pochmurnie';
            } else if (status.id === 800) {
                photo.setAttribute('src', "img/sun.svg");
                weather.textContent = 'bezchmurnie';
            } else if (status.id === 741) {
                photo.setAttribute('src', "img/cloud.svg");
                weather.textContent = 'mgliście';
            } else {
                photo.setAttribute('src', "img/other.svg");
                weather.textContent = 'inne';
            }

        })
        .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta')
        
};

const enterCheck = () => {
    if (event.keyCode === 13) {
        getWeather();
    }
};

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);


