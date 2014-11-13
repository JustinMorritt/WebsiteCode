var IGEFrame = function(xPos, yPos, w, h)
{
  var _x = xPos;
  var _y = yPos;
  var _width = w;
  var _height = h;

  this.getx = function()
  {
     return _x;
  };
  
  this.gety = function()
  {
    return _y;
  };
  
  this.getWidth = function()
  {
    return _width;  
  };
  
  this.getHeight = function()
  {
    return _height;
  };
};

var AnimationRange = function(rangeName, first, end)
{
  if(end <= first)
  {
    console.log("End less than first: Range not changed.");
    return;
  }
  var _name = rangeName;
  var _first = first;
  var _end = end;
  
  
  var _currentFrame = _first;

  
  this.setRange = function(first, end)
  {
    if(end <= first)
    {
      console.log("End less than first: Range not changed.");
      return;
    }
    _first = first
    _end = end;
  };

  this.getEnd = function()
  {
    return _end;
  };

  this.getFirst = function()
  {
    return _first;
  };

  
  this.getName = function()
  {
    return _name;
  };

  this.currentFrame = function()
  {
    return _currentFrame;
  };

  
  this.nextFrame = function()
  {
//console.log("Before: " + _currentFrame);    
    ++_currentFrame;
    if(_currentFrame == _end)
    {
      _currentFrame = _first;
    }
//console.log("After: " + _currentFrame);    
    return _currentFrame;
  };
  
};


var InGameEntity = function(file, sx, sy, sw, sh, dx, dy, dw, dh)
{
  var _x = dx;
  var _y = dy;
  var _height = dh;
  var _width = dw;
  
  var _img = new Image();  
  _img.src = file;
  var _frames = new Array();
  _frames.push(new IGEFrame(sx, sy, sw, sh));
  var _ranges = new Array();
  _ranges.push(new AnimationRange("", 0, 1));

  var _currentRange = "";
  
  this.addRange = function(rangeName, start, end)
  {
      _ranges.push(new AnimationRange(rangeName, start, end));
      
  };  
  
  
  this.setRange = function(rangeId)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangeId === _ranges[i].getName())
      {
        _currentRange = _ranges[i].getName();
        //_ranges[i].resetCurrentFrame();
      }
    }
  };
  
  this.setRangeFrames = function(rangename, start, end)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangename == _ranges[i].getName())
      {
        _ranges[i].setRange(start, end);
        return;
      }
      
    }    
  }
  
  
  var _vx = 0;
  var _vy = 0;
  var _accelx = 0;
  var _accely = 0;

  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.nextFrame = function()
  {
   
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(_currentRange == _ranges[i].getName())
      {
        var ret = _ranges[i].nextFrame()
        return ret;
      }
    }
    
    console.log("Something broken in the frames mechanism");
    return 0;
  };
  
  this.addFrame = function(xPos, yPos, w, h)
  {
    _frames.push(new IGEFrame(xPos, yPos, w, h));
  };
  
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.getax = function()
  {
    return _accelx;
  };
  
  this.getxy = function()
  {
    return _accely;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };

  this.update = function()
  {
    _vx += _accelx;
    _x += _vx;
    _vy += _accely;
    _y += _vy;
    
    

   
  };
  
  this.draw = function(c)
  {
    
    var currentFrame = 0;
    for(var i = 0; i < _ranges.length; ++i)
    {

      if(_currentRange === _ranges[i].getName())
      {
        currentFrame = _ranges[i].currentFrame();
        //console.log(currentFrame);
      }
    }

    c.drawImage(_img, 
                _frames[currentFrame].getx(), 
                _frames[currentFrame].gety(),
                _frames[currentFrame].getWidth(), 
                _frames[currentFrame].getHeight(),
                _x, 
                _y, 
                _width, 
                _height);
  };
};



