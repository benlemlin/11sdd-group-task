// Particles stuff
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


//drag and drop
//fromID and toID are strings without leading #
var swapFluidData = function(fromID, toID) {
    // console.log('swapping fluid data of ' + fromID + ' with ' + toID);
  
  //set data to variables
  let fromX = $('#' + fromID).attr('data-fluid-column');
  let fromY = $('#' + fromID).attr('data-fluid-row');
  let toX = $('#' + toID).attr('data-fluid-column');
  let toY = $('#' + toID).attr('data-fluid-row');
  
  //change element data
  $('#' + toID).attr('data-fluid-column', fromX);
    // console.log('set ' + toID + ' fluid-column to ' + fromX);
  $('#' + toID).attr('data-fluid-row', fromY);
    // console.log('set ' + toID + ' fluid-row to ' + fromY);
  $('#' + fromID).attr('data-fluid-column', toX);
    // console.log('set ' + fromID + ' fluid-column to ' + toX);
  $('#' + fromID).attr('data-fluid-row', toY);
    // console.log('set ' + fromID + ' fluid-row to ' + toY);
;}

/**
 * Randomize s element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-s
 */
var shuffles = function(s) {
  for (var i = s.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = s[i];
      s[i] = s[j];
      s[j] = temp;
  }
}

var scramble = function() {
  //ordered s of all tiles
  var fromIDs = ['a1', 'a2', 'a3', 'a4', 'a5',
                     'b1', 'b2', 'b3', 'b4', 'b5',
                    'c1', 'c2', 'c3', 'c4', 'c5',
                    'd1', 'd2', 'd3', 'd4', 'd5',
                    'e1', 'e2', 'e3', 'e4', 'e5'];
  //copy the ordered s
  var toIDs = ['a1', 'a2', 'a3', 'a4', 'a5',
                   'b1', 'b2', 'b3', 'b4', 'b5',
                   'c1', 'c2', 'c3', 'c4', 'c5',
                   'd1', 'd2', 'd3', 'd4', 'd5',
                   'e1', 'e2', 'e3', 'e4', 'e5'];
    // console.log(toIDs);
  //randomise the second s
  shuffles(toIDs);
    // console.log(toIDs);
  //set each tile in the first s to the tile in the second
  //i.e. randomise the order
  for (i = 0; i < fromIDs.length; i++) {
    swapFluidData(fromIDs[i], toIDs[i]);
  }
  // console.log('scrambled');
};

var reset = function() {
  var currentFluids = document.getElementsByClassName('picture-tile')
  for (i = 0; i < currentFluids.length; i++){
    let id = $(currentFluids[i]).prop('id');
    // console.log('id: ' + id)
    let column = id[0];
    let row = id[1];
    // console.log('column: ' + column + ', row: ' + row)
    $(currentFluids[i]).attr('data-fluid-column', column);
    $(currentFluids[i]).attr('data-fluid-row', row);
  }
}
//drag and drop functions/variables
//https://jsfiddle.net/Lg5QH/1/
//object to hold drag and drop functions for organisation
var tile = {
  allowDrop: function(e) {
    e.preventDefault();
  },
  drag: function(e) {
      // console.log('start drag on tile ' + e.target.id)
    e.originalEvent.dataTransfer.setData("text", e.target.id)
    //timeout function to let dragged tile be invisible 
    //while drag is taking place. Has to be on 1ms timout
    //or else the styling will be applied to the dragged 
    //element
    setTimeout(()=>{
     $('#' + e.target.id).css('visibility', 'hidden'); 
    }, 1)
  },
  drop: function(e) {
      // console.log('droped onto ' + e.target.id);
    var dragged = e.originalEvent.dataTransfer.getData("text");
    var dropped = e.target.id;
    // console.log("(dragged " + dragged + ", onto " + dropped + ")");

    $('#' + dragged).css('visibility', '');
    //THE MAGIC HAPPENS HERE
    swapFluidData(dragged, dropped)

    //check if done when dropped
    var state = checkDone();
    doneEvents(state);
  },
  dragEnd: function(e) {
    // var dragged = e.originalEvent.dataTransfer.getData("text");
    $('#' + e.target.id).css('visibility', '');
    e.originalEvent.dataTransfer.clearData();
  }
}

var toggleMargin = function() {
  if ( $('.picture-tile').hasClass('no-margin') ) {
    $('.picture-tile').removeClass('no-margin')
  } else {
    $('.picture-tile').addClass('no-margin')
  }
}

