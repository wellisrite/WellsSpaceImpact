$(document).ready(function() {
    // Check storage availability
    var index=0;
    var right=0;
	var end=parseInt(localStorage.getItem("end"));
    	var wrong=0;
    if (typeof(Storage) === "undefined") {
        alert("Storage not available. You cannot play. :(");
        window.location = "error.html";
    } else {
        if(localStorage.getItem("player") === null) {
            window.location = "index.html";
        }
    }
    // Get new question
    getQuestion();

    // Show player name and score
    $("#player").html("Player : " + localStorage.getItem("player"));
    $("#score").html("Score : " + localStorage.getItem("score"));
	if(localStorage.getItem("highscore")=="NaN"){
		localStorage.setItem("highscore",0);
	}
	$("#highscore").html("Highscore :"+localStorage.getItem("highscore"));
	if(localStorage.getItem("score")==localStorage.getItem("highscore")&&localStorage.getItem("score")!=0){
		$("#highscore").html("Congratulations you are the highscorer! with"+" "+localStorage.getItem("score"));
	}
	$("#corwrg").html("Correct Answer:"+localStorage.getItem("right")+" "+"Wrong answer:"+localStorage.getItem("wrong"));
    $(".answer").click(function() {
        var state = $(this).prop("disabled");

        $(this).prop("disabled", !state);
    });

    $("#submit").click(function() {
        var question = parseInt($("#question").html());
        var answer = 0;
        // Get all value of unclicked answer buttons
        $(".answer").each(function() {
            if (!$(this).prop("disabled")) {
                var value = parseInt($(this).val());
                answer = answer + value;
            }
        });

        // Check answer
        var score = parseInt(localStorage.getItem("score"));
		var highscore=parseInt(localStorage.getItem("highscore"));
		var right=parseInt(localStorage.getItem("right"));
		var wrong=parseInt(localStorage.getItem("wrong"));
        if (question === answer) {
            score = score + 10;
            right++;
        } else {
            score = score - 5;
            wrong++;
			}
		if(highscore<score){
					highscore=score;
				}
        // Update score
        localStorage.setItem("score", score);
		localStorage.setItem("right",right);
		localStorage.setItem("wrong",wrong);
		localStorage.setItem("highscore", highscore);
        $("#score").html("Score : " + localStorage.getItem("score"));
		$("#highscore").html("highscore :"+localStorage.getItem("highscore"));
		$("#corwrg").html("Correct Answer:"+localStorage.getItem("right")+" "+"Wrong answer:"+localStorage.getItem("wrong"));

        // Get new question
        getQuestion();
    });

    $("#new").click(function() {
       localStorage.removeItem("player");
        window.location = "index.html";
		localStorage.setItem("end",0);
    });
     $("#end").click(function() {
     	window.location="end.html";
		//localStorage.clear();
		localStorage.setItem("end",1);
        });
		$("#clear").click(function(){
		localStorage.setItem("highscore",0);
		window.location="well.html";
	});
    function getQuestion() {
    	index++;
        var question;
        var numbers = new Array();

        for (var i = 0; i < 5; i++) {
            numbers[i] = Math.floor(Math.random() * 10) + 1;
        }

        $(".answer").each(function(i) {
            $(this).val(numbers[i]);
            $(this).prop("disabled", false); // property
        });

        numbers.sort();
        question = numbers[0] + numbers[1] + numbers[2];
        $("#number").html("Question"+" "+index);
        $("#question").html(question);
    }
});
