const rainDropSpeed = 40;
const rainDropLength = 25;
const spawnDelay = 100;
const maxRainDrops = 1;
const totalDropTime = rainDropSpeed * rainDropLength;

let rainDrops = $("[data-drop]");
let body = $("body");
let delayInMilliseconds = rainDropSpeed;
let totalRainDrops = 0;

/*
<div class="matrix-raindrop" data-drop="0">
    <ol>
      <li>A</li>
    </ol>
</div>
*/

/*

let rainDrop = $("<div class='matrix-raindrop' data-drop='" + counter + "'><ol></ol></div>");
body.append(rainDrop);
*/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

createRainDrop = () => {
  let rainDrop = $("<div class='matrix-raindrop' data-drop='" + totalRainDrops + "'><ol></ol></div>");
  rainDrop.css({
    marginLeft: -50, marginTop: -300,
    top: (Math.random() * 1000), left: (Math.random() * 2000)
  });
  body.append(rainDrop);
  totalRainDrops += 1;
  fallingLoop(rainDrop);
}

rainDropTimer = (delay) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, delay);
  })
}

// fallingLoop = async (rainDropRef) => {
//   for (let i = 0; i < rainDropLength; i++) {
//     let randomChar = (Math.random() + 1).toString(36).substring(7)[0].toUpperCase();
//     let character = $("<li></li>").text(randomChar);
//     character.addClass( "test" );
//     rainDropRef.children().append(character); // the .children makes sure it is adding the list item to the list and not just the div
//     await rainDropTimer(rainDropSpeed);
//   }
//   await rainDropTimer(totalDropTime);
//   rainDropRef.remove();
// }

fallingLoop = async (rainDropRef) => {
  let tempL = 0;
  let tempS = 0;
  let tempT = 0;
  tempL = getRandomInt(rainDropLength, rainDropLength * 2);
  tempS = getRandomInt(rainDropSpeed, rainDropSpeed * 2);
  tempT = tempL * tempS;
  for (let i = 0; i < tempL; i++) {
    let randomChar = (Math.random() + 1).toString(36).substring(7)[0].toUpperCase();
    let character = $("<li></li>").text(randomChar);
    character.addClass( "test" );
    rainDropRef.children().append(character); // the .children makes sure it is adding the list item to the list and not just the div
    await rainDropTimer(tempS);
  }
  await rainDropTimer(tempT);
  rainDropRef.remove();
}


createCodeRain = async () => {
  for (let i = 0; i < maxRainDrops; i++) {
    createRainDrop();
    await rainDropTimer(spawnDelay);
  }
  createCodeRain(); // restart the loop
}



createCodeRain(); // initialize the matrix

