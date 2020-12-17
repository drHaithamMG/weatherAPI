/**
 * Main function calling
 */
const body = document.getElementById('body');
body.addEventListener('onload', main());

/**Function main
 * description : build the element tree
 * @param {void}
 * @return {void}
 */
function main() {
    //Fetching data
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=amman&appid=93d38e2b9c8e84017bcb8d0d4fe00521&units=metric')
        .then(response => response.json())
        .then(data => buildApp(data));
}
/**
 * 
 * @param {object} data
 * @returns {void}  
 */
function buildApp(data) {
    const warpper = document.querySelector('.widget-warpper');
    const city = data.city.name;
    const country = data.city.country;
    const currentTemp = Math.floor(data.list[0].main.temp);
    const currentIcon = data.list[0].weather[0].icon;
    const currentWeatherDescription = data.list[0].weather[0].description;
    //debug
    console.log(data);
    //end debug
    const days=new Map();
    let day=[];
    //Building first weather widget
    buildCurrentWidget(warpper, city, country, currentTemp, currentIcon, currentWeatherDescription);
    //Parsing data for next days widget
    let currentDate = data.list[0].dt_txt.split(' ')[0];
    for (let i = 1; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes(currentDate)) {
            day.push(data.list[i]);
            if (i < data.list.length - 1 && !(data.list[i + 1].dt_txt || '').includes(currentDate)) {
                days.set(currentDate,day);
                day=[];
                currentDate = data.list[i + 1].dt_txt.split(' ')[0];
            }
            days.set(currentDate,day);
        }
    }
    //Building widget for next days
    for(let day of days.values() ){
        let html=`<div class="templete-widget-warpper">`;
        for(let hour of day){
            let time=Number.parseInt(hour.dt_txt.split(' ')[1])-12;
            let amOrPm;
            if(time>0)
            {amOrPm='pm';}
            else 
            {amOrPm='am';time+=12;}
            html+=`<div class="data-warpper">
            <span class="tempreture">${Math.floor(hour.main.temp)}&deg</span>
            <img
              src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png"
              alt="${hour.weather[0].description}"
              class="w-icon"
            />
            <span class="time">${time}</span>
            <span class="am-pm">${amOrPm}</span>
          </div>`
        }
        html+=` </div>`;
        warpper.innerHTML+=html;
    }
}
/**
 * Build the current tempreture widget
 * @param {object} warpper 
 * @param {string} city 
 * @param {string} country 
 * @param {number} currentTemp 
 * @param {string} currentIcon 
 * @param {string} currentWeatherDescription 
 */
function buildCurrentWidget(warpper, city, country, currentTemp, currentIcon, currentWeatherDescription) {
    //Current Temp Warpper 
    const currentTempWarpper = document.createElement('div');
    currentTempWarpper.classList.add('current-temp-warpper');
    //Temp warrper
    const tempWarpper = document.createElement('div');
    tempWarpper.classList.add('temp-warpper');
    //Temp
    const temp = document.createElement('span');
    temp.classList.add('temp');
    temp.textContent = currentTemp;
    //Country
    const cityCountry = document.createElement('span');
    cityCountry.classList.add('country');
    cityCountry.textContent = `${city}, ${country}`;
    //Weather Image div
    const weatherImgDiv = document.createElement('div');
    weatherImgDiv.classList.add('weather-img');
    //Weather Icon
    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('w-img');
    weatherIcon.src = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    weatherIcon.alt = currentWeatherDescription;
    //Building current widget-----------
    //Add CurrentTempWarpper
    warpper.appendChild(currentTempWarpper);
    //Get CurrentTempWarpper to append element on it.
    const currentTempWarpperId = document.querySelector('.current-temp-warpper');
    //Add tempWarpper
    currentTempWarpperId.appendChild(tempWarpper);
    //Get tempWarpper to append element on it .
    const tempWarpperId = document.querySelector('.temp-warpper');
    //Add temp and city
    tempWarpperId.appendChild(temp);
    temp.innerHTML+=`&deg`
    tempWarpperId.appendChild(cityCountry);
    //Add image
    currentTempWarpperId.appendChild(weatherImgDiv);
    //Get WeatherImgDiv to append element on it.
    const weatherImgDivId = document.querySelector('.weather-img');
    //Add weatherIcon
    weatherImgDivId.appendChild(weatherIcon)

}