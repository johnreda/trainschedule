/*

Plan:
	- Set up all variables (local and firebase);{X}
	- Link to firebase {X}
	- Set variables to user input to be used for logic.
	- figure out how to use moment.js as it relates to user input
	- Logic:
		- variables for origin and destination are useless (for logic);
		- user input variables need to be taken in and formatted to be easily compared (use moment for this step)
		- create a for loop that increases User Input First Train Time by the amount of time they set as the Frequency
		- Next train time comes about when the result of that loop is greater than the current time. 
		- If the current time and that time match, alert NOW BOARDING! (not even remotely important);
	-FIGURE OUT HOW TO UPDATE THESE VARIABLES ON THE FIREBASE SIDE and UPDATE THE TABLE IN REAL TIME
		- make sure it's done in a way so that it adds new input each time rather than updates what's currently there.

*/

//Setting all of the variables to the User Input from the form
$("#subButton").on("click", function() {

	var origin = $("#originTrain").val();
		console.log (origin);
	var destination = $("#finalDest").val();
		console.log (destination);
	var startTime = $("#fristTrain").val()
		console.log (startTime);
	var tFrequency = $("#frequency").val();
		console.log (frequency);

$(origin).appendTo('form');

		$("#originTrain").val("originTrain".placeholder);
		$("#finalDest").val("originTrain".placeholder);
		$("#firstTrain").val("originTrain".placeholder);
		$("#frequency").val("originTrain".placeholder);

		var tFrequency = moment(tFrequency).minute();
			console.log(tFrequency); 

		var firstTime = startTime; // Time is 3:30 AM

				// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);


		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency; 
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))


		return false;


});

