$(document).ready(function() {	

	const LEFT_ARROW = 37;
	const UP_ARROW = 38;
	const RIGHT_ARROW = 39;
	const DOWN_ARROW = 40;
	const SPACE = 32;
	const FRAME_RATE = 1000 / 50;
	const ANIMATION_RATE = 200;
	
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	var cW = context.canvas.width , cH = context.canvas.height ;	
	var squish = true;
	var trans = false;
	var inTransition = true;
	
	var Backgroundmusic = $("#backgroundMusic").get(0);
	var ArrowMove = $("#arrowMove").get(0);
	var Start = $("#Start").get(0);
	
	var arrow = new Image();
					arrow.src = "Pics/arrow.png"
					
	var Bg = new Image();
					Bg.src = "Pics/intro.png"

	var curtain = new Image();
					curtain.src = "Pics/curtain.png"	
	
	var troopa = new Image();
					troopa.src = "Pics/troopa3.png"							
					
	
	window.addEventListener("keydown", keyDownHandler, false);
	window.addEventListener("keyup", keyUpHandler, false);

	
	
	function Selector()
	{ 
			 this.y = 294, this.x = 190, this.w = 20, this.h = 16, this.dir, this.dir2 = false, this.bg= arrow, this.game = "1player";
				this.render = function(){
	
					if(this.dir == "up" && this.dir2 == true && this.y == 319){
						this.y -= 25;
						this.game = "1player";
						this.dir2 = false;
						if(ArrowMove.paused)
							{
								ArrowMove.currentTime = 0;
								ArrowMove.play();
							};
						this.dir = "";
					}
					else if(this.dir == "down" && this.dir2 == true && this.y == 294){
						this.y += 25;
						this.dir2 = false;
						if(ArrowMove.paused)
							{
								ArrowMove.currentTime = 0;
								ArrowMove.play();
							};
						this.game = "match";
						this.dir = "";
					}
				
					context.drawImage(arrow, this.x, this.y, this.w, this.h);
				
				};	
					this.arrowSquish = function()
					{
		
					if(Selector.w >= 20)
					{
					squish = true;
					}
					if (Selector.w <= 12)
					{
					squish = false;
					}
								if (squish)
								{
								Selector.w -= .5 ;
								//Selector.y += 0.2 ;
								
								}
						
								if (squish == false)
								{
								Selector.w += .5 ;
								//Selector.y -= 0.2 ;
								}
							
					};
	
					
					
					 
			
		};
				

		function InTransition()
	{
		this.x =0 , this.y = 0, this.w = cW, this.h = cH
						this.render = function(){
							Backgroundmusic.currentTime = 0;
							Backgroundmusic.play();
							context.drawImage(curtain, this.x ,this.y-- *2, this.w, this.h--);
							
							if(this.y <= -448)
							{
									this.x = 0;
									inTransition = false;
									};		
		}
	};
	
	function Transition()
	{
		this.lineWidth = 10;
		this.render = function(){
							if(Start.paused)
							{
								Start.currentTime = 0;
								Start.play();
							};
							context.strokeStyle = "black";
							context.lineWidth = this.lineWidth +=10;
							context.strokeRect(0, 0, cW, cH);
							if(this.lineWidth == 500 && Selector.game == "1player")
									{
									window.open ('1playermario.html','_self',false)
									}
										else if(this.lineWidth == 500 && Selector.game == "match")
										{
										window.open ('matchGameLoader.html','_self',false)
										}
							}
	};
	
	
	function renderBG (){
	
	context.drawImage(Bg, 0, 0, cW, cH);
	};
	
	var troopaW = 48;
	var troopaH = 84;
	var troopa = new InGameEntity("Pics/troopa3.png",
                                     0, 0, troopaW, troopaH,
                                     50, 320, troopaW, troopaH);
	 troopa.setRangeFrames("", 0, 1);
	 troopa.addRange("Walk", 0, 4);
	 troopa.addFrame(troopaW, 0, troopaW, troopaH);
     troopa.addFrame(troopaW*2, 0, troopaW, troopaH);
	 troopa.addFrame(troopaW*3, 0, troopaW, troopaH);
	 troopa.addFrame(troopaW*4, 0, troopaW, troopaH);
	 
	 var troopa2 = new InGameEntity("Pics/troopa3.png",
                                     0, 0, troopaW, troopaH,
                                     100, 320, troopaW, troopaH);
	 troopa2.setRangeFrames("", 0, 1);
	 troopa2.addRange("Walk", 0, 4);
	 troopa2.addFrame(troopaW, 0, troopaW, troopaH);
     troopa2.addFrame(troopaW*2, 0, troopaW, troopaH);
	 troopa2.addFrame(troopaW*3, 0, troopaW, troopaH);
	 troopa2.addFrame(troopaW*4, 0, troopaW, troopaH);
	 
	 var troopa3 = new InGameEntity("Pics/troopa3.png",
                                     0, 0, troopaW, troopaH,
                                     150, 320, troopaW, troopaH);
	 troopa3.setRangeFrames("", 0, 1);
	 troopa3.addRange("Walk", 0, 4);
	 troopa3.addFrame(troopaW, 0, troopaW, troopaH);
     troopa3.addFrame(troopaW*2, 0, troopaW, troopaH);
	 troopa3.addFrame(troopaW*3, 0, troopaW, troopaH);
	 troopa3.addFrame(troopaW*4, 0, troopaW, troopaH);
	
	var troopa4 = new InGameEntity("Pics/troopa3.png",
                                     0, 0, troopaW, troopaH,
                                     -650, 320, troopaW, troopaH);
	 troopa4.setRangeFrames("", 0, 1);
	 troopa4.addRange("Walk", 0, 4);
	 troopa4.addFrame(troopaW, 0, troopaW, troopaH);
     troopa4.addFrame(troopaW*2, 0, troopaW, troopaH);
	 troopa4.addFrame(troopaW*3, 0, troopaW, troopaH);
	 troopa4.addFrame(troopaW*4, 0, troopaW, troopaH);	
	 
	
	
	
	
	var Selector = new Selector();
	var Transition = new Transition();
	var InTransition = new InTransition();
	

	
     

        
        function nextFrame()
        {
          troopa.nextFrame();
		  troopa2.nextFrame();
		  troopa3.nextFrame();
		  troopa4.nextFrame();
        }
	troopa.setvx(2);
	troopa2.setvx(2);
	troopa3.setvx(2);
	troopa4.setvx(5);

	function animate(){
					
					context.clearRect(0,0,cW,cH);
					renderBG ();
					Selector.render();
					Selector.arrowSquish();
					troopa.update();
					troopa.draw(context);
					troopa2.update();
					troopa2.draw(context);
					troopa3.update();
					troopa3.draw(context);
					troopa4.update();
					troopa4.draw(context);
					
					
					if(trans)
					{
					Transition.render();
					}
					
					if(inTransition)
					{
					InTransition.render();
					}
					
					if(troopa3.getx() == cW+ 10)
					{
					troopa.setx(-50);
					troopa2.setx(-100);
					troopa3.setx(-150);
					troopa4.setx(-1000);
					}
					
	};
	var animateInterval = setInterval(animate, FRAME_RATE);
	var nextFrameInterval = setInterval(nextFrame, ANIMATION_RATE);
	


	
	
	
	
	
	
	
	
	
	
	function keyDownHandler(event)
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
				trans = true;
				

		}
		
	};

	function keyUpHandler(event)
	{
		switch(event.keyCode)
		{
			case LEFT_ARROW: //fall-through
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
	};
	
	
	
//console.log(Chances);
//console.log(Result);
//console.log(Card)

});