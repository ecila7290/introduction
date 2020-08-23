let idInput=document.getElementById("id");
let pwInput=document.getElementById("pwd");
let pwReInput=document.getElementById("pwdRe");


idInput.addEventListener("keyup", function(event){
    const regId=/^[a-zA-Z0-9]{6,12}$/;
    let userId=idInput.value;
    if (event.keyCode===13){
        if (regId.test(userId)){
            document.getElementById("noIdMsg").style.display="none"
            document.getElementById("okIdMsg").style.display="block"
            document.getElementById("okIdMsg").setAttribute("aria-live", "assertive")
        } else{
            document.getElementById("okIdMsg").style.display="none"
            document.getElementById("noIdMsg").style.display="block"
            document.getElementById("noIdMsg").setAttribute("aria-live", "assertive")
        }
    }   
})

pwInput.addEventListener("keyup", function(event){
    const regPw=/(?=.*\d{1,20})(?=.*[`~!@#$%^&*()-_+=]{1,20})(=?.*[a-zA-Z]{2,20}).{4,50}$/;
    let userPw=pwInput.value;
    if (event.keyCode===13){
        if (regPw.test(userPw)){
            document.getElementById("noPwMsg").style.display="none"
            document.getElementById("okPwMsg").style.display="block"
            document.getElementById("okPwMsg").setAttribute("aria-live", "assertive")
        } else{
            document.getElementById("okPwMsg").style.display="none"
            document.getElementById("noPwMsg").style.display="block"
            document.getElementById("noPwMsg").setAttribute("aria-live", "assertive")
        }
    }   
})

pwReInput.addEventListener("keyup", function(event){
    
    let userPwRe=pwReInput.value;
    if (event.keyCode===13){
        if (userPwRe==userPw){
            document.getElementById("noPwReMsg").style.display="none"
            document.getElementById("okPwReMsg").style.display="block"
            document.getElementById("okPwReMsg").setAttribute("aria-live", "assertive")
        } else{
            document.getElementById("okPwReMsg").style.display="none"
            document.getElementById("noPwReMsg").style.display="block"
            document.getElementById("noPwReMsg").setAttribute("aria-live", "assertive")
        }
    }   
})
