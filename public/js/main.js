const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");


//set Today Day and Date
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const currentDate = new Date();
const dayIndex = currentDate.getDay();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = dayNames[dayIndex];

const monthIndex = currentDate.getMonth();
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

day.innerText = dayName;
today_date.innerText=currentDate.getDate()+" "+monthNames[monthIndex];

const getInfo = async (event) => {

    event.preventDefault();

    let cityVal = cityName.value;
    const apiKey = "53b8b54a868e723ce0b3d64a7e892f72"

    if (cityVal === "") {
        city_name.innerText = `write the name before you search`;
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}`

            const responseData = await fetch(url);
            const data = await responseData.json(responseData);
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            
            const temperature="<span>"+arrData[0].main.temp+"<sup>o</sup>C";
            temp.innerHTML=temperature;

            // temp_status.innerText=arrData[0].weather[0].main;

            const tempMode = arrData[0].weather[0].main;

            if (tempMode === "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68';></i>";
            } else if (tempMode === "Cloud") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6';></i>";
            } else if (tempMode === "Rain") {
                temp_status.innerHTML = "<i class='fas fa-rain' style='color:#a4b0be';></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68';></i>";
            }

        } catch (err) {
            console.log(err);
            city_name.innerText = `write the name Properly`;
            temp.innerHTML="<span>0<sup>o</sup>C</span>";
            temp_status.innerHTML="<i class='fa-solid fa-circle-exclamation'></i>";
        }

    }
}
submitBtn.addEventListener("click", getInfo);