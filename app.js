// Change based on hash
// Push State
// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

// https://stackoverflow.com/questions/35549130/simple-spa-single-page-application-implementation-with-hash-change

// https://tutorialzine.com/2015/02/single-page-app-without-a-framework 

// 
// //
// Initialize
// //
// 

let mmData;
let content;

// Get data from JSON file.
let xhr = new XMLHttpRequest();
xhr.open('GET', "megaman.json", true);
xhr.responseType = 'text';
xhr.send();

xhr.onload = function() {
    if(xhr.status === 200) {
        mmData = JSON.parse(xhr.responseText);
        console.log(mmData);
        displayGames();
    }
} // end onload

// 
// //
// Generate HTML
// //
//

function generateHTML(section) {

}

// 
// //
// Display 
// //
//

function display() {
    
}

// Display all games
function displayGames() {
    content = "";

    // loop through each game
    for (let i in mmData.games) {
         //i is is the key for each game
        let game = mmData.games[i];
        // Generate HTML content for each game card
        content += 
            `<div class="col">
                            <div class="card shadow-sm"> 
                                <img src="images/${game.id}.png" class="img-fluid" alt="${game} box-art"> <div class="card-body">
                                <p class="card-text">${game.description}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary gameBtn" id="${game.id}Btn">${game.title}</button>
                                    </div>
                                    <small class="text-muted">${game.releaseYear}, ${game.console}</small>
                                </div>
                            </div>
                        </div>
            </div>`
    }
    
    // Display all games to the screen.
    document.getElementById('gamesContainer').innerHTML = content;

    // state = {'page_id': 'games'};
    // url = 'megaman.html/games';

    // history.pushState(state, title, url)

    // Add click events to game buttons
    let gameBtns = document.getElementsByClassName('gameBtn');
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", function() {
            displayGame(gameBtns[i]);
        });
    }
}

// Games button click event
document.getElementById('gamesBtn').addEventListener("click", function() {
    let album = document.getElementById('gamesAlbum');
    if (album.style.display === 'none') {
        album.style.display = 'block';
        document.getElementById('gameContainer').innerHTML = "";
        document.getElementById('gameContainer').style.display = none;
        // Change text of the games button
        document.getElementById('gamesBtn').style.display = none;
        document.getElementById('gamesBtn').innerHTML = "Games"
        // console.log("Games")
    }
});


// Display info about a single game
function displayGame(btn) {
    let content = "";
    
    // returns the id of the game to be displayed (e.g. 'mm1')
    let gameId = btn.id.slice(0, -3);
    let game = mmData.games[gameId];
    let gameNum = gameId.substring(2);
    let robMas = game.robotMasters;

    // console.log('game Num: ', gameNum)

    let consoles;

    if (game.consoles) {
        consoles = game.consoles;
    }
    else {
        consoles = game.console;
    }
    
    content +=
        `<div class="container py-3 my-3">

        <div class="row g-5 align-items-center justify-content-center">
          <!-- ${gameId} Image -->
          <div class="col-12 col-md-6">
            <div class="card shadow-sm">
              <img src="images/${gameId}.png" class="img-fluid" alt="...">
            </div>
          </div>
          <!-- ${gameId} Header/Description -->
          
          
          <div class="col-12 col-md-6">
            <h1 class="display-4 fw-normal">${game.title}</h1>
            <p class="lead fw-normal">${game.description}</p>
            <button type="button" class="btn btn-sm btn-secondary disabled" style="cursor:default; background-color: #2b2f33;">Original Release Date: ${game.releaseYear}</button>
            <button type="button" class="btn btn-sm btn-secondary disabled" style="cursor:default; background-color: #2b2f33;">Platform: ${consoles}</button>
          </div>
        </div>
      </div> <!-- End MM1 Section -->`

    // Robot Master Section Open
    content += `
    <!-- Robot Masters Section -->
    <div class="container py-3 my-3">

      <div class="row g-5 align-items-center justify-content-center">`
      
      
    // Robot Master Section Body
    for (let i = 0; i < robMas.length; i++) {
        rob = robMas[i];
        content += `
        <!-- ${rob.name} -->
        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <div class="card">
            <img src="images/${gameNum}/${rob.reference}Face.png" class="card-img-top rounded" alt="..." id="${rob.reference}">
            <div class="card-body text-center">
              <p>${rob.name}</p>
            </div>
          </div>
        </div> <!-- End ${rob.name} -->` 
    }

    // 
    content += `
    <!-- Mega Man Soccer -->
    <div id="mms" style="display: none;" class="col col-lg-4">
      <div class="card">
      <img id="mms" src="https://thumbs.gfycat.com/BasicFittingIlsamochadegu-max-1mb.gif" alt="Mega Man Soccer">
      </div>
    </div>
    `
    
    
    // Robot Master Section Close
    content += `
    </div>
    </div> <!-- End Robot Masters Section -->`
      

    // Hide games
    document.getElementById('gamesAlbum').style.display = "none";
    // document.getElementById('gamesAlbum').innerHTML = "";
    // Display game info
    document.getElementById('gameContainer').innerHTML = content;
    document.getElementById('gameContainer').style.display = 'block';
    // Change text of the games button
    document.getElementById('gamesBtn').innerHTML = "&crarr; Games";
    document.getElementById('gamesBtn').style.display = 'block';
}

// Display Robot Masters for specific game
function displayGameRobMas(game) {
    content = "";
    for (let i in mmData.games.game) {
         //i is is the key for each game
        let robMas = mmData.games[i];
        let ref = robMas.reference;
        let name = robMas.name;
        // Generate HTML content for each game card
        content += 
            `<!-- ${name} -->
            <div class="col col-sm-6 col-md-4 col-lg-2">
              <div class="card">
                <img src="images/1/${ref}Face.png" class="card-img-top rounded" alt="...">
                <div class="card-body text-center">
                  <a href="#" class="nav-link active" aria-current="page">${name}</a>
                </div>
              </div>
            </div> <!-- End ${name} -->`
    }
    
    
    // Display all games to the screen.
    document.getElementById('gameRobMas').innerHTML = content;

    // Add click events to game buttons
    let gameBtns = document.getElementsByClassName('gameBtn');
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", function() {
            displayGame(gameBtns[i]);
        });
    }
}

//Easter egg click event

// Add click event listener
document.getElementsByTagName('main')[0].addEventListener("click", toggleEasterEgg);

// Toggle easter egg image on/off
function toggleEasterEgg(event) {
  const element = event.target;
  let image = document.getElementById('mms');
  if (element.id === "strike") {
    if (image.style.display === "none") {
      image.style.display = "block"
    }
    else {
      image.style.display = "none"
    }
    
  }
}


// document.getElementById("divId").addEventListener("click", someFunction);

// function someFunction(event) {
//   console.log(event.target.id);
// }
