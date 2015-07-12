var jewel = (function ()
{
    var scriptQueue = [], numResourcesLoaded = 0, numResources = 0, executeRunning = false;

    var settings =
        {
            //SETTINGS
            rows: 8,
            cols: 8,
            baseScore: 100,
            numJewelTypes: 7,

            //CONTROLS
            controls : {
                    // keyboard
            KEY_UP : "moveUp",
            KEY_LEFT : "moveLeft",
            KEY_DOWN : "moveDown",
            KEY_RIGHT : "moveRight",
            KEY_ENTER : "selectJewel",
            KEY_SPACE : "selectJewel",
            // mouse and touch
            CLICK : "selectJewel",
            TOUCH : "selectJewel",
            // gamepad
            BUTTON_A: "selectJewel",
            LEFT_STICK_UP: "moveUp",
            LEFT_STICK_DOWN: "moveDown",
            LEFT_STICK_LEFT: "moveLeft",
            LEFT_STICK_RIGHT: "moveRight"
            }
        };

    function setup() {
        if (isStandalone()) {
            console.log("Not The StandAlone version");
            showScreen("splash-screen");


            //DISABLES THE NATIVE TOUCH BEHAVIOUR TO PREVENT OVERSCROLL
            jewel.dom.bind(document, "touchmove", function (event) {
                event.preventDefault();
            });

            //HIDE THE ADDRESS BAR ON ANDROID DEVICES 
            /*
			if(/Android/.test(navigator.userAgent))
			{
			    jewel.dom.$("html")[0].style.height = "200%";
			    setTimeout(function () {
			        window.scrollTo(0, 1);
			    }, 0);
			}
            */

        }
        else {
            console.log("The StandAlone version");
            showScreen("install-screen");
        }
        console.log("Success! Loaded!");
        //jewel.showScreen("splash-screen");
    }

    function getLoadProgress()
    {
        return numResourcesLoaded / numResources;
    }

    function getSIZE() {
        var size = prompt("Please enter the size of board you would like...", "8");
        settings.rows = size;
        settings.cols = size;
    }

    function hasWebWorkers()
    {
        return ("Worker" in window);
    }

    function preload(src)
    {
        var image = new Image();
        image.src = src;
    }

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
	
	function isStandalone()
	{
		return(window.navigator.standalone !== false);
	}
	
	return{
	    load: load,
	    getSIZE: getSIZE,
	    getLoadProgress: getLoadProgress,
	    preload : preload,
	    hasWebWorkers : hasWebWorkers,
	    setup: setup,
	    showScreen: showScreen,
	    isStandalone: isStandalone,
        settings: settings,
	    screens: {}
	};

})();