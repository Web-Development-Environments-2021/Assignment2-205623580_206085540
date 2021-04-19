var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var temp=true;
var dic_users = {'k':'k'}


$(document).ready(function() {

	// //Check the Validiation of Login form
	// $('#log_form').submit1(function(e){
	// 	e.preventDefault();
	// 	var userName= $('#user_name').val()
	// 	var password=$('#password').val()
	// 	if((userName in dic_users))
	// 	{
	// 		alert("roi")
	// 	}
	// });


	//Check the Validiation of register form
	$('#first_form').submit(function(e) {
		e.preventDefault();
		var valid=0;
		var user_name = $('#user_name').val();
		var Full_Name = $('#Full_Name').val();
		var email = $('#email').val();
		var password = $('#password').val();
		$(".error").remove();

		if (user_name.length < 1) 
		{
			$('#user_name').after('<span class="error">This field is required</span>');
			valid=1
		}
		if (Full_Name.length < 1 || Full_Name.search(/[0-9]/) != -1)
		{
			$('#Full_Name').after('<span class="error">The Full Name can not contain Number</span>');
			valid=1
		}
		if (email.length < 1)
		{
			$('#email').after('<span class="error">This field is required</span>');
			valid=1
		} else
		 {
			var regEx = /^[A-Za-z0-9][A-Za-z0-9._%+-]{0,63}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/;
			var validEmail = regEx.test(email);
			if (!validEmail)
			{
			  $('#email').after('<span class="error">Enter a valid email</span>');
			  valid=1
			}
		  }
			if (password.length < 6)
			{
				$('#password').after('<span class="error">Password must be at least 6 characters long</span>');
				valid=1
			}
			else if (password.search(/\d/) == -1)
			{
			$('#password').after('<span class="error">Password must have at least one Number</span>');
			valid=1	
			}
		else if (password.search(/[a-zA-Z]/) == -1)
		{
			$('#password').after('<span class="error">Password must have at least one letter</span>');
			valid=1
		} 
		else if (password.search(/[^a-zA-Z0-9]/) != -1) {
			$('#password').after('<span class="error">Invalid char</span>');
			valid=1
		}

		if(valid==0){

			dic_users[user_name]=password
			var modal = document.getElementById("myModal");
			modal.style.display="block";
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("accept")[0];
					
			
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
			  modal.style.display = "none";
			  accept();
			}
			
		}

		});


		


	context = canvas.getContext("2d");
	//Start();
	//welcome();
});


function accept(){
	var reg=document.getElementById("Register");
	reg.style.display="none";

	var login=document.getElementById("Login");
	login.style.display="block"
}

function welcome(){
//1.page cleaning
	window.clearInterval(interval);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
//2.	
var x=document.getElementById("game_menu");
x.style.display="none";
//
var y=document.getElementById("welcome_menu");
y.style.display="block";
}

function back(){
	//1. hide the login screen
	var login=document.getElementById("Login");
	login.style.display="none"

	//2. hide the register screen
	var reg=document.getElementById("Register");
	reg.style.display="none";

	//3.display the welcom screen
	var y=document.getElementById("welcome_menu");
	y.style.display="block";	
}


function StartNewGame(){
	var Login=document.getElementById("Login")
	Login.style.display="none";
	
	var x=document.getElementById("game_menu");
	x.style.display="block";
	Start();
}

function Register(){
	//1. hide the div of menu
	var x=document.getElementById("welcome_menu");
	x.style.display="none";

	//2.display the form's register
	var reg=document.getElementById("Register");
	reg.style.display="block";
}





function Login(){
	//1. hide the div of menu 
	var x=document.getElementById("welcome_menu")
	x.style.display="none"

	//2.display the Login form
	var Login=document.getElementById("Login")
	Login.style.display="block";
}



function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50 ) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