var Mario = function(file, sx, sy, sw, sh, dx, dy, dw, dh)
{
  var _x = dx;
  var _y = dy;
  var _height = dh;
  var _width = dw;
  
  var wallhitSFX = $("#wallhitSFX").get(0);
	var Die = $("#Die").get(0);
	
  var _img = new Image();  
  _img.src = file;
  var _frames = new Array();
  _frames.push(new IGEFrame(sx, sy, sw, sh));
  var _ranges = new Array();
  _ranges.push(new AnimationRange("", 0, 1));
	
  var _lastKeyPress = "";
  var _currentKey = "";
  var _jump = "";	
  var _currentRange = "";
  var _marioState = "smallAlive";
	var _Score = 0;
  //MARIO STATES      smallAlive,
  
  
  this.addRange = function(rangeName, start, end)
  {
      _ranges.push(new AnimationRange(rangeName, start, end));
      
  }; 

  this.setScore = function(val){
	_Score += val;
  };
  
   this.getScore = function(){
	return _Score;
  };  
  
  
  this.setmarioHeight = function(val){
	_height = val;
  };
  
   this.getmarioHeight = function(){
	return _height;
  };  
  
  this.setMarioState = function(val){
	_marioState = val;
  };
  
   this.getMarioState = function(){
	return _marioState;
  };
  
  this.setLastKeyPress = function(val){
	_lastKeyPress = val;
  };
  
    this.getLastKeyPress = function(){
	return _lastKeyPress;
  };
  
    this.setCurrentKey = function(val){
	_currentKey = val;
  };
  
  this.getCurrentKey = function(){
	return _currentKey;
  };
  
    this.setJump = function(val){
	_jump = val;
  };
  
     this.getJump = function(){
	return _jump;
  };
  
  this.setRange = function(rangeId)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangeId === _ranges[i].getName())
      {
        _currentRange = _ranges[i].getName();
        //_ranges[i].resetCurrentFrame();
      }
    }
  };
  
  this.setRangeFrames = function(rangename, start, end)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangename == _ranges[i].getName())
      {
        _ranges[i].setRange(start, end);
        return;
      }
      
    }    
  }
  
  var onGround = false;
  var _vx = 0;
  var _vy = 0;
  var _accelx = 0;
  var _accely = 0;

  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
    
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.nextFrame = function()
  {
   
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(_currentRange == _ranges[i].getName())
      {
        var ret = _ranges[i].nextFrame()
        return ret;
      }
    }
    
    console.log("Something broken in the frames mechanism");
    return 0;
  };
  
  this.addFrame = function(xPos, yPos, w, h)
  {
    _frames.push(new IGEFrame(xPos, yPos, w, h));
  };
  
   this.getOnGround = function()
  {
    return onGround;
  };
  
    this.setOnGround = function(val)
  {
    onGround = val;
  };
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.getax = function()
  {
    return _accelx;
  };
  
  this.getxy = function()
  {
    return _accely;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };
	
	
this.contains = function(x,y)
	{
	if(	x >= this.getx() && 	
		x <= this.getx() + this.getWidth() && 
		y >= this.gety() &&
		y <= this.gety() + this.getHeight())
		{
		return true; 
		}
		else
		{
			return false;
		}
	}
	
	
