async function getAndPrint(url) {
    let dataObj = {};
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dataObj = data;
      }).catch(error => console.log("error is +=" + error));
      console.table(`Returned: ${dataObj.Title}`)
      return dataObj
  }
async function getVals(e){
      e.preventDefault();
      const apiKey = getApiKeyFromInput();
      if(apiKey.toString() != "Error"){
          printHeadings();
          let movies = document.querySelector("#userMovies").value.split("\n");
          asyncForEach(movies,async (movie) => {
              let movieObj = await getAndPrint("https://www.omdbapi.com/?apikey="+ apiKey+ "&t=" + movie.toString().toLowerCase().replace(" ","+"));
            console.log(movieObj.Title)
              await printObj(movieObj);
          });
      }

  }
function printObj(obj){
    let div = document.createElement("div");
    div.id = "row";
    let message = `<p>${obj.Title},${obj.Year},${obj.Released},${obj.Director},${obj.Actors},</p>`;  
    div.innerHTML = message;
    console.log(message);
    document.querySelector("#results").append(div)  ;
  }

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
function getApiKeyFromInput(){
    let inputVal = document.getElementById("apiKey").value;
      if(inputVal==""){
          alert("Please include an API Key");
          inputVal = "Error";
          return
      }
      if(inputVal.length != 8){
          alert("Your APIKey Should be 8 chars long.");
          inputVal = "Error";
          return
      }
      return inputVal
  }

function printHeadings(){
    document.querySelector("#results").innerHTML = `<h2>Movie Name, Year, Released,Directors,Actors,</h2>`;
  }
document.querySelector("#GoButton").addEventListener("click",getVals);