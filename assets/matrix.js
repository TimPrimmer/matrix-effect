const rainDropSpeed = 70;
const rainDropLength = 20;
const spawnDelay = 1;
const maxRainDrops = 100;

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

createRainDrop = () => {
  let rainDrop = $("<div class='matrix-raindrop' data-drop='" + totalRainDrops + "'><ol></ol></div>");
  rainDrop.css({
    marginLeft: -50, marginTop: -100,
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

fallingLoop = async (rainDropRef) => {
  for (let i = 0; i < rainDropLength; i++) {
    let randomChar = (Math.random() + 1).toString(36).substring(7)[0].toUpperCase();
    let character = $("<li></li>").text(randomChar);
    //character.css("color", "white");
    rainDropRef.children().append(character); // the .children makes sure it is adding the list item to the list and not just the div
    colorLogic(rainDropRef);
    await rainDropTimer(rainDropSpeed);
  }
  console.log("done");
  rainDropRef.remove();
}



colorLogic = (rainDropRef) => {

}



createCodeRain = async () => {
  for (let i = 0; i < maxRainDrops; i++) {
    createRainDrop();
    await rainDropTimer(spawnDelay);
  }
  console.log("finished loop");
  createCodeRain(); // restart the loop
}



createCodeRain(); // initialize the matrix