this.Intersects = function(ige2)
	{
				if(	this.contains(ige2.getx(), 		 ige2.gety()) 												|| 				//TOP LEFT
					this.contains(ige2.getx() +	 ige2.getWidth(),		 ige2.gety())					|| 				//TOPRIGHT
					this.contains(ige2.getx(), 		 ige2.gety() +			 ige2.getHeight()) 		||					//BOTTOM LEFT
					this.contains(ige2.getx() +	 ige2.getWidth() ,		 ige2.gety() + ige2.getHeight())) 		//BOTTOMRIGHT
			{
				return true;
			}
		else if(	ige2.contains(this.getx(), 		 this.gety()) 												|| 				//TOP LEFT
					ige2.contains(this.getx() +	 this.getWidth(),		this.gety())					|| 				//TOPRIGHT
					ige2.contains(this.getx(), 		 this.gety() +			this.getHeight()) 			||					//BOTTOM LEFT
					ige2.contains(this.getx() +	 this.getWidth() ,		this.gety() + this.getHeight()))		//BOTTOMRIGHT
			{
				return true;
			}
			else
			{
				return false;
			}
	
	}
	
	
  this.update = function()
  {
    _vx += _accelx;
    _x += _vx;
    _vy += _accely;
    _y += _vy;
    
    //SMALL MARIO RANGES
	if(_marioState == "smallAlive")
	{
	this.setmarioHeight(32);
			if(_lastKeyPress == "left")
			{
				this.setRange("Standleft");
			}
			if(_lastKeyPress == "right")
			{
				this.setRange("Standright");
			}
			if(_lastKeyPress == "right" && (!onGround))
			{
				this.setRange("Jumpright");
			}
			if(_lastKeyPress == "left" && (!onGround))
			{
				this.setRange("Jumpleft");
			}
			if(_currentKey == "left" && (onGround))
			{
				this.setRange("Small Mario Walk Left");
			}
			if(_currentKey == "right" && (onGround))
			{
				this.setRange("Small Mario Walk Right");
			}				
			if(_x <= 0 || _x >= 696 || _y > 480)
			{
				this.setRange("Die");
				_marioState = "dead";
				_vx = 0;
				_vy = 0;
				_accelx = 0;
				if(Die.paused)
					{
							Die.currentTime = 0;
							Die.play();
					};
			}
	
			/*if(onGround)
			{
				if(Math.abs(_vx) < 0.3 + 0.01)
				{
					this.setax(0);
					this.setvx(0);
				}
			}
			else if(!onGround)
			{
				this.setax(0);
			}*/

			
			if(this.getJump() == "jump")
			{
			//for(var i = 0; i<9; i += 0.5)
		//		{
				this.setvy(-9);
		//		}
			} 
			
	}
	//BIG MARIO RANGES
	if(_marioState == "BigAlive")
	
	{
	this.setmarioHeight(54);
			if(_lastKeyPress == "left")
			{
				this.setRange("BigStandleft");
			}
			if(_lastKeyPress == "right")
			{
				this.setRange("BigStandright");
			}
			if(_lastKeyPress == "right" && (!onGround))
			{
				this.setRange("BigJumpright");
			}
			if(_lastKeyPress == "left" && (!onGround))
			{
				this.setRange("BigJumpleft");
			}
			if(_currentKey == "left" && (onGround))
			{
				this.setRange("Big Mario Walk Left");
			}
			if(_currentKey == "right" && (onGround))
			{
				this.setRange("Big Mario Walk Right");
			}
			if(_currentKey == "down"  && _lastKeyPress == "right" && (onGround))
			{
				this.setRange("BigDuckright");
			}
			if(_currentKey == "down"  && _lastKeyPress == "left" && (onGround))
			{
				this.setRange("BigDuckleft");
			}				
			
			// HITTING EDGE OF SCREEN SETTINGS
			if(_x <= 0 || _x >= 696  || _y > 500)
			{
				_marioState = "smallAlive";
				_vx = 0;
				_vy = 0;
		
				_accelx = 0;
				if(_x <= 0)
				{
				_x += 40
				}
				if(_x >= 696)
				{
				_x -= 40
				}
				if(wallhitSFX.paused)
				{
									wallhitSFX.currentTime = 0;
									wallhitSFX.play();
				};
			}
			
			//FRICTION SETTINGS
			/*if(onGround)
			{
				if(Math.abs(_vx) < 0.3 + 0.01)
				{
					this.setax(0);
					this.setvx(0);
				}
			}
			else if(!onGround)
			{
				this.setax(0);
				
			}*/
			
			// JUMP SETTINGS
			if(this.getJump() == "jump")
			{
			//for(var i = 0; i<9; i += 0.5)
		//		{
				this.setvy(-9);
		//		}
			}
	
	
	
	}



	
	
	
  };
  
  this.draw = function(c)
  {
    
    var currentFrame = 0;
    for(var i = 0; i < _ranges.length; ++i)
    {

      if(_currentRange === _ranges[i].getName())
      {
        currentFrame = _ranges[i].currentFrame();
        //console.log(currentFrame);
      }
    }
	c.shadowColor = "rgba(100,100,100,0.7)";
	c.shadowOffsetX = -4;
	c.shadowOffsetY = 4;
	c.shadowBlur = 2;
    c.drawImage(_img, 
                _frames[currentFrame].getx(), 
                _frames[currentFrame].gety(),
                _frames[currentFrame].getWidth(), 
                _frames[currentFrame].getHeight(),
                _x, 
                _y, 
                _width, 
                _height);
  };
};




