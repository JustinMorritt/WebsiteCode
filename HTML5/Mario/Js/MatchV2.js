$(document).ready(function() {	

	const LEFT_ARROW = 37;
	const UP_ARROW = 38;
	const RIGHT_ARROW = 39;
	const DOWN_ARROW = 40;
	const SPACE = 32;
	//const SPEED = 5;
	//const GRAVITY = 0.3;
	//const FRICTION = 0.3;
	const FRAME_RATE = 1000 / 50;
	//const COR = 0.3;
	
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	var cW = context.canvas.width , cH = context.canvas.height ;	
	
	var inTransition = true;
	var outTransition = false;
	var gameWon = false;
	
	var cardArray = ['A','A','A','A','B','B','B','B','C','C','C','C','D','D','E','E','F','F']
	var cardValue = [];
	var cardID =[];
	var cardsFlipped = 0;
	var Chances = 10;
	var cardPress = false;
	
	window.addEventListener("keydown", keyDownHandler, false);
	window.addEventListener("keyup", keyUpHandler, false);
	
	var Backgroundmusic = $("#backgroundMusic").get(0);
	var ArrowMove = $("#arrowMove").get(0);
	var Win = $("#WinSound").get(0);
	var Lose = $("#LoseSound").get(0);
	var Match = $("#Match").get(0);
	var NoMatch = $("#NoMatch").get(0);
	
	
	var cardBack = new Image();
					cardBack.src = "Pics/cardBack.png"
					
	var bg = new Image();
					bg.src = "Pics/supermariobros3-07.png"

	var sbg = new Image();
					sbg.src = "Pics/scrollingbackground.jpeg"						
	
	var fireflower = new Image();
					fireflower.src = "Pics/fireflower.png"
					
	var star = new Image();
					star.src = "Pics/star.png"				

	var tencoin = new Image();
					tencoin.src = "Pics/tencoin.png"
	
	var twentycoin = new Image();
					twentycoin.src = "Pics/twentycoin.png"	
	
	var oneup = new Image();
					oneup.src = "Pics/oneup.png"	
					
	var mushroom = new Image();
					mushroom.src = "Pics/mushroomcard.png"	

	//  card = 18 in length .. .loop would take 1 off 18 right away to start on the [17]th spot in array .. being the last spot in the array and working itself backwards until it hits [0]
		Array.prototype.shuffle = function() 
	{
	var card = this.length, randomCard, temp
		while(--card > 0)
			{
				randomCard = Math.floor(Math.random() * (card+1));
				temp = this[randomCard];
				this[randomCard] = this[card];
				this[card] = temp;
			}
		return this;
	}
	var Result = cardArray.shuffle();				
	
	var Card =					
					[  	{"id":"Card1","x":20,"y":20,"w":89,"h":89,"face":Result[0],"flipped":false},
						{"id":"Card2","x":131,"y":20,"w":89,"h":89,"face":Result[1],"flipped":false},
						{"id":"Card3","x":242,"y":20,"w":89,"h":89,"face":Result[2],"flipped":false},
						{"id":"Card4","x":353,"y":20,"w":89,"h":89,"face":Result[3],"flipped":false},
						{"id":"Card5","x":464,"y":20,"w":89,"h":89,"face":Result[4],"flipped":false},
						{"id":"Card6","x":575,"y":20,"w":89,"h":89,"face":Result[5],"flipped":false},
						{"id":"Card7","x":20,"y":129,"w":89,"h":89,"face":Result[6],"flipped":false},
						{"id":"Card8","x":131,"y":129,"w":89,"h":89,"face":Result[7],"flipped":false},
						{"id":"Card9","x":242,"y":129,"w":89,"h":89,"face":Result[8],"flipped":false},
						{"id":"Card10","x":353,"y":129,"w":89,"h":89,"face":Result[9],"flipped":false},
						{"id":"Card11","x":464,"y":129,"w":89,"h":89,"face":Result[10],"flipped":false},
						{"id":"Card12","x":575,"y":129,"w":89,"h":89,"face":Result[11],"flipped":false},
						{"id":"Card13","x":20,"y":238,"w":89,"h":89,"face":Result[12],"flipped":false},
						{"id":"Card14","x":131,"y":238,"w":89,"h":89,"face":Result[13],"flipped":false},
						{"id":"Card15","x":242,"y":238,"w":89,"h":89,"face":Result[14],"flipped":false},
						{"id":"Card16","x":353,"y":238,"w":89,"h":89,"face":Result[15],"flipped":false},
						{"id":"Card17","x":464,"y":238,"w":89,"h":89,"face":Result[16],"flipped":false},
						{"id":"Card18","x":575,"y":238,"w":89,"h":89,"face":Result[17],"flipped":false}	
					]
	
	function FlipCard (card,value,flipped)
	{	
		if (cardPress == true &&  cardValue.length < 2)
		{
			//console.log(card);
			cardPress = false;	
			if (cardValue.length == 0)
			{
				cardValue.push(value);
				cardID.push(card);
				//console.log(cardValue);
			}
			else if(cardValue.length == 1)
			{
						cardValue.push(value);
						cardID.push(card);
								
				if (cardValue[0] == cardValue[1]){
					cardsFlipped += 2;
					if(Match.paused)
							{
								Match.currentTime = 0;
								Match.play();
							};
					//console.log(cardsFlipped);
					//CLEAR ARRAYS
					cardValue = [];
					cardID = [];
					// SEE IF BOARD IS SOLVED
					if (cardsFlipped == cardArray.length)
					{
					gameWon = true;
					Backgroundmusic.pause();
					if(Win.paused)
					{
						Win.currentTime = 0;
						Win.play();
					};
					outTransition = true;
					}
				}
			
				else
				{
					function flipBack()
					{
						if(NoMatch.paused)
							{
								NoMatch.currentTime = 0;
								NoMatch.play();
							};
						cardID[0].flipped = false;
						cardID[1].flipped = false;
						cardValue = [];
						cardID = [];
						Chances -= 1;
					}
					setTimeout(flipBack, 1500)
				}
			}
		}
				
	}
	
	
	function renderCards ()
	{
		for(var i=0 ; i < Card.length ; i++){
		
			if(Card[i].flipped==true && Card[i].face =="A")
			{
			context.drawImage(mushroom, Card[i].x + 30, Card[i].y + 20, Card[i].w, Card[i].h);
			}
			else if(Card[i].flipped==true && Card[i].face =="B")
			{
			context.drawImage(fireflower, Card[i].x + 30, Card[i].y + 20, Card[i].w, Card[i].h);
			}
				else if(Card[i].flipped==true && Card[i].face =="C")
			{
			context.drawImage(star, Card[i].x + 30, Card[i].y + 20, Card[i].w, Card[i].h);
			}
				else if(Card[i].flipped==true && Card[i].face =="D")
			{
			context.drawImage(tencoin, Card[i].x + 30, Card[i].y + 20, Card[i].w, Card[i].h);
			}
				else if(Card[i].flipped==true && Card[i].face =="E")
			{
			context.drawImage(twentycoin, Card[i].x + 30, Card[i].y + 20, Card[i].w, Card[i].h);
			}
				else if(Card[i].flipped==true && Card[i].face =="F")
			{
			context.drawImage(oneup, Card[i].x + 30, Card[i].y + 20, Card[i].w, Card[i].h);
			}

			else
			
				context.drawImage(cardBack, Card[i].x + 30, Card[i].y + 20, Card[i].w, Card[i].h);
		}
		
	};
	
	function renderBG ()
	{
	context.drawImage(bg, 15, 15, cW  - 30, cH - 30);
	};
	
	function renderSBG ()
	{
	this.x = 0 , this.y = -1152, this.w = cW, this.h = 1600 ;
		this.render = function(){	
			context.drawImage(sbg, this.x / 2, this.y++ / 3, this.w, this.h);
				if(this.y == 0){
					this.y = -1152;
					}
		}
	};
	

	function Selector()
	{ 
	 this.y = 40, this.x = 50, this.w = 89, this.h = 89, this.dir, this.dir2 = false, this.bg="#03FC20";
		this.render = function(){
			if(this.dir == "left" && this.dir2 == true && this.x >=51){
				this.x -= 111;
				if(ArrowMove.paused)
					{
						ArrowMove.currentTime = 0;
						ArrowMove.play();
					};
				this.dir2 = false;
				this.dir = "";
			}
			else if(this.dir == "right" && this.dir2 == true && this.x <=575){
				this.x += 111;
				if(ArrowMove.paused)
					{
						ArrowMove.currentTime = 0;
						ArrowMove.play();
					};
				this.dir2 = false;
				this.dir = "";
			}
			if(this.dir == "up" && this.dir2 == true && this.y >=41){
				this.y -= 109;
				if(ArrowMove.paused)
					{
						ArrowMove.currentTime = 0;
						ArrowMove.play();
					};
				this.dir2 = false;
				this.dir = "";
			}
			else if(this.dir == "down" && this.dir2 == true && this.y <=238){
				this.y += 109;
				if(ArrowMove.paused)
					{
						ArrowMove.currentTime = 0;
						ArrowMove.play();
					};
				this.dir2 = false;
				this.dir = "";
			}
				context.strokeStyle = this.bg;
				context.lineWidth = 5;
				context.strokeRect(this.x, this.y, this.w, this.h);
			}
		
		this.hitDetect = function(){
		 for(var i = 0; i < Card.length; i++)
		 {
			 var cardXY = Card[i];
			 if(this.x+this.w >= cardXY.x && this.x <= cardXY.x+cardXY.w && this.y >= cardXY.y && this.y <= cardXY.y+cardXY.h && cardPress == true)
				{
					//console.log("HIT");
					//console.log(Card[i].face);
					Card[i].flipped = true;
					FlipCard(Card[i],Card[i].face,Card[i].flipped);	
				}
		  }
		}
	};
	
	function InTransition()
	{
		this.lineWidth = 500;
		this.render = function()
		{
		Backgroundmusic.currentTime = 0;
		Backgroundmusic.play();
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
			context.lineWidth = this.lineWidth +=1.7;
			context.strokeRect(0, 0, cW, cH);
				if(this.lineWidth >= 500 )
				{
					window.open ('MarioMain.html','_self',false)
				}
					
			}
							
		}
								
	};
		
	function Chancesleft()
	{
		this.render = function()
		{
			context.shadowBlur = 7;
			context.shadowColor = "#242424";
			context.shadowOffsetX = 10;
			context.shadowOffsetY = 10;
			context.fillStyle = 'red';
			context.strokeStyle = "#03FC20";
			context.font = 'italic bold 55px Arial, sans-serif';
			context.fillText('Chances left: ' + Chances, cW*.5-160, 400, 300);
			context.lineWidth = 2;
			context.strokeText('Chances left: ' + Chances, cW*.5-160, 400, 300);							
			if(Chances == 0 )
			{
			Backgroundmusic.pause();
			if(Lose.paused)
			{
					Lose.currentTime = 0;
					Lose.play();
			};
			outTransition = true;
			}
		}
					
	};	

		function GameStatus()
	{
				this.render = function()
				{
					if(Chances == 0 )
						{
							context.fillStyle = 'red';
							context.strokeStyle = "#03FC20";
							context.font = 'italic bold 55px Arial, sans-serif';
							context.fillText("YOU LOSE ! Try again :P", cW*.5-160, 250, 300);
							context.strokeText("YOU LOSE ! Try again :P", cW*.5-160, 250, 300);
						}
					else if(gameWon)
						{
							context.fillStyle = 'red';
							context.strokeStyle = "#03FC20";
							context.font = 'italic bold 55px Arial, sans-serif';
							context.fillText("Congratulations! You win !", cW*.5-160, 250, 300);
							context.strokeText("Congratulations! You win !", cW*.5-160, 250, 300);
						}
				}
	};	
	
	
	var Selector = new Selector();
	var renderSBG = new renderSBG();
	var OutTransition = new OutTransition();
	var InTransition = new InTransition();
	var Chancesleft = new Chancesleft();
	var GameStatus = new GameStatus();
	
	
	function animate()
	{
		context.clearRect(0,0,cW,cH);
		renderSBG.render();
		renderBG ();
		renderCards();
		Selector.render();
		Chancesleft.render();
		Selector.hitDetect();
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
	
	var animateInterval = setInterval(animate, FRAME_RATE);

	
	
	function keyDownHandler(event)
	{
		if(cardValue.length < 2)
		{
		switch(event.keyCode)
			{
			case LEFT_ARROW:
				Selector.dir = "left";
				break;
			case UP_ARROW:
				Selector.dir = "up";
				break;
			case RIGHT_ARROW:
				Selector.dir = "right";
				break;
			case DOWN_ARROW:
				Selector.dir = "down";
				break;
			case SPACE:
				cardPress = true;
			}
		}
	};

	function keyUpHandler(event)
	{
	if(cardValue.length < 2)
		{
		switch(event.keyCode)
			{
			case LEFT_ARROW: 
					Selector.dir2 = true;
				
				break;
			case RIGHT_ARROW:
					Selector.dir2 = true;
				
				break;
			case UP_ARROW: 
					Selector.dir2 = true;
					
					break;
			case DOWN_ARROW:
					Selector.dir2 = true;
				break;
			}
		}
	};
	
//console.log(Chances);
//console.log(Result);
//console.log(Card)


});