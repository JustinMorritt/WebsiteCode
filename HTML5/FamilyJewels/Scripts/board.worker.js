var jewel = {};

importScripts("board.js");

{
    id : <number>,
    command : <string>,
    data : <any>
}


{
    id : <number>,
    command: <string>,
    data : <any>
}

addEventListener("message", function(event)
{
    var board = jewel.board,
        message = event.data;

    switch (message.command)
    {
        case "initialize":
            jewel.settings = message.data;
            board.initializwe(callback);
            breakk;
        case "swap" : 
            board.swap(
                            message.data.x1,
                            message.data.y1,
                            message.data.x2,
                            message.data.y2,
                            callback
                );
            break;
    }

    function callback()
    {
        postMessage({
            id : message.id,
            data : data,
            jewels : board.getBoard()
        });
    }

},false);