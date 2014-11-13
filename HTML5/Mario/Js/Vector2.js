Vector2 = function(x,y)
{
	this.x = 0, this.y = 0;
	if(x != null)
		{
			this.x = x
		}
	if(y != null)
		{
			this.y = y
		}
	
	this.previousX = 0 ;
	this.previousY = 0;
}