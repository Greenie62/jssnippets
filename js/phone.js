var beep = new Audio("../assets/beep.wav");
var missed = new Audio("../assets/missed.wav");

var phoneBtnRow = document.querySelector(".phoneButtonRow")

function showPhoneModal(){
    if(messageBox.innerHTML !== ""){
        messageBox.innerHTML = ""
        return;
    }


    let phoneHtml = `<div class='phoneCard'>
    <div class='phoneDisplay'></div>
    <div class='numberGrid'></div>
    </div>`

    messageBox.innerHTML = phoneHtml;
    var keys =[9,8,7,6,5,4,3,2,1,"<",0,"clear","#","📞","🔊"];
    let html=""
    keys.forEach(k=>{
        html += `<div class='phonekey'>
                <h3>${k}</h3>
                </div>`
    })

    document.querySelector(".numberGrid").innerHTML = html;
    document.querySelector(".phoneDisplay").innerHTML = '123-456-7890';

    document.querySelectorAll(".phonekey").forEach(key=>{
        key.onclick=(e)=>dialNumber(e)
    })
}

let phoneHtml="123-456-7890"
let phoneDisplay

function dialNumber(e){
            phoneDisplay = document.querySelector(".phoneDisplay")
        let phoneKey = e.target.textContent;

    if(phoneKey === "🔊"){
        speakNumber()
        return;
    }

    if(phoneKey === "#"){
        phoneDisplay.innerHTML = 43110

        setTimeout(()=>{

            phoneDisplay.innerHTML = phoneHtml;
        },1500)
        return;
    }
    if(phoneKey === "clear"){
        phoneHtml = "";
        phoneDisplay.innerHTML = phoneHtml;
        return;
    }

    if(phoneKey === "📞" && phoneHtml.length !== 12){
        console.log("invalid phone number!");
        phoneDisplay.innerHTML = 'invalid number!'
        setTimeout(()=>{
            phoneDisplay.innerHTML = phoneHtml

        },1250)
        return;
    }
    else if(phoneKey === "📞" && phoneHtml.length === 12){
        phoneCall(phoneHtml)
        return;
    }

    if(phoneHtml.length === 12 && phoneKey !== "<")return;
    
    if(phoneKey === "<" && phoneHtml.length > 0){
        phoneHtml = phoneHtml.split("");
        phoneHtml.pop();
        phoneHtml = phoneHtml.join("")
        phoneDisplay.innerHTML = phoneHtml;
        return;
        
    }
    else if(phoneKey === "<" && !phoneHtml.length){
        return;
    }

    else{
        phoneHtml += e.target.textContent;

    }

    if(phoneHtml.length === 3 || phoneHtml.length === 7){
        phoneHtml += "-"
    }

    

    phoneDisplay.innerHTML = phoneHtml;
}


var phoneCounter = 0;
var missedCalls = 0;
var answerBtn, hangUpBtn;

function phoneCall(num){
    phoneBtnRow.innerHTML = `<button class='answerBtn'>Answer</button><button class="hangUpBtn">Hang Up</button>`
    phoneHtml = ""
    document.querySelector.innerHTML = ""
    console.log("Calling:" + num)
    answerBtn = document.querySelector(".answerBtn");
    hangUpBtn = document.querySelector(".hangUpBtn");


    hangUpBtn.onclick=()=>{
        phoneCounter = 4;
    }

    answerBtn.onclick=()=>{
        phoneCounter = 5;
        // answerCall()
    }


    phoneScreen.innerHTML = `<div class='callScreen'>
    <i class='fas fa-user'></i>
    <h5>${num}</h5>
    </div>`
    console.log("Counter: " + phoneCounter)

if(phoneCounter === 5){
    console.log('answered');
    answerCall()
    phoneCounter = 0;
    return;
}
   

if(phoneCounter < 4){
    beep.play()
    setTimeout(()=>{
        phoneScreen.innerHTML= ""
    },1500)
    phoneCounter++
    // phoneScreen.innerHTML = ""

    setTimeout(()=>{
        phoneCall(num)

    },2750)
}

else {
    missed.play()
    alerts[0].style.opacity=1;
    missedCalls++
    phoneScreen.innerHTML = `<div class='callScreen'>
        <h5>${missedCalls} missed calls</h5>
        </div>`
    phoneCounter = 0;
    phoneBtnRow.innerHTML = ""
}
}






var phoneAlertBtn = alerts[0];


console.log(phoneAlertBtn)


phoneAlertBtn.onclick=()=>{
    console.log("alert hit!")
}



function answerCall(){
    alerts[0].style.opacity=0;
    phoneBtnRow.innerHTML = ""
    phoneScreen.innerHTML = ""
}


function speakNumber(){

    console.log('speakNumber() fired!')

    let SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition = new SR();



    recognition.onspeechstart=()=>{
        console.log('recording stated!')
    }

    recognition.onspeechend=()=>{
        console.log('recognition stated!')
    }
    recognition.onresult=(e)=>{
        console.log(e.results[0][0].transcript)
        console.log('result fired!')
        let phoneNumber = e.results[0][0].transcript;
        phoneNumber = JSON.stringify(phoneNumber)
        phoneNumber = phoneNumber.split(" ");
        phoneNumber.shift()
        phoneNumber.pop()
        phoneNumber = phoneNumber.join("")
        console.log(phoneNumber)
        console.log(phoneNumber.length)

        if(isNaN(parseInt(phoneNumber))){
            console.log("bad number!!")
            phoneDisplay.innerHTML = "Bad number!"

            setTimeout(()=>{
                phoneDisplay.innerHTML = "";
            },1500)
            return;
        }

        else{
        console.log(phoneNumber)
        var phoneNumArr=[];
        for(let i=0;i<10;i++){
            if(!phoneNumber[i]){
                phoneNumArr.push(Math.random() * 9 | 0)
                
            }
            else{
            phoneNumArr.push(phoneNumber[i]);
            }
            
        }
        
        phoneNumArr.splice(2,0,"-")
        phoneNumArr.splice(5,0,"-")

        console.log(phoneNumArr)
    }
    }


    recognition.start()
}
