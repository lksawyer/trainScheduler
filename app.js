//variables

// Initialize Firebase
var config = {
apiKey: "AIzaSyCwcZNHbV3vARTRXQ6qVLewKKlXk7Crzf8",
authDomain: "trainscheduler-262eb.firebaseapp.com",
databaseURL: "https://trainscheduler-262eb.firebaseio.com",
projectId: "trainscheduler-262eb",
storageBucket: "",
messagingSenderId: "751750880337"
};

firebase.initializeApp(config);

var database = firebase.database();


//Get user input
$("button").on("click", function() {

	//Gets user input
	var trainName = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var startTime = $("#startTime").val().trim();
	var frequency = $("#frequency").val().trim();

	//Stores user input into temp object
	var newTrain = {
		trainName: trainName,
		destination: destination,
		startTime: startTime,
		frequency: frequency,
	}

	//Uploads newTrain onject to the database
  	database.ref().push(newTrain);

  	//Helps identify if userInput was correctly captured
	console.log(newTrain.trainName);
	console.log(newTrain.destination);
	console.log(newTrain.startTime);
	console.log(newTrain.frequency);

	// Clears form inputs
	$("#trainName").val("");
	$("#destination").val("");
	$("#startTime").val("");
	$("#frequency").val("");

});

//Adds newTrain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var startTime = childSnapshot.val().startTime;
	var frequency = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(destination);
	console.log(startTime);
	console.log(frequency);

	//Adds each trains data to the HTML
	$("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td></tr>");
});