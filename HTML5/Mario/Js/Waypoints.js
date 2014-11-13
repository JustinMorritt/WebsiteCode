$(document).ready(function() {	

	const LEFT_ARROW = 37;
	const UP_ARROW = 38;
	const RIGHT_ARROW = 39;
	const DOWN_ARROW = 40;
	const SPACE = 32;
	const SPEED = 40;
	const FRAME_RATE = 1000 / 50;

	
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	var cW = context.canvas.width , cH = context.canvas.height ;	
	var wp = new wayPoint(50,75);
	var p = new Path(0,1,KEY_RIGHT)
	wp.addPath(p);
	wayPoints.push(wp);
	
	wp = new wayPoint(100,75);
	p = new Path(1,2,KEY_UP)
	wp.addPath(p);
	p = new Path(1,0, KEY_LEFT);
	wp.addPath(p);
	wayPoints.push(wp);
	
	wp = new wayPoint(150,25);
	p = new Path(1,2,KEY_RIGHT)
	wp.addPath(p);
	p = new Path(1,0, KEY_LEFT);
	wp.addPath(p);
	wayPoints.push(wp);
	
	wp = new wayPoint(200,25);
	p = new Path(5,4,KEY_RIGHT)
	wp.addPath(p);
	p = new Path(5,6, KEY_LEFT);
	wp.addPath(p);
	wayPoints.push(wp);
	
	wp = new wayPoint(300,25);
	p = new Path(7,4,KEY_LEFT)
	wp.addPath(p);
	p = new Path(7,6, KEY_DOWN);
	wp.addPath(p);
	wayPoints.push(wp);
	
	



	
	var arrow = new Image();
					arrow.src = "Pics/arrow.png"
					
	var Bg = new Image();
					Bg.src = "Pics/intro.png"

	var sbg = new Image();
					sbg.src = "Pics/scrollingbackground.jpeg"						
					
	
	window.addEventListener("keydown", keyDownHandler, false);
	window.addEventListener("keyup", keyUpHandler, false);

	var Path = function()
	{
	 var _startIndex = start;
	 var _endIndex = end;
	 var _keyCode = keyCode;
	 this.getStartIndex = function(){
		return _startIndex;
	 };
	  this.endIndex = function(){
		return _endIndex;
	 };
	 	  this.getKeyCode = function(){
		return _keyCode;
	 };
	};
	
	var WayPoint = function(xPos, yPos){
		var _x = xPos;
		var _y = yPos;
		var _paths = new Array();
		
		this.getx = function()
		{
			return _x;
		};
		
		this.gety = function()
		{
			return _y;
		};
		
		this.addPath = function(p)
		{
		_paths.push(p);
		};
		this.getNextWaypoint = function(kc)
		{
			for(var i = 0; i < _paths.length; ++i)
			{
				if (_paths[i].getKeycode() === kc)
				{
				 return _paths[i].getEndIndex();	
				}
				return -1;
			}
		};
		
	};

	
	function Transition()
	{
		this.lineWidth = 10;
		this.render = function(){
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
	

	var Transition = new Transition();
	var trans = false;
	
	
	function animate(){
					context.clearRect(0,0,cW,cH);
					renderBG ();
					Selector.render();
					if(trans){
					Transition.render();
					}
	};
	var animateInterval = setInterval(animate, FRAME_RATE);

	


	
	
	
	
	
	
	
	
	
	
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