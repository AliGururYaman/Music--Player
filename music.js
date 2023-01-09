class Music {
    constructor(baslik, sarkici, img, sarki) {
        this.baslik = baslik;
        this.sarkici =sarkici;
        this.img = img;
        this.sarki = sarki;
    }
    getName() {
        return this.baslik + " - " + this.sarkici;
    }
}
const musicList = [
    new Music("Martılar","Edis","edis.jpeg","1.mp3"),
    new Music("Bi Tek Ben Anlarım","KÖFN","kofn.jpeg","2.mp3"),
    new Music("Antidepresan","Mabel Matiz","mabel.jpeg","3.mp3")
];