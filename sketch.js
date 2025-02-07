// differentf layout with the coords in columns.
// and links


var shapie;
var coords = [];
var c;
var mx = 145;
var my = 150;
var take = 0;
var kind;
var cnv;
var song, song1, song2;
var diftc;
var listpoints, listpoints2;
var env, env1, env2;
var chooser = 1;
var adder;


// ------------------------------------------------------------------------------------

function preload() { // for sounds / images that need time before playing 

  song = loadSound('sounds/rec.mp3');
  song1 = loadSound('sounds/BEAPS.mp3');
  song2 = loadSound('sounds/CAN2.mp3');
  song3 = loadSound('sounds/noise2.mp3');
  song4 = loadSound('sounds/cheby.mp3');
  song5 = loadSound('sounds/bees.mp3');
}

// ------------------------------------------------------------------------------------

function setup() {
  
  // song = loadSound('sounds/rec.mp3');
  // song1 = loadSound('sounds/BEAPS.mp3');
  // song2 = loadSound('sounds/CAN2.mp3');
  // song3 = loadSound('sounds/noise2.mp3');
  // song4 = loadSound('sounds/cheby.mp3');
  // song5 = loadSound('sounds/bees.mp3');

  env = new p5.Env();
  env.setADSR(2.0, 5.0, 0.7, 10); //attacktime,decaytime,suspercent,releaseTime
  env.setRange(0.5, 0); //attaack level, release level

  env1 = new p5.Env();
  env1.setADSR(0.5, 1.0, 0.9, 7); //attacktime,decaytime,suspercent,releaseTime
  env1.setRange(0.3, 0); //attaack level, release level

  env2 = new p5.Env();
  env2.setADSR(0.01, 0.3, 0.8, 2.9); //attacktime,decaytime,suspercent,releaseTime
  env2.setRange(0.95, 0); //attaack level, release level

  env3 = new p5.Env();
  env3.setADSR(3.0, 7.0, 0.3, 8); //attacktime,decaytime,suspercent,releaseTime
  env3.setRange(0.7, 0); //attaack level, release level

  env4 = new p5.Env();
  env4.setADSR(0.5, 4.0, 0.9, 15); //attacktime,decaytime,suspercent,releaseTime
  env4.setRange(0.8, 0); //attaack level, release level

  song.amp(env);
  song1.amp(env1);
  song2.amp(env2);
  song3.amp(env3);
  song4.amp(env);
  song5.amp(env4);

  createCanvas(600, 600);
  cnv = createCanvas(600, 600);
  centerCanvas();
  background(255);


  shapie = new Shapie(TRIANGLE_FAN, 145, 150);

}

// ------------------------------------------------------------------------------------
function draw() {
  background(255); // Comment this out to see if shapes persist
  
  song.playMode('sustain');
  song1.playMode('sustain');
  song2.playMode('sustain');

  shapie.update();
  shapie.display();

  console.log(coords.length); // Debugging line to see how many shapes exist

  for (var i = coords.length - 1; i >= 0; i--) {
    coords[i].update();
    coords[i].display();
    if (coords[i].lifespan2 < 0) {
      coords.splice(i, 1);
    }
  }
}

// ------------------------------------------------------------------------------------

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

// ------------------------------------------------------------------------------------

