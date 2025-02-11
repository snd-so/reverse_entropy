// Optimized version with performance improvements and better responsiveness
let shapie;
let song, song1, song2, song3, song4, song5;
let env, env1, env2, env3, env4;
let chooser = 1;
let cnv;

// Cache DOM queries and window checks
const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const scaleFactor = isIOSDevice ? 2 : 1;

function preload() {
  // Load sounds in parallel
  const sounds = [
    "sounds/rec.mp3",
    "sounds/BEAPS.mp3",
    "sounds/CAN2.mp3",
    "sounds/noise2.mp3",
    "sounds/cheby.mp3",
    "sounds/bees.mp3"
  ];
  
  [song, song1, song2, song3, song4, song5] = sounds.map(s => loadSound(s));
}

function setupEnvelopes() {
  // Create envelopes with optimized parameters
  const envSettings = [
    { adsr: [2.0, 5.0, 0.7, 10], range: [0.5, 0] },
    { adsr: [0.5, 1.0, 0.9, 7], range: [0.3, 0] },
    { adsr: [0.01, 0.3, 0.8, 2.9], range: [0.95, 0] },
    { adsr: [3.0, 7.0, 0.3, 8], range: [0.7, 0] },
    { adsr: [0.5, 4.0, 0.9, 15], range: [0.8, 0] }
  ];

  return envSettings.map(settings => {
    const env = new p5.Env();
    env.setADSR(...settings.adsr);
    env.setRange(...settings.range);
    return env;
  });
}

function setup() {
  pixelDensity(scaleFactor);
  
  [env, env1, env2, env3, env4] = setupEnvelopes();
  
  [song, song1, song2, song3, song4, song5].forEach((s, i) => {
    s.amp(i < 2 ? env : [env1, env2, env3, env4][i-2]);
  });

  const canvasSize = calculateCanvasSize();
  cnv = createCanvas(canvasSize, canvasSize);
  centerCanvas();
  
  userStartAudio();
  getAudioContext().resume();
  
  shapie = new Shapie(TRIANGLE_STRIP);
}

function calculateCanvasSize() {
  const smallerDimension = min(windowWidth, windowHeight);
  return smallerDimension * 0.9 * scaleFactor;
}

function centerCanvas() {
  const x = (windowWidth - width / scaleFactor) / 2;
  const y = (windowHeight - height / scaleFactor) / 2;
  cnv.position(x, y);
}

function draw() {
  if (!frameCount || frameCount % 2 !== 0) return;
  
  background(255);
  shapie.update();
  shapie.display();
}

