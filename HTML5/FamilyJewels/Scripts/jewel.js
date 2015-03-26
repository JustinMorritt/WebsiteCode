var jewel = (function () 
{

    var settings =
        {
            rows: 50,
            cols: 50,
            baseScore: 100,
            numJewelTypes: 7
        };


	var scriptQueue = [], numResourcesLoaded = 0, numResources = 0, executeRunning = false;
	
	function executeScriptQueue()
	{
		var next = scriptQueue[0], first, script;
		if(next && next.loaded)
		{
			executeRunning =true;
			//removes the first element in the Queue
			scriptQueue.shift();
			first = document.getElementsByTagName("script")[0];
			script = document.createElement("script");
			script.onload = function()
			{
				if(next.callback)
				{
					next.callback();
				}
				//try to execute more scripts
				executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		
		}
		else
		{
			executeRunning = false;
		}
	}
	
	
	
	function load(src, callback)
	{
		var image, queueEntry;
		numResources++;
		
		queueEntry = 
		{
			src:src,
			callback: callback,
			loaded: false
		};
		scriptQueue.push(queueEntry);
		
		image = new Image();
		image.onload = image.onerror = function()
		{
		    numResourcesLoaded++;
		    console.log("Number Of Resources Loaded: " + numResourcesLoaded);
			queueEntry.loaded = true;
			if(!executeRunning)
			{
				executeScriptQueue();
			}
		};
		image.src = src;
	}
	
	
	
	function showScreen(screenId)
	{
		var dom = jewel.dom,
		$ = dom.$,
		activeScreen = $("#game .screen.active")[0],
		screen = $("#" + screenId)[0];
		
		if(!jewel.screens[screenId])
		{
				alert("This module isn't implemented yet !");
				return;
		}
		
		if(activeScreen)
		{
			dom.removeClass(activeScreen, "active");
		}
		
		dom.addClass(screen, "active");
		
		jewel.screens[screenId].run();
	}
	//Remember to expose the public functions in the return...
	
	
	
	function isStandalone()
	{
		return(window.navigator.standalone !== false);
	}
	
	
	function setup()
	{
		if(isStandalone())
		{
			console.log("Not The StandAlone version");
			showScreen("splash-screen");


		    //DISABLES THE NATIVE TOUCH BEHAVIOUR TO PREVENT OVERSCROLL
			jewel.dom.bind(document, "touchmove", function (event) {
			    event.preventDefault();
			});

		    //HIDE THE ADDRESS BAR ON ANDROID DEVICES 
			if(/Android/.test(navigator.userAgent))
			{
			    $("html")[0].style.height = "200%";
			    setTimeout(function () {
			        window.scrollTo(0, 1);
			    }, 0);
			}


		}
		else
		{
			console.log("The StandAlone version");
			showScreen("install-screen");
		}
		console.log("Success! Loaded!");
		//jewel.showScreen("splash-screen");
	}
	
	
	
	
	
	return{
	load: load,
	setup: setup,
	showScreen: showScreen,
	isStandalone: isStandalone,
    settings: settings,
	screens: {}
	
	};
	
	
})();