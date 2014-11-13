var igeFrame = function(xPos, yPos, w, h)
{
  var _origin = new Point(xPos, yPos);
  var _width = w;
  var _height = h;
  
  this.getx = function()
  {
       return _origin.x;
  };
  this.gety = function()
  {
    return _origin.y;
  }
  
  this.getWidth = function()
  {
     return _width;
  }
  
  this.getHeight = function()
  {
    return _height;
  };
  
  
};


var InGameEntity = function(file, sx, sy, sw, sh, dx, dy, scale)
{
    var _dPoint = new Point(dx, dy)  
    var _dwidth = sw;
    var _dheight = sh;
    
    
    var _frames = new Array();
    _frames.push(new igeFrame(sx, sy, sw, sh));        
    var _currentFrame = 0;  
    var _frameTotal = 1;
    
    var _rangeMin = 0;
    var _rangeMax = _frameTotal;
    
    this.setRangeMax = function(m)
    {
      _rangeMax = m;
    }
    
    this.setRangeMin = function(m)
    {
      _rangeMin = m;
    }
    
    this.getCurrentFrame = function()
    {
        return _currentFrame;
    };
    
    this.nextFrame = function()
    {
      ++_currentFrame;
      if(_currentFrame === _rangeMax)
      {
         _currentFrame = _rangeMin;
      }
      
    };

    this.setFrame = function(f)
    {
      if(f >= _rangeMax || f < _rangeMin)
      {
        return;
      }
      
      _currentFrame = f;
      
    };

    
    this.addFrame = function(xPos, yPos, w, h)
    {
      _frames.push(new igeFrame(xPos, yPos, w, h));
      ++_frameTotal;
      _rangeMax = _frameTotal;
    };
    
    var _dwidth = sw;
    var _dheight =  sh; 
    
    var _img = new Image();
    _img.src = file;
        
    var _vx = 0;
    var _vy = 0;
    
    this.getvx = function()
    {
      return _vx;
    };
    this.setvx = function(v)
    {
      _vx = v;
    };

    this.getvy = function()
    {
      return _vy;
    };
    this.setvy = function(v)
    {
      _vy = v;
    };
    
    
    this.getx = function()
    {
      return _dPoint.x;
    };
    this.setx = function(v)
    {
      _dPoint.x = v;
    };
    this.gety = function()
    {
      return _dPoint.y;
    };
    this.sety = function(v)
    {
      _dPoint.y = v;
    };
    
    this.getWidth = function()
    {
      return _dwidth;
    };
    this.getHeight = function()
    {
      return _dheight;
    };
    
    
    this.update = function()
    {
      _dPoint.x += _vx;
      _dPoint.y += _vy;
    };
    
    this.draw = function(c)
    {
      c.drawImage(_img, _frames[_currentFrame].getx(), 
                  _frames[_currentFrame].gety(), 
                  _frames[_currentFrame].getWidth(), 
                  _frames[_currentFrame].getHeight(),
                  scale * _dPoint.x, scale * _dPoint.y, scale * _dwidth, scale * _dheight);
    };
};
	