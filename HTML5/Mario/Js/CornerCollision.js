Rectangle = function(x,y,w,h){
this.x = x , this.y = y, this.width = w, this.height = h
	
	
	this.contains = function(x,y)
	{
	if(	x >= this.x && 	
		x <= this.x + this.width && 
		y >= this.y &&
		y <= this.y + this.height)
		{
		return true; 
		}
		else
			return false;
	}
	
	this.Intersects = function(shape)
	{
		if(	this.contains(shape.x, shape.y) || 												//TOP LEFT
			this.contains(shape.x + shape.width, shape.y) || 					   	//TOPRIGHT
			this.contains(shape.x, shape.y + shape.height) ||						//BOTTOM LEFT
			this.contains(shape.x + shape.width , shape.y + shape.height) 	//BOTTOMRIGHT
			{
				return true;
			}
		else if(	shape.contains(this.x, this.y) || 										//TOP LEFT
			shape.contains(this.x + this.width, this.y) || 					  		 	//TOPRIGHT
			shape.contains(this.x, this.y + this.height) ||							//BOTTOM LEFT
			shape.contains(this.x + this.width , this.y + this.height) 			//BOTTOMRIGHT
			{
				return true;
			}
				
		return false;
	
	}
	


};