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
		//LINK TO FIREBASE
	var fireBase = new Firebase("https://trainschedule.firebaseIO.com");


	fireBase.on('child_added', function(childSnapshot, prevChildKey){
	// Gives us the entire object for each child added to Firebase
	console.log(childSnapshot.val());

	//SETTING ALL THE VARIABLES TO USER INPUT
	var origin = $("#originTrainInput").val();
		console.log ("Origin: " + origin);
	var destination = $("#finalDestInput").val();
		console.log ("Destination: " + destination);
	var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(1,"years").format("HH:mm")
		console.log ("First Train: " + firstTrain);
	var frequency = moment($("#frequencyInput").val().trim(), "mm").format("mm");
		console.log ("Frequency in minutes: " + frequency);
	var currentTime = moment();
		console.log ("Current Time: " + moment(currentTime).format("hh:mm"));

	//CONVERTS FIRST TIME TO MAKE SURE THAT FIRST TIME COMES BEFORE CURRENT TIME
	var firstTimeConverted = moment(currentTime, "hh:mm").subtract(1, "years");
		console.log ("Now -1 year: " + moment(firstTimeConverted).format("hh:mm"))

	//DIFFERENCE BETWEEN TIMES
	var difference = moment().diff(moment(firstTimeConverted), "minutes");
		console.log ("Difference: " + difference);

	//TIME AWAY
	var timeApart = difference % frequency;
		console.log ("Time Apart: " + timeApart);

	//HOW MANY MINUTES UNTIL THE NEXT TRAIN
	var minutesUntil = frequency - timeApart;
		console.log ("Minutes until next train:") + minutesUntil;

	//WHAT TIME IS THE NEXT TRAIN:
	var nextTrainFinal = moment().add(minutesUntil, "hh:mm").format("hh:mm");
		console.log ("ARRIVAL: " + nextTrainFinal);


	// Appending the variables to HTML
	$('.table').append("<tr>"+
					   "<td>"+childSnapshot.val().fbOrigin+"</td>"+
					   "<td>"+childSnapshot.val().fbDestination+"</td>"+
					   "<td>"+childSnapshot.val().fbFirstTrain+"</td>"+
					   "<td>"+childSnapshot.val().fbFrequency+"</td>"+
					   "<td>"+ nextTrainFinal +"</td>"+
					   "<td>"+ minutesUntil +"</td>"+
					   "</tr>");


	});

//FUNCTION FOR FORM SUBMISSION
$("#subButton").on("click", function() {




		



				//RESET THE FORM WITH THE PLACEHOLDERS
					$("#originTrainInput").val("originTrain".placeholder);
					$("#finalDestInput").val("originTrain".placeholder);
					$("#firstTrainInput").val("originTrain".placeholder);
					$("#frequencyInput").val("originTrain".placeholder);

	//Set Firebase Data:

		//ADDS EVERY NEW TRAIN TO THE FIREBASE

			fireBase.push({
				fbOrigin : origin,
				fbDestination : destination,
				fbFirstTrain : firstTrain,
				fbFrequency : frequency,
			})






//DYNAMICALLY UPDATE TABLE ====================================

		return false;


});