var Shapie = function(kind, mx, my) {

  this.shapee = kind;
  this.mx = mx;
  this.my = my;
  this.take = false;


  var listpoints = [30, 40, 50, 60, 70, 22, 90, 100, 66, 77];
  var listpoints2 = [75, 20, 75, 20, 75, 20, 75, 20, 75, 20];
  var spot = floor(random(10));
  var spot2 = floor(random(10));
  var spot3 = floor(random(10));


  for (var i = 0; i < 10; i++) {
    var choose = random(15);
    if (choose < 5) {
      listpoints[i] = floor(random(300));
    }

    if (choose > 7) {
      listpoints2[i] = floor(random(300));
    }
  }

  // ------------------------------------------------------------------------------------

  this.display = function() {


    stroke(0, 77, 111);
    strokeWeight(1.5);
    ellipse(listpoints[spot] + this.mx, listpoints2[spot] + this.my, 6);


    stroke(255, 111, 0);
    strokeWeight(1.5);
    ellipse(listpoints[spot2] + this.mx, listpoints2[spot2] + this.my, 6);


    stroke(255, 55, 0);
    strokeWeight(1.5);
    ellipse(listpoints[spot3] + this.mx, listpoints2[spot3] + this.my, 6);

    stroke(111);
    strokeWeight(1);
    beginShape(this.shapee);
    vertex(listpoints[0] + this.mx, listpoints2[0] + this.my);
    vertex(listpoints[1] + this.mx, listpoints2[1] + this.my);
    vertex(listpoints[2] + this.mx, listpoints2[2] + this.my);
    vertex(listpoints[3] + this.mx, listpoints2[3] + this.my);
    vertex(listpoints[4] + this.mx, listpoints2[4] + this.my);
    vertex(listpoints[5] + this.mx, listpoints2[5] + this.my);
    vertex(listpoints[6] + this.mx, listpoints2[6] + this.my);
    vertex(listpoints[7] + this.mx, listpoints2[7] + this.my);
    vertex(listpoints[8] + this.mx, listpoints2[8] + this.my);
    vertex(listpoints[9] + this.mx, listpoints2[9] + this.my);
    endShape();

  }

  // ------------------------------------------------------------------------------------


  this.update = function() {


    if (dist(mouseX, mouseY, listpoints[spot] + this.mx, listpoints2[spot] + this.my) < 6) {
      this.take = true;
      this.shuffle();
      this.playlist();
      this.coords();
    }


    if (dist(mouseX, mouseY, listpoints[spot2] + this.mx, listpoints2[spot2] + this.my) < 6) {
      this.take = true;
      this.shuffle();
      this.playlist1();
      this.coords();
    }

    if (dist(mouseX, mouseY, listpoints[spot3] + this.mx, listpoints2[spot3] + this.my) < 6) {
      this.take = true;

      this.shuffle();
      this.playlist2();
      this.coords();
    }
  }

  // ------------------------------------------------------------------------------------

  this.coords = function() { // this funciton is inside of the Shapie function but maybe should have been outside
  
    // var adder = (random(-40, -10));
    // var chooser = floor(random(1, 4));
    if (chooser == 4) {
      chooser = 1;
    } else {
      chooser++;
    }

    if (chooser == 1) {
      diftc = '';
      link = 'https://elevatorbath.bandcamp.com';
      adder = 0;
    }
    if (chooser == 2) {
      diftc = '';
      link = 'https://www.instagram.com/snonll/';
      adder = -10;
    }
    if (chooser == 3) {
      diftc = '';
      link = 'https://sssoneill.github.io/wohnklo/';
      adder = -20;
    }
    if (chooser == 4) {
      diftc = '';
      link = 'https://twitter.com/SeaanONeill';
      adder = -30;
    }

    c = new Coordinates(125 + this.my + ((windowWidth - width) / 2), this.my + ((windowHeight - height) / 2) + adder, diftc, link);
    coords.push(c);
    print(chooser);
  }

  // ------------------------------------------------------------------------------------

  this.shuffle = function() {


    for (var i = 0; i < 10; i++) {
      var choose = random(15);
      if (choose < 7) {
        listpoints[i] = floor(random(300));
      }

      if (choose > 7) {
        listpoints2[i] = floor(random(300));
      }
    }
  }

  // ------------------------------------------------------------------------------------

  this.playlist = function() {

    duration = song.duration(); // tried this in setup didn't work, why?
    var jumper = constrain(random(duration), 0, (duration) - 10);
    duration3 = song3.duration(); // tried this in setup didn't work, why?
    var jumper3 = constrain(random(duration3), 0, (duration3) - 39);

    var chooser = floor(random(3));
    if (chooser === 0) {
      song.play();
      env.play();
    }
    if (chooser === 1) {
      song4.play();
      env.play();
    }
    if (chooser === 2) {
      song3.jump(jumper3, 22);
      env3.play();
    }
    // song.jump(jumper, 7); // with the jump function, play function isn't needed

  }

  this.playlist1 = function() {

    duration1 = song1.duration(); // tried this in setup didn't work, why?
    var jumper1 = constrain(random(duration1), 0, (duration1) - 25);
    duration5 = song5.duration(); // tried this in setup didn't work, why?
    var jumper5 = constrain(random(duration5), 0, (duration5) - 29);

    var chooser2 = floor(random(2));
    if (chooser2 === 0) {

      song1.jump(jumper1, 11); // with the jump function, play function isn't needed // doesnt need the length?
      // song2.play();
      env1.play();
    }
    if (chooser2 === 1) {

      song5.jump(jumper5, 22); // with the jump function, play function isn't needed
      // song5.play();
      env4.play();
    }
  }

  this.playlist2 = function() {

    duration2 = song2.duration(); // tried this in setup didn't work, why?
    var jumper2 = constrain(random(duration2), 0, (duration2) - 9); // removed the floor function to all

    if (song2.isPlaying()) { // .isPlaying() returns a boolean
      // song.setVolume(0.9, 0.2);
      // song2.stop();
    }
    song2.jump(jumper2, 4); // with the jump function, play function isn't needed
    // song2.play();
    env2.play();

  }
}

// make text instead of links
// whats going on with the shadow from the text
// make actual links for people to click on
//
