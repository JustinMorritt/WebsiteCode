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
    
    
    if(_vx === 0)
    {
      this.setRange("");
    }
    if(_vx < 0)
    {
      this.setRange("Small Mario Walk Left");
    }
    if(_vx > 0)
    {
      this.setRange("Small Mario Walk Right");
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



