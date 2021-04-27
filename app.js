var context;
var shape = new Object();
var enemypos1 =new Object();
var enemypos2 =new Object();
var enemypos3 =new Object();
var enemypos4 =new Object();
var grimpos = new Object();
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
var grim_time;
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
var lifepiil=new Image();
var grimrip=new Image();
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
var timepill;
var keyboz=false;

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
	up_key=38;
	down_key=40;
	left_key=37;
	right_key=39;
	document.getElementById("keyup").innerHTML = "↑";
	document.getElementById("keyleft").innerHTML = "←";
	document.getElementById("keyright").innerHTML = "→";
	document.getElementById("keydown").innerHTML = "↓";

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
lifepiil.src="pill.png";
grimrip.src="grimrip.png";
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
		if(isPaused){
			isPaused = false;
			var song=document.getElementById("gamesong");
			song.play()
		}

		else{
			isPaused = true;
			var song=document.getElementById("gamesong");
			song.pause()
		}
		
		
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




function About(){
	var song=document.getElementById("gamesong");
	song.pause()
	isPaused=true;
	addEventListener("keydown",CloseAbout,false)
	// Get the modal
	var about=document.getElementById("About_modal")

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	about.style.display="block"

	window.onclick = function(event) {
		if (event.target == about) {
			about.style.display = "none";
			removeEventListener("keydown",CloseAbout,false)
			isPaused=false
			song.play()
		}
	  }

	// When the user clicks on <span> (x), close the modal
	  span.onclick = function() {
		about.style.display = "none";
		removeEventListener("keydown",CloseAbout,false)
		isPaused=false
		song.play()
	  }

}

function CloseAbout(e){
	var modal = document.getElementById('About_modal')
	if(e.key==='Escape')
	{
		modal.style.display="none"
		removeEventListener("keydown",CloseAbout,false)
		isPaused=false
		var song=document.getElementById("gamesong");
		song.play()
	}
}




function keypressdown(e) {
	keysDown[e.keyCode] = true;
}
function keypressup(e) {
	keysDown[e.keyCode] = false;
}
function keypressdownup(e) {
	if(e.keyCode!=left_key && e.keyCode!=right_key && e.keyCode!=down_key){
		document.getElementById("keyup").innerHTML = e.key;
		up_key=e.keyCode;
		keyboz=false
		removeEventListener("keydown",keypressdownup,false);
	}
	else
		alert("You already used this key for other direction")
}
function keypressdownleft(e) {
	if(e.keyCode!=up_key && e.keyCode!=right_key && e.keyCode!=down_key){
		document.getElementById("keyleft").innerHTML = e.key;
		left_key=e.keyCode;
		keyboz=false
		removeEventListener("keydown",keypressdownleft,false);
	}
	else
		alert("You already used this key for other direction")
}

function keypressdowndown(e) {
	if(e.keyCode!=up_key && e.keyCode!=right_key && e.keyCode!=left_key){
		document.getElementById("keydown").innerHTML = e.key;
		down_key=e.keyCode;
		keyboz=false
		removeEventListener("keydown",keypressdowndown,false);
	}
	else
		alert("You already used this key for other direction")
	
}

function keypressdownright(e) {
	if(e.keyCode!=up_key && e.keyCode!=down_key && e.keyCode!=left_key){
		document.getElementById("keyright").innerHTML = e.key;
		right_key=e.keyCode;
		keyboz=false
		removeEventListener("keydown",keypressdownright,false);
	}
	else
		alert("You already used this key for other direction")
}


