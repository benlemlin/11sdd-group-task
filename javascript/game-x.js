var particlesConfig = {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#aaa"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.7,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#bbb",
        "opacity": 0.7,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
}

$(document).ready(function() {
    console.log("Document ready");
    particlesJS('particles-js', particlesConfig);
    console.log('particles-js loaded')
    
    gameSetup();
    $('.tile').on('click', toggle);
    $('.pic').on('click',reload);
});

var gameData = {
    newTile: true,
    firstTile: -1,
    firstPicture: -1,
    secondTile: -1,
    secondPicture: -1,
    pairs: {firstHalf: [], secondHalf: [], remaining: 18},
    images: ['anchor','balance-scale','basketball-ball','bell','bicycle','bomb','chess-pawn','child','cocktail','dove','fish','gamepad','gem','helicopter','infinity','lightbulb','plane'],
    gameOver: false,
    reloadTiles: []
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

var toggle = function(e) {
    var tile = parseInt(e.target.id);
    if (gameData.gameOver) {
        $('.pic').css('background-image','url(\'../media/replay.png\')');
        $('#tile' + tile).show();
        return;
    }
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
            $('#tile' + gameData.firstTile).fadeOut(1100);
            $('#tile' + gameData.secondTile).fadeOut(1100);
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
    $('.tile').css('background-image','url(\'../media/success.png\')');
    gameData.gameOver = true;
    $('.pic').fadeOut(2000);
    console.log('game over')
}

var reload = function() {
  if (gameData.gameOver) {
    location.reload();
  }
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