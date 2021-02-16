


var characters = [];
var savedChars = [];

var searchBarDOM = document.querySelector(".searchBarDiv");


function toggleSearchBar(){
        if(searchBarDOM.innerHTML !== ""){
            searchBarDOM.innerHTML = "";
            return;
        }
        let searchHtml="<div class='searchBox'><label for='searchname'>Search</label><input type='text' name='searchname' id='searchname' placeholder='searchname...'></div>";

        searchBarDOM.innerHTML = searchHtml;

}



function searchPokemon(){

fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
.then(res=>res.json())
.then(res=>{
    console.log(res)
    characters = res.results;
    let batch = characters.slice(0,7)
    printList(batch)
    let pages=createPages(characters)
    printPages(pages)

})


}


function printList(list){
    let html="<div class='searchDiv'>"

    list.forEach((c,idx)=>(
        html += `<li class='pokeItem'>${idx+1})${c.name}</li>`
    ))

    html += '</div>'
    document.querySelector(".messageBox").innerHTML = html;

    document.querySelectorAll(".pokeItem").forEach((item,idx)=>{
                    item.onclick=(e)=>{
                        console.log("pokeName clicked")
                        addName(e)
                    }
    })

}


function addName(e){
    console.log(e.target.textContent.split(")")[1])
    savedChars.push(e.target.textContent.split(")")[1])
    alerts[1].style.opacity=1;
    console.log(alerts)

    toggleModal(e.target.textContent.split(")")[1])
}


function toggleModal(name){
   
    phoneScreen.innerHTML=`<div class='infoDiv'>
    <p>Request from ${name}
    </div>`

    setTimeout(()=>{
    phoneScreen.innerHTML=""
    },1500);

}


function createPages(data){
        let pages=[];
    for(let i=0;i<data.length/7;i++){
        pages.push(i)
    }
    return pages
}


function printPages(pages){
    let pagesList=document.createElement("ul")
    pagesList.className='pages'
    let pagesHtml="Pages:"

    pages.forEach(p=>{
        pagesHtml += `<li class='pageItem'><a href=# data-page=${p}>${p}</a></li>`
    })
    pagesList.innerHTML = pagesHtml


    document.querySelector(".searchDiv").appendChild(pagesList)

    document.querySelectorAll(".pageItem").forEach(p=>{
        p.onclick=(e)=>changePage(e)
    })

}


function changePage(e){
    let page = e.target.textContent;

    let lastIndex=page * 7;
    let firstIndex=lastIndex-7;
    let batch = characters.slice(firstIndex,lastIndex);

    printList(batch)
    let pages=createPages(characters)
    printPages(pages)

}



function searchFor(e){
    var name = e.targer.value;
    console.log(name)
}