var toggleBlur = function (){
  $('.picture-tile').toggleClass('blur');
};

var checkDone = function() {
  var tiles = document.getElementsByClassName('picture-tile'),
      same = true;
  for (i = 0; i < tiles.length; i++) {
    var fluidColumn = $(tiles[i]).attr('data-fluid-column'),
        fluidRow = $(tiles[i]).attr('data-fluid-row'),
        trueColumn = $(tiles[i]).attr('data-true-column'),
        trueRow = $(tiles[i]).attr('data-true-row'),
        fluidData = fluidColumn + fluidRow,
        trueData = trueColumn + trueRow;
    if (fluidData != trueData) {
      same = false;
    }
  }
  return (same);
}

var doneEvents = function(state) {
  if (state) {
    //done
    // console.log("done");
    stopGame();
  }
}
var timer = {
  startTime: 0,
  currentTime: 0,
  endTime: 0,
  timeElapsed: 0,
  secondsElapsed: 0,
  start: function(){
      console.log('start timer');
    timer.startTime = Date.now();
    // $('#time').text(timer.secondsElapsed);
    countdown = setInterval( function() {
      timer.timeElapsed = Date.now() - timer.startTime;
      timer.secondsElapsed = Math.floor( timer.timeElapsed / 1000 );
      $('#time').text(timer.secondsElapsed);

      $('#time').text(Math.floor( (Date.now() - timer.startTime) / 1000 ));
        // console.log(timer.secondsElapsed + 's');
    }, 1000)
  },
  stop: function() {
    clearInterval(countdown);
    timer.endTime = Date.now();
      // console.log('stop timer');
    timer.timeElapsed = timer.endTime - timer.startTime;
    timer.secondsElapsed = Math.floor( timer.timeElapsed / 1000 );
    $('#time').text(timer.secondsElapsed);
      // console.log("Total: " + timer.secondsElapsed + "s");
  },
  reset: function() {
    timer.startTime = 0;
    timer.currentTime = 0;
    timer.endTime = 0;
    timer.timeElapsed = 0;
    timer.secondsElapsed = 0;
    $('#time').text(timer.secondsElapsed);
  }
}

var startButton = function() {
  $('.popup').fadeOut(600);
  setTimeout( function() {
    reset();
    scramble();
    timer.start();
  }, 500)
}

var calculateScore = function (endTime, variant) {
  var score;
  switch (variant) {
    case 0:
      score = Math.round( (1 / endTime) * 10000 );
      break;
    case 1:
      score = Math.round( (500 - endTime) / 5 )
  }
  return score;
}
var stopGame = function() {
  timer.stop();
  var score = calculateScore(timer.secondsElapsed, 1);
  // console.log(score);
  $('#seconds').text(timer.secondsElapsed);
  $('#score').text(score);
  $('#end').fadeIn();
}
// https://mobiarch.wordpress.com/2013/09/25/upload-image-by-copy-and-paste/
var imagePaste = function(e) {
  console.log(e);
  var clip = e.originalEvent.clipboardData.items;
  console.log(clip);
  for (var i = 0 ; i < e.originalEvent.clipboardData.items.length ; i++) {
    var item = e.originalEvent.clipboardData.items[i];
    console.log("Item type: " + item.type);
    if (item.type.indexOf("image") != -1) {
        setImage(item.getAsFile());
    } else {
        console.log("Discarding non-image paste data");
    }
  }
}
var setImage = function(image) {
  console.log(image);
  var imgPath = URL.createObjectURL(image);
  $('.picture-tile').css('background-image',  "url( '" + imgPath + "' )")
}
//Anything that changes the html/page here
$(document).ready(function() {
  console.log("Document ready ");
  //sets up particle background ([id of particles div], [json config]
  particlesJS('particles-js', particlesConfig);
  console.log('particles-js loaded')
  $(document).keypress(function(key) {
    switch (key.which) {
      case 115: //s
        scramble()
        break;
      case 114: //r
        reset()
        break;
      case 109: //m
        toggleMargin();
        break;
      case 98: //b
        toggleBlur();
        break;
      case 99: //c
        checkDone();
        break;
      case 116: //t
        timer.start();
        break;
      case 101: //e
        timer.stop();
        break;
    }
  });
  //add drag event handlers
  $('.popup button').on("click", function() {
    startButton();
  })

  $('.picture-tile').on("dragstart", tile.drag)
    .on("dragover", tile.allowDrop)
    .on("drop", tile.drop)
    .on("dragend", tile.dragEnd);
  $('#paste').on("paste", imagePaste)
});