
	    $(document).ready(function() {
		const LEFT_ARROW = 37;
        const UP_ARROW = 38;
        const RIGHT_ARROW = 39;
        const DOWN_ARROW = 40;
        const SPACE = 32;
		const XPRESS = 88;
        const FRAME_RATE = 20;
        var ANIMATION_RATE = 150;	  
        const SPEED = 3.5;
		const SPEEDX = 5;	
		const JUMP = -8;	
		const FRICTION = 0.3;
        const GRAVITY = 0.3;
		
        var MARIO_HEIGHT = 32;
        var MARIO_WIDTH = 32;
        
        var canvas = $("#myCanvas");
        var context = canvas.get(0).getContext("2d");	  
		var cW = context.canvas.width , cH = context.canvas.height ;
		
        var leftKeyDown = false;
        var rightKeyDown = false;
		var standLeft = false;
		var standRight = false;
		
		var upDown = true;
		var gameState = "go";
		var inTransition = true;
		var outTransition = false;
		var gameWon = false;
		
		var _LivesRemaining = 5;
		var _timeRemaining = 300;		
		 
		var floorblocks = new Array();
		createfloorBlocks();
		
		var cannonballs = new Array();
		createCannonBalls();
		
		var ballstofire = new Array();
		CannonBalls();
        	      
        window.addEventListener("keydown", keyDownHandler, false);
        window.addEventListener("keyup", keyUpHandler, false);
		
		//SOUNDS
		var Backgroundmusic = $("#backgroundMusic").get(0);
		//Backgroundmusic.currentTime = 0;
		//Backgroundmusic.play();
		
		var Win = $("#WinSound").get(0);
		var Lose = $("#LoseSound").get(0);
		var mushroomApear = $("#mushroomApear").get(0);		
		var JumpSFX = $("#JumpSFX").get(0);
		var Die = $("#Die").get(0);
		var getShroomSFX = $("#getShroomSFX").get(0);			
		var twentySecsLeft = $("#twentySecsLeft").get(0);
		var Lightning = $("#Lightning").get(0);
		var fg = new Image();
		fg.src = "Pics/Foregroundcloud.png";
        
		hud = new InGameEntity("Pics/hud.png", 0, 0, 232, 28,
														150, 400, 232*2, 28*2);
														hud.addRange("Hud", 0,1 );
														hud.setRange("Hud");
														
		background = new InGameEntity("Pics/Backgrouncloud2.png", 0, 0, 1770, 294,
														0, 0, 1770*1.8, 294*1.8);
														background.addRange("background", 0,5 );
														background.addFrame(0,	294, 	  1770, 294);
														background.addFrame(0, 	294*2, 1770, 294);      
														background.addFrame(0,	294*3, 1770, 294);
														background.addFrame(0,	294*4, 1770, 294);
														background.addFrame(0,	294*5, 1770, 294);
														background.setRange("background");	
		
														
  
  
        var mario = new Mario("Pics/Mario.png",
                                     15, 129, 16, 16,
                                     (canvas.width() - MARIO_WIDTH) / 4, 
                                     0, //(canvas.height() - 16) / 2, 
                                     MARIO_WIDTH, MARIO_HEIGHT);
                                     
        var roomFloor = ((canvas.height() - 16) / 2) + mario.getHeight();  

		
		
       
        mario.setay(GRAVITY);                         
                                 
        mario.setRangeFrames("", 0, 1);

        mario.addRange("Small Mario Walk Ahead", 1, 3);
        mario.addFrame(15, 9, 16, 16);
        mario.addFrame(15, 49, 16, 16);
  
        mario.addRange("Small Mario Walk Right", 3, 5);
        mario.addFrame(215, 89, 16, 16);
        mario.addFrame(256, 89, 16, 16);
                                     
        mario.addRange("Small Mario Walk Left", 5, 7);
        mario.addFrame(175, 89, 16, 16);
        mario.addFrame(135, 89, 16, 16);
                                     
        mario.addRange("Jumpright", 7, 8);
        mario.addFrame(335, 89, 16, 16);
                                   
        mario.addRange("Jumpleft", 8, 9);
        mario.addFrame(55, 89, 16, 16);
		
		mario.addRange("Die", 9, 10);
        mario.addFrame(16, 210, 16, 16);
		
		mario.addRange("Standright", 3, 4);
		mario.addRange("Standleft", 5, 6);
		
		//Big Mario     16 width  27 height
		mario.addRange("Big Mario Walk Right", 10, 13);
		mario.addFrame(216, 243, 16, 27);
		mario.addFrame(255, 243, 16, 27);
		mario.addFrame(295, 243, 16, 27);
                                     
        mario.addRange("Big Mario Walk Left", 13, 16);
		mario.addFrame(174, 243, 16, 27);
        mario.addFrame(135, 243, 16, 27);
        mario.addFrame(95, 243, 16, 27);
		
		mario.addRange("BigStandright", 10, 11);
		mario.addRange("BigStandleft", 13, 14);
	
		mario.addRange("BigJumpright", 16,17);
        mario.addFrame(335, 243, 16, 27);
                                   
        mario.addRange("BigJumpleft", 17, 18);
        mario.addFrame(55, 243, 16, 27);
		
		mario.addRange("BigDuckleft", 18, 19);
        mario.addFrame(14, 239, 16, 27);
		
		mario.addRange("BigDuckright", 19, 20);
        mario.addFrame(376, 239, 16, 27);

		
		var propellar1 = new Ship("Pics/propeller.png",
                                     0, 0, 21, 74,     806 -100,	415 +70 ,         21, 74);
		propellar1.setRangeFrames("", 0, 1);
		propellar1.addRange("spin", 0, 2);
		propellar1.addFrame(21, 0, 21, 74);
		propellar1.addFrame(42, 0, 21, 74);
		propellar1.setRange("spin");	
		
		var propellar2 = new Ship("Pics/propeller.png",
                                     0, 0, 21, 74,     1505 -100,	460 +70 ,         21, 74);
		propellar2.setRangeFrames("", 0, 1);
		propellar2.addRange("spin", 0, 2);
		propellar2.addFrame(21, 0, 21, 74);
		propellar2.addFrame(42, 0, 21, 74);
		propellar2.setRange("spin");	
		
		var propellar3 = new Ship("Pics/propeller.png",
                                     0, 0, 21, 74,     2243 -100,	460 +70 ,         21, 74);
		propellar3.setRangeFrames("", 0, 1);
		propellar3.addRange("spin", 0, 2);
		propellar3.addFrame(21, 0, 21, 74);
		propellar3.addFrame(42, 0, 21, 74);
		propellar3.setRange("spin");	
		
		
		var ball1 = new Ball("Pics/cannonball.png",
                                     0, 0, 15, 16,     744,448,         30, 32, "up", "left");
		ball1.setRangeFrames("", 0, 1);
		ball1.addRange("spin", 0, 3);
		ball1.addFrame(16, 0, 15, 16);
		ball1.addFrame(32, 0, 15, 16);
		ball1.addFrame(48, 0, 15, 16);
		ball1.setRange("spin");							 
									 
		var ball2 = new Ball("Pics/cannonball.png",
                                     0, 0, 15, 16,     744,0,         30, 32, "down", "left");
		ball2.setRangeFrames("", 0, 1);
		ball2.addRange("spin", 0, 3);
		ball2.addFrame(16, 0, 15, 16);
		ball2.addFrame(32, 0, 15, 16);
		ball2.addFrame(48, 0, 15, 16);
		ball2.setRange("spin");

		var ball3 = new Ball("Pics/cannonball.png",
                                     0, 0, 15, 16,     744,40,         30, 32, "", "left");
		ball3.setRangeFrames("", 0, 1);
		ball3.addRange("spin", 0, 3);
		ball3.addFrame(16, 0, 15, 16);
		ball3.addFrame(32, 0, 15, 16);
		ball3.addFrame(48, 0, 15, 16);
		ball3.setRange("spin");

		var ball4 = new Ball("Pics/cannonball.png",
                                     0, 0, 15, 16,     744,400,         30, 32, "", "right");
		ball4.setRangeFrames("", 0, 1);
		ball4.addRange("spin", 0, 3);
		ball4.addFrame(16, 0, 15, 16);
		ball4.addFrame(32, 0, 15, 16);
		ball4.addFrame(48, 0, 15, 16);
		ball4.setRange("spin");

		var ball5 = new Ball("Pics/cannonball.png",
                                     0, 0, 15, 16,     0,448,         30, 32, "up", "right");
		ball5.setRangeFrames("", 0, 1);
		ball5.addRange("spin", 0, 3);
		ball5.addFrame(16, 0, 15, 16);
		ball5.addFrame(32, 0, 15, 16);
		ball5.addFrame(48, 0, 15, 16);
		ball5.setRange("spin");

		var ball6 = new Ball("Pics/cannonball.png",
                                     0, 0, 15, 16,     600,-40,         30, 32, "", "down");
		ball6.setRangeFrames("", 0, 1);
		ball6.addRange("spin", 0, 3);
		ball6.addFrame(16, 0, 15, 16);
		ball6.addFrame(32, 0, 15, 16);
		ball6.addFrame(48, 0, 15, 16);
		ball6.setRange("spin");
		
		var bullet1 = new Ball("Pics/bulletBill.png",
                                     0, 0, 16, 14,     600,-40,         32, 28, "", "left");
		

		var bullet2 = new Ball("Pics/bulletBill.png",
                                     0, 0, 16, 14,     600,-40,         32, 28, "", "left");


		
									 
									 
		
	var gameState = "go";
	function GameState()
	{
		if(_timeRemaining == 20)
		{
			if(twentySecsLeft.paused)
				{
					twentySecsLeft.currentTime = 0;
					twentySecsLeft.play();
				};
		}
		if(mario.gety() >cH || _timeRemaining == 0)
		{
		gameState = "dead"
		}
		
		if(gameState == "dead" && _LivesRemaining != 0)
		{
		Backgroundmusic.play();
		_LivesRemaining--;
		ship.setx(-100);
		ship.sety(70);
		propellar1.setx(806 -100);
		propellar1.sety(415 +70); 
		propellar2.setx(1505 -100);
		propellar2.sety(460 +70); 
		propellar3.setx(2243 -100);
		propellar3.sety(460 +70);  
		floorblocks.length = 0;
		createfloorBlocks()
		cannonballs.length = 0;
		createCannonBalls()
		mario.setx((cW - MARIO_WIDTH) / 4);
		mario.sety(0);
		mario.setMarioState("smallAlive");
		gameState = "go"
		qBlock.setx((canvas.width() - MARIO_WIDTH) / 3);
		qBlock.sety(100);
		}
		else if(_LivesRemaining ==0)
		{
		outTransition = true;
		}
	
	}
	
	var shipFly = function(){ 
	
		
			if((upDown == true &&	ship.getshipDrive()==true)){
						ascend();
						}
			if((upDown == false && 	ship.getshipDrive()==true)){
						descend();
						};	
			//console.log(ship.gety());
			function ascend(){
				ship.setvy(-0.2);
				qBlock.setvy(-0.2);
				propellar1.setvy(-0.2);
				propellar2.setvy(-0.2);
				propellar3.setvy(-0.2);
					for(var i= 0; i < floorblocks.length; ++i)
					{
						floorblocks[i].setvy(-0.2);		
					} 
					if(ship.gety() <= -100){
						upDown = false;
						//boatpause();
					};
				}
				
			function descend(){
				ship.setvy(0.2);
				qBlock.setvy(0.2);
				propellar1.setvy(0.2);
				propellar2.setvy(0.2);
				propellar3.setvy(0.2);
				for(var i= 0; i < floorblocks.length; ++i)
					{
						floorblocks[i].setvy(0.2);		
					} 
					if(ship.gety() >= 90){
						upDown = true;
						
						
					}
				}
			
			if(ship.getshipDrive()==false)
			{
				ship.setvy(0);
					for(var i= 0; i < floorblocks.length; ++i)
					{
						floorblocks[i].setvy(0);		
					} 
			}
		
		}	
		
	
		
	
	
	
		function InTransition()
	{
		this.lineWidth = 500;
		this.render = function()
		{
		Backgroundmusic.currentTime = 0;
		Backgroundmusic.play();
		Lightning.currentTime = 0;
		Lightning.play();
		context.strokeStyle = "black";
		context.lineWidth = this.lineWidth -=10;
		context.strokeRect(0, 0, cW, cH);
			if(this.lineWidth == 0)
					{
					this.lineWidth = 0;
					inTransition = false;
					}
		}
	};
	
	function OutTransition()
	{
		this.lineWidth = 10;
		this.render = function()
		{
			if(outTransition)
			{
			context.strokeStyle = "black";
			context.lineWidth = this.lineWidth +=2;
			context.strokeRect(0, 0, cW, cH);
				if(this.lineWidth == 500 )
				{
					window.open ('MarioMain.html','_self',false)
				}
					
			}
							
		}
								
	};	
	
	function foreground() { 
		this.X = 0 , this.Y = 0, this.w = fg.width, this.h = fg.height
			this.render = function(){
				context.drawImage(fg, this.X-- *3, 200);
					if(this.X <= -300){
						this.X = 0;
						}
				}
		}
	var foreground = new foreground();
	
				
	
		
	function Score()
		{
			this.draw = function(c)
			  { 
				var score = "0000" + mario.getScore();
				c.font = "bold 20px sans-serif";
				c.fillStyle = "white";
				c.strokeStyle = "blue";
				c.fillText (score, 267, 444);
				c.strokeText (score, 267, 444);
			  };
			  
		};
	
	
	function Lives()
		{
			
			 
			 if(gameState == "dead")
			 {
			 _LivesRemaining--;
			 }
			this.getLivesRemaining = function()
				  {
					return _LivesRemaining;
				  }
			this.draw = function(c)
			  { 
				var LivesText = "" + _LivesRemaining;
				c.font = "bold 20px sans-serif";
				c.fillStyle = "white";
				context.lineWidth = 1;
				c.strokeStyle = "blue";
				c.fillText (LivesText, 207, 444);
				c.strokeText (LivesText, 207, 444);
			  };
			  
		};
	
	
		function GameTimer()
		{
			
		
			var _timerID = setInterval(timeHandler, 1000);
			
			if(gameState == "dead")
			{
			_timeRemaining = 300;
			}
			 function setTimeRemaining(val)
			 {
			 _timeRemaining=(val);
			 }
			 
			  function timeHandler()
			  {
					//console.log(_timeRemaining);
						--_timeRemaining;    
						if(_timeRemaining == 0)
						{
						  clearInterval(_timerID);
						}
				
			  };
			 
			 this.stopTimer = function()
				  {
					clearInterval(_timerID);
				  };
			 
			this.getTimeRemaining = function()
				  {
					return _timeRemaining;
				  }
			this.draw = function(c)
			  { 
				var timeText = "" + _timeRemaining;
				c.font = "bold 20px sans-serif";
				c.fillStyle = "white";
				c.strokeStyle = "blue";
				c.fillText (timeText, 403, 444);
				c.strokeText (timeText, 403, 444);
			  };
			  
		};
		
		var qBlock = new QBlock("Pics/mysteryblock.fw.png",
                                     0, 0, 18, 19,
                                     (canvas.width() - MARIO_WIDTH) / 3, 
                                     100, 18*1.5, 19*1.5);
			qBlock.setRangeFrames("", 0, 1);
			qBlock.addRange("block", 0, 1);
			qBlock.setRange("block");	

		
		var shipX = 100;
		var shipY = 70;
		var ship = new Ship("Pics/Airshipfinal1.png",
                                    0,0,3540,588,
									-100,70,3540,588)
			ship.setRangeFrames("", 0, 1);
			ship.addRange("ship", 0, 1);
			ship.setRange("ship");	
			


	function CannonBalls()
  {
 this.file, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh, this.dir1, this.dir2, 
 this.Balls = [];

  
    //   for(var i = 0; i < Balls.length; ++i)
   // {
     // ballstofire.push(new Ball("Pics/cannonball.png", 0,0,15,16, Balls[i][0],Balls[i][1],30,32,
		//																	Balls[i][4],	Balls[i][5]));															
    //}               
 };
			
	function createCannonBalls()
  {
    var Balls = [
                           //  X    xoffset      Y     yoffset   width/height
							[697   	-100,   	221   	+70, 	30, 32,"up","left"], // up and left
							[882   	-100,   	220   	+70, 	30, 32,"up","left"], // up and left
		//BULLET	[1097   -100,   	185   	+70, 	42, 75],
		//BULLET	[1619   -100,   	221   	+70, 	42, 75],
		//BULLET	[2837   -100,   	334   	+70, 	42, 75], left
							[1323   -100,   	332   	+70, 	30, 32,"up","left"],				 // up and left
							[1471   -100,   	73 	  	+70, 	30, 32,"down","left"], 		 // down and left
							[1657   -100,   	73	   	+70, 	30, 32,"down","left"],			 // down and left
							[2053   -100,   	129	   	+70, 	30, 32,"","left"], 				 // left
							[2131   -100,   	131	   	+70, 	30, 32,"","right"], 				 // right
							[2087   -100,   	174	   	+70, 	30, 32,"","down"], 			 // down
							[2916   -100,   	407	   	+70, 	30, 32,"up","right"], 			 // up right
				            [2628   -100,   	404	   	+70, 	30, 32,"","down"], 			 // down                                           
                            ];
    for(var i = 0; i < Balls.length; ++i)
    {
      cannonballs.push(new CannonSpawn(Balls[i][0],	Balls[i][1], Balls[i][2], Balls[i][3], Balls[i][4], Balls[i][5]));
   

   }   
                     
  };	
		
		
  function createfloorBlocks()
  {
    var Floor = [
                           //  X    xoffset      Y     yoffset   width/height
							[144   	-100,   	184   	+70, 	330, 3],
							[468   	-100,   	185  		+70, 	6, 74],
							[474   	-100,   	258 	 	+70, 	740, 3],
							[697   	-100,   	221   	+70, 	38, 37],
							[882   	-100,   	220   	+70, 	36, 38],
							[1097   -100,   	185   	+70, 	42, 75],
							[1206   -100,   	260   	+70, 	6, 112],
							[1212   -100,   	368   	+70, 	1367, 3],
							[1323   -100,   	332   	+70, 	40, 38],
							[1361   -100,   	258   	+70, 	74, 112],
							[1619   -100,   	222   	+70, 	36, 149],
							[1471   -100,   	35 	  	+70, 	1294, 36],
							[1471   -100,   	73 	  	+70, 	42, 36],
							[1657   -100,   	73	   	+70, 	40, 36],
							[2175   -100,   	257   	+70, 	36, 111],
							[2249   -100,   	75	   	+70, 	512, 108],
							[2574   -100,   	369   	+70, 	5, 75],
							[2580   -100,   	442   	+70, 	372, 8],
							[2837   -100,   	332   	+70, 	39, 112],
							[2614   -100,   	405   	+70, 	112, 38],
							[3023   -100,   	369   	+70, 	46, 39],
							[3060   -100,   	332   	+70, 	43, 39],
							[3096   -100,   	258   	+70, 	405, 74],
							[3244   -100,   	184   	+70, 	74, 75],
                                                          
                            ];
    for(var i = 0; i < Floor.length; ++i)
    {
      floorblocks.push(new Groundblock(Floor[i][0],	Floor[i][1], Floor[i][2], Floor[i][3]));
    }   
    
 
                    
  };
		
		
		var mushroomspawn = false;
		var mushX = (canvas.width() - MARIO_WIDTH) / 3;
		var randomDirection = Math.floor(Math.random() * 10);
		var mushroom = new Mushroom("Pics/redmushroom.fw.png",
                                     0, 0, 21, 23,
                                    qBlock.getx(), qBlock.gety()-30,
                                     21*1.5, 23*1.5);
			mushroom.setRangeFrames("", 0, 1);
			mushroom.addRange("zoom", 0, 1);				
			mushroom.setvy(GRAVITY);
			
		
		
		function mushroomMove()
		{
			if(mushroomspawn)
			{
				
				if(randomDirection > 4)
				{
					mushroom.setvx(2);
					mushroom.setvy(5);
				}
				
				if(randomDirection < 4)
				{
					mushroom.setvx(-2);
					mushroom.setvy(5);
				}
				
				if(mushroom.getx() < 0 || mushroom.getx() > canvas.width())
				{
					mushroom.setx(qBlock.getx());
					mushroom.sety(qBlock.gety()-30);
					randomDirection = Math.floor(Math.random() * 10);
					mushroomspawn = false;
				}
				
			}
		};
					
		animate();
	      
        function animate()
        {
          setInterval(draw, FRAME_RATE);
          setInterval(nextFrame, ANIMATION_RATE);
		  setInterval(Lightningstrike, 2000);
		};
        
        function nextFrame()
        {
          mario.nextFrame();
		  qBlock.nextFrame();
			
			propellar1.nextFrame();
			propellar2.nextFrame();
			propellar3.nextFrame();

			ball1.nextFrame();
			ball2.nextFrame();
			ball3.nextFrame();
			ball4.nextFrame();
			ball5.nextFrame();
			ball6.nextFrame();

        }
        
		function Lightningstrike()
		{
        background.nextFrame();	
        }
		
			function GameStatus()
	{
				this.render = function()
				{
					if(_LivesRemaining == 0 )
						{
							Backgroundmusic.pause();
							if(Lose.paused)
							{
									Lose.currentTime = 0;
									Lose.play();
							};
							context.fillStyle = 'red';
							context.strokeStyle = "#03FC20";
							context.font = 'italic bold 55px Arial, sans-serif';
							context.fillText("YOU LOSE ! Try again :P", cW*.5-160, 250, 300);
							context.strokeText("YOU LOSE ! Try again :P", cW*.5-160, 250, 300);
						}
					else if(gameWon)
						{
							Backgroundmusic.pause();
							if(Win.paused)
							{
									Win.currentTime = 0;
									Win.play();
							};
							context.fillStyle = 'red';
							context.strokeStyle = "#03FC20";
							context.font = 'italic bold 55px Arial, sans-serif';
							context.fillText("Congratulations! You win !", cW*.5-160, 250, 300);
							context.strokeText("Congratulations! You win !", cW*.5-160, 250, 300);
						}
				}
	};	
	var _Score = mario.getScore();
	var gt = new GameTimer();
	var lives = new Lives();
	var score = new Score();

	var cannonBalls = new CannonBalls();
	var OutTransition = new OutTransition();
	var InTransition = new InTransition();
    var GameStatus = new GameStatus();
		
		function draw()
        {
			//var previousPosition = new Vector2(mario.getx(), mario.gety());
			qBlock.update();
			mario.update();  
			ship.update();
			ball1.update();
			ball2.update();
			ball3.update();
			ball4.update();
			ball5.update();
			ball6.update();
			bullet1.update();
			bullet2.update();
			background.update();
			propellar1.update();
			propellar2.update();
			propellar3.update();
			GameState();
			shipFly();
			
			
			Collision.block(mushroom,qBlock);
			context.clearRect(0, 0, canvas.width(), canvas.height());
			background.draw(context);
			ship.draw(context); 
			mario.draw(context); 
			qBlock.draw(context); 
			
			if(Collision.block(mario,qBlock) == true && Collision.getCollisionSide() == "bottom")
			{
				mushroomspawn = true;
				if(mushroomApear.paused)
				{
					mushroomApear.currentTime = 0;
					mushroomApear.play();
				};
			}
	

	
	
			mushroomMove();

			if(mushroomspawn)
			{
				mushroom.update();
				
				//SET MUSHROOM TO GROUND
				
				if((mushroom.gety() + mushroom.getHeight()) > (roomFloor - 2))
					{
						if(mushroom.getOnGround() == false)
						{
						mushroom.setOnGround(true);
						}
						else if(mushroom.getOnGround() == true)
						{
						mushroom.sety(roomFloor - mushroom.getHeight());
						mushroom.setvy(0);
						}
					}
				else
					{
					mushroom.setOnGround(false);
					}
				mushroom.draw(context); 	
				//CHECK IF MARIO TOUCHES MUSHROOM
			}
			if(Collision.pickup(mario,mushroom) == true && (mushroomspawn))
				{
					mario.setMarioState("BigAlive");
					mushroom.setx(qBlock.getx());
					_Score += 100
					mushroom.sety(qBlock.gety()-30);
					randomDirection = Math.floor(Math.random() * 10);
					mushroomspawn = false;
					if(getShroomSFX.paused)
						{
							getShroomSFX.currentTime = 0;
							getShroomSFX.play();
						};
					
				}
			
			
			 
			 for(var i= 0; i < floorblocks.length; ++i)
				{
						if(ship.getshipDrive() == false)
							{
								floorblocks[i].setshipDrive(false);
							}
					floorblocks[i].update();
				} 
	
			for(var i= 0; i < floorblocks.length; ++i)
				{
					
					
					if(mario.getMarioState() != "dead")
					Collision.ground(mario,floorblocks[i]);
					
				} 

			for(var i= 0; i < floorblocks.length; ++i)
				{
					// floorblocks[i].draw(context, "yellow");
					floorblocks[i].draw(context, "rgba(225,225,225, 0.0)");
					//console.log(floorblocks[1]);
				} 
			
			
			 for(var i= 0; i < cannonballs.length; ++i)
				{
						if(ship.getshipDrive() == false)
							{
								cannonballs[i].setshipDrive(false);
							}
					cannonballs[i].update();
				} 
			
			for(var i= 0; i < cannonballs.length; ++i)
				{
				//if(	cannonballs[i].getx() > 0 && cannonballs[i].getx() <cW)
			//	{
			//ballstofire.push(new Ball("Pics/cannonball.png", 0,0,15,16, cannonballs[i].getx(),cannonballs[i].gety,30,32,
					//															cannonballs[i].getDir1(),	cannonballs[i].getDir2));
			//	}
					//cannonballs[i].draw(context, "red");
					cannonballs[i].draw(context, "rgba(225,225,225, 0.0)");
					//console.log(floorblocks[1]);
				} 
			for(var i= 0; i < ballstofire.length; ++i)
				{
						
					ballstofire[i].update();
				}
			 for(var i= 0; i < ballstofire.length; ++i)			
			 {
					
					ballstofire[i].draw(context);
				}
				
		
		
				if(Collision.ball(mario,ball1) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
					}
					if(mario.getMarioState() == "smallAlive")
					{
						Backgroundmusic.pause();
						mario.setRange("Die");
							
							if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setMarioState("dead");
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}

			if(Collision.ball(mario,ball2) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
					}
					if(mario.getMarioState() == "smallAlive")
					{
						Backgroundmusic.pause();
						if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setRange("Die");
						mario.setMarioState("dead")
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}					
						
			if(Collision.ball(mario,ball3) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
					}
					if(mario.getMarioState() == "smallAlive")
					{
						Backgroundmusic.pause();
						
							
							if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setRange("Die");
						mario.setMarioState("dead");
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}

			if(Collision.ball(mario,ball4) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
					}
					if(mario.getMarioState() == "smallAlive")
					{
						Backgroundmusic.pause();
						if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setRange("Die");
						mario.setMarioState("dead");
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}			
			
			if(Collision.ball(mario,ball5) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
					}
					if(mario.getMarioState() == "smallAlive")
					{
						Backgroundmusic.pause();
						if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setRange("Die");
						mario.setMarioState("dead");
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}

			if(Collision.ball(mario,ball6) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
						
					}
					if(mario.getMarioState() == "smallAlive")
					{
						Backgroundmusic.pause();
						if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setRange("Die");
						mario.setMarioState("dead");
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}

			if(Collision.ball(mario,bullet1) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
						
					}
					if(mario.getMarioState() == "smallAlive")
					{
					Backgroundmusic.pause();
						if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setRange("Die");
						mario.setMarioState("dead");
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}

				if(Collision.ball(mario,bullet2) == true && Collision.getCollisionSide() == "bottom")		
				{
				if(mario.getMarioState() == "BigAlive")
					{
						mario.setMarioState("smallAlive");
						
					}
					if(mario.getMarioState() == "smallAlive")
					{
					Backgroundmusic.pause();
						if(Die.paused)
							{
									Die.currentTime = 0;
									Die.play();
							};
						mario.setRange("Die");
						mario.setMarioState("dead");
						mario.setvx(0);
						mario.setvy(0);
						mario.setax(0);
					}
				}		
			
			if(background.getx() <= -2300)
			{
			background.setx(0)
			}
			if(background.getx() > -2300)
			{
			background.setvx(-1)
			}
			
			
			propellar1.draw(context);	
			propellar2.draw(context);	
			propellar3.draw(context);	
			
			
			bullet1.draw(context);
			bullet2.draw(context);
			ball1.draw(context);
			ball2.draw(context);
			ball3.draw(context);
			ball4.draw(context);
			ball5.draw(context);
			ball6.draw(context);
			
			foreground.render();
			hud.draw(context); 
			gt.draw(context);
			score.draw(context);
			lives.draw(context);
			if(inTransition)
			{
				InTransition.render();
			}
			if(outTransition)
			{
			GameStatus.render();
			OutTransition.render();
			}	
        };


		
		
		
        function keyDownHandler(event)
        {
         switch(event.keyCode)
         {
            case LEFT_ARROW:
			if(mario.getMarioState() == "smallAlive" || mario.getMarioState() == "BigAlive")
			{
				mario.setCurrentKey("left")
				mario.setLastKeyPress("left");
				//mario.setax(0);
				mario.setvx(-SPEED);
			}
              break;
            case UP_ARROW:
              break;
            case RIGHT_ARROW:
			if(mario.getMarioState() == "smallAlive" || mario.getMarioState() == "BigAlive")
			{
				MARIO_HEIGHT = 81;
				mario.setCurrentKey("right")
				mario.setLastKeyPress("right");
				//mario.setax(0);
				mario.setvx(SPEED);
			}
              break;
            case DOWN_ARROW:
			if(ship.getshipDrive() == false && mario.gety() - mario.getHeight() <= 94)
			{
				gameWon = true;
				outTransition = true
			}
			
			if(mario.getMarioState() == "BigAlive")
			{
			mario.setCurrentKey("down");
			//mario.setvx(0);
			}
              break;
            case SPACE: 
			if(mario.getvy() == 0)
			{
				mario.setOnGround(false);
				mario.setvy(JUMP);
				if(JumpSFX.paused)
					{
						JumpSFX.currentTime = 0;
						JumpSFX.play();
					};
			
			}
              break;
			
			case XPRESS:   
			  if(mario.getCurrentKey() == "left")
			  {
				mario.setvx(-SPEED -3);
			  }
			  if(mario.getCurrentKey() == "right")
			  {
					mario.setvx(SPEED +3);
			  }
			  break;
          }
        };
        
        function keyUpHandler(event)
        {
          switch(event.keyCode)
          {
            case LEFT_ARROW: //fall-through
			if(mario.getMarioState() == "smallAlive" || mario.getMarioState() == "BigAlive")
			{
				mario.setLastKeyPress("left");
				mario.setCurrentKey("")
				//mario.setvx(0);
				//if(mario.getOnGround() == true && mario.getCurrentKey() == "")
					//{
				//	mario.setax(FRICTION);
					//}
			}
              break;
            case RIGHT_ARROW:
			if(mario.getMarioState() == "smallAlive" || mario.getMarioState() == "BigAlive")
			{
				mario.setLastKeyPress("right");
				mario.setCurrentKey("")
				//mario.setvx(0);
				//if(mario.getOnGround() == true && mario.getCurrentKey() == "")
				//	{
					//mario.setax(-FRICTION);
				//	}
			}
              break;
            case UP_ARROW: //fall-through
            case DOWN_ARROW:
			mario.setCurrentKey("");
              break;
			case SPACE: 
			mario.setJump(false);
		
			 case XPRESS:  
			  if(mario.getCurrentKey() == "left" )
			  {
				mario.setvx(-SPEED);
			  }
			  if(mario.getCurrentKey() == "right")
			  {
				mario.setvx(SPEED);
			  }
			  break; 
			  
          }
        }; 	
	    });