var QBlock = function(file, sx, sy, sw, sh, dx, dy, dw, dh)
{
  var _x = dx;
  var _y = dy;
  var _height = dh;
  var _width = dw;
  
  var _img = new Image();  
  _img.src = file;
  var _frames = new Array();
  _frames.push(new IGEFrame(sx, sy, sw, sh));
  var _ranges = new Array();
  _ranges.push(new AnimationRange("", 0, 1));

  var _currentRange = "";
  
  this.addRange = function(rangeName, start, end)
  {
      _ranges.push(new AnimationRange(rangeName, start, end));
      
  };  
  
  
  this.setRange = function(rangeId)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangeId === _ranges[i].getName())
      {
        _currentRange = _ranges[i].getName();
        //_ranges[i].resetCurrentFrame();
      }
    }
  };
  
  this.setRangeFrames = function(rangename, start, end)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangename == _ranges[i].getName())
      {
        _ranges[i].setRange(start, end);
        return;
      }
      
    }    
  }
  
  
  var _vx = 0;
  var _vy = 0;
  var _accelx = 0;
  var _accely = 0;
	var _shipDrive = true;
  
  
    this.getshipDrive = function()
  {
    return _shipDrive;
  };
  
  this.setshipDrive = function(val)
  {
    _shipDrive = val;
  };
  
  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.nextFrame = function()
  {
   
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(_currentRange == _ranges[i].getName())
      {
        var ret = _ranges[i].nextFrame()
        return ret;
      }
    }
    
    console.log("Something broken in the frames mechanism");
    return 0;
  };
  
  this.addFrame = function(xPos, yPos, w, h)
  {
    _frames.push(new IGEFrame(xPos, yPos, w, h));
  };
  
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.getax = function()
  {
    return _accelx;
  };
  
  this.getxy = function()
  {
    return _accely;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };

  this.update = function()
  {
    _vx += _accelx;
    _x += _vx;
    _vy += _accely;
    _y += _vy;
    
     if(this.getshipDrive() == true)
	{
    this.setvx(-0.4);
	}
	else
	{
	 this.setvx(0);
	}

   
  };
  
  this.draw = function(c)
  {
    
    var currentFrame = 0;
    for(var i = 0; i < _ranges.length; ++i)
    {

      if(_currentRange === _ranges[i].getName())
      {
        currentFrame = _ranges[i].currentFrame();
        //console.log(currentFrame);
      }
    }

    c.drawImage(_img, 
                _frames[currentFrame].getx(), 
                _frames[currentFrame].gety(),
                _frames[currentFrame].getWidth(), 
                _frames[currentFrame].getHeight(),
                _x, 
                _y, 
                _width, 
                _height);
  };
};

