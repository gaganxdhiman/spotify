console.log("Padhle bhai !");



let songs;


let play_of_li = document.querySelector(".play_of_li")


//Getting Songs from Local Server 
async function GetSongs(Album_name) { // fetching songs form flies or local host 



    let fs = await fetch(`/public/Assets/Songs/${Album_name}/`)
    let SongsHtml = await fs.text()

    // console.log("Fetched HTML:", SongsHtml);
    // console.log(`/public/Assets/Songs/${Album_name}/`);

    let div = document.createElement("div");
    div.innerHTML = SongsHtml;
    let anchorTags = div.getElementsByTagName("a")
    songs = []

    for (let index = 0; index < anchorTags.length; index++) {
        const element = anchorTags[index];
        if (element.href.endsWith(".mp3"))
            songs.push(element.href.split(`public/Assets/Songs/${Album_name}/`)[1]);// pushing all songs into sogns array

    }

    return songs;




}

// --------------------------------------------------------------------













let currentSong = new Audio() //glocal variable of function playmusic

// On click on li, the html of if goes to the function playmusic then with editing the url  we get the song url 
const playmusic = (Album_Name, track) => {
    let album_link = Album_Name.replaceAll(" ", "%20").trim()
    // console.log(album_link);
    currentSong.src = `public/Assets/Songs/${album_link}/` + track + ".mp3"

    // console.log(currentSong.src);



    currentSong.addEventListener("ended", function () {

        document.querySelector(".play-btn").src = "public/Assets/images/play-solid-sharp.svg";
        document.querySelectorAll(".span_of_play img").forEach(element => {
            element.src = "public/Assets/images/play-btn.svg"

        });

        // .style.display = "none"
    });
    // if(!pause){

    //     currentSong.play()
    //     play.src = "public/Assets/images/pause-btn.svg"
    // }
    // let play_of_li = document.querySelector(".play_of_li")
    // 

    currentSong.play();
    play.src = "public/Assets/images/pause-btn.svg" // it changes the play to pause 





    // time updating and pushing the live duration into play bar

    currentSong.addEventListener("timeupdate", () => {
        let currentSeconds = currentSong.currentTime
        let currentMinutes = (currentSeconds / 60).toFixed(2)   //!
        let durationSeconds = currentSong.duration;
        const durationMinutes = (durationSeconds / 60).toFixed(2);
        //pushing song name's into the play bar part
        document.querySelector(".current-time").innerHTML = `${currentMinutes.replace(".", ":")}`
        document.querySelector(".duration").innerHTML = `${durationMinutes.replace(".", ":")}`

        document.querySelector(".circle").style.left = (currentMinutes / durationMinutes) * 100 + "%"



        // console.log(currentMinutes,durationMinutes);

        // let speaker = document.querySelector(".speaker-full-img")

        range.addEventListener("input", () => {
            let volume_img = document.querySelector(".speaker-full-img")

            if (range.value == 0) {
                volume_img.src = "public/Assets/images/volume_zero.svg"
            }
            else {
                volume_img.src = "public/Assets/images/volume_up.svg"
            }
            currentSong.volume = range.value

        })
        // Song bar



        const song_bar = document.querySelector(".song-bar");

        song_bar.addEventListener("click", (e) => {
            const rect = song_bar.getBoundingClientRect(); // Get element size & position
            const offsetX = e.clientX - rect.left; // Get X position relative to song-bar
            const percentageDecimal = (offsetX / rect.width) * 100; // Normalize to 0-100%
            let percentage = Math.floor(percentageDecimal)

            document.querySelector(".circle").style.left = percentage + "%"

            // currentMinutes = 

            newTime = (percentageDecimal / 100) * currentSong.duration
            console.log(newTime);
            currentSong.currentTime = newTime




        });

    })








    const song_bar = document.querySelector(".song-bar");
    const circle = document.querySelector(".circle");
    let isDragging = false;
    
    // Mouse Events
    circle.addEventListener("mousedown", (e) => startDragging(e));
    document.addEventListener("mouseup", stopDragging);
    
    // Touch Events
    circle.addEventListener("touchstart", (e) => startDragging(e.touches[0]), { passive: false });
    document.addEventListener("touchend", stopDragging);
    
    function startDragging(e) {
        isDragging = true;
    
        // Add event listeners only when dragging starts
        song_bar.addEventListener("mousemove", handleDragging);
        song_bar.addEventListener("touchmove", (e) => handleDragging(e.touches[0]), { passive: false });
    }
    
    function handleDragging(e) {
        if (!isDragging) return; // Stop if not dragging
    
        let clientX = e.clientX || e.touches?.[0]?.clientX; // Works for both mouse & touch
        if (!clientX) return;
    
        const rect = song_bar.getBoundingClientRect(); 
        let offsetX = clientX - rect.left; // X position relative to song-bar
    
        // Prevent out-of-bounds movement
        offsetX = Math.max(0, Math.min(offsetX, rect.width));
    
        // Convert position to percentage
        const percentage = (offsetX / rect.width) * 100;
    
        // Move the circle and progress bar
        circle.style.left = percentage + "%";
    
        // Update song time
        currentSong.currentTime = (percentage / 100) * currentSong.duration;
    }
    
    function stopDragging() {
        isDragging = false;
    
        // Remove event listeners when dragging stops
        song_bar.removeEventListener("mousemove", handleDragging);
        song_bar.removeEventListener("touchmove", handleDragging);
    }
}    






