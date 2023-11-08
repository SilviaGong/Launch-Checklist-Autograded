
// Write your JavaScript code here!
window.addEventListener("load", function () {


    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        // console.log(listedPlanets);
    }).then(function () {
        // console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let pickedPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, pickedPlanet.name, pickedPlanet.diameter, pickedPlanet.star, pickedPlanet.distance, pickedPlanet.moons, pickedPlanet.image);
        let button = document.getElementById("formSubmit");
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default form submission
            const pilot = document.getElementById("pilotName").value;
            const copilot = document.getElementById("copilotName").value;
            const fuelLevel = document.getElementById("fuelLevel").value;
            const cargoLevel = document.getElementById("cargoMass").value;
            const list = document.getElementById("faultyItems");

            formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
        });
    })
});


