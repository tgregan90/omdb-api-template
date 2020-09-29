async function getAndPrint(url) {
    let dataObj = {};
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dataObj = data;
      }).catch(error => console.log("error is +=" + error));
      return dataObj
  }
let arr = [];
async function getVals(e){
      e.preventDefault();
      arr = [];
      const apiKey = getApiKeyFromInput();
      if(apiKey.toString() != "Error"){
          printHeadings();
          let movies = document.querySelector("#userMovies").value.split("\n");
          asyncForEach(movies,async (movie) => {
              let movieObj = await getAndPrint("https://www.omdbapi.com/?apikey="+ apiKey+ "&t=" + movie.toString().toLowerCase().replace(" ","+"));
              await printObj(movieObj);
          });
      }

  }
function printObj(obj){
    let div = document.createElement("div");
    let movieData = {};
    movieData.MovieTitle = obj.Title;
    movieData.Year = obj.Year
    movieData.Released = obj.Released;
    movieData.Director = obj.Director.replace(","," ").toString();
    movieData.Actors = obj.Actors.replace(","," ").toString();
    movieData.Actors = movieData.Actors.replace(","," ").toString();
    arr.push(movieData);
    div.id = "row";
    document.body.classList.add("results");
    let message = `<p> ${obj.Title},${obj.Year},${obj.Released},${obj.Director.replace(","," ")},${obj.Actors.replace(","," ")} </p>`;  
    div.innerHTML = message;
    console.log(message);
    document.querySelector("#results").innerHTML += message  ;
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
    const headings =    {};
    headings.title = "Movie Title";
    headings.year = "Year";
    headings.Released = "Released Date";
    headings.Director = "Director";
    headings.Actors = "Actors"
  arr.push(headings);

  }
function downloadResults(){
  exportToCsv("data.csv",arr);
}
function exportToCsv(filename, items) {
  let csv
  // Loop the array of objects
  for(let row = 0; row < items.length; row++){
      let keysAmount = Object.keys(items[row]).length
      let keysCounter = 0

      // If this is the first row, generate the headings
      if(row === 0){
        // Loop each property of the object
        for(let key in items[row]){
          csv += key + (keysCounter+1 < keysAmount ? ',' : '\r\n' )
          keysCounter++
        }
      }else{
        for(let key in items[row]){
            csv += items[row][key] + (keysCounter+1 < keysAmount ? ',' : '\r\n' )
            keysCounter++
        }
      }

      keysCounter = 0
  }
let link = document.createElement('a')
link.id = 'download-csv'
link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
link.setAttribute('download', 'yourfiletextgoeshere.csv');
document.body.appendChild(link)
document.querySelector('#download-csv').click()
}
document.querySelector("#GoButton").addEventListener("click",getVals);
document.querySelector("#downloadButton").addEventListener("click",downloadResults);