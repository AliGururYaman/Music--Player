const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const baslik = document.querySelector("#music-details .baslik");
const sarkici = document.querySelector("#music-details .sarkici");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    simdicaliyormu();
});

function displayMusic(music) {
    baslik.innerText = music.getName();
    sarkici.innerText = music.sarkici;
    image.src = "images/" + music.img;
    audio.src = "mp3/" + music.sarki;
}
play.addEventListener("click", () => {
    const caliyormu = container.classList.contains("caliyor");
    caliyormu ? durMuzik() : calMuzik();

})
prev.addEventListener("click", () => {
    prevMusic();
})

function prevMusic() {
    player.geri();
    let music = player.getMusic();
    displayMusic(music);
    calMuzik();
}
next.addEventListener("click", () => {
    nextMusic();
})

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    calMuzik();
    simdicaliyormu();
}

function durMuzik() {
    container.classList.remove("caliyor");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
    simdicaliyormu();
}

function calMuzik() {
    container.classList.add("caliyor");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
    simdicaliyormu();
}
const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncelSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${guncelSaniye}`;
    return sonuc;
}
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});
audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});
progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});
let sesDurumu = "sesli";
volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (audio.volume == 0) {
        volume.classList = "fa-solid fa-volume-xmark";
    } else if (audio.volume <= 0.49) {
        volume.classList = "fa-solid fa-volume-low";
    } else if (audio.volume >= 0.50) {
        volume.classList = "fa-solid fa-volume-high";
    }

});
volume.addEventListener("click", () => {
    if (sesDurumu === "sesli") {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        sesDurumu = "sesli"
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});
const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' onclick="secilenmuzik(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].sarki}"></audio>
            </li>
            
        `;

        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });



    }
}
const secilenmuzik = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    calMuzik();
    simdicaliyormu();

}
const simdicaliyormu = () => {
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})