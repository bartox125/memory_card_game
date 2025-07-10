const menu=document.getElementById("menu")
const board=document.getElementById("board")
const background=document.querySelector(".background")
const footer=document.querySelector("footer")
const container=document.getElementById("container")
const windowMenu=document.getElementById("window")
let cards=[]
let guessed=[]
let current_id=[]
let current_pictures=[]
let interval=null

document.getElementById("back").addEventListener("click", ()=>{
    reset()
})

const start=(time)=>{
    menu.style.display="none"
    board.style.display="grid"
    background.style.height="calc(100vh - 50px)"
    footer.style.display="block"
    container.style.display="block"
    shuffle()
    for(let i=0;i<cards.length;i++){
        let card=document.createElement("img")
        card.classList.add("card")
        card.src="src/0.jpg"
        card.id=i
        card.onclick=()=>turn(card,cards[i],i)
        board.appendChild(card)
    }
    timer(time)
}

const random=()=>{
    let number=Math.floor(Math.random()*10)
    if (number>0 && number<=8){
        return number
    }
    else
        return random()
}

const is_more_than_one=(element,array)=>{
    let count=0
    for (let i = 0; i < array.length; i++) {
        if (array[i]==element){
            count++
        }
    }
    return count
}

const shuffle=()=>{
    while (cards.length<16){
        let number=random()
        if(is_more_than_one(number,cards)<2){
            cards.push(number)
        }
    } 
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function turn(object,card_id,i){
    if(current_id.length<2 && current_id[0]!=i && guessed.indexOf(card_id)==-1){
        object.src="src/"+card_id+".jpg"
        current_id.push(i)
        current_pictures.push(card_id)
    }

    if(current_id.length==2){
        if(current_pictures[0]==current_pictures[1]){
            guessed.push(card_id)
        }
        else{
            await delay(500)
            document.getElementById(current_id[0]).src='src/0.jpg'
            document.getElementById(current_id[1]).src='src/0.jpg'
        }
        current_id=[]
        current_pictures=[]    
    }

    if(guessed.length==8){
        await delay(500)
        end_of_the_game(true)
    }
}

const end_of_the_game=(status)=>{   
    if(status==true){
        alert("Gratulacje! Wygrałeś")
    }
    else{
        alert("Przegrałeś")
    }
}

function timer(seconds){    
    const bar=document.getElementById("bar")
    let elapsed=0
    
    interval = setInterval(() => {
        elapsed++
        let percent = 100 - (elapsed/seconds)*100
        bar.style.width=percent+"%"
        
        if (elapsed >= seconds) {
            end_of_the_game(false);
            clearInterval(interval);
    }
    }, 1000);
}

const reset=()=>{
    clearInterval(interval)
    menu.style.display="flex"
    board.style.display="none"
    background.style.height="100vh"
    footer.style.display="none"
    container.style.display="none"
    cards=[]
    guessed=[]
    current_id=[]
    current_pictures=[]
    board.innerHTML=''
    document.getElementById("bar").style.width=100%
}
