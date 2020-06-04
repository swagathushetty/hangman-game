const wordEl=document.getElementById('word')
const wrongLettersEl=document.getElementById('wrong-letters')
const playAgainButton=document.getElementById('play-button')
const popup=document.getElementById('popup-container')
const notification=document.getElementById('notification-container')
const finalMessage=document.getElementById('final-message')
const figureParts=document.querySelectorAll('.figure-part')

const words=['lagaan','don','titanic','avatar']


//select random value from array
let selectedWord=words[Math.floor(Math.random()*words.length)]

const correctLetters=[]
const wrongLetters=[]

//show the hidden word

//after we select the random word break it into array aka ind alhpabets
//check if the alphabet is present in the corectLetters array
//if yes display the aplhabet otherwise display empty string
function displayWord(){
    console.log('entered')
    console.log(wordEl.innerHTML)
    wordEl.innerHTML=`
      ${selectedWord
        .split('')
        .map(letter=>{
            return `
              <span class='letter'>
              ${correctLetters.includes(letter)?letter:''}
              </span>
            `
        }
        ).join('')
    }
    `
    //replace new line characters with empty string
    //wordEl has a format of example
    //w
    //i
    //z
    //a
    //we want it to be wiza
    const innerWord=wordEl.innerText.replace(/\n/g,'')

    if(innerWord===selectedWord){
        finalMessage.innerText='Congratutaltions 🤟'

        //popup has initally display:none
        popup.style.display='flex'
    }
}

//update wrong letters
function updateWrongLettersEl(){

    //display wrong letters
    wrongLettersEl.innerHTML=`
      ${wrongLetters.length>0 ? '<p>wrong</p>':'' }
      ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;
    
    //loop through svg
    figureParts.forEach((part,index)=>{
        const errors=wrongLetters.length;

        if(index<errors){
            part.style.display='block'
        }else{
            part.style.display='none'
        }
    })

    //check if lost
    if(wrongLetters.length===figureParts.length){
        finalMessage.innerText ='Sorry you lost 😓'
        popup.style.display='flex'
    }
    
}

//show notification
function showNotification(){
    notification.classList.add('show')

    setTimeout(()=>{
        notification.classList.remove('show')
    },2000)
}

//key letter press
window.addEventListener('keydown',e=>{
    // console.log(e.keyCode)
    // console.log(e.key)

    //only run for letter keys
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter=e.key

        if(selectedWord.includes(letter)){
            
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter)
                    displayWord()
                }else{
                    showNotification()
                }
        }else{
                if(!wrongLetters.includes(letter)){
                    wrongLetters.push(letter)
                    updateWrongLettersEl()
                }else{
                    showNotification()
                }
        }
    }
})




//restart the game
playAgainButton.addEventListener('click',()=>{
    //empty the correct and wrong arrays
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord=words[Math.floor(Math.random()*words.length)]
    displayWord()

    updateWrongLettersEl()

    popup.style.display='none'
})

displayWord()