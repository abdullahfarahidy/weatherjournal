

let d = new Date();
let newDate = d.toDateString();  // asking ato know the date
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="; // retrieving weather info from openweathermap.org
const apiKey = "&appid=08f9450fa5833be14086c68939a49232&units=imperial"; // my Personal API Key credential for OpenWeatherMap
const server = "http://127.0.0.1:8080"; // server url to perform POST AND GET REQUESTS
const error = document.getElementById("error"); // showing the error to the user
function datagenr() {
    const zip = document.getElementById("zip").value; // geting zip values from user
    const feelings = document.getElementById("feelings").value;
    Weathergot(zip).then((data) => {                                       // this is a return promise for weathrgot
        if (data) {
            const {                  //checking for data recieved
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;

            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                description,
                feelings,
            };
            postData(server + "/add", info);

            updatingUI();
            document.getElementById('entry').style.opacity = 1;
        }
    });
};

document.getElementById("generate").addEventListener("click", datagenr);  //this Event listener to perform datagenr when clicking on specified dom html element
const Weathergot = async (zip) => {
    try {
        const res = await fetch(baseURL + zip + apiKey);
        const data = await res.json();

        if (data.cod != 200) {
            // display the error message on UI
            error.innerHTML = data.message;
            setTimeout(_ => error.innerHTML = '', 2000)
            throw `${data.message}`;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};


const postData = async (url = "", info = {}) => { // this function for dataposting
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const newData = await res.json();
        console.log(`You just saved`, newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
};
// the bellow function GET data and update UI accordingly
const updatingUI = async () => {
    const res = await fetch(server + "/all");
    try {
        const savedData = await res.json();

        document.getElementById("date").innerHTML = savedData.newDate;
        document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("temp").innerHTML = savedData.temp + '&degC';
        document.getElementById("description").innerHTML = savedData.description;
        document.getElementById("content").innerHTML = savedData.feelings;
    } catch (error) {
        console.log(error);
    }
};