let keyAPI = "7590b58fc327c0300af42791a4390329";

/*Выводим температуру в настоящий момент*/
let temperatureNow = document.querySelector("#temperature-now");
let currentClarity = document.querySelector("#current-clarity");


fetch(`http://api.openweathermap.org/data/2.5/weather?q=Perm&lang=RU&appid=${keyAPI}`)
   .then(response => response.json())
   .then(dataNow => {
         setCurrentData()

         function setCurrentData(){
         temperatureNow.textContent = Math.round(dataNow.main.temp - 273.15);

         currentClarity.textContent = dataNow.weather[0].description;
         }
      })


let sixDaysTemperature = document.querySelectorAll(".day-temp");
let sixDaysArrTemperature = [...sixDaysTemperature];

let sixDaysTypeWeather = document.querySelectorAll(".day-weather__word");
let sixDaysTypeWeatherArr = [...sixDaysTypeWeather];

let sixDaysTypeWeatherImg = document.querySelectorAll(".day-weather__img");
let sixDaysTypeWeatherImgArr = [...sixDaysTypeWeatherImg];

let sixDaysDates = document.querySelectorAll(".day-number");
let sixDaysDatesArr = [...sixDaysDates];

let sixDaysMounth = document.querySelectorAll(".months-numder");
let sixDaysMounthArr = [...sixDaysMounth];

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=58.0105&lon=56.2502&units=metric&exclude=minutely,hourly&lang=RU&appid=${keyAPI}`)
   .then(response => response.json())
   .then(dataSixDays => {

      setCurrentDataNextSixDays()
      setCurrentDataNextSixDaysTypeWinter()
      sixDaysTypeWinterIcon()
      dateSixDays()

      setInterval(()=>{/*Автоматическое обновление через каждые 5 мин*/
         setCurrentDataNextSixDays()
         setCurrentDataNextSixDaysTypeWinter()
         sixDaysTypeWinterIcon()
         dateSixDays()

      },300000)

         /*Выводим температуру на 6 дней*/


         function setCurrentDataNextSixDays(){
            for(let i =0; i<sixDaysArrTemperature.length; i++){
               sixDaysArrTemperature[i].textContent = Math.round(dataSixDays.daily[i+1].temp.day)
            }
         }

         /*Выводим типы погоды на 6 дней*/


         function setCurrentDataNextSixDaysTypeWinter(){
            for(let i =0; i<sixDaysTypeWeatherArr.length; i++){
               sixDaysTypeWeatherArr[i].textContent = dataSixDays.daily[i+1].weather[0].description;
            }
         }

         /* Выводим иконку типа погоды*/


         function sixDaysTypeWinterIcon(){
            for(let i = 0; i < sixDaysTypeWeatherImgArr.length; i++){

//               if(dataSixDays.daily[i+1].weather[0].main === "Snow"){
//                  sixDaysTypeWeatherImgArr[i].src="img/type-weather/snow.svg"
//               } else if(dataSixDays.daily[i+1].weather[0].main === "Clouds"){
//                  sixDaysTypeWeatherImgArr[i].src="img/type-weather/cloud.svg"
//               } else if(dataSixDays.daily[i+1].weather[0].main === "Rain"){
//                  sixDaysTypeWeatherImgArr[i].src="img/type-weather/rain.svg"
//               } else if(dataSixDays.daily[i+1].weather[0].main === "Clear"){
//                  sixDaysTypeWeatherImgArr[i].src="img/type-weather/sun.svg"
//               }
                  let typeIsonWeather = dataSixDays.daily[i+1].weather[0].icon
                  sixDaysTypeWeatherImgArr[i].src=`http://openweathermap.org/img/wn/${typeIsonWeather}@2x.png`
            }
         }


      /*Выводим номер дня на 6 дней и номер месяца*/


      function dateSixDays(){
         for( let i =0; i<sixDaysDatesArr.length; i++){
            let date = dataSixDays.daily[i+1].dt;
            dateDay = new Date(date * 1000).getDate();
            dateMonth = new Date(date * 1000).getMonth()

            sixDaysDatesArr[i].textContent = dateDay;
            if(dateMonth+1 <10){
               sixDaysMounthArr[i].textContent = `0${dateMonth+1}`;
            } else sixDaysMounthArr[i].textContent = dateMonth+1;

         }
      }

   });













