// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    // Access the missionTarget div in the HTML and update its content
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name:${name} </li>
                     <li>Diameter:${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth:${distance} </li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
    `;
}

// Function to validate input and return a descriptive string
function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

// Function to handle/deal with form submission and update status information
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // Access HTML elements to update with status information
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");
    const launchStatus = document.getElementById("launchStatus");

    // Display pilot and copilot status
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    // Check if any input fields are empty
    if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
        alert("All fields are required!");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    } else {
        list.style.visibility = "visible";

        // Check fuel level and cargo mass
        if (fuelLevel < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";

        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            if (cargoLevel > 10000) {
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                launchStatus.style.color = "red";
            } else {
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                launchStatus.innerHTML = "Shuttle is Ready for Launch";
                launchStatus.style.color = "green";
            }
        }
        /*  if (fuelLevel < 10000) {
             fuelStatus.innerHTML = "Fuel level too low for launch";
             launchStatus.innerHTML = "Shuttle Not Ready for Launch";
             launchStatus.style.color = "red";
     
         } else if (cargoLevel > 10000) {
             cargoStatus.innerHTML = "Cargo mass too heavy for launch";
             launchStatus.innerHTML = "Shuttle Not Ready for Launch";
             launchStatus.style.color = "red";
     
         } else {
             fuelStatus.innerHTML = "Fuel level high enough for launch";
             cargoStatus.innerHTML = "Cargo mass low enough for launch";
             launchStatus.innerHTML = "Shuttle is Ready for Launch";
             launchStatus.style.color = "green";
     
         } */
    }

}

// Function to fetch a list of planets from a remote API
async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });
    return planetsReturned;
}

// Function to randomly pick a planet from the provided list
function pickPlanet(planets) {
    let planetsLength = planets.length;
    let pickedPlanet = Math.floor(Math.random() * planetsLength);
    return planets[pickedPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;