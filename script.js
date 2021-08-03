const audio = document.querySelector("audio");
const roll = document.getElementById("roller");
const play = document.getElementById("play");
const pl = document.getElementById("pl_id");
const pro = document.getElementById("pro");
const bar = document.getElementById("bar");
const shift = document.getElementById("shift");
const next = document.getElementById("next");
const back = document.getElementById("back");
const popup_container =  document.querySelector(".popup-container")

const bar_width = pro.clientWidth;
var popup_cont = document.querySelector(".popup");


// const innerpath = audio.src;
// let innerhtml = innerpath.substring(innerpath.lastIndexOf('/')+1)
// innerhtml =innerhtml.substring(0,innerhtml.length - 4);
// innerhtml = innerhtml.replace("%20", " ");
// console.log(innerhtml);


function pop() {
    popup_cont.classList.toggle("popup-flex");
    document.querySelector(".fa-chevron-down").style.cursor = "pointer";
}

function close_popup() {
    popup_cont.classList.remove("popup-flex");
}

audio.ontimeupdate = function () { update() };

const array_yaar = [{
    "name": "Attention",
    "artist": "Charlie Puth",
    "image": "https://m.media-amazon.com/images/M/MV5BNzBjYWIzNmQtZjA2NS00ZTMzLThmODQtMGE0MTEzZGE1YTgzXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg",
}, {
    "name": "Thodi Jagah",
    "artist": "Arijit Singh",
    "image": "https://www.jagranimages.com/images/newimg/20052021/20_05_2021-arijit_singh_21660518.jpg",
}, {
    "name": "Stitches",
    "artist": "Shawn Mendes",
    "image": "https://m.media-amazon.com/images/M/MV5BMjMwM2Y5NGMtZTk4ZS00ZTA2LWI0YjQtN2U1MGM3NzE2YjhlXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg",
}, {
    "name": "Please don't go",
    "artist": "Joel Adams",
    "image": "https://upload.wikimedia.org/wikipedia/en/a/ad/Please_Don%27t_Go_by_Joel_Adams.jpg",
}, {
    "name": "Arcade",
    "artist": "Duncan Lawrence",
    "image": "https://i1.sndcdn.com/artworks-000537794841-wuqat8-t500x500.jpg",
}];

// const song = array_yaar[1].name;
// // console.log(song)
// const song2 = array_yaar[0].name;


songIndex = 0;
text = "";

for (let i=0; i < array_yaar.length; i++) {
    text += "<p class='f" + i + "'>" + array_yaar[i].name + "</p>";
    document.querySelector(".popup-container").innerHTML = text;
    const x = ".popup-container .f" + i;
    const v = document.querySelector(x);
    // console.log(v);
}

const nextSong = () => {
    songIndex = (songIndex + 1) % array_yaar.length;
    audio.src = 'audio/'+array_yaar[songIndex].name+'.mp3';
    isplay = true;
    document.querySelector(".song_name").innerHTML = array_yaar[songIndex].name;
    document.querySelector(".artist").innerHTML = array_yaar[songIndex].artist;
    document.getElementById("image_").src = array_yaar[songIndex].image;
    audio.play();
    pl.classList.replace("fa-play", "fa-pause");
    // const innerpath = audio.src;
    // let innerhtml = innerpath.substring(innerpath.lastIndexOf('/')+1)
    // innerhtml =innerhtml.substring(0,innerhtml.length - 4);
    // innerhtml = innerhtml.replace("%20", " ");
    // console.log(innerhtml);
}

const prevSong = () => {
    songIndex = (songIndex - 1 + array_yaar.length) % array_yaar.length;
    audio.src = 'audio/'+array_yaar[songIndex].name+'.mp3';
    isplay = true;
    document.querySelector(".song_name").innerHTML = array_yaar[songIndex].name;
    document.querySelector(".artist").innerHTML = array_yaar[songIndex].artist;
    document.getElementById("image_").src = array_yaar[songIndex].image;
    audio.play();
    pl.classList.replace("fa-play", "fa-pause");
    // const innerpath = audio.src;
    // let innerhtml = innerpath.substring(innerpath.lastIndexOf('/')+1)
    // innerhtml =innerhtml.substring(0,innerhtml.length - 4);
    // innerhtml = innerhtml.replace("%20", " ");
    // console.log(innerhtml);
}

