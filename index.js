window.addEventListener("load", function()
{
  imageDisplay = document.querySelector("img#characterImage");   
  retroactionDisplay = document.querySelector("div#retroactionDisplay");   
  retroactionText = document.querySelector("#retroactionText"); 

  getCharacter = function() {  
    fetch('https://huskyturtleverse.stepzen.net/api/lab/__graphql', {
      method: 'POST',
  
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "apiKey huskyturtleverse::stepzen.net+1000::3717b8670af232d30229e1d82aec1654900ec3a0298db748088dcea706a4066a"
      },
  
      body: JSON.stringify({
        query: `
          query MyQuery {
            randomCharacter {
              _id
              affiliation
              name
              photo
            }
          }    
        `
      })
  })
  .then(res => res.json())
  .then(data => {          
    retroactionDisplay.style.visibility = "hidden";
    retroactionText.innerText = ""
    document.querySelector("input#answer").value = "";

    character = data.data.randomCharacter;
    characterName = character.name; 
    characterImage = character.photo; 
    //console.log("Data\n" + JSON.stringify(data))
    imageDisplay.src = characterImage;
  })  
  .catch(err => console.error("Error\n" + err))
  }

  getCharacter();
  var submit = document.querySelector("button#submit");
  if(submit != null){
      submit.addEventListener("click", function()
      {
          answer = document.querySelector("input#answer").value;
          retroaction = (answer!= "" && characterName.split(" ").includes(answer))? "Correct! It's " + characterName + "!" : "Not quite... It's " + characterName + "!";
          retroactionText.innerText = retroaction;  
          retroactionDisplay.style.visibility = "visible";
      });
  }    

  var next = document.querySelector("button#next");
  if(next != null){
    next.addEventListener("click", function()
    {
        getCharacter();
    });
  }    
  }
)