// --------------------------------------------------------------------------------

async function getAlbum() {
    let a = await fetch("public/Assets/Songs/")
    let b = await a.text()
    // console.log(b);
    let div = document.createElement("div")
    div.innerHTML = b
    let anchor = div.getElementsByTagName("a")
    let folder = []
    for (let index = 0; index < anchor.length; index++) {
        const element = anchor[index];
        let folderName = element.href.split("public/Assets/Songs/")[1]
        if (folderName) {

            folder.push(folderName.replaceAll("%20", " "))
        }
    }
    // console.log(folder);

    return folder
}











// async main function for all callbacks of funcitons and some code 
async function main() {

    let folder = await getAlbum()




    
   
    
    for (let index = 0; index < folder.length; index++) {
        const element = folder[index];
        let jsn = await fetch(`public/Assets/Songs/${element}/info.json`)
        let jsnFile = await jsn.json()
        
      

        let cardHtml = ` <div class="album-card">
                             <div class = album-card-child>
                            <div style="background-image: url('public/Assets/Songs/${element}/cover.jpeg');" class="album-card-img-div">
                                <div class="play-green p-album">
                                    <img src="public/Assets/images/play-solid-sharp.svg" alt="">
                                </div>
                            </div>
                            <div class="album-heading-div ">
        
                                    <h5 class="artist-Name artist-Name-Album">${jsnFile.title}</h5>
        
                                <h6 class="weight-1">${jsnFile.Singer}</h6>
                            </div>
                            </div>
                        </div>`;

        document.querySelector(".album-container").innerHTML += cardHtml




    }
    document.querySelectorAll(".album-container div").forEach(card => {
        card.addEventListener("click", async () => {
        let ylib = card.querySelector(".artist-Name-Album").innerHTML
        
       document.querySelector(".Y-lib-a").childNodes[1].textContent = `${ylib}`
       
            // document.querySelector(".singer").innerHTML = album_singer.innerHTML
            currentSong.pause()
            if (window.matchMedia("(max-width: 770px)").matches) {
                document.querySelector(".left-closer").style.display = "block"
                document.querySelector(".footer").style.display = "none"
            }

            // document.querySelector(".left-closer").style.display = "block"
            play_btn.src = "public/Assets/images/play-solid-sharp.svg"
            const menuImg = document.querySelector(".main-logo-div");


            
            




            let logoDiv1 = document.querySelector(".main-logo-div");
            logoDiv1.style.backgroundImage = 'url("public/Assets/images/close-img.svg")';


            // window.addEventListener("load", updateBackgroundImage); 
            // window.addEventListener("resize", updateBackgroundImage);
            document.querySelector(".left-section").style.left = "0"









            // document.querySelector(".left-section").style.left = "0";
            document.querySelector(".create-playlist-div").style.display = "none"
            document.querySelector(".browse-podcast-div").style.display = "none"
            // document.querySelector(".play-btn").src = "public/Assets/images/play-solid-sharp.svg"
            let albumCard = card.querySelector(".artist-Name-Album");

            if (albumCard) {  // Check if the element exists
                let album_t = albumCard.innerHTML
                // console.log(encodeURIComponent(album_t));

                let songs = await GetSongs(album_t.replaceAll(" ", "%20"));
                let SongsCardUL = document.querySelector(".songs-card").getElementsByTagName("ul")[0] // Selecting the songs card and inner ul for pushing all li's into ul
                SongsCardUL.innerHTML = ""; // cler the prevous songs

                for (let index = 0; index < songs.length; index++) {
                    const element = songs[index];// Song1 = songs[1]



                    let parasedSong = element.replaceAll("%20", " ").replaceAll("%2C", ",").replaceAll(".mp3", "")
                    SongsCardUL.innerHTML += ` <li>
            <div class="songs-details">
                <div class = songs-details-child><img class= "li_img" src="public/Assets/images/${album_t.replace(" ", "%20") + ".jpeg"}" alt=""><div class = "song-info-div">${parasedSong} </div></div>
                <span class = "span_of_play"><img class="play  play_of_li" src="public/Assets/images/play-btn.svg" alt=""></span>
            </div>
           </li>`

                }
                Array.from(document.querySelector(".songs-card").getElementsByTagName("li")).forEach(e => {


                    e.addEventListener("click", () => {

                        document.querySelector(".play-bar-div").style.display = "flex";
                        // document.querySelector(".footer").style.display = "none"
                        e.style.border = "1px solid blue"
                        document.querySelector("#song-name-info").innerHTML = e.querySelector(".song-info-div").innerHTML
                        // console.log(document.querySelector("#song-name-info").innerHTML = e.querySelector(".song-info-div").innerHTML);

                        // e.style.backgroundColor = "grey";
                        // e.style.color = "b";





                        let playIcon = e.querySelector(".play_of_li");

                        // If the clicked song is already playing, pause it
                        if (playIcon.src.endsWith("pause-white-for-li.svg")) {
                            currentSong.pause();
                            playIcon.src = "public/Assets/images/play-btn.svg";
                            document.querySelector(".play-btn").src = "public/Assets/images/play-solid-sharp.svg"
                        } else {
                            // First, reset all other songs
                            document.querySelectorAll(".songs-card li").forEach(li => {
                                li.style.border = "1px solid white";
                                li.querySelector(".play_of_li").src = "public/Assets/images/play-btn.svg";
                            });

                            // Then, play the selected song and update its icon
                            playmusic(album_t, e.querySelector(".song-info-div").innerHTML.trim());
                            playIcon.src = "public/Assets/images/pause-white-for-li.svg";
                            e.style.border = "1px solid blue";
                        }



                        // previous next buttons 

                        // let previous = document.getElementById("previous")
                        // previous.addEventListener("click", () => {
                        //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
                        //     // console.log(index);
                        //     // console.log(songs[index-1]);
                        //     // previousbro







                        //         let previous_song = songs[index-1].replace(".mp3","")
                        //         document.querySelector("#song-name-info").innerHTML = previous_song.replaceAll("%20", " ")
                        //         playmusic(album_t,previous_song)
                        //        let playBar_infoText  = document.querySelector("#song-name-info").innerHTML 
                        //        let li_innerText=  e.querySelector(".song-info-div").innerHTML

                        //      console.log(playBar_infoText, "li : " ,li_innerText);




                        // })
                        // let next = document.getElementById("next")
                        // next.addEventListener("click", () => {
                        //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
                        //     let previous_song = songs[index+1].replace(".mp3","")
                        //     document.querySelector("#song-name-info").innerHTML = previous_song.replaceAll("%20", " ")
                        //     playmusic(album_t,previous_song)




                        // })








                        const songItems = Array.from(document.querySelector(".songs-card").getElementsByTagName("li"));
                        // Function to highlight the current playing song

                        function SongStyles() {
                            let currentSongName = document.querySelector("#song-name-info").innerHTML.trim();

                            songItems.forEach(song => {
                                let songName = song.querySelector(".song-info-div").innerHTML.trim();
                                let playIcon = song.querySelector(".play_of_li");


                                if (songName === currentSongName) {
                                    song.style.border = "1px solid blue";
                                    playIcon.src = "public/Assets/images/pause-white-for-li.svg"; // Change icon

                                } else {
                                    song.style.border = "1px solid white"; // Reset border to white all
                                    playIcon.src = "public/Assets/images/play-btn.svg";
                                }
                            });
                        }

                        // Previous Button
                        document.getElementById("previous").addEventListener("click", () => {
                            let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);


                            let previous_song = songs[index - 1].replace(".mp3", "");
                            document.querySelector("#song-name-info").innerHTML = previous_song.replaceAll("%20", " ");
                            playmusic(album_t, previous_song);

                            SongStyles();

                        });

                        // Next Button
                        document.getElementById("next").addEventListener("click", () => {
                            let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);


                            let next_song = songs[index + 1].replace(".mp3", "");
                            document.querySelector("#song-name-info").innerHTML = next_song.replaceAll("%20", " ");
                            playmusic(album_t, next_song);

                            SongStyles();
                        });









                        // let play_of_li = document.querySelector(".play_of_li")
                        // play_of_li.src = "public/Assets/images/pause-white-for-li.svg"








                        // Add border to the clicked song
                        e.style.border = "1px solid blue";


                        // e.querySelector(".play_of_li").src = "public/Assets/images/pause-white-for-li.svg";



                    })

                    // let play_btn = document.querySelector(".play-btn")



                })
                // -------










            }
            else {
                console.warn("No element ");
            }
        });
    });




    document.querySelector(".cookies-div").innerHTML = "Cookies"

    // All songs are into now songs variable











    // ---------------------------------------------------------------------------







    // pushing Songs info and duration when click on song






    // speaker
    let speaker = document.querySelector(".speaker-full-img")
    speaker.addEventListener("click", () => {

        if (speaker.src.endsWith("volume_up.svg")) {
            speaker.src = "public/Assets/images/volume_zero.svg"

            range.value = 0;
            currentSong.volume = range.value
        }
        else if (speaker.src.endsWith("volume_zero.svg")) {
            speaker.src = "public/Assets/images/volume_up.svg"
            range.value = 100;
            currentSong.volume = range.value
        }
        console.log(speaker);

    })








    // --------------------------------------------------------------------------------------









    //  event listener for play, pause, next , previous


    let play_btn = document.querySelector(".play-btn")



    play_btn.addEventListener("click", () => {

        let currentSongName = document.querySelector("#song-name-info").innerHTML.trim()


        const songItems = Array.from(document.querySelector(".songs-card").getElementsByTagName("li"));

        if (play_btn.src.endsWith("play-solid-sharp.svg")) {

            // document.querySelectorAll(".songs-card li").forEach(song => {
            songItems.forEach(song => {

                let songName = song.querySelector(".song-info-div").innerHTML.trim();

                let playIcon = song.querySelector(".play_of_li");

                if (currentSongName === songName) {
                    // song.style.border = "1px solid blue"; 
                    playIcon.src = "public/Assets/images/pause-white-for-li.svg"; // Change icon

                }
            });
        }











        if (currentSong.paused) {
            currentSong.play()

            // play_btn.src = "public/Assets/images/pause-btn.svg"

            Array.from(document.querySelector(".songs-card").getElementsByTagName("li")).forEach(ele => {

                ele.querySelectorAll(".play_of_li").forEach(img => {
                    // ele.img.src = "public/Assets/images/pause-white-for-li.svg"
                    play_btn.src = "public/Assets/images/pause-btn.svg"



                })





            })






        }
        else {
            currentSong.pause()



            Array.from(document.querySelector(".songs-card").getElementsByTagName("li")).forEach(element => {

                element.querySelectorAll(".play_of_li").forEach(img => {
                    img.src = "public/Assets/images/play-btn.svg"
                    play_btn.src = "public/Assets/images/play-solid-sharp.svg"




                })

            })







        }
    })


































    let show_me_div = document.querySelector(".P-artist-h div")
    let card_container = document.querySelector(".card-container")
    show_me_div.addEventListener("click", () => {
        if (show_me_div.innerHTML === "Show all") {
            card_container.style.height = "fit-content"
            show_me_div.innerHTML = "Hide all"
        }
        else if (show_me_div.innerHTML === "Hide all") {

            card_container.style.height = "238px"
            show_me_div.innerHTML = "Show all"

        }
    })
    let show_me_div2 = document.querySelector(".P-album-h div")
    let card_container2 = document.querySelector(".album-container")
    show_me_div2.addEventListener("click", () => {
        if (show_me_div2.innerHTML === "Show all") {
            card_container2.style.height = "fit-content"
            show_me_div2.innerHTML = "Hide all"
        }
        else if (show_me_div2.innerHTML === "Hide all") {

            card_container2.style.height = "238px"
            show_me_div2.innerHTML = "Show all"

        }
    })







    // menu bar functionality
    let menu_img = document.querySelector(".main-logo-div")
    function menu_bar() {





        let leftSectionCloser = document.querySelector(".left-closer")
        menu_img.addEventListener("click", () => {

            const logoDiv = document.querySelector(".main-logo-div");
            const bgImage = getComputedStyle(logoDiv).backgroundImage;
            let bgImage_parsedLink = bgImage.replaceAll('"', "").replaceAll(")", "")
            //    console.log(bgImage_parsedLink);


            if (bgImage_parsedLink.endsWith("menu-bar.svg")) {


                menu_img.style.backgroundImage = 'url("public/Assets/images/close-img.svg")';
                document.querySelector(".left-section").style.left = "6px"
                document.querySelector(".left-section").style.display = "inline-block"
                if (window.matchMedia("(max-width: 770px)").matches) {
                    document.querySelector(".left-closer").style.display = "block"
                } else {

                }





            }

            else if (bgImage_parsedLink.endsWith("close-img.svg")) {

                menu_img.style.backgroundImage = 'url("public/Assets/images/menu-bar.svg")';
                document.querySelector(".left-section").style.left = "-98%"
                if (window.matchMedia("(max-width: 770px)").matches) {
                    document.querySelector(".left-closer").style.display = "none"
                }

                // document.querySelector(".left-closer").style.display = "none"
            }



        })





    }




    //left section closer
    let left_closer = document.querySelector(".left-closer")
    left_closer.addEventListener("click", () => {
        document.querySelector(".left-section").style.left = "-98%";
        left_closer.style.display = "none"
        menu_img.style.backgroundImage = 'url("public/Assets/images/menu-bar.svg")';

    })
    menu_bar()














