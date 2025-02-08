// differentf layout with the coords in columns.
// and links

// 250207 -- issues with jump in the playlist() function

var shapie;
var coords = [];
let c;
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
  
  let scaleFactor = isIOS() ? 2 : 1;  // Increase scale factor for iOS
  pixelDensity(isIOS() ? 2 : 1); // Boost pixel density on iOS
  
  
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

  createCanvas(600 * scaleFactor, 600 * scaleFactor);
  cnv = createCanvas(600 * scaleFactor, 600 * scaleFactor);
  centerCanvas();
  background(255);

   // Unlock audio context on user interaction
  userStartAudio();
  getAudioContext().resume(); // Make sure audio context is running

  shapie = new Shapie(TRIANGLE_STRIP, 145 * scaleFactor, 150 * scaleFactor);

}

// ------------------------------------------------------------------------------------

function draw() {

  // duration2 = song2.duration(); // tried this in setup didn't work, why?
  song.playMode('sustain'); // or sustain / restart
  song1.playMode('sustain'); // or sustain / restart
  song2.playMode('sustain'); // or sustain / restart
  song3.playMode('sustain'); // or sustain / restart
  song4.playMode('sustain'); // or sustain / restart
  song5.playMode('sustain'); // or sustain / restart

  background(255); // spent forever trying to figure out shapes not refreshing, didnt have background

  shapie.update();
  shapie.display();

//   for (var i = coords.length - 1; i >= 0; i--) {
//     coords[i].update();
//     coords[i].display();
//     if (coords[i].lifespan2 < 0) { //had changed the name of lifespan, watch that 
//       coords.splice(i, 1);

//     }
//   }
}

// ------------------------------------------------------------------------------------

function centerCanvas() {
let scaleFactor = isIOS() ? 2 : 1;  // Match the scaling factor from setup()
  let x = (windowWidth - (width / scaleFactor)) / 2;
  let y = (windowHeight - (height / scaleFactor)) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

// ------------------------------------------------------------------------------------

// Unlock audio on first touch/click
function touchStarted() {
  getAudioContext().resume();
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}


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
    if (choose < 7) {
      listpoints[i] = floor(random(300));
    }

    if (choose > 7) {
      listpoints2[i] = floor(random(300));
    }
  }

  // ------------------------------------------------------------------------------------

  this.display = function() {

    let scaleFactor = isIOS() ? 2 : 1;

 stroke(0, 77, 111);
  strokeWeight(1.5 * scaleFactor);
  ellipse((listpoints[spot] + this.mx) * scaleFactor, 
          (listpoints2[spot] + this.my) * scaleFactor, 
          14 * scaleFactor);

  stroke(255, 111, 0);
  strokeWeight(1.5 * scaleFactor);
  ellipse((listpoints[spot2] + this.mx) * scaleFactor, 
          (listpoints2[spot2] + this.my) * scaleFactor, 
          14 * scaleFactor);

  stroke(255, 55, 0);
  strokeWeight(1.5 * scaleFactor);
  ellipse((listpoints[spot3] + this.mx) * scaleFactor, 
          (listpoints2[spot3] + this.my) * scaleFactor, 
          14 * scaleFactor);


    
    stroke(111);
   strokeWeight(1 * scaleFactor);
    fill(255);
    beginShape(this.shapee);
for (let i = 0; i < 10; i++) {
  vertex((listpoints[i] + this.mx) * scaleFactor, (listpoints2[i] + this.my) * scaleFactor);
}
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
      this.playlist();
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
   // coords.push(c);
  //  print(chooser);
 }

  // ----------------------------------------------------------------------------

  this.shuffle = function() {


    for (var i = 0; i < 10; i++) {
      var choose = random(15);
      if (choose < 7) {
        listpoints[i] = floor(random(350));
      }

      if (choose > 7) {
        listpoints2[i] = floor(random(350));
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
     // song3.jump(jumper3, 22);
      song3.play();
      env3.play();
    }
    // song.jump(jumper, 7); // with the jump function, play function isn't needed

  }

  this.playlist1 = function() {

    duration1 = song1.duration(); // tried this in setup didn't work, why?
    var jumper1 = constrain(random(duration1), 0, (duration1) - 25);
    duration5 = song5.duration(); // tried this in setup didn't work, why?
    var jumper5 = constrain(random(duration5), 0, (duration5) - 29);

    var chooser2 = floor(random(3));
    if (chooser2 === 0) {

      //song1.jump(jumper1, 11); // with the jump function, play function isn't needed // doesnt need the length?
      song2.play();
      env1.play();
    }
    if (chooser2 === 1) {

      //song5.jump(jumper5, 22); // with the jump function, play function isn't needed
      song5.play();
      env4.play();
    }
     if (chooser === 2) {
     // song3.jump(jumper3, 22);
      song4.play();
      env2.play();
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
  
  function Coordinates(x, y, diftc, link) {
  
  this.x = x;
  this.y = y;
  this.diftc = diftc;
  this.link = link;
  this.txtt = createA(this.link, this.diftc); //
  this.lifespan2 = 1;

  this.display = function() {

    this.txtt.class("fuck"); // cool created a css .fuck // then added safari code in html
    this.txtt.style("opacity", this.lifespan); // can't figure out how to run fct in mouseover
    this.txtt.position(this.x, this.y);
    // this.lifespan += -0.1;

  }

  this.update = function() {
    this.txtt.style("opacity", this.lifespan2); // can't figure out how to run fct in mouseover
    this.lifespan2 = this.lifespan2 - 0.007; // -0.01 doesnt seem to leave the shadows 
    if(this.lifespan2 <= 0) {
      this.txtt.remove(); // this got rid of object that was transparent but still 'clickable'
    }
  }
}

// fade out wasnt working, just increased in opacity .. had txtt.createA('#', this.diftc);
// needed to add this.txtt.createA..-- in order for the fade (lifespan to work)


// make text instead of links
// whats going on with the shadow from the text
// make actual links for people to click on
//
}