next.addEventListener('click', nextSong);
back.addEventListener('click', prevSong);

let isplay = false;

const playaud = () => {
    isplay = true;
    audio.play();
}
const pauseaud = () => {
    isplay = false;
    audio.pause();
}

function togg() {
    var el = document.body;
    var main = document.querySelector(".main");
    var toggbtn = document.querySelector("#shift button");
    var playlistbtn = document.querySelector("#playlist button");
    el.classList.toggle("light-mode");
    main.classList.toggle("main-light")
    toggbtn.classList.toggle("txt-light");
    document.getElementById("fw_id").classList.toggle("txt-light");
    document.getElementById("bw_id").classList.toggle("txt-light");
    document.getElementById("play").classList.toggle("bg-org");
    document.querySelector(".start_str").classList.toggle("txt-light");
    document.querySelector(".end_str").classList.toggle("txt-light");
    document.querySelector(".roller").classList.toggle("roller-lt");
    playlistbtn.classList.toggle("txt-light");
}

play.addEventListener('click', () => {
    if (isplay) {
        pauseaud();
        pl.classList.replace("fa-pause", "fa-play");
        roll.style.animationPlayState = 'paused';
    } else {
        playaud();
        pl.classList.replace("fa-play", "fa-pause");
        roll.classList.add('anime');
        roll.style.animationPlayState = 'running';
    }
})

function update() {
    let player = audio.currentTime;
    // console.log(dur);

    let dur = audio.duration;
    const dur_min = dur / 60;
    // console.log(dur_min);
    const dur_sec = dur % 60;
    // console.log(dur_sec);
    const t_min = player / 60;
    const t_sec = player % 60;

    const per_sec = (player / dur) * 100;
    bar.style.width = per_sec + "%";

    pro.addEventListener('click', (event) => {
        // console.log(event);
        // console.log(pro.clientWidth);
        const tota = event.offsetX;
        // console.log(tota);
        const move = (tota / pro.clientWidth) * 100;
        bar.style.width = move + "%";
        audio.currentTime = (move / 100) * dur;
    })

    

    if (audio.duration === audio.currentTime) {
        // console.log("hey");
        nextSong();
    }

    if (t_min < 1) {
        if (t_sec < 10) {
            document.getElementById("start").innerHTML = '0'.concat(':', '0', Math.floor(t_sec));
        } else {
            document.getElementById("start").innerHTML = '0'.concat(':', Math.floor(t_sec));
        }
    } else {
        if (t_sec < 10) {
            document.getElementById("start").innerHTML = Math.floor(t_min) + ':0' + Math.floor(t_sec);
        } else {
            document.getElementById("start").innerHTML = Math.floor(t_min) + ':' + Math.floor(t_sec);
        }
    }
    if (dur_min < 1) {
        if (dur_sec < 10) {
            document.getElementById("end").innerHTML = '0'.concat(':', '0', Math.floor(dur_sec));
        } else {
            document.getElementById("end").innerHTML = '0'.concat(':', Math.floor(dur_sec));
        }
    } else {
        if (dur_min == 0) {
            if (dur_sec < 10) {
                document.getElementById("end").innerHTML = '0'.concat(':', '0', Math.floor(dur_sec));
            } else {
                document.getElementById("end").innerHTML = '0'.concat(':', Math.floor(dur_sec));
            }
        } else {
            if (dur_sec < 10) {
                document.getElementById("end").innerHTML = Math.floor(dur_min) + ':0' + Math.floor(dur_sec);
            } else {
                document.getElementById("end").innerHTML = Math.floor(dur_min) + ':' + Math.floor(dur_sec);
            }
        }
    }
}