var Mushroom = function(file, sx, sy, sw, sh, dx, dy, dw, dh)
{
  var _x = dx;
  var _y = dy;
  var _height = dh;
  var _width = dw;
  
  var _img = new Image();  
  _img.src = file;
  var _frames = new Array();
  _frames.push(new IGEFrame(sx, sy, sw, sh));
  var _ranges = new Array();
  _ranges.push(new AnimationRange("", 0, 1));

  var _currentRange = "";
  
  this.addRange = function(rangeName, start, end)
  {
      _ranges.push(new AnimationRange(rangeName, start, end));
      
  };  
  
  
  this.setRange = function(rangeId)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangeId === _ranges[i].getName())
      {
        _currentRange = _ranges[i].getName();
        //_ranges[i].resetCurrentFrame();
      }
    }
  };
  
  this.setRangeFrames = function(rangename, start, end)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangename == _ranges[i].getName())
      {
        _ranges[i].setRange(start, end);
        return;
      }
      
    }    
  }
  
  var onGround = false;
  var _vx = 0;
  var _vy = 0;
  var _accelx = 0;
  var _accely = 0;

  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.nextFrame = function()
  {
   
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(_currentRange == _ranges[i].getName())
      {
        var ret = _ranges[i].nextFrame()
        return ret;
      }
    }
    
    console.log("Something broken in the frames mechanism");
    return 0;
  };
  
  this.addFrame = function(xPos, yPos, w, h)
  {
    _frames.push(new IGEFrame(xPos, yPos, w, h));
  };
  
    this.getOnGround = function()
  {
    return onGround;
  };
  
    this.setOnGround = function(val)
  {
    onGround = val;
  };
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.getax = function()
  {
    return _accelx;
  };
  
  this.getxy = function()
  {
    return _accely;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };

  this.update = function()
  {
    _vx += _accelx;
    _x += _vx;
    _vy += _accely;
    _y += _vy;
    
    

   
  };
  
  this.draw = function(c)
  {
    
    var currentFrame = 0;
    for(var i = 0; i < _ranges.length; ++i)
    {

      if(_currentRange === _ranges[i].getName())
      {
        currentFrame = _ranges[i].currentFrame();
        //console.log(currentFrame);
      }
    }

    c.drawImage(_img, 
                _frames[currentFrame].getx(), 
                _frames[currentFrame].gety(),
                _frames[currentFrame].getWidth(), 
                _frames[currentFrame].getHeight(),
                _x, 
                _y, 
                _width, 
                _height);
  };
};



var Groundblock = function(x, y, w, h)
{
  var _x = x;
  var _y = y;
  var _height = h;
  var _width = w;  
  
  var _vx = 0;
  var _vy = 0;
  //var _accelx = 0;
  //var _accely = 0;
  var _shipDrive = true;
  
  
    this.getshipDrive = function()
  {
    return _shipDrive;
  };
  
  this.setshipDrive = function(val)
  {
    _shipDrive = val;
  };
  

  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };

  this.contains = function(x,y)
	{
	if(	x >= this.getx() && 	
		x <= this.getx() + this.getWidth() && 
		y >= this.gety() &&
		y <= this.gety() + this.getHeight())
		{
		return true; 
		}
		else
		{
			return false;
		}
	}
	
	
this.Intersects = function(ige2)
	{
				if(	this.contains(ige2.getx(), 		 ige2.gety()) 												|| 				//TOP LEFT
					this.contains(ige2.getx() +	 ige2.getWidth(),		 ige2.gety())					|| 				//TOPRIGHT
					this.contains(ige2.getx(), 		 ige2.gety() +			 ige2.getHeight()) 		||					//BOTTOM LEFT
					this.contains(ige2.getx() +	 ige2.getWidth() ,		 ige2.gety() + ige2.getHeight())) 		//BOTTOMRIGHT
			{
				return true;
			}
		else if(	ige2.contains(this.getx(), 		 this.gety()) 												|| 				//TOP LEFT
					ige2.contains(this.getx() +	 this.getWidth(),		this.gety())					|| 				//TOPRIGHT
					ige2.contains(this.getx(), 		 this.gety() +			this.getHeight()) 			||					//BOTTOM LEFT
					ige2.contains(this.getx() +	 this.getWidth() ,		this.gety() + this.getHeight()))		//BOTTOMRIGHT
			{
				return true;
			}
			else
			{
				return false;
			}
	
	}
  
  
  this.update = function()
  {

    _x += _vx;
 
    _y += _vy;
    if(this.getshipDrive() == true)
	{
    this.setvx(-0.4);
	this.setvy(0.2);
	}
	else
	{
	 this.setvx(0);
	}
   
  };
  
  this.draw = function(ctx, colour)
  {

    ctx.fillStyle = colour;
	ctx.fillRect(_x, _y,  _width,  _height);
  };
};


