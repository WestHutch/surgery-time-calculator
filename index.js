let submitBtn = document.getElementById("submit-btn");
let output = document.getElementById("output");
let appointmentTime = document.getElementById("appointment-time");
let appointmentDate = document.getElementById("appointment-date");
let arrivalTime = document.getElementById("arrival-time");
let infantCheck = document.getElementById("infant-check");
let surgeonTimeDiv = document.getElementById("surgeon-time-div");
let isInfant = false;
let surgeonTime = document.getElementById("surgeon-time");
let breastfeedCheck = document.getElementById("breastfeed-check");
let isBreastfeeding = false;
let appointmentDateObj;

//FIX BREASTFEEDING CHECK BOX WORK

function getTimeInput(TimeEl) {
    let timeValue = TimeEl.value.trim();
    let inputHours, inputMinutes;

    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeValue)) {
        [inputHours, inputMinutes] = timeValue.split(":").map(Number);
    }
    else if (/^([01]\d|2[0-3])([0-5]\d)$/.test(timeValue)) {
        inputHours = Number(timeValue.slice(0, 2));
        inputMinutes = Number(timeValue.slice(2, 4));
    }
    else {
        output.textContent = "Enter time as HH:MM or HHMM (24-hour format).";
        return;
    }

    inputMinutes = roundDownTo15(inputMinutes);
    let dateObj = new Date(appointmentDateObj.getTime());
    dateObj.setHours(inputHours);
    dateObj.setMinutes(inputMinutes);
    return dateObj;
}

function dateToString(date) {
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${hours}:${minutes}`);
}

function roundDownTo15(number) {
  return Math.floor(number / 15) * 15;
}


infantCheck.addEventListener("click", () => {
    isInfant = infantCheck.checked;
    if (isInfant) {
        surgeonTimeDiv.style.display = "none";
        breastfeedCheck.checked = true;
    }
    else {
        surgeonTimeDiv.style.display = "block";
        breastfeedCheck.checked = false;
    }
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // stop form from refreshing the page

    let dateValue = document.getElementById("appointment-date").value;
    let [year, month, day] = dateValue.split("-").map(Number);
    appointmentDateObj = new Date(year, month - 1, day);

    appointmentDateObj = getTimeInput(appointmentTime);
    
    //1 hr = 3600000 mili
    //1 min = 60000 mili
    let arrivalMili = arrivalTime.value * 60000;

    isInfant = infantCheck.checked;
    if (isInfant == false) {
        surgeonDateObj = getTimeInput(surgeonTime);
    }

    let arrivalDateObj = new Date(appointmentDateObj.getTime() - arrivalMili); //usually 1 hr 15 minutes
    let stopClearLiquidsDateObj = new Date(arrivalDateObj.getTime() - 7200000); //2 hrs
    let stopSolidsDateObj;
    let stopBreastmilkDateObj;
    
    if (isInfant) {
        stopSolidsDateObj = new Date(arrivalDateObj.getTime() - 23400000); //6.5 hrs
        stopBreastmilkDateObj = new Date(arrivalDateObj.getTime() - 16200000); //4.5 hr
        breastfeedCheck.checked = true;
    }
    else {
        stopSolidsDateObj = new Date(surgeonDateObj.getTime() - 23400000); //6.5 hrs
        stopBreastmilkDateObj = new Date(surgeonDateObj.getTime() - 16200000); //4.5 hr
    }
    isBreastfeeding = breastfeedCheck.checked;
    
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

    if (isBreastfeeding) {
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