function upKeyBind(){
	if(!keyboz){
		addEventListener("keydown",keypressdownup,false);
		keyboz=true
	}
	//wait(3000);
	//removeEventListener("keyd2",keypressdown2,false);
}
function leftKeyBind(){
	if(!keyboz){
		addEventListener("keydown",keypressdownleft,false);
		keyboz=true
	}		
	//wait(3000);
	//removeEventListener("keyd2",keypressdown2,false);
}
function downKeyBind(){
	if(!keyboz){
		addEventListener("keydown",keypressdowndown,false);
		keyboz=true
	}		
	//wait(3000);
	//removeEventListener("keyd2",keypressdown2,false);
}
function rightKeyBind(){
	if(!keyboz){
		addEventListener("keydown",keypressdownright,false);
		keyboz=true
	}		
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
		window.clearInterval(interval2);
		window.clearInterval(interval3);
		var song=document.getElementById("gamesong");
		song.pause()
		song.currentTime=0
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
//2.	
var x=document.getElementById("game_menu");
x.style.display="none";
//
var y=document.getElementById("welcome_menu");
y.style.display="block";
}
function backToSetting(){
	window.clearInterval(interval);
	window.clearInterval(interval1);
	window.clearInterval(interval2);
	window.clearInterval(interval3);

	var song=document.getElementById("gamesong");
	song.pause()
	song.currentTime=0
	var x=document.getElementById("game_menu");
	x.style.display="none";

	var setting=document.getElementById("setting_Screen");
	setting.style.display="block";
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
	song.volume=0.1;

	//Start();
	
}
function startgame(){

	removeEventListener("keydown",keypressdownright,false);
	removeEventListener("keydown",keypressdownleft,false);
	removeEventListener("keydown",keypressdownup,false);
	removeEventListener("keydown",keypressdowndown,false);

	var setting=document.getElementById("setting_Screen");
	setting.style.display="none";

	var x=document.getElementById("game_menu");
	x.style.display="block";

	var song=document.getElementById("mySong");
	song.pause()
	song.currentTime=0
	Start();
	
	var song=document.getElementById("gamesong");
	song.play()
	song.volume=0.05;

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
	timepill= new Date();
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
	interval1 = setInterval( UpdateEnemyPosition, 300);
	interval2 = setInterval( UpdatePositionsuperfood, 300);
	interval3 = setInterval( grimripMove, 2000);

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
function findgrimCell(board) {
	var i = Math.floor(Math.random() * 21 + 1);
	var j = Math.floor(Math.random() * 18 + 1);
	while (board[i][j] == 4 || board2[i][j]==5 || board2[i][j]==10) {
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
			else if (board2[i][j] == 69) 
			{//grimrip
				context.beginPath();
				context.drawImage(grimrip,center.x-14.5,center.y-15);
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
			else if (board[i][j] == 8) 
			{//life pill
				context.beginPath();
				context.drawImage(lifepiil,center.x-15,center.y-5.5);
		   }
			
			
		}
	}
}
function grimripMove(){
	if(!isPaused){
		var temp=findgrimCell(board);
		board2[temp[0]][temp[1]]=69
		grimpos.i =temp[0]
		grimpos.j =temp[1]
		grim_time=new Date();
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		game_time=game_time-(currentTime-steptime)/1000;
		steptime=currentTime;
		Draw();}
		else{
			steptime = new Date();
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
			else if(shape.i==10 && shape.j==0){
				shape.j=18
			}
		}
		if (x == 2) {
			pac_pos = 2.2;
			 if (shape.j < 18 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;

			}
			else if(shape.i==10 && shape.j==18){
				shape.j=0
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
			board2[enemypos1.i][enemypos1.j]=0
			enemypos1.i=1
			enemypos1.j=1
			board2[enemypos1.i][enemypos1.j]=5
			if(enemyNums>1){
				board2[enemypos2.i][enemypos2.j]=0
				enemypos2.i=1
				enemypos2.j=17
				board2[enemypos2.i][enemypos2.j]=5
			}
			if(enemyNums>2){
				board2[enemypos3.i][enemypos3.j]=0
				enemypos3.i=20
				enemypos3.j=1
				board2[enemypos3.i][enemypos3.j]=5
			}
			if(enemyNums>3){
				board2[enemypos4.i][enemypos4.j]=0
				enemypos4.i=20
				enemypos4.j=17
				board2[enemypos4.i][enemypos4.j]=5
			}

		}
		var timenow=new Date();
		if(Math.floor((timenow-timepill)/1000)==20){
			var temp=findRandomEmptyCell(board);
			board[temp[0]][temp[1]]=8;
			timepill=timenow;
		}
		if(Math.floor((timenow-grim_time)/1000)==1){
			board2[grimpos.i][grimpos.j]=0;
		}
		if(board2[shape.i][shape.j] == 69){
			score-=100;
			lifepool--
			var temp=findRandomEmptyCell(board);
			shape.i=temp[0];
			shape.j=temp[1];
		}
		if(board2[shape.i][shape.j] == 10){
			score+=50;
			board2[shape.i][shape.j]=0
			window.clearInterval(interval2);
		}
		if(board[shape.i][shape.j] == 8){
			lifepool++;
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
			window.clearInterval(interval3);
			var song=document.getElementById("gamesong");
			song.pause()
			song.currentTime=0
			removeEventListener("keydown", keypressdown, false);
			removeEventListener("keyup", keypressup, false);
			window.alert("Loser!");
			Draw();

		}
		if (game_time<=0) {
			Draw();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			window.clearInterval(interval2);
			window.clearInterval(interval3);
			var song=document.getElementById("gamesong");
			song.pause()
			song.currentTime=0
			removeEventListener("keydown", keypressdown, false);
			removeEventListener("keyup", keypressup, false);
			Draw();
			if(score<100)
				window.alert("You are better then "+score+" points!");
			else
				window.alert("Winner!!!");
		} else {
			Draw();
		}
	}
	else{
		steptime = new Date();
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
					&& board2[superfoodpos.i][superfoodpos.j - 1] != 5 && board2[superfoodpos.i][superfoodpos.j - 1] != 69) {
					superfoodpos.j--;
					superfoodcolor="red"
					bool=false;
				}
			}
			if (x == 2) {
				 if (superfoodpos.j < 18 && board[superfoodpos.i][superfoodpos.j + 1] != 4
					&& board2[superfoodpos.i][superfoodpos.j + 1] != 5 && board2[superfoodpos.i][superfoodpos.j + 1] != 69) {
					superfoodpos.j++;
					superfoodcolor="blue"
					bool=false;
				}
			}
			if (x == 3) {

				if (superfoodpos.i > 0 && board[superfoodpos.i - 1][superfoodpos.j] != 4
					 && board2[superfoodpos.i - 1][superfoodpos.j] != 5 && board2[superfoodpos.i][superfoodpos.j + 1] != 69) {
					superfoodpos.i--;
					superfoodcolor="green"
					bool=false;
				}
			}
			if (x == 4) {

				if (superfoodpos.i < 21 && board[superfoodpos.i + 1][superfoodpos.j] != 4
					&& board2[superfoodpos.i + 1][superfoodpos.j] != 5 && board2[superfoodpos.i][superfoodpos.j + 1] != 69) {
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
	else{
		steptime = new Date();
	}	
}


function UpdateEnemyPosition(){
	if(!isPaused){
		moveEnemyX2(enemypos1);
		if(enemyNums>1)moveEnemyX2(enemypos2);
		if(enemyNums>2)moveEnemyX2(enemypos3);
		if(enemyNums>3)moveEnemyX2(enemypos4);
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		game_time=game_time-(currentTime-steptime)/1000;
		steptime=currentTime;
		Draw();
	}
	else{
		steptime = new Date();
	}	
}
function moveEnemyX(enemyposX,coin){
	board2[enemyposX.i][enemyposX.j] = 0;
	var x=getBestMove(enemyposX,coin);
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
function moveEnemyX2(enemyposX){
	board2[enemyposX.i][enemyposX.j]=0
	var temp=astar(enemyposX)
	enemyposX.i=temp.i
	enemyposX.j=temp.j
	board2[enemyposX.i][enemyposX.j]=5
}
function astar(enemyposX){
	var openlist= new PriorityQueue();
	enemyposX.val=hurstic(enemyposX);
	enemyposX.g=0;
	enemyposX.perv=0;
	openlist.push(enemyposX);
	var closelist={};
	while (!openlist.isEmpty()){
		var temppos=openlist.pop();
		closelist[String(temppos.i)+String(temppos.j)]=1
		if(temppos.j==shape.j && temppos.i==shape.i)
			return getbestmoveupg(temppos)
		else{
			neighbors(temppos,openlist,closelist);
		}
		
	}
	var x = Math.floor(Math.random() * 4)+1;
	if (x == 1) {
		if (enemyposX.j > 0 && board[enemyposX.i][enemyposX.j - 1] != 4
		&& board2[enemyposX.i][enemyposX.j - 1] != 5 && board2[enemyposX.i][enemyposX.j - 1] != 69) {
			enemyposX.j--;
			
		}
	}
	if (x == 2) {
		if (enemyposX.j < 18 && board[enemyposX.i][enemyposX.j + 1] != 4
			&& board2[enemyposX.i][enemyposX.j + 1] != 5 && board2[enemyposX.i][enemyposX.j + 1] != 69	) {
			enemyposX.j++;
			
		}
	}
	if (x == 3) {

		if (enemyposX.i > 0 && board[enemyposX.i - 1][enemyposX.j] != 4
			&& board2[enemyposX.i - 1][enemyposX.j] != 5 && board2[enemyposX.i - 1][enemyposX.j] != 69) {
			enemyposX.i--;
			
		}
	}
	if (x == 4) {

		if (enemyposX.i < 21 && board[enemyposX.i + 1][enemyposX.j] != 4
			&& board2[enemyposX.i][enemyposX.j + 1] != 5 && board2[enemyposX.i][enemyposX.j + 1] != 69) {
			enemyposX.i++;
			
		}
	}
	return enemyposX;
}
function getbestmoveupg(pos){
	var perv;
	while(pos.perv!=0){
		perv=pos;
		pos=pos.perv;
	}
	return perv;
}

function hurstic(enemyposX){
	return Math.abs(enemyposX.i-shape.i) + Math.abs(enemyposX.j-shape.j);
}
function neighbors(pos,openlist,closelist){
	if (pos.j > 0 && board[pos.i][pos.j - 1] != 4 
		&& board2[pos.i][pos.j - 1] != 5 && board2[pos.i][pos.j - 1] != 69){
		var newpos=new Object();
		newpos.i=pos.i;
		newpos.j=pos.j - 1;
		newpos.g=pos.g+1
		newpos.val=newpos.g+hurstic(newpos);
		newpos.perv=pos;
		var strt=String(newpos.i)+(String(newpos.j));
		if(!(String(newpos.i)+(String(newpos.j)) in closelist)){
			if(openlist.notin(newpos)){
				openlist.push(newpos)}}
	}
	if (pos.j < 18 && board[pos.i][pos.j + 1] != 4 
		&& board2[pos.i][pos.j + 1] != 5 && board2[pos.i][pos.j + 1] != 69){
		var newpos=new Object();
		newpos.i=pos.i;
		newpos.j=pos.j + 1;
		newpos.g=pos.g+1
		newpos.val=newpos.g+hurstic(newpos);
		newpos.perv=pos;

		if(!(String(newpos.i)+(String(newpos.j)) in closelist)){
			if(openlist.notin(newpos)){
				openlist.push(newpos)}}
	}
	if (pos.i > 0 && board[pos.i-1][pos.j] != 4 
		&& board2[pos.i-1][pos.j] != 5 && board2[pos.i-1][pos.j] != 69){
		var newpos=new Object();
		newpos.i=pos.i-1;
		newpos.j=pos.j;
		newpos.g=pos.g+1
		newpos.val=newpos.g+hurstic(newpos);
		newpos.perv=pos;
		var strt=String(newpos.i)+(String(newpos.j));
		if(!(String(newpos.i)+ (String(newpos.j)) in closelist)){
			if(openlist.notin(newpos)){
				openlist.push(newpos)}}
	}
	if (pos.i < 21 && board[pos.i+1][pos.j] != 4 
		&& board2[pos.i+1][pos.j] != 5&& board2[pos.i+1][pos.j] != 69){
		var newpos=new Object();
		newpos.i=pos.i+1;
		newpos.j=pos.j;
		newpos.g=pos.g+1
		newpos.val=newpos.g+hurstic(newpos);
		newpos.perv=pos;
		var strt=String(newpos.i)+(String(newpos.j));
		if(!(String(newpos.i)+(String(newpos.j)) in closelist)){
			if(openlist.notin(newpos)){
				openlist.push(newpos)}}
	}
}

function getBestMove(enemyposX,coin){
	var a=[100,100,100,100];
	var b=0;
	var c=100;
	if (enemyposX.j > 0 && board[enemyposX.i][enemyposX.j - 1] != 4 && enemyposX.j-1 !=enemyposX.jb
		&& board2[enemyposX.i][enemyposX.j - 1] != 5){
		if(!(enemyposX.j-1==3 && enemyposX.i==10)){	
		if(coin==0){
			a[0]=Math.abs(enemyposX.i-shape.i) + Math.abs((enemyposX.j-1)-shape.j);}
		if(coin==1){
			a[0]=((enemyposX.i-shape.i)**2 + ((enemyposX.j-1)-shape.j)**2)**0.5;
		}
		if(a[0]<c) {b=1;c=a[0]}}
	}
	if (enemyposX.j < 18 && board[enemyposX.i][enemyposX.j + 1] != 4 && enemyposX.j+1 !=enemyposX.jb
		&& board2[enemyposX.i][enemyposX.j + 1] != 5) {
		if(!(enemyposX.j+1==15 && enemyposX.i==10)){
			if(coin==0){
				a[1]=Math.abs(enemyposX.i-shape.i) + Math.abs((enemyposX.j+1)-shape.j);}
			if(coin==1){
				a[1]=((enemyposX.i-shape.i)**2 + ((enemyposX.j+1)-shape.j)**2)**0.5;
			}
		if(a[1]<c) {b=2;c=a[1]}}
	}
	if (enemyposX.i > 0 && board[enemyposX.i - 1][enemyposX.j] != 4 && enemyposX.i-1 !=enemyposX.ib
		&& board2[enemyposX.i-1][enemyposX.j] != 5) {
			if(coin==0){
				a[2]=Math.abs((enemyposX.i-1)-shape.i) + Math.abs(enemyposX.j-shape.j);}
			if(coin==1){
				a[2]=(((enemyposX.i-1)-shape.i)**2 + (enemyposX.j-shape.j)**2)**0.5;
			}
		
		if(a[2]<c) {b=3;c=a[2]}
	}
	if (enemyposX.i < 21 && board[enemyposX.i + 1][enemyposX.j] != 4 && enemyposX.i+1 !=enemyposX.ib
		&& board2[enemyposX.i+1][enemyposX.j] != 5) {
			if(coin==0){
				a[3]=Math.abs((enemyposX.i+1)-shape.i) + Math.abs(enemyposX.j-shape.j);}
			if(coin==1){
				a[3]=(((enemyposX.i+1)-shape.i)**2 + (enemyposX.j-shape.j)**2)**0.5;
			}
		if(a[3]<c) {b=4;c=a[3]};
	}
	return b
}



const topopo = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
 	 constructor(comparator = (a, b) => a.val < b.val) {
 	   this._heap = [];
 	   this._comparator = comparator;
 	 }
 	 size() {
 	   return this._heap.length;
 	 }
 	 isEmpty() {
 	   return this.size() == 0;
 	 }
 	 peek() {
 	   return this._heap[topopo];
 	 }
 	 push(...values) {
 	   values.forEach(value => {
 	     this._heap.push(value);
 	     this._siftUp();
 	   });
 	   return this.size();
 	 }
 	 pop() {
 	   const poppedValue = this.peek();
 	   const bottom = this.size() - 1;
 	   if (bottom > topopo) {
 	     this._swap(topopo, bottom);
 	   }
 	   this._heap.pop();
 	   this._siftDown();
 	   return poppedValue;
 	 }
 	 replace(value) {
 	   const replacedValue = this.peek();
 	   this._heap[topopo] = value;
 	   this._siftDown();
 	   return replacedValue;
 	 }
		notin(val){
			this._heap.forEach(element => {
				if ((String(element.i)+(String(element.j))==(String(val.i)+(String(val.j))))) return false;
				
			});
			return true
		}
 	 _greater(i, j) {
 	   return this._comparator(this._heap[i], this._heap[j]);
 	 }
 	 _swap(i, j) {
 	   [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
 	 }
 	 _siftUp() {
 	   let node = this.size() - 1;
 	   while (node > topopo && this._greater(node, parent(node))) {
 	     this._swap(node, parent(node));
 	     node = parent(node);
 	   }
 	 }
 	 _siftDown() {
 	   let node = topopo;
 	   while (
 	     (left(node) < this.size() && this._greater(left(node), node)) ||
 	     (right(node) < this.size() && this._greater(right(node), node))
 	   ) {
 	     let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
 	     this._swap(node, maxChild);
 	     node = maxChild;
 	   }
 	 }
}