var Ship = function(file, sx, sy, sw, sh, dx, dy, dw, dh)
{
  var _x = dx;
  var _y = dy;
  var _height = dh;
  var _width = dw;
  
  var _img = new Image();  
  _img.src = file;
  var _frames = new Array();
  _frames.push(new IGEFrame(sx, sy, sw, sh));
  var _ranges = new Array();
  _ranges.push(new AnimationRange("", 0, 1));

  var _currentRange = "";
  
  this.addRange = function(rangeName, start, end)
  {
      _ranges.push(new AnimationRange(rangeName, start, end));
      
  };  
  
  
  this.setRange = function(rangeId)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangeId === _ranges[i].getName())
      {
        _currentRange = _ranges[i].getName();
        //_ranges[i].resetCurrentFrame();
      }
    }
  };
  
  this.setRangeFrames = function(rangename, start, end)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangename == _ranges[i].getName())
      {
        _ranges[i].setRange(start, end);
        return;
      }
      
    }    
  }
  
  var onGround = false;
  var _vx = 0;
  var _vy = 0;
  var _accelx = 0;
  var _accely = 0;
  var _shipDrive = true;
  
  
    this.getshipDrive = function()
  {
    return _shipDrive;
  };
  
  this.setshipDrive = function(val)
  {
    _shipDrive = val;
  };
  
  
  
  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.nextFrame = function()
  {
   
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(_currentRange == _ranges[i].getName())
      {
        var ret = _ranges[i].nextFrame()
        return ret;
      }
    }
    
    console.log("Something broken in the frames mechanism");
    return 0;
  };
  
  this.addFrame = function(xPos, yPos, w, h)
  {
    _frames.push(new IGEFrame(xPos, yPos, w, h));
  };
  
    this.getOnGround = function()
  {
    return onGround;
  };
  
    this.setOnGround = function(val)
  {
    onGround = val;
  };
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.getax = function()
  {
    return _accelx;
  };
  
  this.getxy = function()
  {
    return _accely;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };

  
  
  
  
  
  
  
  this.update = function()
  {
    _vx += _accelx;
    _x += _vx;
    _vy += _accely;
    _y += _vy;
    
   
	if(this.getx() <= -2850)
		{
			this.setshipDrive(false);
			this.setvx(0);
		}	
		else
		{
		this.setvx(-0.4);
		
		}
   
  };
  
  this.draw = function(c)
  {
    
    var currentFrame = 0;
    for(var i = 0; i < _ranges.length; ++i)
    {

      if(_currentRange === _ranges[i].getName())
      {
        currentFrame = _ranges[i].currentFrame();
        //console.log(currentFrame);
      }
    }

    c.drawImage(_img, 
                _frames[currentFrame].getx(), 
                _frames[currentFrame].gety(),
                _frames[currentFrame].getWidth(), 
                _frames[currentFrame].getHeight(),
                _x, 
                _y, 
                _width, 
                _height);
  };
};







var CannonSpawn = function(x, y, w, h,dir1,dir2)
{
  var _x = x;
  var _y = y;
  var _height = h;
  var _width = w;  
   var _dir1 = dir1;
  var _dir2 = dir2;
  var _vx = 0;
  var _vy = 0;
  //var _accelx = 0;
  //var _accely = 0;
  var _shipDrive = true;
  
  
    this.getDir1 = function()
  {
    return _dir1;
  };
  
  this.setDir1 = function(val)
  {
    _dir1 = val;
  };
  
      this.getDir2 = function()
  {
    return _dir2;
  };
  
  this.setDir2 = function(val)
  {
    _dir2 = val;
  };
  
  
  
      this.getshipDrive = function()
  {
    return _shipDrive;
  };
  
  this.setshipDrive = function(val)
  {
    _shipDrive = val;
  };
  

  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };

  this.contains = function(x,y)
	{
	if(	x >= this.getx() && 	
		x <= this.getx() + this.getWidth() && 
		y >= this.gety() &&
		y <= this.gety() + this.getHeight())
		{
		return true; 
		}
		else
		{
			return false;
		}
	}
	
	
