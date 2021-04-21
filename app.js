var context;
var shape = new Object();
var enemypos =new Object();
var board;
var lifepool;
var score;
var pac_color;
var pac_pos=2;
var start_time;
var time_elapsed;
var steptime
var game_time
var enemy_remain
var player_name;
var food_remain
var interval;
var interval2;
var temp=true;
var dic_users = {'k':'k'}
var enemy=new Image();
var normal_color;//ball_color[0]-normal ball(5 pt) ball_color[1]-magic ball(15pt) ball_color[0]-epic ball(25pt)
var magick_color;
var epic_color;





enemy.src="enemy.png";

$(document).ready(function() {

	//Check the Validiation of Login form
	$('#setting_form').submit(function(e){
		e.preventDefault();
		var valid=0;
		game_time= $('#dotg').val();
		if(game_time=="unlimit") game_time=9999;
		game_time=parseFloat(game_time);
		enemy_remain=$('#nof').val();
		food_remain =$('#ckd').val();
		lifepool=$('#life').val();
		startgame();

	});


	$('#log_form').submit(function(e){
		e.preventDefault();
		var valid=0;
		var user_name_login= $('#user_name_login').val();
		var password_login=$('#password_login').val();
		$(".error").remove();
		if(!(user_name_login in dic_users)){
			$('#user_name_login').after('<span class="error"></br> The User Name doesn\'t exsit</br> </span>')
			valid=1
		}
		else if (dic_users[user_name_login]!=password_login){
			$('#password_login').after('<span class="error"></br> Your password is invalid. Please try again.</br> </span>')
			valid=1
		}
		if (valid==0){
			player_name=user_name_login;
			Start_after_sign()
		}
	});


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
			valid=1;
		}
		if (Full_Name.length < 1 || Full_Name.search(/[0-9]/) != -1)
		{
			$('#Full_Name').after('<span class="error">The Full Name can not contain Number</span>');
			valid=1;
		}
		if (email.length < 1)
		{
			$('#email').after('<span class="error">This field is required</span>');
			valid=1;
		} else
		 {
			var regEx = /^[A-Za-z0-9][A-Za-z0-9._%+-]{0,63}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/;
			var validEmail = regEx.test(email);
			if (!validEmail)
			{
			  $('#email').after('<span class="error">Enter a valid email</span>');
			  valid=1;
			}
		  }
			if (password.length < 6)
			{
				$('#password').after('<span class="error">Password must be at least 6 characters long</span>');
				valid=1;
			}
			else if (password.search(/\d/) == -1)
			{
			$('#password').after('<span class="error">Password must have at least one Number</span>');
			valid=1;
			}
		else if (password.search(/[a-zA-Z]/) == -1)
		{
			$('#password').after('<span class="error">Password must have at least one letter</span>');
			valid=1;
		} 
		else if (password.search(/[^a-zA-Z0-9]/) != -1) {
			$('#password').after('<span class="error">Invalid char</span>');
			valid=1;
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
	login.style.display="block";
}

function welcome(){
//1.page cleaning
	window.clearInterval(interval);
	window.clearInterval(interval2);
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
	login.style.display="none";

	//2. hide the register screen
	var reg=document.getElementById("Register");
	reg.style.display="none";

	//3.display the welcom screen
	var y=document.getElementById("welcome_menu");
	y.style.display="block";	
}


function Start_after_sign(){
	var Login=document.getElementById("Login")
	Login.style.display="none";
	
	// var x=document.getElementById("game_menu");
	// x.style.display="block";

	var setting=document.getElementById("setting_Screen");
	setting.style.display="block";


	var song=document.getElementById("mySong");
	song.play();

	//Start();
}
function startgame(){
	var setting=document.getElementById("setting_Screen");
	setting.style.display="none";

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
	var x=document.getElementById("welcome_menu");
	x.style.display="none";

	//2.display the Login form
	var Login=document.getElementById("Login");
	Login.style.display="block";
}







function Start() {
	board = new Array();
	board2 =new Array();
	lblpname.value=player_name;
	score = 0;
	pac_color = "yellow";
	normal_color="black";
	magick_color="green";
	epic_color="purple";
	//lifepool=1
	var cnt = 100;
	food_remain = 50;
	var normal = Math.round(food_remain*0.6);
	var magick = Math.round(food_remain*0.3);
	var epic = Math.round(food_remain*0.1);
	var pacman_remain = 1;
	enemy_remain = 1;
	start_time = new Date();
	steptime=start_time;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		board2[i] = new Array();
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
				board2[i][j] = 4;
			}
			else if(
				(i == 0 && j == 0) ||
				(i == 0 && j == 9) ||
				(i == 9 && j == 0) ||
				(i == 9 && j == 9) 
			){
				if(i == 0 && j == 0){
				enemypos.i=i;
				enemypos.ib=i;
				enemypos.j=j;
				enemypos.jb=j
				board[i][j] = 5;
				board2[i][j] = 5;
				}
				else if(i == 0 && j == 9){
					board[i][j] = 5;
					board2[i][j] = 0;
				}
				else if(i == 9 && j == 0){
					board[i][j] = 5;
					board2[i][j] = 0;
				}
				else if(i == 9 && j == 9){
					board[i][j] = 5;
					board2[i][j] = 0;
				}
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * normal) / cnt) {
					normal--;
					board[i][j] = 1;
					board2[i][j] = 0;
				}
				else if (randomNum < (1.0 * (normal + magick)) / cnt) {
					magick--;
					board[i][j] = 1.1;
					board2[i][j] = 0;
				}else if (randomNum < (1.0 * (normal + magick + epic)) / cnt) {
					epic--
					board[i][j] = 1.2;
					board2[i][j] = 0;
				} else if (randomNum < (1.0 * (pacman_remain + normal + magick + epic)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
					board2[i][j] = 2;
				} else {
					board[i][j] = 0;
					board2[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (normal > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		normal--;
	}
	while (magick > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.1;
		magick--;
	}
	while (epic > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.2;
		epic--;
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
	interval = setInterval(UpdatePosition, 150);
	interval2 = setInterval(UpdateEnemyPosition, 300);
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
	lblTime.value = game_time.toFixed(2);
	lblLife.value=lifepool;
	
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board2[i][j] == 5) 
			{//enemy
					context.beginPath();
					context.drawImage(enemy,center.x-20,center.y-20);
					//context.fillStyle = "grey"; //color
					//context.fill();
				//context.beginPath();
				//context.arc(center.x, center.y, 30, 0, 2 * Math.PI);
				//context.fillStyle = "red"; //color
				//context.fill();
			}
			else if (board[i][j] == 2) 
			{//right
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 2.1) 
			{//left
				context.beginPath();
				context.arc(center.x, center.y, 30,  1.15 * Math.PI,0.85* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 2.2) 
			{//down
				context.beginPath();
				context.arc(center.x, center.y, 30,  0.65 * Math.PI,2.35* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 2.3) 
			{//up
				context.beginPath();
				context.arc(center.x, center.y, 30,   1.65 * Math.PI,1.35* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			 else if (board[i][j] == 1) 
			 {//food normal
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = normal_color; //color
				context.fill();
			}else if (board[i][j] == 1.1) 
			{//food magick
			   context.beginPath();
			   context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			   context.fillStyle = magick_color; //color
			   context.fill();
		   }else if (board[i][j] == 1.2) 
		   {//food epic
			  context.beginPath();
			  context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			  context.fillStyle = epic_color; //color
			  context.fill();
		  } else if (board[i][j] == 4) 
			{//wall
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
		pac_pos = 2.3;
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			
		}
	}
	if (x == 2) {
		pac_pos = 2.2;
		 if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			
		}
	}
	if (x == 3) {
		pac_pos = 2.1;
		
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			
		}
	}
	if (x == 4) {
		pac_pos= 2;

		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			
		}
	}
	if(board2[shape.i][shape.j] == 5){
		lifepool--;
		score-=10
	}
	else if (board[shape.i][shape.j] == 1) {
		score+=5;
	}
	else if (board[shape.i][shape.j] == 1.1) {
		score+=15;
	}
	else if (board[shape.i][shape.j] == 1.2) {
		score+=25;
	}
	board[shape.i][shape.j]=pac_pos
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	game_time=game_time-(currentTime-steptime)/1000;
	steptime=currentTime;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if(lifepool<=0 || game_time<=0){
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.alert("game over");
		welcome();
	}
	if (score == 300 ) {
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.alert("Game completed");
		welcome();
	} else {
		Draw();
	}
	
}

function UpdateEnemyPosition(){
	board2[enemypos.i][enemypos.j] = 0;
	var x=getBestMove();
	enemypos.ib=enemypos.i;
	enemypos.jb=enemypos.j;
	if (x == 1) {
		if (enemypos.j > 0 && board[enemypos.i][enemypos.j - 1] != 4) {
			enemypos.j--;
			
		}
	}
	if (x == 2) {
		if (enemypos.j < 9 && board[enemypos.i][enemypos.j + 1] != 4) {
			enemypos.j++;
			
		}
	}
	if (x == 3) {

		if (enemypos.i > 0 && board[enemypos.i - 1][enemypos.j] != 4) {
			enemypos.i--;
			
		}
	}
	if (x == 4) {

		if (enemypos.i < 9 && board[enemypos.i + 1][enemypos.j] != 4) {
			enemypos.i++;
			
		}
	}



	board2[enemypos.i][enemypos.j]=5
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	game_time=game_time-(currentTime-steptime)/1000;
	steptime=currentTime;
	if(lifepool<=0 || game_time<=0){
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.alert("game over");
		welcome();
	}
	if (score == 300 ) {
		window.clearInterval(interval);
		window.clearInterval(interval2);
		window.alert("Game completed");
		welcome();
	} else {
		Draw();
	}
}
function getBestMove(){
	var a=[100,100,100,100];
	var b=0;
	var c=100;
	if (enemypos.j > 0 && board[enemypos.i][enemypos.j - 1] != 4 && enemypos.j-1 !=enemypos.jb){
		a[0]=Math.abs(enemypos.i-shape.i) + Math.abs((enemypos.j-1)-shape.j);
		if(a[0]<c) {b=1;c=a[0]}
	}
	if (enemypos.j < 9 && board[enemypos.i][enemypos.j + 1] != 4 && enemypos.j+1 !=enemypos.jb) {
		a[1]=Math.abs(enemypos.i-shape.i) + Math.abs((enemypos.j+1)-shape.j);
		if(a[1]<c) {b=2;c=a[1]}
	}
	if (enemypos.i > 0 && board[enemypos.i - 1][enemypos.j] != 4 && enemypos.i-1 !=enemypos.ib) {
		a[2]=Math.abs((enemypos.i-1)-shape.i) + Math.abs(enemypos.j-shape.j);
		if(a[2]<c) {b=3;c=a[2]}
	}
	if (enemypos.i < 9 && board[enemypos.i + 1][enemypos.j] != 4 && enemypos.i+1 !=enemypos.ib) {
		a[3]=Math.abs((enemypos.i+1)-shape.i) + Math.abs(enemypos.j-shape.j);
		if(a[3]<c) {b=4;c=a[3]};
	}
	return b
}