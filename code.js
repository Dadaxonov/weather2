const api={
    key:'99ee2aeb737a00b2e6651cab578224a6',
    baseurl:"https://api.openweathermap.org/data/2.5/",
}

const searchBox=document.querySelector('.search-box');

searchBox.addEventListener("keypress",setQuery)


function setQuery(e){
    if(e.keyCode==13){
        getResults(searchBox.value)
        console.log(searchBox.value);
    }
}


function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather)=>{
        return weather.json();
    }).then(displayResults).catch((error)=>{console.log(error);});
}


displayResults =(weather)=>{
    console.log(weather);
    let city= document.querySelector('.location .city')
    city.innerHTML=`${weather.name},${weather.sys.country}`;

    let now =new Date();
    let date = document.querySelector('.location .date')
    date.innerHTML = `${dateBuilder(now)}`;

    let temp =document.querySelector('.temp')
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl=document.querySelector('.weather')
    weatherEl.innerHTML=weather.weather[0].main;

    let hilow=document.querySelector('.hi-low');
    hilow.innerHTML = `${weather.main.temp_min}°C/ ${weather.main.temp_max}°C`
}



function dateBuilder(s){
    let months=['Yanvar','Febrar','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr']
    let days=['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba']

    let day=days[s.getDay()];
    let date=s.getDate();
    let month =months[s.getMonth()];
    let year=s.getFullYear();
    return `${day} ${date} ${month} ${year}`
}