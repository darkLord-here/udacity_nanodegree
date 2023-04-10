/* Global Variables */
const API_KEY = `&appid=13269e8cd1fe5d7c49e81d4f3c6ff33d&units=imperial`;
const BASE_URI = `http://api.openweathermap.org/`
const ZIP_URI = `geo/1.0/zip?zip=`
const ONE_API = `data/2.5/weather`


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const fetchData = async(url='')=>{
    const response = await fetch(url);
    try{
        const data = await response.json();
        return data
    }catch(error){
        console.log(`Error encountered ${error}`);
    }
}

const postWeatherData = async(url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log(`Error encountered ${error}`)
    }
}

const data = async(zip_code) => {
    const apiData = await fetch(BASE_URI+ZIP_URI+zip_code+API_KEY)
    try{
        const response = await apiData.json()
        return response
    }catch(error){
        console.log(`Error encountered ${error}`)
    }
}

document.getElementById('generate').addEventListener('click', generateWeatherReport)

function generateWeatherReport(){
    let zip_code = document.getElementById('zip').value;
    fetch(BASE_URI+ZIP_URI+zip_code+API_KEY)
    .then(response => response.json())
    .then(result => fetch(BASE_URI+ONE_API+`?lat=${result.lat}&lon=${result.lon}`+API_KEY))
    .then(response => response.json())
    .then(data => postWeatherData('/addWeather',{
        temperature: data.main.temp,
        date: newDate,
        userResponse: document.getElementById('feelings').value
    }))
    .then(() => updateUI())
    .catch(error=> console.log(`Error encountered ${error}`))
} 


const updateUI = async()=>{
    const req = await fetchData('/all')
    try{
        const response = await req
        document.getElementById('date').innerText = response.date;
        document.getElementById('temp').innerText = response.temperature;
        document.getElementById('content').innerText = response.userResponse;
    }catch(error){
        console.log(`Error encountered ${error}`)
    }
}