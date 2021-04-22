var context;
var shape = new Object();
var enemypos1 =new Object();
var enemypos2 =new Object();
var enemypos3 =new Object();
var enemypos4 =new Object();
var board;
var board2;
var lifepool;
var score;
var pac_color;
var pac_pos=2;
var start_time;
var time_elapsed;
var steptime
var game_time
var enemyNums
var player_name;
var food_remain
var interval;
var interval1;
var interval2;
var interval3;
var interval4;
var temp=true;
var dic_users = {'k':'k'}
var enemy=new Image();
var superfood=new Image();
var superfoodpos =new Object();
var normal_color;//ball_color[0]-normal ball(5 pt) ball_color[1]-magic ball(15pt) ball_color[0]-epic ball(25pt)
var magick_color;
var epic_color;
var superfoodcolor="red";
var isPaused=false;
var up_key=38;
var down_key=40;
var left_key=37;
var right_key=39;

function randomVal(){
	var select = document.getElementById('dotg');
    var items = select.getElementsByTagName('option');
    var index = Math.floor(Math.random() * items.length);
    select.selectedIndex = index;
	select = document.getElementById('noe');
    items = select.getElementsByTagName('option');
    index = Math.floor(Math.random() * items.length);
    select.selectedIndex = index;
	select = document.getElementById('cdk');
    items = select.getElementsByTagName('option');
    index = Math.floor(Math.random() * items.length);
    select.selectedIndex = index;
	select = document.getElementById('life');
    items = select.getElementsByTagName('option');
    index = Math.floor(Math.random() * items.length);
    select.selectedIndex = index;
	document.getElementById('favcolor1').value=getRandomColor();
	document.getElementById('favcolor2').value=getRandomColor();
	document.getElementById('favcolor3').value=getRandomColor();
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }
enemy.src="enemy.png";

