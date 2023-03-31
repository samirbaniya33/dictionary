let input = document.querySelector('#input');

let searchBtn = document.querySelector('#search');

let notFound = document.querySelector(".not__found");

let defBox = document.querySelector('.def');

let audioBox = document.querySelector('.audio');

let loading = document.querySelector('.loading');

searchBtn.addEventListener("click",function(e){
    e.preventDefault();

    //clear data 
    audioBox.innerHTML = ``;
    notFound.innerText = ``;
    // notFound.style.display = "none"; 
    //both the above methods work fine
    defBox.innerText = ``;



    //get input data 

    let word = input.value;
    // console.log(word);




    //call api data

    if(word===""){
        alert("word is required");
        return;
    }

    getData(word);

})

let apikey = "b06c06e3-48a0-469f-a82d-d625ed575ab8";

async function getData(word){

    loading.style.display = 'block';

    //ajax call 
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`);

    const data = await response.json();


    //if empty result 
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText = 'No result Found';
        return
    }
    // console.log(data);

    //if result is suggestions 
    if(typeof(data[0])==='string'){
        loading.style.display = 'none';

        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        heading.classList.add('heading');
        data.forEach((element)=>{
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            suggestion.addEventListener("click",similarWord);
            notFound.appendChild(suggestion);
            return;
        })
        return;
    }


    //result found 
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    //sound 

    const soundName = data[0].hwi.prs[0].sound.audio;

    if(soundName){
        renderSound(soundName);

    }

}


function similarWord(e){
    let text = e.target.innerText;
    console.log("e",e);
    console.log("text",text);
    console.log(input);
    // input.innerText = ``;
    input.value = text;
    getData(text);
    audioBox.innerHTML = ``;
    notFound.innerText= ``;
    defBox.innerText = ``;
    
}

function renderSound(soundName){
    // https://media.merriam-webster.com/soundc11

    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apikey}`;
    let aud = document.createElement('audio');
    aud.src = soundSrc;

    aud.controls = true; 

    audioBox.appendChild(aud);
    



}