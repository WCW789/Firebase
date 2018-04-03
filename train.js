$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyBJunwDNwBtF0B0pmodSs0-j_q7cdfVXdM",
        authDomain: "ww-project-75a70.firebaseapp.com",
        databaseURL: "https://ww-project-75a70.firebaseio.com",
        projectId: "ww-project-75a70",
        storageBucket: "ww-project-75a70.appspot.com",
        messagingSenderId: "698811018509"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function() {
        event.preventDefault();

        var name = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrainTime = $("#firstTrainTime-input").val().trim();
        var freq = $("#freq-input").val().trim();

        database.ref().push({
            "name": name,
            "destination": destination,
            "firstTrainTime": firstTrainTime,
            "freq": freq
        });

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#firstTrainTime-input").val("");
        $("#freq-input").val("");

    });
    
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {
            
            console.log("This is" + childSnapshot.val());
            
            var name2 = childSnapshot.val().name;
            console.log(name2);
            var destination2 = childSnapshot.val().destination;
            var firstTrainTime2 = childSnapshot.val().firstTrainTime;
            var freq2 = childSnapshot.val().freq;

            var trainArr = firstTrainTime2.split(':');
            var trainTime = moment().hours(trainArr[0]).minutes(trainArr[1]);
            var maxMoment = moment.max(moment(), trainTime);
            var trainMinutes;
            var trainArrival;

            if(maxMoment === trainTime) {
                trainArrival = trainTime.format("hh:mm A");
                trainMinutes = trainTime.diff(moment(), "minutes");
              } else {
                var diffTimes = moment().diff(trainTime, "minutes");
                var trainRemainder = diffTimes % freq2;
                console.log(trainRemainder);
                trainMinutes = freq2 - trainRemainder;
                trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
            };
            

            $("#train-table > tbody").append("<tr><td>" + name2 + "</td><td>" + destination2 + "</td><td>" + freq2 + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");
        
        });
    });