function Shapie(kind) {
  // Initialize properties
  this.shapee = kind;
  this.take = false;
  this.mx = width / 2;
  this.my = height / 2;
  this.listpoints = [];
  this.listpoints2 = [];
  this.spots = [];

  // Define all methods first
  this.initializePoints = function() {
    const w = width;
    const h = height;
    this.listpoints = Array.from({length: 10}, () => random(w * 0.25, w * 0.75));
    this.listpoints2 = Array.from({length: 10}, () => random(h * 0.25, h * 0.75));
    this.spots = Array.from({length: 3}, () => floor(random(10)));
  };

  this.update = function() {
    for (let i = 0; i < 3; i++) {
      if (dist(mouseX, mouseY, this.listpoints[this.spots[i]], this.listpoints2[this.spots[i]]) < 30 * scaleFactor) {
        this.handleInteraction(i);
        break;
      }
    }
  };

  this.checkTouch = function(x, y) {
    const touchSpot = this.listpoints[this.spots[0]];
    const touchSpot2 = this.listpoints2[this.spots[0]];
    
    if (dist(x, y, touchSpot, touchSpot2) < 20 * scaleFactor) {
      this.handleInteraction(0);
    }
  };

  this.handleInteraction = function(spotIndex) {
    this.take = true;
    this.shuffle();
    if (spotIndex === 1) {
      this.playlist1();
    } else {
      this.playlist();
    }
    if (!this.updateTimeout) {
      this.updateTimeout = setTimeout(() => {
        this.coords();
        this.updateTimeout = null;
      }, 100);
    }
  };

  this.display = function() {
    this.drawPoints();
    this.drawShape();
  };

  this.drawPoints = function() {
    const colors = [[0, 77, 111], [255, 111, 0], [255, 55, 0]];
    
    colors.forEach((color, i) => {
      stroke(...color);
      strokeWeight(1.5 * scaleFactor);
      ellipse(
        this.listpoints[this.spots[i]] * scaleFactor,
        this.listpoints2[this.spots[i]] * scaleFactor,
        14 * scaleFactor
      );
    });
  };

  this.drawShape = function() {
    stroke(111);
    strokeWeight(scaleFactor);
    fill(255);
    beginShape(this.shapee);
    for (let i = 0; i < 10; i++) {
      vertex(
        this.listpoints[i] * scaleFactor,
        this.listpoints2[i] * scaleFactor
      );
    }
    endShape();
  };

  this.shuffle = function() {
    const w = width;
    const h = height;
    for (let i = 0; i < 10; i++) {
      if (random(15) < 7) {
        this.listpoints[i] = random(w * 0.25, w * 0.75);
      } else {
        this.listpoints2[i] = random(h * 0.25, h * 0.75);
      }
    }
  };

  this.playlist = function() {
    const chooser = floor(random(3));
    const songs = [song, song4, song3];
    const envs = [env, env, env3];
    songs[chooser].play();
    envs[chooser].play();
  };

  this.playlist1 = function() {
    const chooser2 = floor(random(3));
    const songs = [song2, song5, song4];
    const envs = [env1, env4, env2];
    songs[chooser2].play();
    envs[chooser2].play();
  };

  this.coords = function() {
    if (chooser === 4) {
      chooser = 1;
    } else {
      chooser++;
    }

    const linkData = {
      1: { url: "https://elevatorbath.bandcamp.com", offset: 0 },
      2: { url: "https://www.instagram.com/snonll/", offset: -10 },
      3: { url: "https://sssoneill.github.io/wohnklo/", offset: -20 },
      4: { url: "https://twitter.com/SeaanONeill", offset: -30 }
    }[chooser];

    // Create the Coordinates object
    return new Coordinates(
      125 + this.my + (windowWidth - width) / 2,
      this.my + (windowHeight - height) / 2 + linkData.offset,
      "",
      linkData.url
    );
  };

  // Initialize points after all methods are defined
  this.initializePoints();
}

function windowResized() {
  const canvasSize = calculateCanvasSize();
  resizeCanvas(canvasSize, canvasSize);
  centerCanvas();
  if (shapie) {
    shapie.initializePoints();
  }
}

function touchStarted() {
if (shapie && touches.length > 0) {
    // Get the first touch point
    const touch = touches[0];
    // Pass the touch coordinates to checkTouch
    shapie.checkTouch(touch.x, touch.y);
  }
  return false; // Prevent default behavior
}

// Add touchMoved to handle continuous touch interaction
function touchMoved() {
  if (shapie && touches.length > 0) {
    const touch = touches[0];
    shapie.checkTouch(touch.x, touch.y);
  }
  return false; // Prevent default behavior like scrolling
}

// Optional: handle multiple touch points if needed
function handleMultiTouch() {
  if (shapie) {
    for (let touch of touches) {
      shapie.checkTouch(touch.x, touch.y);
    }
  }

}

// Debounced window resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(windowResized, 250);
});

function Coordinates(x, y, diftc, link) {
  this.x = x;
  this.y = y;
  this.diftc = diftc;
  this.link = link;
  this.txtt = createA(this.link, this.diftc);
  this.lifespan2 = 1;

  this.txtt.class("fuck");
  this.txtt.position(this.x, this.y);
  
  this.display = function() {
    this.txtt.style("opacity", this.lifespan2);
  };

  this.update = function() {
    this.txtt.style("opacity", this.lifespan2);
    this.lifespan2 -= 0.007;
    if (this.lifespan2 <= 0) {
      this.txtt.remove();
    }
  };
}
