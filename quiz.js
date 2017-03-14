(function() {
"use strict";
var questionnumber = 0;
var score = 0;

/* DOM element */
	let elContainer = document.getElementById('container'); 
	let elScore = document.getElementById('score');

/* Smiður fyrir spurningu */
	function Question(question, answers, correctAnswer) {
		this.question = question; 					/* Spurning (strengur) */
		this.answers = answers; 					/* fylki með svarmöguleikum */
		this.correctAnswer = correctAnswer; 		/* Rétt svar (strengur) */
	}

/* Gögn (fylki af objectum) */
	let questions = [
				new Question('Í hvaða landi er Chichen Itza?', ['Nígeríu', 'Mexico', 'Malaysíu', 'Indlandi'], 'Mexico'),
				new Question('Er himininn blár?', ['Já', 'Nei'], 'Já'),
				new Question('Hvað er 1*4', ['4', '213'], '4'),
				new Question('Hvað eru margir millilítrar í lítra?', ['100', '50', '10', '1000'], '1000'),
		];
/* Shuffle questions */
	function shuffleArray(array) {
	 let m = array.length, t, i;
	 // While there remain elements to shuffle…
	 while (m) {
			 // Pick a remaining element…
			 i = Math.floor(Math.random() * m--);
			 // And swap it with the current element.
			 t = array[m];
			 array[m] = array[i];
			 array[i] = t;
	 }
	 // return array;  þurfum ekki að skila honum
	}
	// notum shuffle á fylkið með gögnunum (objects) 
	shuffleArray(questions);  

/* Template */
	Question.prototype.getTemplate = function(){
	 	let tmplAnswers = "";
	 	for(let i = 0; i < this.answers.length; i++) {
	 		   tmplAnswers += "<div>" + this.answers[i] + "</div>";
	 	}
	 	return "<h2>" + this.question + "</h2>" + tmplAnswers +"<br> Þú ert með " + score + " af " + questions.length + " réttum <br>P.S ýttu á 1,2,3,4,5,6,7 til að breyta um lit á síðunni, aðrir takkar resetta litinn";

	};

	function totalscore()
	{
		if (score === 0) {
			return "<h2>Þú greinilega veist ekkert <br>Þú ert með " + score + " af " + questions.length + " réttum </h2>"
		}
		else if (score === 1) {
			return "<h2>Þú ert ekkert sérlega gáfaður er það? <br>Þú ert með " + score + " af " + questions.length + " réttum </h2>"
		}
		else if (score === 2) {
			return "<h2>Þú náðir allavega helmingnum <br>Þú ert með " + score + " af " + questions.length + " réttum </h2>"
		}
		else if (score === 3) {
			return "<h2>Nálægt en ekki fullt hús <br>Þú ert með " + score + " af " + questions.length + " réttum </h2>"		
		}
		else{
			return "<h2>Frábært þú náðir þeim öllum <br>Þú ert með " + score + " af " + questions.length + " réttum </h2>"		
		}
	}


/* Birtum spurningu ásamt svarmöguleikum úr fylkinu */
	elContainer.innerHTML = questions[questionnumber].getTemplate();

/*
 	Þegar notandi hefur smellt á einhvern svarmöguleika þá á viðkomandi svarmöguleiki að fá rauðan
	bakgrunnslit. Notað er Event object og Event Delegation til að ná þessu fram. 
*/
var colors = ["red","orange","yellow","green","lightblue","blue","purple"];
addEventListener("keydown", function(event) {
	if (event.keyCode == 49) {
		document.body.style.background = colors[0];
	}
	else if (event.keyCode == 50) {
		document.body.style.background = colors[1];
	}
	else if (event.keyCode == 51) {
		document.body.style.background = colors[2];
	}
	else if (event.keyCode == 52) {
		document.body.style.background = colors[3];
	}
	else if (event.keyCode == 53) {
		document.body.style.background = colors[4];
	}
	else if (event.keyCode == 54) {
		document.body.style.background = colors[5];
	}
	else if (event.keyCode == 55) {
		document.body.style.background = colors[6];
	}
	else{
		document.body.style.background = "";
	}
	
  });
elContainer.addEventListener('click', function(e) {
	

	if(e.target.nodeName.toLowerCase() === 'div') {
if (questionnumber === questions.length) {
	elContainer.innerHTML = totalscore();
}
else{

 		// bætum við css class
 		if(e.target.textContent === questions[questionnumber].correctAnswer)
 		{
 			e.target.className = "rett";
 			score++;
 			setTimeout(function () {			
	    		questionnumber++;
	    		if (questionnumber === questions.length) {
				elContainer.innerHTML = totalscore();
				}
			else{
				elContainer.innerHTML = questions[questionnumber].getTemplate();
				}
			}, 500);			

 		}

 		else{
 		e.target.className = "rangt"; 			
    		setTimeout(function () {
	    		questionnumber++;
				if (questionnumber === questions.length) {
				elContainer.innerHTML = totalscore();
				}
			else{
				elContainer.innerHTML = questions[questionnumber].getTemplate();
				}
			}, 500);
			elScore.innerHTML = totalscore();
 	}
	}
}
});


})();