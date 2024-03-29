const rainDropSpeed = 50; 
const rainDropLength = 25;
const spawnDelay = 150; 
const glitchChance = 75; // 1 in x chance
const maxRainDrops = 1;
const totalDropTime = rainDropSpeed * rainDropLength;

let rainDrops = $("[data-drop]");
let body = $("body");
let delayInMilliseconds = rainDropSpeed;

getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

createRainDrop = () => {
  let rainDrop = $("<div class='matrix-raindrop'><ol></ol></div>");
  rainDrop.css({
    marginLeft: -50, marginTop: -300,
    top: (Math.random() * window.innerHeight), left: (Math.random() * window.innerWidth)
  }); // randomizing the drops absolute position
  body.append(rainDrop);
  fallingLogic(rainDrop);
}

rainDropTimer = (delay) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, delay);
  })
}

glitchLogic = (rainDropRef) => {
  rainDropRef.find("li").each(function (index) {
    if (getRandomInt(1, glitchChance) === 1) { // chance to 'glitch'
      $(this).text(new RandExp(/[a-zA-Z0-9$+\-\*%"'#&(),.;:?!\|{}<>\[\]^~]/g).gen());
    }
  });
}

fallingLogic = async (rainDropRef) => {
  let tempL = getRandomInt(rainDropLength, rainDropLength * 2);
  let tempS = getRandomInt(rainDropSpeed, rainDropSpeed * 2);
  let tempT = tempL * tempS;
  for (let i = 0; i < tempL; i++) {
    if (i >= 1) {
      glitchLogic(rainDropRef);
    }
    let randomChar = new RandExp(/[a-zA-Z0-9$+\-\*%"'#&(),.;:?!\|{}<>\[\]^~]/g).gen();
    let fontSize = (((3/100) * window.innerHeight) + ((3/200) * window.innerWidth)) / 2; // scales the font size based on the current window size and height
    let character = $("<li style='font-size:" + fontSize + "px;'></li>").text(randomChar);
    rainDropRef.children().append(character); // the .children makes sure it is adding the list item to the list and not just the div
    await rainDropTimer(tempS);
  }
  await rainDropTimer(tempT);
  rainDropRef.remove();
}

createCodeRain = async () => { // main spawning loop
  for (let i = 0; i < maxRainDrops; i++) {
    createRainDrop();
    await rainDropTimer(spawnDelay);
  }
  createCodeRain(); // restart the loop
}


createCodeRain(); // initialize the matrix

