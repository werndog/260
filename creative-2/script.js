document.getElementById("countrySubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("countryInput").value;
    console.log(value);
    if (value === "") {
        const url = "https://api.covid19api.com/countries"
        fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log("countries", json);
            json.sort((a, b) => (a.Country > b.Country) ? 1 : -1);
            let results = "<p>Please choose from one of the following countries or enter 'World'.</p>";
            results += "<ul>";
            console.log("first", json.length)
            for (let i = 0; i < json.length; i++) {
                // US doesn't work with the API even though they list it...
                if (json[i].Country == "United States of America") {
                    continue;
                }
                results += "<li>" + json[i].Country + "</li>";
            }
            results += "</ul>";
            document.getElementById("countryResults").innerHTML = results;
        });
    } else if (value == "World") {
        const url = "https://api.covid19api.com/world/total";
        fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let results = "<h2>World Statistics</h2>";
            results += "<p>Confirmed: " + json.TotalConfirmed.toLocaleString() + "</p>";
            results += "<p>Recovered: " + json.TotalRecovered.toLocaleString() + "</p>";
            results += "<p>Deaths: " + json.TotalDeaths.toLocaleString() + "</p>";
            document.getElementById("countryResults").innerHTML = results;
        })
    } else {
        const url1 = "https://api.covid19api.com/dayone/country/" + value + "/status/confirmed";
        let results = "";
        fetch(url1)
        .then(function(response) {
            if (response.status == 404) {
                const url = "https://api.covid19api.com/countries"
                fetch(url)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log("countries", json);
                    json.sort((a, b) => (a.Country > b.Country) ? 1 : -1);
                    results = "<p>Invalid input. Please choose from one of the following countries or enter 'World'.</p>";
                    results += "<ul>";
                    console.log("first", json.length)
                    for (let i = 0; i < json.length; i++) {
                        results += "<li>" + json[i].Country + "</li>";
                    }
                    results += "</ul>";
                    document.getElementById("countryResults").innerHTML = results;
                });
            } else {
                return response.json();
            }
        }).then(function(json) {
            console.log("confirmed", json);
            results += "<h3>" + value + "</h3>";
            if (json.length == 0) {
                results += "<h4>No results for this country</h4>";
                document.getElementById("countryResults").innerHTML = results;
                return;
            }
            let dayOne = new Date(json[0].Date);
            results += "<p>Day One: " + dayOne.toLocaleDateString() + "</p>";
            results += "<p>Days since first case: " + json.length + "</p>";
            results += "<p>Latitude: " + json[0].Lat + "</p>";
            results += "<p>Longitude: " + json[0].Lon + "</p>";
            // number of cases
            results += "<p>Confirmed: " + json[json.length-1].Cases.toLocaleString() + "</p>";
            const url2 = "https://api.covid19api.com/dayone/country/" + value + "/status/recovered";
            fetch(url2)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log("recovered", json);
                results += "<p>Recovered: " + json[json.length-1].Cases.toLocaleString() + "</p>";
                const url3 = "https://api.covid19api.com/dayone/country/" + value + "/status/deaths";
                fetch(url3)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log("deaths", json);
                    results += "<p>Deaths: " + json[json.length-1].Cases.toLocaleString() + "</p>";

                    document.getElementById("countryResults").innerHTML = results;
                })
            })

        })
    }
    
})