const rainDropSpeed = 100;
const rainDropLength = 20;

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
  body.append(rainDrop);
  totalRainDrops += 1;
  fallingLoop(rainDrop);
}


function rainDropTimer(delay) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, delay);
  })
}

const fallingLoop = async (rainDropRef) => {

  for (let i = 0; i < rainDropLength; i++) {
      console.log(i);
      let character = $("<li></li>").text("A");
      //character.css("color", "white");
      rainDropRef.children().append(character); // the .children makes sure it is adding the list item to the list and not just the div
      await rainDropTimer(rainDropSpeed);
  }
}



colorLogic = (rainDropRef) => {

}


createRainDrop();


