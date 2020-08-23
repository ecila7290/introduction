const num = Math.floor(Math.random()*10+1);
let guess=1;

document.getElementById("submitGuess").onclick =function(){
    
    let userGuess = document.getElementById("guessField").value;
    
    if (userGuess == num){
        alert(`Correct! You got the answer in ${guess} guess.`);
        location.reload();
        
    }

    else if(userGuess > num){
        
        guess+=1;
        alert("Wrong! Let's try smaller numbers.");
    }

    else{
        guess+=1;
        alert("Wrong! Let's try bigger numbers.");
    }

    
}