this.Intersects = function(ige2)
	{
				if(	this.contains(ige2.getx(), 		 ige2.gety()) 												|| 				//TOP LEFT
					this.contains(ige2.getx() +	 ige2.getWidth(),		 ige2.gety())					|| 				//TOPRIGHT
					this.contains(ige2.getx(), 		 ige2.gety() +			 ige2.getHeight()) 		||					//BOTTOM LEFT
					this.contains(ige2.getx() +	 ige2.getWidth() ,		 ige2.gety() + ige2.getHeight())) 		//BOTTOMRIGHT
			{
				return true;
			}
		else if(	ige2.contains(this.getx(), 		 this.gety()) 												|| 				//TOP LEFT
					ige2.contains(this.getx() +	 this.getWidth(),		this.gety())					|| 				//TOPRIGHT
					ige2.contains(this.getx(), 		 this.gety() +			this.getHeight()) 			||					//BOTTOM LEFT
					ige2.contains(this.getx() +	 this.getWidth() ,		this.gety() + this.getHeight()))		//BOTTOMRIGHT
			{
				return true;
			}
			else
			{
				return false;
			}
	
	}
  
  
  this.update = function()
  {

    _x += _vx;
 
    _y += _vy;
    if(this.getshipDrive() == true)
	{
    this.setvx(-0.4);
	}
	else
	{
	 this.setvx(0);
	}
   
  };
  
  this.draw = function(ctx, colour)
  {

    ctx.fillStyle = colour;
	ctx.fillRect(_x, _y,  _width,  _height);
  };
};


var Ball = function(file, sx, sy, sw, sh, dx, dy, dw, dh, dir1, dir2)
{
var EnemyDie = $("#EnemyDie").get(0);

  var _x = dx;
  var _y = dy;
  var _height = dh;
  var _width = dw;
   var _dir1 = dir1;
  var _dir2 = dir2;
  var _img = new Image();  
  _img.src = file;
  var _frames = new Array();
  _frames.push(new IGEFrame(sx, sy, sw, sh));
  var _ranges = new Array();
  _ranges.push(new AnimationRange("", 0, 1));

  var _currentRange = "";
  
  this.addRange = function(rangeName, start, end)
  {
      _ranges.push(new AnimationRange(rangeName, start, end));
      
  };  
  
  
  this.setRange = function(rangeId)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangeId === _ranges[i].getName())
      {
        _currentRange = _ranges[i].getName();
        //_ranges[i].resetCurrentFrame();
      }
    }
  };
  
  this.setRangeFrames = function(rangename, start, end)
  {
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(rangename == _ranges[i].getName())
      {
        _ranges[i].setRange(start, end);
        return;
      }
      
    }    
  }
  
  
  var _vx = 0;
  var _vy = 0;
  var _accelx = 0;
  var _accely = 0;
  var Dead = false;
    

