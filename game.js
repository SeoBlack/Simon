const buttonColors     = ["red","blue","green","yellow"];
let userClickedPattern = [];
let gamePattern        = [];
let gameStarted        = false;
let level              = 0;
function nextSequence(){
    let randomNum   = Math.floor(Math.random() * 4); 
    let randomColor = buttonColors[randomNum];
    playSound(randomColor)
    gamePattern.push(randomColor);
    level++;
    updateLevel();
    $(`.${randomColor}`).fadeOut(100).fadeIn(100);
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColor){
    $("." + currentColor).addClass("pressed")
    setTimeout(()=>{
        $("." + currentColor).removeClass("pressed");
    },100);

}
function updateLevel(){
    $("#level-title").text("Level " + level);
}
function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern =[];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();

    }
}
$(".btn").click(function (e){
    if(!gameStarted) return;
    let userChosenColor = e.target.getAttribute("id");
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1 );
    
});
$(document).keypress(()=>{
    if(gameStarted === false){
        nextSequence();
        gameStarted = true;
    }
   
})
