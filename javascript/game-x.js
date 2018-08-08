$(document).ready(function() {
    console.log("Document ready");
    gameSetup();

    $('#tile0-wrap').click(function(){toggle(0)})
    $('#tile1-wrap').click(function(){toggle(1)})
    $('#tile2-wrap').click(function(){toggle(2)})
    $('#tile3-wrap').click(function(){toggle(3)})
    $('#tile4-wrap').click(function(){toggle(4)})
    $('#tile5-wrap').click(function(){toggle(5)})
    $('#tile6-wrap').click(function(){toggle(6)})
    $('#tile7-wrap').click(function(){toggle(7)})
    $('#tile8-wrap').click(function(){toggle(8)})
    $('#tile9-wrap').click(function(){toggle(9)})
    $('#tile10-wrap').click(function(){toggle(10)})
    $('#tile11-wrap').click(function(){toggle(11)})
    $('#tile12-wrap').click(function(){toggle(12)})
    $('#tile13-wrap').click(function(){toggle(13)})
    $('#tile14-wrap').click(function(){toggle(14)})
    $('#tile15-wrap').click(function(){toggle(15)})
    $('#tile16-wrap').click(function(){toggle(16)})
    $('#tile17-wrap').click(function(){toggle(17)})
    $('#tile18-wrap').click(function(){toggle(18)})
    $('#tile19-wrap').click(function(){toggle(19)})
    $('#tile20-wrap').click(function(){toggle(20)})
    $('#tile21-wrap').click(function(){toggle(21)})
    $('#tile22-wrap').click(function(){toggle(22)})
    $('#tile23-wrap').click(function(){toggle(23)})
    $('#tile24-wrap').click(function(){toggle(24)})
    $('#tile25-wrap').click(function(){toggle(25)})
    $('#tile26-wrap').click(function(){toggle(26)})
    $('#tile27-wrap').click(function(){toggle(27)})
    $('#tile28-wrap').click(function(){toggle(28)})
    $('#tile29-wrap').click(function(){toggle(29)})
    $('#tile30-wrap').click(function(){toggle(30)})
    $('#tile31-wrap').click(function(){toggle(31)})
    $('#tile32-wrap').click(function(){toggle(32)})
    $('#tile33-wrap').click(function(){toggle(33)})
    $('#tile34-wrap').click(function(){toggle(34)})
    $('#tile35-wrap').click(function(){toggle(35)})
    $('#tile36-wrap').click(function(){toggle(36)})
});

var gameData = {
    newTile: true,
    firstTile: -1,
    firstPicture: -1,
    secondTile: -1,
    secondPicture: -1,
    pairs: {firstHalf: [], secondHalf: [], remaining: 18}
};

var gameSetup = function() {
    pairUp()
    for (var i = 0; i < 18; i++) {
        $('#tile' + gameData.pairs.firstHalf[i]).css('background-image','url(\"../media/' + i + '.png\")');
        $('#tile' + gameData.pairs.secondHalf[i]).css('background-image','url(\"../media/' + i + '.png\")');
    }
    hideAll();
    console.log(gameData)
}

var pairUp = function() {
    var picks = [];
    for (var i = 0; i < 36; i++) {
        picks[i] = i;
    }
    var newPick = 0;
    for (var i = 0; i < 18; i++) {
        newPick = Math.floor(Math.random() * picks.length);
        gameData.pairs.firstHalf[i] = picks[newPick];
        picks.splice(newPick,1);
        newPick = Math.floor(Math.random() * picks.length);
        gameData.pairs.secondHalf[i] = picks[newPick];
        picks.splice(newPick,1);
    }
}

var toggle = function(tile) {
    if (gameData.newTile) {
        $('#tile' + tile).show()
        gameData.newTile = false;
        gameData.firstTile = tile;
        gameData.firstPicture = findPictureFromTile(tile);
    }
    else {
        if (tile === gameData.firstTile) {
            return;
        }
        $('#tile' + tile).show()
        gameData.newTile = true;
        gameData.secondTile = tile;
        gameData.secondPicture = findPictureFromTile(tile);
        if (gameData.firstPicture === gameData.secondPicture) {
            gameData.pairs.remaining--;
            if (gameData.pairs.remaining === 0)
            {
                gameOver();
            }
                return;
        }
        $('#tile' + gameData.firstTile).fadeOut(1000);
        $('#tile' + gameData.secondTile).fadeOut(1000);
    }
}

var findPictureFromTile = function(tile) {
    for (var i = 0; i < 18; i++) {
        if (gameData.pairs.firstHalf[i] === tile || gameData.pairs.secondHalf[i] === tile) {
            return i;
        }
    }
}

var gameOver = function() {
    $('#game-container').append("<p>you win</p>");
    $('#game-container').hide();
    console.log('game over')
}



// Debug functions
//Toggles all tiles
var toggleAll = function() {
    for(var i = 0; i < 36; i++) {
        $('#tile' + i).toggle()
    }
}
//Shows all tiles
var showAll = function() {
    for(var i = 0; i < 36; i++) {
        $('#tile' + i).show()
    }
}
var hideAll = function() {
    for(var i = 0; i < 36; i++) {
        $('#tile' + i).hide()
    }
}