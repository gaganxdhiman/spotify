console.log("Index.Js is Running...");
// function for generating Artist cards ------------------------------------

function ArtistCard(img_url, artistName) {
    let cardHtml = `<div class="card">
    
        <div style="background-image: url('${img_url}');" class="card-img-div">
            <div class="play-green">
                <img src="Assets/images/play-solid-sharp.svg" alt="">
            </div>
        </div>
        <div class="card-heading-div">
            
                <h5 class="artist-Name">${artistName}</h5>
           
            <h6 class="weight-1">Artist</h6>
        </div>
    </div>`;

    document.querySelector(".card-container").innerHTML += cardHtml

}


ArtistCard("Assets/images/pritam-img.jpeg", "Pritam");
ArtistCard("Assets/images/arijit-img.jpg", "Arijit Singh");
ArtistCard("Assets/images/sachin-jigar-img.jpg", "Sachin Jigar");
ArtistCard("Assets/images/rehman-img.jpeg", "A.R. Rehman");
ArtistCard("Assets/images/vishal-img.jpeg", "Vishal Sheikher");
ArtistCard("Assets/images/atif-img.jpg", "Atif Aslam");



// function for generating Album cards ------------------------------------

// function AlbumCard(img_url, AlbumName, Artists) {
//     let cardHtml = ` <div class="album-card">
//                      <div class = album-card-child>
//                     <div style="background-image: url('${img_url}');" class="album-card-img-div">
//                         <div class="play-green p-album">
//                             <img src="Assets/images/play-solid-sharp.svg" alt="">
//                         </div>
//                     </div>
//                     <div class="album-heading-div ">

//                             <h5 class="artist-Name artist-Name-Album">${AlbumName}</h5>

//                         <h6 class="weight-1">${Artists}</h6>
//                     </div>
//                     </div>
//                 </div>`;

//      document.querySelector(".album-container").innerHTML += cardHtml

// }


// AlbumCard("Assets/images/Ashiqui 2.jpeg", "Ashiqui 2", "Mithoon, Ankit Tiwari, Jeet Gannguli")
// AlbumCard("Assets/images/Making Memories.jpeg", "Making Memories", "Karan Aujla, Ikky")
// AlbumCard("Assets/images/Jo Tum Mere Ho.jpeg", "Jo Tum Mere Ho", "Anuv Jain")
// AlbumCard("Assets/images/ghost.jpeg", "Ghost", "Diljit Donsanjh")
// AlbumCard("Assets/images/Jab We Met.jpeg", "Jab We Met", "Pritam, Sandesh Shandilya")
// AlbumCard("Assets/images/Animal.jpeg", "Animal", "Bhardwaj, Vishal Mishra, Jaani")




