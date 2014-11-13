 $(document).ready(function() {
        var canvas = $("#myCanvas");
        var context = canvas.get(0).getContext("2d");	      
	
	    var tiles = new Array();
		var hammerbros = new Array();
		var tw = 40;
		var cW = context.canvas.width , cH = context.canvas.height ;
		const LEFT_ARROW = 37;
		const UP_ARROW = 38;
		const RIGHT_ARROW = 39;
		const DOWN_ARROW = 40;
		const SPACE = 32;
		const ANIMATION_RATE = 200;
		const FRAME_RATE = 20;
		var inTransition = true;
		var outTransition = false;
		
		window.addEventListener("keydown", keyDownHandler, false);
		window.addEventListener("keyup", keyUpHandler, false);
		
		var Backgroundmusic = $("#backgroundMusic").get(0);
		var ArrowMove = $("#arrowMove").get(0);
		var Start = $("#Start").get(0);												  
			
			
			
			var mario = new InGameEntity("Pics/world.png", 208, 32, 14, 16,
														tw, 2*tw, tw, tw);
			mario.setRangeFrames("", 0, 1);
			mario.addRange("Walk", 0, 2);
			mario.addFrame(225,32,14,16);
			
			
			
			mario.setRange("Walk");

			
			//		tile.setRangeFrames("", 0, 1);
			//		tile.addRange("Dance", 0, 2);
			//		tile.setRange("Dance"); 
			
		
		
		
			var tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
																				0, 0, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			var tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
																					tw, 0, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
																	2 * tw, 0, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 96, 0, 16, 16,
																	3 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														4 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 48, 16, 16,
														5 * tw, 0, tw, tw);
			tiles.push(tile);
			//road
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														6 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 112, 0, 16, 16,
														7 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														8 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 128, 0, 16, 16,
														9 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														10 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 48, 48, 16, 16,
														11 * tw, 0, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														12 * tw, 0, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);

			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
																		13 * tw, 0, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														0, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 

			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														2*tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			
			//down road
			tile = new InGameEntity("Pics/world.png", 16, 32, 16, 16,
														3*tw, tw, tw, tw);
			tiles.push(tile);
		
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														4*tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
		
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
																											5*tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
																		6*tw, tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
						tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 16, 32, 16, 16,
																		7*tw, tw, tw, tw);
			tiles.push(tile);
		
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
																		8*tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														9*tw, tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
						tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														10*tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 16, 32, 16, 16,
														11*tw, tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														12*tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);		
			tile.setRange("Dance"); 
		
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			//right road
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														0, 2*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 96, 16, 16, 16,
														tw, 2*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														2*tw, 2*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 48, 80, 16, 16,
														3*tw, 2*tw, tw, tw);
			tiles.push(tile);
		
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
															4*tw, 2*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
				
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														5*tw, 2*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
		
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														6*tw, 2*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 64, 16, 16,
														7*tw, 2*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														8*tw, 2*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 144, 0, 16, 16,
														9*tw, 2*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														10*tw, 2*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 32, 0, 16, 16,
														11*tw, 2*tw, tw, tw);
			tiles.push(tile);
			
					tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														12*tw, 2*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
					tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, 2*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														0, 3*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
					tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														tw, 3*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
						tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
							tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														2*tw, 3*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 64, 16, 16, 16,
														3*tw, 3*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														4*tw, 3*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
											5*tw, 3*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														6*tw, 3*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 16, 32, 16, 16,
														7*tw, 3*tw, tw, tw);
			tiles.push(tile);
			
																tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														8*tw, 3*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
						tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
																tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														9*tw, 3*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
						tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
																tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														10*tw, 3*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
						tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														11*tw, 3*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
						tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														12*tw, 3*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, 3*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance");
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														0, 4*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
													tw, 4*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
													2*tw, 4*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 64, 16, 16,
													3*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
													4*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 48, 0, 16, 16,
													5*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
													6*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
			
			tile = new InGameEntity("Pics/world.png", 112, 16, 16, 16,
													7*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
						
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
													8*tw, 4*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
													9*tw, 4*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			//water
			tile = new InGameEntity("Pics/world.png", 64, 48, 16, 16,
														10*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 48, 16, 16,
														11*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 96, 48, 16, 16,
														12*tw, 4*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, 4*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														0, 5*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														tw, 5*tw, tw, tw);	
			tiles.push(tile);	

			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														2*tw, 5*tw, tw, tw);	
			tiles.push(tile);	
			

			tile = new InGameEntity("Pics/world.png", 16, 32, 16, 16,
														3*tw, 5*tw, tw, tw);
			tiles.push(tile);

			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														4*tw, 5*tw, tw, tw);	
			tiles.push(tile);

			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														5*tw, 5*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														6*tw, 5*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														7*tw, 5*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 64, 48, 16, 16,
														8*tw, 5*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 48, 16, 16,
														9*tw, 5*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 80, 16, 16,
														10*tw, 5*tw, tw, tw);
			tiles.push(tile);
			//clear ground
			tile = new InGameEntity("Pics/world.png", 80, 0, 16, 16,
														11*tw, 5*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 64, 64, 16, 16,
														12*tw, 5*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, 5*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														0, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														2*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 64, 16, 16,
														3*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														4*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 32, 0, 16, 16,
														5*tw, 6*tw, tw, tw);
			tiles.push(tile);
		
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														6*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 48, 16, 16,
														7*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 64, 16, 16,
														8*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 48, 16, 16,
														9*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														10*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 16, 16, 16,
														11*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 64, 64, 16, 16,
														12*tw, 6*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, 6*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														0, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														2*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 32, 16, 16,
														3*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														4*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														5*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														6*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 32, 16, 16,
														7*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 64, 64, 16, 16,
														8*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														9*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														10*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														11*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 64, 64, 16, 16,
														12*tw, 7*tw, tw, tw);
			tiles.push(tile);
			
			 var tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, 7*tw, tw, tw);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.setRange("Dance"); 
			
			tile = new InGameEntity("Pics/world.png", 0, 0, 16, 16,
														0, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 16, 0, 16, 16,
														2*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 160, 0, 16, 16,
														3*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														4*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 48, 16, 16,
														5*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 0, 32, 16, 16,
														6*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 176, 0, 16, 16,
														7*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 64, 80, 16, 16,
														8*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 48, 16, 16,
														9*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 48, 16, 16,
														10*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 48, 16, 16,
														11*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			tile = new InGameEntity("Pics/world.png", 80, 80, 16, 16,
														12*tw, 8*tw, tw, tw);
			tiles.push(tile);
			
			var tile = new InGameEntity("Pics/world.png", 0, 16, 16, 16,
														13*tw, 8*tw, tw, tw);
			tile.setRangeFrames("", 0, 1);
			tile.addRange("Dance", 0, 4);
			tile.addFrame(16,16,16,16);
			tile.addFrame(32,16,16,16);
			tile.addFrame(48,16,16,16);
			tiles.push(tile);
			tile.setRange("Dance"); 
			
			
			tile = new InGameEntity("Pics/25686.png", 0, 0, 245, 40,
														0, 9*tw, 14*tw, 100);
														tile.addRange("Hud", 0, 3);
														tile.addFrame( 0, 0, 245, 40);
														tile.addFrame( 0, 0, 245, 40);
														tile.setRange("Hud");
			tiles.push(tile);
			
	
			hammerbro = new InGameEntity("Pics/world.png", 208, 0, 16, 16,
														 9*tw, 6*tw, tw, tw);
			hammerbro.addRange("Right", 0, 2);
			hammerbro.addFrame(224,0,16,16);
			
			hammerbro.addRange("Left", 2, 4);
			hammerbro.addFrame(224,16,16,16);
			hammerbro.addFrame(208,16,16,16);
			hammerbros.push(hammerbro);

			
			
			
			tile = new InGameEntity("Pics/world.png", 112, 48, 16, 16,
														12*tw, 5*tw, tw, tw);						
			tile.addRange("Help", 0, 3);
			tile.addFrame(64, 64, 16, 16);	
			tile.addFrame(64, 64, 16, 16);
			tile.setRange("Help"); 
			tiles.push(tile);
			
	


	var right = true;
	var left = false;	
	function hammerXupdate()
  {
	 if(right)
	 {
	 hammerbro.setvx(.5);
	 hammerbro.setRange("Right");
		if(hammerbro.getx() == 520)
		{
			right = false;
			left = true;
		}
	 }
	else if(left)
	 {
		hammerbro.setvx(-.5);
		 hammerbro.setRange("Left");
		if(hammerbro.getx() == 440)
		{
			left = false;
			right = true
		}
	 }
  };
  
  
  var Waypoint =					
						[   	{"id":"Waypoint1","x":130,"y":80,"right":true,"left":false,"up":false,"down":false},
								{"id":"Waypoint2","x":210,"y":80,"right":false,"left":true,"up":true,"down":false},
								{"id":"Waypoint3","x":210,"y":0,"right":true,"left":false,"up":false,"down":true},
								{"id":"Waypoint4","x":290,"y":0,"right":true,"left":true,"up":false,"down":false},
								{"id":"Waypoint5","x":370,"y":0,"right":true,"left":true,"up":false,"down":true},
								{"id":"Waypoint6","x":450,"y":0,"right":true,"left":true,"up":false,"down":false},
								{"id":"Waypoint7","x":530,"y":0,"right":false,"left":true,"up":false,"down":true},
								{"id":"Waypoint8","x":530,"y":80,"right":false,"left":true,"up":true,"down":false},
								{"id":"Waypoint9","x":450,"y":80,"right":true,"left":true,"up":false,"down":false},
								{"id":"Waypoint10","x":370,"y":80,"right":true,"left":false,"up":true,"down":true},
								{"id":"Waypoint11","x":370,"y":160,"right":false,"left":true,"up":true,"down":false},
								{"id":"Waypoint12","x":290,"y":160,"right":true,"left":true,"up":false,"down":false},
								{"id":"Waypoint13","x":210,"y":160,"right":true,"left":false,"up":false,"down":true},
								{"id":"Waypoint14","x":210,"y":240,"right":false,"left":false,"up":true,"down":true},
								{"id":"Waypoint15","x":210,"y":320,"right":true,"left":false,"up":true,"down":false},
								{"id":"Waypoint16","x":290,"y":320,"right":true,"left":true,"up":false,"down":false},
								{"id":"Waypoint17","x":370,"y":320,"right":false,"left":true,"up":true,"down":false},
								{"id":"Waypoint18","x":370,"y":240,"right":true,"left":true,"up":false,"down":true},
								{"id":"Waypoint19","x":290,"y":240,"right":true,"left":false,"up":false,"down":false},
								{"id":"Waypoint20","x":450,"y":240,"right":true,"left":true,"up":false,"down":false},
								{"id":"Waypoint21","x":530,"y":240,"right":false,"left":true,"up":false,"down":false,"castle":true}
					
					]                                                                                                 
		var destination = "";	
		var currentWaypoint = "";	
				
	function renderWaypoints (){
			for(var i=0 ; i < Waypoint.length ; i++){
	
				if(mario.getx() == Waypoint[i].x && mario.gety() == Waypoint[i].y){
				currentWaypoint = Waypoint[i];
				//console.log(currentWaypoint);
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
				context.lineWidth = this.lineWidth +=2;
				context.strokeRect(0, 0, cW, cH);
				if(this.lineWidth == 500 )
				{
					window.open ('shiplevel.html','_self',false)
				}
					
			}
							
		}
								
	};
	var OutTransition = new OutTransition();
	var InTransition = new InTransition();
		
		animate();
        function animate()
        {
		setInterval(nextFrame2, ANIMATION_RATE *2);
		setInterval(nextFrame, ANIMATION_RATE);
		setInterval(draw2, FRAME_RATE);
        };
		
		
		function nextFrame(){ 
				mario.nextFrame();
		
		};
		
		
		function nextFrame2(){ 
				for(var i = 0; i< tiles.length; ++i)
				{
				tiles[i].nextFrame();
				}
			for(var i = 0; i< hammerbros.length; ++i)
				{
				hammerbros[i].nextFrame();
				}
		
		};
		
		
		
				
		function draw2(){ 
		for(var i = 0; i< tiles.length; ++i)
				{
				tiles[i].update();
				tiles[i].draw(context);
				}
		for(var i = 0; i< hammerbros.length; ++i)
				{
				
				hammerbros[i].update();
				hammerXupdate();
				hammerbros[i].draw(context);
				}
		
		mario.update();		
		mario.draw(context);
		renderWaypoints ();
		moveMario();
		Move();
		
		if(inTransition)
		{
			InTransition.render();
		}
		if(outTransition)
		{
			OutTransition.render();
		}
		
		};
	
		context.fillStyle = "black";
		context.fillRect(0,0,744,448);
			
				
					//console.log(currentWaypoint.left);
					//console.log(currentWaypoint.up);
					//console.log(currentWaypoint.down);
		
        
	var keyPress = "";		
	var currentPos = "";
	var currentPosY = "";
	var nextWaypoint = "";
	var nextWaypointY = "";
	var slide = false;
		
	function Move(){
			if(slide == true && nextWaypoint < currentPos)
		{
		mario.setvx(-4);
		}
			if(slide == true && nextWaypoint > currentPos)
		{
		mario.setvx(4);
		}
			if(slide == true && nextWaypointY < currentPosY)
		{
		mario.setvy(-4);
		}
			if(slide == true && nextWaypointY > currentPosY)
		{
		mario.setvy(4);
		}
		if(mario.getx() == nextWaypoint){
		nextWaypoint = "";
		currentPos = "";
		mario.setvx(0);
		slide = false;
		}
		if(mario.gety() == nextWaypointY){
		nextWaypointY = "";
		currentPosY = "";
		mario.setvy(0);
		slide = false;
		}
	};

	function moveMario(){
		if(currentWaypoint.left ===  true &&  currentWaypoint != "" && keyPress == "left")
				{
					if(ArrowMove.paused)
						{
							ArrowMove.currentTime = 0;
							ArrowMove.play();
						};
					keyPress = "";
					currentWaypoint = "";
					currentPos = mario.getx();
					nextWaypoint = mario.getx() - 80;
					slide = true;
				}
		if(currentWaypoint.right ===  true &&  currentWaypoint != "" && keyPress == "right")
				{
					if(ArrowMove.paused)
						{
							ArrowMove.currentTime = 0;
							ArrowMove.play();
						};
					currentPos = mario.getx();
					nextWaypoint = mario.getx() + 80;
					//mario.setx(mario.getx() + 80);
					keyPress = "";
					currentWaypoint = "";
					slide = true;
				}
		if(currentWaypoint.up ===  true  &&  currentWaypoint != "" && keyPress == "up")
					{
						if(ArrowMove.paused)
							{
								ArrowMove.currentTime = 0;
								ArrowMove.play();
							};
					//mario.sety(mario.gety() - 80);
					currentPosY = mario.gety();
					nextWaypointY = mario.gety() - 80;
					currentWaypoint = "";
					keyPress = "";
					slide = true;
					}
		if(currentWaypoint.down ===  true &&  currentWaypoint != "" && keyPress == "down")
					{
						if(ArrowMove.paused)
							{
								ArrowMove.currentTime = 0;
								ArrowMove.play();
							};
					currentPosY = mario.gety();
					nextWaypointY = mario.gety() + 80;
					currentWaypoint = "";
					keyPress = "";
					slide = true;
					}	
	};	
		
	function keyDownHandler(event)
	{
		switch(event.keyCode)
			{
			case LEFT_ARROW:
		
				break;
			case UP_ARROW:
	
				break;
			case RIGHT_ARROW:

				break;
			case DOWN_ARROW:
	
				break;
			case SPACE:
				if(currentWaypoint.castle ===  true)
				{
				outTransition = true;
				if(Start.paused)
					{
						Start.currentTime = 0;
						Start.play();
					};
				}
			}
	};

	function keyUpHandler(event)
		{
		switch(event.keyCode)
			{
			case LEFT_ARROW: 
			keyPress = "left";
				break;
			case RIGHT_ARROW:
			keyPress = "right";
				break;
			case UP_ARROW: 
			keyPress = "up";
					break;
			case DOWN_ARROW:
			keyPress = "down";
	
				break;
			}
	};

		
	      	
});
