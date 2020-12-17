const body=document.getElementById('body');
body.addEventListener('onload',main())

/**Function build
 * description : build the element tree
 * @param {void}
 * @return {void}
 */
function main(){
    //Fetching data
   fetch('https://api.openweathermap.org/data/2.5/forecast?q=amman&appid=93d38e2b9c8e84017bcb8d0d4fe00521&units=metric')
  .then(response => response.json())
  .then(data =>build(data) );
}

function build(data){
    const warpper=document.querySelector('.widget-warpper');
    const city=data.city.name;
    const country = data.city.country;
    const currentTemp=Math.floor(data.list[0].main.temp);
    const currentIcon=data.list[0].weather[0].icon;
    const currentWeatherDescription=data.list[0].weather[0].description;
    //debug
    console.log(data);
    //end debug
    buildCurrentWidget(warpper,city,country,currentTemp,currentIcon,currentWeatherDescription);
    const currentDate=data.list[0].dt_txt.split(' ')[0];
    let looper=1;
    while(data.list[looper].dt_txt.split(' ')[0].match(currentDate)){
        console.log(data.list[looper++]);
    }
}

function buildCurrentWidget(warpper,city,country,currentTemp,currentIcon,currentWeatherDescription){
    //Current Temp Warpper 
    const currentTempWarpper=document.createElement('div');
    currentTempWarpper.classList.add('current-temp-warpper');
    //Temp warrper
    const tempWarpper=document.createElement('div');
    tempWarpper.classList.add('temp-warpper');
    //Temp
    const temp=document.createElement('span');
    temp.classList.add('temp');
    temp.textContent=currentTemp;
    //Country
    const cityCountry=document.createElement('span');
    cityCountry.classList.add('country');
    cityCountry.textContent=`${city}, ${country}`;
    //Weather Image div
    const weatherImgDiv=document.createElement('div');
    weatherImgDiv.classList.add('weather-img');
    //Weather Icon
    const weatherIcon=document.createElement('img');
    weatherIcon.classList.add('w-img');
    weatherIcon.src=`http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    weatherIcon.alt=currentWeatherDescription;
    //Building current widget-----------
    //Add CurrentTempWarpper
    warpper.appendChild(currentTempWarpper);
    //Get CurrentTempWarpper to append element on it.
    const currentTempWarpperId=document.querySelector('.current-temp-warpper');
    //Add tempWarpper
    currentTempWarpperId.appendChild(tempWarpper);
    //Get tempWarpper to append element on it .
    const tempWarpperId=document.querySelector('.temp-warpper');
    //Add temp and city
    tempWarpperId.appendChild(temp);
    tempWarpperId.appendChild(cityCountry);
    //Add image
    currentTempWarpperId.appendChild(weatherImgDiv);
    //Get WeatherImgDiv to append element on it.
    const weatherImgDivId=document.querySelector('.weather-img');
    //Add weatherIcon
    weatherImgDivId.appendChild(weatherIcon)

}