this.getDead = function()
  {
    return Dead;
  };
  
  this.setDead = function(val)
  {
    Dead = val;
  };
	
	
    this.getDir1 = function()
  {
    return _dir1;
  };
  
  this.setDir1 = function(val)
  {
    _dir1 = val;
  };
  
      this.getDir2 = function()
  {
    return _dir2;
  };
  
  this.setDir2 = function(val)
  {
    _dir2 = val;
  };
  
  
  
  this.getx = function()
  {
    return _x;
  };
  
  this.setx = function(val)
  {
    _x = val;
  };
  
  this.gety = function()
  {
    return _y;  
  };
  
  this.sety = function(val)
  {
    _y = val;
  };
  
  this.getWidth = function()
  { 
    return _width;
  };
  
  this.getHeight = function()
  {
    return _height;
  };
  
  this.nextFrame = function()
  {
   
    for(var i = 0; i < _ranges.length; ++i)
    {
      if(_currentRange == _ranges[i].getName())
      {
        var ret = _ranges[i].nextFrame()
        return ret;
      }
    }
    
    console.log("Something broken in the frames mechanism");
    return 0;
  };
  
  this.addFrame = function(xPos, yPos, w, h)
  {
    _frames.push(new IGEFrame(xPos, yPos, w, h));
  };
  
  
  this.getvx = function()
  {
    return _vx;
  };
  
  
  this.setvx = function(val)
  {
    _vx = val;
  };
  
  this.getvy = function()
  {
    return _vy;
  };
  
  this.setvy = function(val)
  {
    _vy = val;
  };
  
  this.getax = function()
  {
    return _accelx;
  };
  
  this.getxy = function()
  {
    return _accely;
  };
  
  this.setax = function(val)
  {
    _accelx = val;
  };
  
  this.setay = function(val)
  {
    _accely = val;
  };

  this.update = function()
  {
    _vx += _accelx;
    _x += _vx;
    _vy += _accely;
    _y += _vy;
    
	if(this.getDead() == false)
	{
	   if(this.getDir1() == "up" && this.getDir2() == "left")
		   {
		   this.setvx(-1.5);
		   this.setvy(-1.5);
			   if(this.gety() + this.getHeight() <= 0 || this.getx() + this.getWidth() <=0)
				{
					this.sety(448 + this.getHeight());
					this.setx(Math.floor(Math.random() * 744));
				}
		   }
	   
	   if(this.getDir1() == "down" && this.getDir2() == "left")
		   {
		   this.setvx(-1.5);
		   this.setvy(1.5);
				if(this.gety() >= 448 || this.getx() + this.getWidth() <=0)
				{
					this.sety(0 - this.getHeight());
					this.setx(Math.floor(Math.random() * 744));
				}
		   }
	   
	   if(this.getDir1() == "" && this.getDir2() == "left")
		   {
		   this.setvy(0);
		   this.setvx(-1.5);
			   if(this.getx()+ this.getWidth() <= 0)
				{
					this.setx(744 + this.getWidth());
					if(BulletSFX.paused)
						{
							BulletSFX.currentTime = 0;
							BulletSFX.play();
						};
					this.sety(Math.floor(Math.random() * 448));
				}
		   }
		   
	  
	  if(this.getDir1() == "" && this.getDir2() == "right")
		   {
		   this.setvx(1.5);
		   this.setvy(0);
			  if(this.getx() >= 744)
				{
					this.setx(0 - this.getWidth());
					this.sety(Math.floor(Math.random() * 448));
				}
		   } 
	  
	  if(this.getDir1() == "" && this.getDir2() == "down")
		   {
		   this.setvy(1.5);
		   this.setvx(0);
				if(this.gety() >= 448)
				{
					this.sety(0 - this.getHeight());
					this.setx(Math.floor(Math.random() * 744));
				}
		   }
		
		if(this.getDir1() == "up" && this.getDir2() == "right")
		   {
		   this.setvx(1.5);
		   this.setvy(-1.5);
				if(this.gety() + this.getHeight <= 0 || this.getx() >=744)
				{
					this.sety(448 + this.getHeight());
					this.setx(Math.floor(Math.random() * 744));
				}
		   }
   
		}
		if(Dead)
		{
		this.setvx(0);

		this.setvy(5);
			if(this.gety() >448)
			{
			this.setDead(false)
			}
		}
  };
  //var previousPosition = new Vector2(mario.getx(), mario.gety());
  this.draw = function(c)
  {
    
    var currentFrame = 0;
    for(var i = 0; i < _ranges.length; ++i)
    {

      if(_currentRange === _ranges[i].getName())
      {
        currentFrame = _ranges[i].currentFrame();
        //console.log(currentFrame);
      }
    }

    c.drawImage(_img, 
                _frames[currentFrame].getx(), 
                _frames[currentFrame].gety(),
                _frames[currentFrame].getWidth(), 
                _frames[currentFrame].getHeight(),
                _x, 
                _y, 
                _width, 
                _height);
  };
};


