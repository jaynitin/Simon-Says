let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let subHeading = document.querySelector(".subHeading");
let bg = document.querySelector(".container");

let highScore = 0;

document.addEventListener("keypress",()=>{
    if(!started){
        started = true;
        console.log("The Game has begun");
        bg.classList.remove("red");
        levelUp();
    }
})

function levelUp(){
    level++;

    if(highScore < level-1){
        highScore = level-1;
    }
    subHeading.innerText = `Level ${level}, Highest Score : ${highScore}`;

    init();
}

function init(){
    console.clear();
    let panels = ["blue","purple","pink","coffee"];
    userSeq = [];
    let randColor = panels[Math.floor(Math.random()*4)];
    let randPanel = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    panelFlash(randPanel);
}

function panelFlash(panel){
    panel.classList.add("flash");

    setTimeout(() => {
        panel.classList.remove("flash");
    }, 250);
}

let panels = document.querySelectorAll(".panel");

for(panel of panels){
    panel.addEventListener("click",panelPressed);
}

function panelPressed(){
    let pressedPanel = this;
    panelFlash(pressedPanel);
    userSeq.push(this.getAttribute("id"));
    console.log(userSeq);
    checkAns(userSeq.length-1);
}

function checkAns(ind){
    console.log(level);

    if(gameSeq[ind] === userSeq[ind]){
        if(userSeq.length == gameSeq.length){
            setTimeout(() => {
                levelUp();
            },1000 );
        }
    }else{
        console.log("Failed");
        subHeading.innerHTML = `GAME OVER!!! Your Score : <b>${level-1}</b> PRESS ANY KEY TO PLAY AGAIN.`;
        started = false;
        level = 0;
        gameSeq = [];
        userSeq = [];
        bg.classList.add("red")
    }
}