var h1One = document.querySelector(".headerone");
var messageBox = document.querySelector(".messageBox");
var menuIcons = document.querySelectorAll(".menuicon")
var optionBtns = document.querySelectorAll(".optionBtn");
var h1OneText = h1One.textContent;

var isMessage=false;
var isPhone = false;
var isPhone = false;
var isFriend = false;
var isSearch = false;


console.log(h1OneText)


function showMessageBox(){
    messageBox.classList.toggle("showMessageBox")
}


/* header animations */

h1One.innerHTML = ""
let counter = h1OneText.length;

for(let i=0;i<h1OneText.length;i++){
        h1One.innerHTML += `<span class='letter'>${h1OneText[i]}</span>`
}

function animate(){
    let spans = document.querySelectorAll(".letter");
    // console.log(spans)

    for(let i=0;i<h1OneText.length;i++){
        setTimeout(()=>{
            spans[i].style.opacity=1
        },i * 500)
    }
}

animate()






optionBtns.forEach(btn=>{
    btn.onclick=(e)=>{
    console.log("dataTask: " + e.target.getAttribute('data-task'));
    let task = e.target.getAttribute('data-task')

    showMessageBox()


    switch(task){


        case "phonecall":
            isPhone=true;
            showPhoneModal()
        break;

        case "friends":
        break;

        case "comments":
            isMessage=true;
            sendMessage()
        break;

        case "clear":
            console.log('clearrrrrrr')
            messageBox.innerHTML = ""
            if(searchBarDOM.innerHTML !== ""){
                console.log("searchbarDOM fired!")
                searchBarDOM.innerHTML = ""
            }
        break;

        case "search":
            isSearch = !isSearch
            searchPokemon()
            toggleSearchBar()
        break;


        default:
            console.log("unknown task")
    }
}
})


function sendMessage(){
    if(messageBox.innerHTML !== ""){
        messageBox.innerHTML = ""
        return;
    }
    messageBox.innerHTML = ""
    var html=`<div class='messageCard'>
        <div class='messageDiv'></div>
        <div class='messageBtnRow'>
            <button onclick=enterMessage() class='sendBtn'>Send</button>
        </div>
                </div>`

                messageBox.innerHTML = html
}

let messageHtml=""



onkeydown=(e)=>{
    e.preventDefault()
 
  

        
    if(isMessage){
        if(e.key === "Enter"){
                enterMessage()
                return;
        }
        if(e.key === "Backspace" && !messageHtml.length){
            return;
        }
        if(e.key === "Shift")return;
        if(e.key === "Backspace" && messageHtml.length){
            messageHtml = messageHtml.split("");
            messageHtml.pop();
            messageHtml = messageHtml.join("")
            document.querySelector(".messageDiv").innerHTML = messageHtml

            return;
        }
    console.log('hello')
    messageHtml += e.key
    document.querySelector(".messageDiv").innerHTML = messageHtml
    }
    else{
        console.log("need to select a button")
    }
}


function enterMessage(){

    var message = document.querySelector(".messageDiv").textContent;
    console.log("message: " + message);
    messages.push(message)
    document.querySelector(".messageDiv").innerHTML = "";
    alerts[3].style.opacity=1;
    console.log(messages)
    messageHtml=""
}



menuIcons.forEach((icon,idx)=>{
    icon.onclick=(e)=>viewData(e)
})



function viewData(e){
    // console.log(e.target.parentElement.children[1]);
    let alertStatus = window.getComputedStyle(e.target.parentElement.children[1]).getPropertyValue("opacity");
    console.log(alertStatus)
   
    if(alertStatus == 0){
            console.log("You have no data for this yet! :(");
             return;
    }

    let dataTask = e.target.parentElement.children[0].getAttribute("data-task");
    console.log(dataTask)

    switch(dataTask){

        case "comment":
            console.log('commentFx()')
            showComments()
        break;

        case "user":
            console.log('userFx()')
            showFriendRequests()

        break;

        case "search":
            console.log('searchFx()')
        break;

        case "phone":
            console.log('phoneFx()')

        break;
    }
}




function showComments(){
    console.log("here are your comments");
    console.log(messages)
    for(let i=0;i<messages.length;i++){

        setTimeout(()=>{
        var mHtml = `<div class='messageTextDiv'>
        <h5>${messages[i]}</h5>
        </div>`

        phoneScreen.innerHTML = mHtml

        },i*1500)
    }

    alerts[3].style.opacity=0;

}




function showFriendRequests(){
    alerts[1].style.opacity=0;
    console.log(savedChars);
    let html="<div class='savedCharDiv'>"
    savedChars.forEach(c=>(
        html+=
        `<li class='savedCharItem'>${c}</li>`
    ))
    html += `</div>`
    phoneScreen.innerHTML = html


    setTimeout(()=>{

        document.querySelector(".savedCharDiv").classList.add("rollup")
        savedChars=[];
        phoneScreen.innerHTML=""
    },1500)


}

// navigator.mediaDevices.getUserMedia({video:true,audio:true})
// .then(stream=>{
//     console.log(stream)
// })



class Node{
    constructor(val){
        this.value=val;
        this.left=null;
        this.right=null;
    }

    add(node){
        if(this.value > node.value && this.left === null){
             this.left = node
        }
        else if(this.value > node.value && this.left !== null){

            this.left.add(node);
        }

        else if(this.value < node.value && this.right === null){
            this.right = node
        }
        else if(this.value < node.value && this.right !== null){

            this.right.add(node);
        }
    }

    visit(){
        if(this.left !== null){
            this.left.visit()
        }
        console.log(this.value);
        if(this.right !== null){
            this.right.visit()
        }
    }

    search(val){
        if(this.value === val){
            console.log("Here is your node:",this);
            console.log(this.value)
            return this.value
        }
        if(val > this.value && this.right !== null){
            return this.right.search(val)
           
        }
        if(val < this.value && this.left !== null){
           return this.left.search(val)
        }
        else{
            console.log("that node.value doesnt exist in this tree!")
        }
    }
}


class Tree{
    constructor(){
        this.root=null;
    }

    addNode(val){
        let node = new Node(val);
        if(this.root == null){
            this.root = node
        }
        else{
            this.root.add(node)
        }
    }

    traverse(){
        this.root.visit()
    }


    search(val){
        this.root.search(val)
    }
}


let tree = new Tree();



for(let i=0;i<25;i++){
    tree.addNode(Math.random() * 100 | 0)
}


//  tree.traverse()
 tree.search(20)