// this is for the artist cards 
document.querySelectorAll(".card-container div").forEach(c => {
    c.addEventListener("click", async () => {
        if (window.matchMedia("(max-width: 770px)").matches) {
            document.querySelector(".left-closer").style.display = "block"
            document.querySelector(".footer").style.display = "none"
        }

        // document.querySelector(".left-closer").style.display = "block"
        play_btn.src = "public/Assets/images/play-solid-sharp.svg"
        const menuImg = document.querySelector(".main-logo-div");







        let logoDiv1 = document.querySelector(".main-logo-div");
        logoDiv1.style.backgroundImage = 'url("public/Assets/images/close-img.svg")';


        // window.addEventListener("load", updateBackgroundImage); 
        // window.addEventListener("resize", updateBackgroundImage);
        document.querySelector(".left-section").style.left = "0"









        // document.querySelector(".left-section").style.left = "0";
        document.querySelector(".create-playlist-div").style.display = "none"
        document.querySelector(".browse-podcast-div").style.display = "none"
        let SongsCardUL = document.querySelector(".songs-card").getElementsByTagName("ul")[0]
        let artist = c.querySelector(".artist-Name").innerHTML
        document.querySelector(".Y-lib-a").childNodes[1].textContent = `Your Library`
      
        
        SongsCardUL.innerHTML = `<div class= "no-song-div">${artist}'s songs are currently unavailable due to storage limitations. You can check the 'Popular Albums and Singles' at the bottom. Thanks! </div>`
    })
    });

   
    

}
main()