$(document).ready(function() {

	//Check the Validiation of Login form
	$('#setting_form').submit(function(e){
		e.preventDefault();
		game_time= $('#dotg').val();
		
		if(game_time=="unlimit") game_time=9999;
		game_time=parseFloat(game_time);
		enemyNums=$('#noe').val();
		food_remain =$('#cdk').val();
		lifepool=$('#life').val();
		normal_color=$('#favcolor1').val();
		magick_color=$('#favcolor2').val();
		epic_color=$('#favcolor3').val();
		document.getElementById('ds1').value=enemyNums;
		document.getElementById('ds2').value=lifepool;
		document.getElementById('ds3').value=food_remain;
		document.getElementById('ds4').value=game_time;
		document.getElementById('ds5').style.background=normal_color;
		document.getElementById('ds6').style.background=magick_color;
		document.getElementById('ds7').style.background=epic_color;
		document.getElementById('ds8').value=document.getElementById("keyup").innerHTML;
		document.getElementById('ds9').value=document.getElementById("keydown").innerHTML;
		document.getElementById('ds10').value=document.getElementById("keyleft").innerHTML;
		document.getElementById('ds11').value=document.getElementById("keyright").innerHTML;
		startgame();
	});

	$('#pause').on('click', function(e) {
		e.preventDefault();
		if(isPaused)
			isPaused = false;
		else
			isPaused = true;
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


function keypressdown(e) {
	keysDown[e.keyCode] = true;
}
function keypressup(e) {
	keysDown[e.keyCode] = false;
}
function keypressdownup(e) {
	document.getElementById("keyup").innerHTML = e.key;
	up_key=e.keyCode;
	removeEventListener("keydown",keypressdownup,false);
}
function keypressdownleft(e) {
	document.getElementById("keyleft").innerHTML = e.key;
	left_key=e.keyCode;
	removeEventListener("keydown",keypressdownleft,false);
}
function keypressdowndown(e) {
	document.getElementById("keydown").innerHTML = e.key;
	down_key=e.keyCode;
	removeEventListener("keydown",keypressdowndown,false);
}
function keypressdownright(e) {
	document.getElementById("keyright").innerHTML = e.key;
	right_key=e.keyCode;
	removeEventListener("keydown",keypressdownright,false);
}

function upKeyBind(){
	
	addEventListener("keydown",keypressdownup,false);
	//wait(3000);
	//removeEventListener("keyd2",keypressdown2,false);
}
function leftKeyBind(){
	
	addEventListener("keydown",keypressdownleft,false);
	//wait(3000);
	//removeEventListener("keyd2",keypressdown2,false);
}
function downKeyBind(){
	
	addEventListener("keydown",keypressdowndown,false);
	//wait(3000);
	//removeEventListener("keyd2",keypressdown2,false);
}
function rightKeyBind(){
	
	addEventListener("keydown",keypressdownright,false);
	//wait(3000);
	//removeEventListener("keyd2",keypressdown2,false);
}
function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
	  end = new Date().getTime();
   }
 }

function accept(){
	var reg=document.getElementById("Register");
	reg.style.display="none";

	var login=document.getElementById("Login");
	login.style.display="block";
}

function welcome(){
//1.page cleaning
	window.clearInterval(interval);
	window.clearInterval(interval1);
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
	board = 
	[
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4],
		[4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 4, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];//22x19
	board2 =
	[
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4],
		[4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4],
		[4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 4, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];//22x19
	lblpname.value=player_name;
	score = 0;
	pac_color = "yellow";
	//lifepool=1
	var cnt = 100;
	var normal = Math.round(food_remain*0.6);
	var magick = Math.round(food_remain*0.3);
	var epic = Math.round(food_remain*0.1);
	var superf=1;
	var pacman_remain = 1;
	start_time = new Date();
	steptime=start_time;
/*	for (var i = 0; i < 10; i++) {
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
			else if(i==4&&j==4){
				board2[i][j] = 10;
				superfoodpos.i=i;
				superfoodpos.j=j;
				superf--;
			}	
			else if(
				(i == 0 && j == 0) ||
				(i == 0 && j == 9) ||
				(i == 9 && j == 0) ||
				(i == 9 && j == 9) 
			){
				if(i == 0 && j == 0){
				enemypos1.i=i;
				enemypos1.ib=i;
				enemypos1.j=j;
				enemypos1.jb=j
				board[i][j] = 5;
				board2[i][j] = 5;
				}
				else if(i == 0 && j == 9){
					if(enemy_remain>1){
						enemypos2.i=i;
						enemypos2.ib=i;
						enemypos2.j=j;
						enemypos2.jb=j
						board[i][j] = 5;
						board2[i][j] = 5;}
						board[i][j] = 5;
						board2[i][j] = 0;
						}
				else if(i == 9 && j == 0){
					if(enemy_remain>2){
						enemypos3.i=i;
						enemypos3.ib=i;
						enemypos3.j=j;
						enemypos3.jb=j
						board[i][j] = 5;
						board2[i][j] = 5;}
						board[i][j] = 5;
						board2[i][j] = 0;
						}
				else if(i == 9 && j == 9){
					if(enemy_remain>3){
						enemypos4.i=i;
						enemypos4.ib=i;
						enemypos4.j=j;
						enemypos4.jb=j
						board[i][j] = 5;
						board2[i][j] = 5;}
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
	}*/
	if(enemyNums>0){
		enemypos1.i=1;
		enemypos1.ib=1;
		enemypos1.j=1;
		enemypos1.jb=1;
		board[1][1] = 11;
		board2[1][1] = 5;
	}
	if(enemyNums>1){
		enemypos2.i=1;
		enemypos2.ib=1;
		enemypos2.j=17;
		enemypos2.jb=17;
		board[1][17] = 11;
		board2[1][17] = 5;
	}
	if(enemyNums>2){
		enemypos3.i=20;
		enemypos3.ib=20;
		enemypos3.j=1;
		enemypos3.jb=1;
		board[20][1] = 11;
		board2[20][1] = 5;
	}
	if(enemyNums>3){
		enemypos4.i=20;
		enemypos4.ib=20;
		enemypos4.j=17;
		enemypos4.jb=17;
		board[20][17] = 11;
		board2[20][17] = 5;
	}
	board2[10][9] = 10;
	board[10][9] = 10;
	superfoodpos.i=10;
	superfoodpos.j=9;
	while(pacman_remain>0){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2;
		board2[emptyCell[0]][emptyCell[1]] = 2;
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		pacman_remain--;
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
	addEventListener("keydown",keypressdown,false);
	
	addEventListener("keyup",keypressup,false);
	
	interval = setInterval(UpdatePosition, 150);
	interval1 = setInterval( UpdateEnemyPosition, 310);
	interval2 = setInterval( UpdatePositionsuperfood, 310);

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 21 + 1);
	var j = Math.floor(Math.random() * 18 + 1);
	while (board[i][j] != 0 || board2[i][j]==5) {
		i = Math.floor(Math.random() * 21 + 1);
		j = Math.floor(Math.random() * 18 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up_key]) {
		return 1;
	}
	if (keysDown[down_key]) {
		return 2;
	}
	if (keysDown[left_key]) {
		return 3;
	}
	if (keysDown[right_key]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = game_time.toFixed(2);
	lblLife.value=lifepool;
	
	for (var i = 0; i < 22; i++) {
		for (var j = 0; j < 19; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			if (board2[i][j] == 5) 
			{//enemy
					context.beginPath();
					context.drawImage(enemy,center.x-15,center.y-15);
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
				context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 2.1) 
			{//left
				context.beginPath();
				context.arc(center.x, center.y, 15,  1.15 * Math.PI,0.85* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 2.2) 
			{//down
				context.beginPath();
				context.arc(center.x, center.y, 15,  0.65 * Math.PI,2.35* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 7.5, center.y + 2.5, 2.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 2.3) 
			{//up
				context.beginPath();
				context.arc(center.x, center.y, 15,   1.65 * Math.PI,1.35* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 7.5, center.y - 2.5, 2.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board2[i][j] == 10) 
			{//superfood
				context.beginPath();
				context.rect(center.x - 10, center.y - 10, 20, 20)
				context.lineTo(center.x, center.y);
				context.fillStyle = superfoodcolor; //color
				context.fill();
			}
			 else if (board[i][j] == 1) 
			 {//food normal
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = normal_color; //color
				context.fill();
			}else if (board[i][j] == 1.1) 
			{//food magick
			   context.beginPath();
			   context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
			   context.fillStyle = magick_color; //color
			   context.fill();
		   }else if (board[i][j] == 1.2) 
		   {//food epic
			  context.beginPath();
			  context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
			  context.fillStyle = epic_color; //color
			  context.fill();
		  } else if (board[i][j] == 4) 
			{//wall
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			
			
		}
	}
}

function UpdatePosition() {
	if(!isPaused){
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
			 if (shape.j < 18 && board[shape.i][shape.j + 1] != 4) {
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

			if (shape.i < 21 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;

			}
		}
		if(board2[shape.i][shape.j] == 5){
			lifepool--;
			score-=10
			var temp=findRandomEmptyCell(board);
			shape.i=temp[0];
			shape.j=temp[1];
		}
		if(board2[shape.i][shape.j] == 10){
			score+=50;
			board2[shape.i][shape.j]=0
			window.clearInterval(interval2);
		}
		if (board[shape.i][shape.j] == 1) {
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
		if(lifepool<=0){
			Draw();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			window.clearInterval(interval2);
			removeEventListener("keydown", keypressdown, false);
			removeEventListener("keyup", keypressup, false);
			window.alert("Loser!");
			welcome();
		}
		if (game_time<=0) {
			Draw();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			window.clearInterval(interval2);
			removeEventListener("keydown", keypressdown, false);
			removeEventListener("keyup", keypressup, false);
			if(score<100)
				window.alert("You are better then "+score+" points!");
			else
				window.alert("Winner!!!");
			welcome();
		} else {
			Draw();
		}
	}
}

function UpdatePositionsuperfood() {
		if(!isPaused){
		board2[superfoodpos.i][superfoodpos.j] = 0;
		var bool=true
		while(bool){
			var x = Math.floor(Math.random() * 4)+1;
			if (x == 1) {
				if (superfoodpos.j > 0 && board[superfoodpos.i][superfoodpos.j - 1] != 4
					&& board2[superfoodpos.i][superfoodpos.j - 1] != 5) {
					superfoodpos.j--;
					superfoodcolor="red"
					bool=false;
				}
			}
			if (x == 2) {
				 if (superfoodpos.j < 18 && board[superfoodpos.i][superfoodpos.j + 1] != 4
					&& board2[superfoodpos.i][superfoodpos.j + 1] != 5) {
					superfoodpos.j++;
					superfoodcolor="blue"
					bool=false;
				}
			}
			if (x == 3) {

				if (superfoodpos.i > 0 && board[superfoodpos.i - 1][superfoodpos.j] != 4
					 && board2[superfoodpos.i - 1][superfoodpos.j] != 5) {
					superfoodpos.i--;
					superfoodcolor="green"
					bool=false;
				}
			}
			if (x == 4) {

				if (superfoodpos.i < 21 && board[superfoodpos.i + 1][superfoodpos.j] != 4
					&& board2[superfoodpos.i + 1][superfoodpos.j] != 5) {
					superfoodpos.i++;
					superfoodcolor="orange"
					bool=false;
				}
			}
		}
		board2[superfoodpos.i][superfoodpos.j]=10
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		game_time=game_time-(currentTime-steptime)/1000;
		steptime=currentTime;
		Draw();
	}
}


function UpdateEnemyPosition(){
	if(!isPaused){
		moveEnemyX(enemypos1);
		if(enemyNums>1)moveEnemyX(enemypos2);
		if(enemyNums>2)moveEnemyX(enemypos3);
		if(enemyNums>3)moveEnemyX(enemypos4);
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		game_time=game_time-(currentTime-steptime)/1000;
		steptime=currentTime;
		Draw();
	}	
}
function moveEnemyX(enemyposX){
	board2[enemyposX.i][enemyposX.j] = 0;
	var x=getBestMove(enemyposX);
	enemyposX.ib=enemyposX.i;
	enemyposX.jb=enemyposX.j;
	if (x == 1) {
		if (enemyposX.j > 0 && board[enemyposX.i][enemyposX.j - 1] != 4) {
			enemyposX.j--;
			
		}
	}
	if (x == 2) {
		if (enemyposX.j < 18 && board[enemyposX.i][enemyposX.j + 1] != 4) {
			enemyposX.j++;
			
		}
	}
	if (x == 3) {

		if (enemyposX.i > 0 && board[enemyposX.i - 1][enemyposX.j] != 4) {
			enemyposX.i--;
			
		}
	}
	if (x == 4) {

		if (enemyposX.i < 21 && board[enemyposX.i + 1][enemyposX.j] != 4) {
			enemyposX.i++;
			
		}
	}



	board2[enemyposX.i][enemyposX.j]=5
}

function getBestMove(enemyposX){
	var a=[100,100,100,100];
	var b=0;
	var c=100;
	if (enemyposX.j > 0 && board[enemyposX.i][enemyposX.j - 1] != 4 && enemyposX.j-1 !=enemyposX.jb
		&& board2[enemyposX.i][enemyposX.j - 1] != 5){
		if(!(enemyposX.j-1==3 && enemyposX.i==10)){	
		a[0]=Math.abs(enemyposX.i-shape.i) + Math.abs((enemyposX.j-1)-shape.j);
		if(a[0]<c) {b=1;c=a[0]}}
	}
	if (enemyposX.j < 18 && board[enemyposX.i][enemyposX.j + 1] != 4 && enemyposX.j+1 !=enemyposX.jb
		&& board2[enemyposX.i][enemyposX.j + 1] != 5) {
		if(!(enemyposX.j+1==15 && enemyposX.i==10)){
		a[1]=Math.abs(enemyposX.i-shape.i) + Math.abs((enemyposX.j+1)-shape.j);
		if(a[1]<c) {b=2;c=a[1]}}
	}
	if (enemyposX.i > 0 && board[enemyposX.i - 1][enemyposX.j] != 4 && enemyposX.i-1 !=enemyposX.ib
		&& board2[enemyposX.i-1][enemyposX.j] != 5) {
		a[2]=Math.abs((enemyposX.i-1)-shape.i) + Math.abs(enemyposX.j-shape.j);
		if(a[2]<c) {b=3;c=a[2]}
	}
	if (enemyposX.i < 21 && board[enemyposX.i + 1][enemyposX.j] != 4 && enemyposX.i+1 !=enemyposX.ib
		&& board2[enemyposX.i+1][enemyposX.j] != 5) {
		a[3]=Math.abs((enemyposX.i+1)-shape.i) + Math.abs(enemyposX.j-shape.j);
		if(a[3]<c) {b=4;c=a[3]};
	}
	return b
}