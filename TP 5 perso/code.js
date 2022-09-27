let req = new XMLHttpRequest;
// INITIALISATION
/////////////////
let btntab = document.querySelectorAll('button');
let div = document.querySelector('div');
let div2 = document.querySelector('.time');
const tabcontinent = ["europe", "asia", "africa", "americas", "oceania"];
const url = "https://restcountries.com/v3.1/region/";
let firstPays = 0;
let secondPays = 0;
let thirdPays = 0;
let tabChoix = [];
let win = 0;
winstreak = 0;
div.innerHTML = "Cliquer sur le continent de votre choix,<br> vous aurez 10 secondes pour choisir la bonne réponse";

for (let index = 0; index < btntab.length; index++) {

    //CHOIX CONTINENT
    ////////////////
    btntab[index].addEventListener('click', () => {
        if (index == 5) {
            req.open('GET', "https://restcountries.com/v3.1/all");
        } else {
            req.open('GET', url + tabcontinent[index]);
        }

        req.responseType = 'json';
        req.send();
        req.onload = () => {
            if (req.status == 200) {
                div.innerHTML = "";
                for (let index = 0; index < btntab.length; index++) {
                    btntab[index].disabled = "enabled";

                }

                //choix des pays
                ////////////////////////
                do {
                    firstPays = Math.floor(Math.random() * req.response.length);
                    secondPays = Math.floor(Math.random() * req.response.length);
                    thirdPays = Math.floor(Math.random() * req.response.length);
                } while (firstPays == secondPays || firstPays == thirdPays || secondPays == thirdPays);

                // tab pour mixer les pays
                ////////////////////////
                let tab = [firstPays, secondPays, thirdPays];
                let firstLine = [];
                let secondLine = [];
                let thirdLine = [];
                do {
                    pos1 = Math.floor(Math.random() * tab.length);
                    pos2 = Math.floor(Math.random() * tab.length);
                    pos3 = Math.floor(Math.random() * tab.length);
                    firstLine = tab[pos1];
                    secondLine = tab[pos2];
                    thirdLine = tab[pos3];
                } while (firstLine == secondLine || firstLine == thirdLine || secondLine == thirdLine);

                // Affichage drapeau + choix dispo
                //////////////////////////////////
                div.innerHTML += `<img src="` + req.response[firstPays].flags.png + `" alt="" srcset="">` + "<br>";
                div.innerHTML += '<button class="rep1">' + "1 :" + req.response[firstLine].name.official + "</button>" + "<br>";
                div.innerHTML += '<button class="rep2">' + "2 :" + req.response[secondLine].name.official + "</button>" + "<br>";
                div.innerHTML += '<button class="rep3">' + "3 :" + req.response[thirdLine].name.official + "</button>" + "<br>";

                // Preparation traitement de la future reponse
                /////////////////////////////
                tabChoix[0] = firstLine;
                tabChoix[1] = secondLine;
                tabChoix[2] = thirdLine;
                let btntab2 = document.querySelectorAll('div button');

                // lancement compte a rebours
                ////////////////////
                let time = 10;
                function test() {
                    div2.innerHTML = time;
                    time--;
                    //fin timer, réponse + regame?
                    /////////////////////////////
                    if (time == -1) {
                        clearInterval(timer);
                        div2.innerHTML = "Souhaitez-vous rejouer?" + "<br>" + "<button>Oui</button>" + "<button>Non</button>";
                        for (let index3 = 0; index3 < btntab2.length; index3++) {
                            if (tabChoix[index3] == firstPays) {
                                btntab2[index3].style.backgroundColor = 'Green';
                            } else if (tabChoix[index3] != firstPays) {
                                btntab2[index3].style.backgroundColor = 'red';
                                if (win > winstreak) {
                                    winstreak = win;
                                }
                                win = 0
                            }
                        }
                        let btntab3 = document.querySelectorAll('.time button');
                        for (let index = 0; index < btntab3.length; index++) {
                            btntab3[index].addEventListener('click', () => {
                                //OUI
                                ///////
                                if (index == 0) {
                                    for (let index = 0; index < btntab.length; index++) {
                                        btntab[index].disabled = false;
                                        div.innerHTML = "Cliquer sur le continent de votre choix,<br> vous aurez 10 secondes pour choisir la bonne réponse";
                                        div2.innerHTML = "";
                                    };
                                    //NON
                                    //////    
                                } else {
                                    div.innerHTML = "<H1>LOOOOOOOOOOSERRRRRRRRRRRRR</H1>";
                                    div2.innerHTML = "";

                                };

                            });
                        };
                    }
                    return time;
                }
                let timer = setInterval(test, 1000);

                // CHOIX REPONSE 
                for (let index2 = 0; index2 < btntab2.length; index2++) {

                    btntab2[index2].addEventListener('click', () => {
                        //Bonne REPONSE FIN TIMER + REGAME?
                        /////////////////////////////
                        if (tabChoix[index2] == firstPays) {
                            clearInterval(timer);
                            div2.innerHTML = "Souhaitez-vous rejouer?" + "<br>" + "<button>Oui</button>" + "<button>Non</button>";
                            btntab2[index2].style.backgroundColor = 'Green';
                            win++
                            if (win > winstreak) {
                                winstreak = win;
                            }
                            for (let index3 = 0; index3 < btntab2.length; index3++) {
                                if (tabChoix[index3] != firstPays) {
                                    btntab2[index3].style.backgroundColor = 'red';
                                };
                            };

                        } else {
                            //MAUVAISE REPONSE FIN TIMER + REGAME?
                            ////////////////////////////
                            if (win > winstreak) {
                                winstreak = win;
                            }
                            win = 0
                            clearInterval(timer);
                            div2.innerHTML = "Souhaitez-vous rejouer?" + "<br>" + "<button>OUI</button>" + "<button>NON</button>";
                            for (let index4 = 0; index4 < btntab2.length; index4++) {
                                if (tabChoix[index4] == firstPays) {
                                    btntab2[index4].style.backgroundColor = 'Green';
                                } else if (tabChoix[index4] != firstPays) {
                                    btntab2[index4].style.backgroundColor = 'red';
                                };
                            };

                        };
                        //PROPOSITION REGAME A L'UTILISATEUR
                        /////////////////////////////////////
                        let btntab3 = document.querySelectorAll('.time button');
                        for (let index = 0; index < btntab3.length; index++) {
                            btntab3[index].addEventListener('click', () => {
                                //OUI
                                ///////
                                if (index == 0) {
                                    for (let index = 0; index < btntab.length; index++) {
                                        btntab[index].disabled = false;
                                        div.innerHTML = "Cliquer sur le continent de votre choix,<br> vous aurez 10 secondes pour choisir la bonne réponse";
                                        div2.innerHTML = "";
                                    };
                                    //NON
                                    //////    
                                } else {
                                    div.innerHTML = "<H1>" + "Vous avez réussi à trouver au cours de cette partie un maximum de " + winstreak + " réponse(s) d'affilée(s), Bravo!" + "</H1>";
                                    div2.innerHTML = "";

                                };

                            });
                        };
                    });

                };
            }
        };

    });
};