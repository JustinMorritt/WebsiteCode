jewel.screens["game-screen"] = (function () {
    var firstRun = true, cursor,
     paused = false;


    function run()
    {
        if (firstRun)
        {
            jewel.getSIZE();
            setup();
            firstRun = false;
        }
        startGame();
    }
 
    function setup()
    {
        var dom = jewel.dom;
        console.log("Binding Footer OverLay Buttons");
        dom.bind("footer button.exit", "click", exitGame);
        dom.bind("footer button.pause", "click", pauseGame);
        dom.bind(".pause-overlay", "click", resumeGame);
        
        var input = jewel.input;
        input.initialize();
        input.bind("selectJewel", selectJewel);
        input.bind("moveUp", moveUp);
        input.bind("moveDown", moveDown);
        input.bind("moveLeft", moveLeft);
        input.bind("moveRight", moveRight);
    }

    function startGame()
    {
        var board = jewel.board,
        display = jewel.display;

        gameState =
        {
            level: 0,
            score: 0,
            timer: 0, //setTimeout Reference
            startTime: 0, // time at start of level
            endTime : 0,
        }

        board.initialize(function ()
        {
            display.initialize(function ()
            {
                cursor =
                {
                    x: 0,
                    y: 0,
                    selected: false
                };
                display.redraw(board.getBoard(), function ()
                {
                    //nothin for now
                    console.log("------------Engines Roar-------------")
                });
            });
        });
        paused = false;
        var dom = jewel.dom,
        overlay = dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "none";
    }

    function setCursor(x, y, select)
    {
        cursor.x = x;
        cursor.y = y;
        cursor.selected = select;
        jewel.display.setCursor(x, y, select);
    }

    function selectJewel(x, y)
    {
        //console.log("ARGUMENTS LENGTH = " + arguments.length);
        if (arguments.length === 0)
        {
            selectJewel(cursor.x, cursor.y);
            return;
        }
        if (cursor.selected)
        {
            var dx = Math.abs(x - cursor.x),
                dy = Math.abs(y - cursor.y),
                dist = dx + dy;

            if (dist === 0)
            {
                // deselected the selected jewel
                //console.log("**Distance = 0 , deselecting...");
               
                setCursor(x, y, false);
            }
            if (dist == 1)
            {
                // selected an adjacent jewel
                console.log("**Distance = 1 , attempt Swap.. x1: " + cursor.x + " y1: " + cursor.y + " x2: " + x + " y2: " + y);

                jewel.board.swap(cursor.x, cursor.y, x, y, playBoardEvents);
                setCursor(x, y, false);
            }
            else
            {
                console.log("**Distance = " + dist + " , setting cursor to --> X: " + x + " Y: " + y);
               
                // selected a different jewel
                setCursor(x, y, true);
            }
        }
        else
        { 
            setCursor(x, y, true);
        }
    }

    function playBoardEvents(events)
    {
        var display = jewel.display;
        if (events.length > 0) {
            var boardEvent = events.shift(),
                next = function () {
                    playBoardEvents(events);
                };
            switch (boardEvent.type) {
                case "move":
                    display.moveJewels(boardEvent.data, next);
                    break;
                case "remove":
                    display.removeJewels(boardEvent.data, next);
                    break;
                case "refill":
                    display.refill(boardEvent.data, next);
                    break;
                default:
                    next();
                    break;
            }
        } else {
            display.redraw(jewel.board.getBoard(), function () {
                // good to go again
            });
        }
    }

    function moveCursor(x, y) {
        var settings = jewel.settings;
        if (cursor.selected) {
            x += cursor.x;
            y += cursor.y;
            if (x >= 0 && x < settings.cols &&
                y >= 0 && y < settings.rows) {
                selectJewel(x, y);
            }
        } else {
            x = (cursor.x + x + settings.cols) % settings.cols;
            y = (cursor.y + y + settings.rows) % settings.rows;
            setCursor(x, y, false);
        }
        //console.log("Cursor position: " + x + ", " + y);
    }

    function moveUp() {
        moveCursor(0, -1);
    }

    function moveDown() {
        moveCursor(0, 1);
    }

    function moveLeft() {
        moveCursor(-1, 0);
    }

    function moveRight() {
        moveCursor(1, 0);
    }

    function exitGame()
    {
        //console.log("----entered pause Function!----")
        pauseGame();
        var confirmed = window.confirm("Do you want to return to the main menu?");
        if(confirmed)
        {
            jewel.showScreen("main-menu");
        }else
        {
            resumeGame();
        }
    }

    function pauseGame()
    {
        if(paused)
        {
            resumeGame();
            return;//do nothing if already paused
        }
        console.log("----entered pause Function!----")
        var dom = jewel.dom,
       overlay = dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "block";
        paused = true;
    }

    function resumeGame()
    {
        var dom = jewel.dom,
       overlay = dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "none";
        paused = false;
    }

    return {
        run: run
    };

})();