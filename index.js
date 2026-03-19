let submitBtn = document.getElementById("submit-btn");
let output = document.getElementById("output");
let appointmentTime = document.getElementById("appointment-time");
let appointmentDate = document.getElementById("appointment-date");
let arrivalTime = document.getElementById("arrival-time");
let infantCheck = document.getElementById("infant-check");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // stop form from refreshing the page

    let timeValue = appointmentTime.value.trim();
    let dateValue = document.getElementById("appointment-date").value;
    let hours, minutes;

    //validate two types of inputs
    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeValue)) {
        [hours, minutes] = timeValue.split(":").map(Number);
    }
    else if (/^([01]\d|2[0-3])([0-5]\d)$/.test(timeValue)) {
        hours = Number(timeValue.slice(0, 2));
        minutes = Number(timeValue.slice(2, 4));
    }
    else {
        output.textContent = "Enter time as HH:MM or HHMM (24-hour format).";
        return;
    }

    let [year, month, day] = dateValue.split("-").map(Number);
    let appointmentDateObj = new Date(year, month - 1, day);

    //round down to nearest 15 minutes
    minutes = roundDownTo15(minutes);

    appointmentDateObj.setHours(hours);
    appointmentDateObj.setMinutes(minutes);

    


    //1 hr = 3600000 mili
    //1 min = 60000 mili

    let isInfant = infantCheck.checked;
    console.log(isInfant);

    let arrivalMili = arrivalTime.value * 60000;

    let arrivalDateObj = new Date(appointmentDateObj.getTime() - arrivalMili); //usually 1 hr 15 minutes
    let stopSolidsDateObj = new Date(appointmentDateObj.getTime() - 23400000); //6.5 hrs
    let stopClearLiquidsDateObj = new Date(arrivalDateObj.getTime() - 7200000); //2 hrs
    let stopBreastmilkDateObj = new Date(arrivalDateObj.getTime() - 16200000); //4.5 hr
    
    let rows = `
    <tr>
        <th>Surgery (rounded)</th>
        <td>${dateToString(appointmentDateObj)}</td>
    </tr>
    <tr>
        <th>Arrival</th>
        <td>${dateToString(arrivalDateObj)}</td>
    </tr>
    <tr>
        <th>Stop Solids</th>
        <td>${dateToString(stopSolidsDateObj)}</td>
    </tr>
    <tr>
        <th>Stop Clear Liquids</th>
        <td>${dateToString(stopClearLiquidsDateObj)}</td>
    </tr>
    `;

    if (isInfant) {
        rows += `
        <tr>
        <th>Stop Breastmilk</th>
        <td>${dateToString(stopBreastmilkDateObj)}</td>
        </tr>
        `;
    }

    output.innerHTML = `
    <table class="table table-bordered">
        <tbody>
        ${rows}
        </tbody>
    </table>
    `;
});

function dateToString(date) {
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${hours}:${minutes}`);
}

function roundDownTo15(number) {
  return Math.floor(number / 15) * 15;
}