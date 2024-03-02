const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector(".password-length");
const passwordDisplay=document.querySelector("[password-display]");
const copyBtn=document.querySelector(".copybtn");
const copyMsg=document.querySelector(".copyMsg");
const uppercaseCheck=document.querySelector(".uppercase");
const lowercaseCheck=document.querySelector(".lowercase");
const numbersCheck=document.querySelector(".numbers");
const symbolsCheck=document.querySelector(".symbols");
const indicator=document.querySelector(".led-light");
const generateBtn=document.querySelector(".password-generate-btn");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// initial config
let password ="";
let passwordLength=10;
let checkCount=1;
handleSlider();
// set strength circle color to gray

// copyContent()
// handleSlider()
// generatePassword()
// setIndicator()
// getRandomUppercase()
// getRandomLowercase()
// getRandomNumber()
// getRandomSymbol()
// calStrength()

// set passwordLength
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerHTML=passwordLength;

    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=( (passwordLength-min)*100/(max-min))+ "% 100%";
    console.log(min);
    console.log(max);
    console.log(inputSlider.style.backgroundSize);
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow="0px 0px 10px "+color;
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min; 
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
    let a =getRandomInteger(0,symbols.length);
    return symbols.charAt(a);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}


async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        // copyMsg.innerText = "copied";
        
    }
    catch(e) {
        // copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    // copyMsg.classList.add("active");

    // setTimeout( () => {
    //     copyMsg.classList.remove("active");
    // },2000);
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    // special condition
    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener("change",handleCheckBoxChange);
})

inputSlider.addEventListener("input",(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})


copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})


function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected
    if(checkCount<=0) {
        password="";
        passwordDisplay.value=password;
        calcStrength();
    }

    if(passwordLength< checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    // let's start the journey to find new password

    // remove old password
    password="";


    // if(uppercaseCheck.checked){
    //     password+=generateUppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr=[];

    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    // Compulsary addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    // remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex= getRandomInteger(0,funcArr.length-1);
        password+=funcArr[randIndex]();
    }

    // shuffle the password
    password= shufflePassword(Array.from(password));

    // show in UI
    passwordDisplay.value=password;
    calcStrength();
})



