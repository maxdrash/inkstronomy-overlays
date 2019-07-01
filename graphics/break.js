const message = nodecg.Replicant('message');
const mapHidden = nodecg.Replicant('mapHidden');
const nowPlaying = nodecg.Replicant("nowPlaying");
const manualsong = nodecg.Replicant("manualSong");
const mSongEnabled = nodecg.Replicant("mSongEnabled");
const songHidden = nodecg.Replicant("songHidden");
const mapCount = nodecg.Replicant('mapCount');
const selectedMaps = nodecg.Replicant('selectedMaps', {defaultValue: ["", "", "", "", "", "", ""]});
const finalScores = nodecg.Replicant('finalScores', {defaultValue: ["", "", "", "", "", "", ""]});
const mapWinners = nodecg.Replicant('mapWinners', {defaultValue: [0, 0, 0, 0, 0, 0, 0]});
const teamAname = nodecg.Replicant('teamAname');
const teamBname = nodecg.Replicant('teamBname');
var MapsTL = new TimelineMax();
var WinnersTL = new TimelineMax();
var mapNameToImagePath = {"Ancho-V Games": "stages/S2_Stage_Ancho-V_Games.png",
"Arowana Mall":"stages/S2_Stage_Arowana_Mall.png",
"Blackbelly Skatepark":"stages/S2_Stage_Blackbelly_Skatepark.png",
"Camp Triggerfish":"stages/S2_Stage_Camp_Triggerfish.png",
"Goby Arena":"stages/S2_Stage_Goby_Arena.png",
"Humpback Pump Track":"stages/S2_Stage_Humpback_Pump_Track.png",
"Inkblot Art Academy":"stages/S2_Stage_Inkblot_Art_Academy.png",
"Kelp Dome":"stages/S2_Stage_Kelp_Dome.png",
"MakoMart":"stages/S2_Stage_MakoMart.png",
"Manta Maria":"stages/S2_Stage_Manta_Maria.png",
"Moray Towers":"stages/S2_Stage_Moray_Towers.png",
"Musselforge Fitness":"stages/S2_Stage_Musselforge_Fitness.png",
"New Albacore Hotel":"stages/S2_Stage_New_Albacore_Hotel.png",
"Piranha Pit":"stages/S2_Stage_Piranha_Pit.png",
"Port Mackerel":"stages/S2_Stage_Port_Mackerel.png",
"Shellendorf Institute":"stages/S2_Stage_Shellendorf_Institute.png",
"Shifty Station":"stages/S2_Stage_Shifty_Station.png",
"Snapper Canal":"stages/S2_Stage_Snapper_Canal.png",
"Starfish Mainstage":"stages/S2_Stage_Starfish_Mainstage.png",
"Sturgeon Shipyard":"stages/S2_Stage_Sturgeon_Shipyard.png",
"The Reef":"stages/S2_Stage_The_Reef.png",
"Wahoo World":"stages/S2_Stage_Wahoo_World.png",
"Walleye Warehouse":"stages/S2_Stage_Walleye_Warehouse.png",
"We don't know.":"question-mark.png",
"":"question-mark.png"};
const selectedModes = nodecg.Replicant('selectedModes', {defaultValue: ["", "", "", "", "", "", ""]});
var mapImageDisplays = ["mapLeft3Display", "mapLeft2Display", "mapLeft1Display", "mapMiddleDisplay", "mapRight1Display", "mapRight2Display", "mapRight3Display"];
var mapNameTexts = ["mapLeft3NameText", "mapLeft2NameText", "mapLeft1NameText", "mapMiddleNameText", "mapRight1NameText", "mapRight2NameText", "mapRight3NameText"];
var modeTexts = ["mapLeft3ModeText", "mapLeft2ModeText", "mapLeft1ModeText", "mapMiddleModeText", "mapRight1ModeText", "mapRight2ModeText", "mapRight3ModeText"];
var winnerDisplays = ["mapLeft3WinnerDisplay", "mapLeft2WinnerDisplay", "mapLeft1WinnerDisplay", "mapMiddleWinnerDisplay", "mapRight1WinnerDisplay", "mapRight2WinnerDisplay", "mapRight3WinnerDisplay"];
var scoreDisplays = ["mapLeft3ScoreDisplay", "mapLeft2ScoreDisplay", "mapLeft1ScoreDisplay", "mapMiddleScoreDisplay", "mapRight1ScoreDisplay", "mapRight2ScoreDisplay", "mapRight3ScoreDisplay"];
var winnerTexts = ["mapLeft3WinnerText", "mapLeft2WinnerText", "mapLeft1WinnerText", "mapMiddleWinnerText", "mapRight1WinnerText", "mapRight2WinnerText", "mapRight3WinnerText"];

mapWinners.on('change', (newValue, OldValue) => {
    updateWinners();
});

teamAname.on('change', (newValue, OldValue) => {
    updateWinners();
});

teamBname.on('change', (newValue, OldValue) => {
    updateWinners();
});

finalScores.on('change', (newValue, OldValue) => {
    updateFinalScores();
});

//i use "i-1" a staggering amount of times in this code... please don't get mad
//at least it works haha
function updateWinners() {
    for (i=1; i <= 7; i++) {
        var wT = document.getElementById(winnerTexts[i-1]);
        var wD = document.getElementById(winnerDisplays[i-1]);
        var sD = document.getElementById(scoreDisplays[i-1]);
        if (mapWinners.value[i-1] == 1) {
            wT.innerText = teamAname.value;
            sD.innerText = finalScores.value[i-1];
            showWinner(sD, wD);
        } else if (mapWinners.value[i-1] == 2) {
            wT.innerText = teamBname.value;
            sD.innerText = finalScores.value[i-1];
            showWinner(sD, wD);
        } else if (mapWinners.value[i-1] == 0) {
            hideWinner(sD, wD);
        }
    }
}

function updateFinalScores() {
    for (i=1; i <= 7; i++) {
        var sD = document.getElementById(scoreDisplays[i-1]);
        sD.innerText = finalScores.value[i-1];
    }
}

function hideWinner(element1, element2) {
    if (element1.style.top == "" && element2.style.top == "" || element1.style.top == "120px" && element2.style.top == "0px") {
        TweenMax.to([element2], 1, {ease: Power2.easeInOut, top: -155});
        TweenMax.to([element1], 1, {ease: Power2.easeInOut, top: -35});
    }
}

function showWinner(element1, element2) {
    if (element1.style.top == "" && element2.style.top == "" || element1.style.top == "-35px" && element2.style.top == "-155px") {
        TweenMax.to([element2], 1, {ease: Power2.easeInOut, top: 0});
        TweenMax.to([element1], 1, {ease: Power2.easeInOut, top: 120});
    }
}

selectedMaps.on('change', (newValue, OldValue) => {
    updateMaps();
});

function updateMaps() {
    for (i=1; i <= 7; i++) {
        var MI = document.getElementById(mapImageDisplays[i-1]);
        var NT = document.getElementById(mapNameTexts[i-1]);
        MI.src = mapNameToImagePath[selectedMaps.value[i-1]];
        NT.innerHTML = selectedMaps.value[i-1];
    }
}

selectedModes.on('change', (newValue, OldValue) => {
    updateModes();
});

function updateModes() {
    for (i=1; i <= 7; i++) {
        var mT = document.getElementById(modeTexts[i-1]);
        mT.text = selectedModes.value[i-1];
    }
}

mapHidden.on('change', (newValue, oldValue) => {
    /*if (mapCount.value == 3) {
        animate3Maps(newValue);
    } else if (mapCount.value == 5) {
        animate5Maps(newValue);
    } else {
        animate7Maps(newValue);
    }*/
    animHideShowMaps(newValue, oldValue);
    if (oldValue == undefined) {
        pageLoadFunction();
    }
});

function pageLoadFunction() {
    if (mapCount.value == 5) {
        transition7to5();
    }
    else if (mapCount.value == 3) {
        transition7to3();
    }
}

mapCount.on('change', (newValue, oldValue) => {
    if (newValue == 5 && oldValue == 7) {
        transition7to5();
    } else if (newValue == 7 && oldValue == 5) {
        transition5to7();
    } else if (newValue == 7 && oldValue == 3) {
        transition3to7();
    } else if (newValue == 3 && oldValue == 7) {
        transition7to3();
    } else if (newValue == 5 && oldValue == 3) {
        transition3to5();
    } else if (newValue == 3 && oldValue == 5) {
        transition5to3();
    }
});

//I DO NOT KNOW IF THIS WAS A GOOD IDEA
//it's very animated alright

function transition5to3() {
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, left: 100}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, right: 100, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 295, delay: -0.4}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut, left: 755, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 295, delay: -0.7}))
    animSetWidths(400, -340);
}

function transition3to5() {
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 465, onStart: function() {
        mapLeft2Container.style.left = "100px";
        mapRight2Container.style.right = "100px";
    }}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut, left: 805, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 465, delay: -0.7}))
    animSetWidths(300, -385);
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {left: 125, opacity: 1, delay: -0.15}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {right: 125, delay: -0.7, opacity: 1}));
}

function transition7to3() {
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {ease: Power2.easeInOut,ease: Power2.easeInOut, left: 100, opacity: 0}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {ease: Power2.easeInOut, right: 100, opacity: 0, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, left: 340, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut, opacity: 0, right: 340, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 295, delay: -0.4}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut, left: 755, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 295, delay: -0.7}))
    animSetWidths(400, -340);
}

function transition3to7() {
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut,left: 605, onStart: function() {
        mapLeft2Container.style.left = "340px";
        mapRight2Container.style.right = "340px";
    }}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut,left: 845, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut,right: 605, delay: -0.7}))
    animSetWidths(220, -425);
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {left: 365, opacity: 1, delay: -0.15}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {right: 365, opacity: 1, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {left: 125, opacity: 1, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {right: 125, opacity: 1, delay: -0.7}));
}

function transition7to5() {
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {ease: Power2.easeInOut,ease: Power2.easeInOut, left: 100, opacity: 0}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {ease: Power2.easeInOut, right: 100, opacity: 0, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut, left: 125, delay: -0.4}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut, left: 465, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut,left: 805, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut, right: 465, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut, right: 125, delay: -0.7}))
    animSetWidths(300, -385);
    
}

function transition5to7() {
    MapsTL.add(TweenMax.to("#mapLeft2Container", 0.7, {ease: Power2.easeInOut,left: 365}))
    MapsTL.add(TweenMax.to("#mapLeft1Container", 0.7, {ease: Power2.easeInOut,left: 605, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", 0.7, {ease: Power2.easeInOut,left: 845, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight1Container", 0.7, {ease: Power2.easeInOut,right: 605, delay: -0.7}))
    MapsTL.add(TweenMax.to("#mapRight2Container", 0.7, {ease: Power2.easeInOut,right: 365, delay: -0.7}))
    animSetWidths(220, -425);
    MapsTL.add(TweenMax.to("#mapLeft3Container", 0.7, {left: 125, opacity: 1, delay: -0.15}))
    MapsTL.add(TweenMax.to("#mapRight3Container", 0.7, {right: 125, opacity: 1, delay: -0.7}));
}

function animSetWidths(width, imageRight) {
    var width2 = width - 10;
    MapsTL.add(TweenMax.to([".mapContainer", ".modeText", ".modeDisplay", ".mapNameDisplay", ".mapScoreDisplay", ".mapWinnerDisplay"], 0.7, {ease: Power2.easeInOut,width: width, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapNameText", 0.7, {width: width2, fontSize: "2em", ease: Power2.easeInOut, delay: -0.7}));
    MapsTL.add(TweenMax.to(".mapWinnerText", 0.7, {width: width2, fontSize: "1.75em" , ease: Power2.easeInOut, delay: -0.7}))
    MapsTL.add(TweenMax.to(".mapImage", 0.7, {right: imageRight, ease: Power2.easeInOut, delay: -0.7}));
    MapsTL.add(TweenMax.to(".modeText", 0.7, {attr:{"max-width":width2}, width: width, ease: Power2.easeInOut, delay: -0.7}))
}

//THE animation that plays when you hide or show maps
function animHideShowMaps(bool, bool2) {
    var elements3 = ["mapLeft3Container", "mapRight3Container", "mapLeft2Container", "mapRight2Container"];
    var elements5 = ["mapLeft3Container", "mapRight3Container"];
    var animSpeed, animDelay1, animDelay2, animDelay3, styleTop, styleOpac, animEase;
    if (mapCount.value == 3) {
        //set animation parameters if there are three maps shown
        animSpeed = 1;
        animDelay1 = 0;
        animDelay2 = 0;
        animDelay3 = -0.8;
        //hide elements that should not be shown... just in case
        for (i = 0; i < elements3.length; i++) {
            document.getElementById(elements3[i]).style.opacity = "0";
        }
    } else if (mapCount.value == 5) {
        //animation params if there are five maps
        animSpeed = 0.9;
        animDelay1 = 0;
        animDelay2 = -0.75;
        animDelay3 = -0.75;
        for (i = 0; i < elements5.length; i++) {
            document.getElementById(elements5[i]).style.opacity = "0";
        }
    } else {
        //params if 7 maps
        animSpeed = 0.8;
        animDelay1 = -0.7;
        animDelay2 = -0.7;
        animDelay3 = -0.7;
    }
    if (bool) {
        //parameters if the animation is supposed to be hiding the maps
        styleTop = -500;
        styleOpac = 0;
        animEase = "Power2.easeIn";
    } else {
        //if we're showing the maps
        styleTop = 53;
        styleOpac = 1;
        animEase = "Power2.easeOut";
        //check so this doesn't run on page load for some reason
        if (bool2 !== undefined) {
            //so no elements are in positions we don't expect them to be in
            for (i = 0; i < elements3.length; i++) {
                document.getElementById(elements3[i]).style.top = "-500px";
                document.getElementById(elements3[i]).style.opacity = "0";
            }
        }
        //make the background descend from the heavens
        MapsTL.add(TweenMax.to(["#backgroundIMG", "#stars"], 0.8, {ease: Power2.easeOut, top: 0}))
        MapsTL.add(TweenMax.to("#text1", 0.8, {ease: Power2.easeOut, top: 55, delay: -0.8}))
        MapsTL.add(TweenMax.to("#text1Line", 0.8, {ease: Power2.easeOut, top: 160, delay: -0.8}))
        //make everything visible
        containersDiv.style.opacity = "1";
    } // here comes the actual animation!
    if (mapCount.value == 7) { MapsTL.add(TweenMax.to("#mapLeft3Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac})); }
    if (mapCount.value == 7 || mapCount.value == 5) { MapsTL.add(TweenMax.to("#mapLeft2Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay1})); }
    MapsTL.add(TweenMax.to("#mapLeft1Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay2}))
    MapsTL.add(TweenMax.to("#mapMiddleContainer", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3}))
    MapsTL.add(TweenMax.to("#mapRight1Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3}));
    if (mapCount.value == 7 || mapCount.value == 5) { MapsTL.add(TweenMax.to("#mapRight2Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3})); }
    if (mapCount.value == 7) { MapsTL.add(TweenMax.to("#mapRight3Container", animSpeed, {ease: animEase, top: styleTop, opacity: styleOpac, delay: animDelay3})); } // and the aftermath
    if (bool) {
        // if we're hiding, make the background go up
        MapsTL.add(TweenMax.to(["#backgroundIMG", "#stars"], 0.6, {ease: Power2.easeIn, top: -1080, delay: -0.05}))
        MapsTL.add(TweenMax.to("#text1", 0.6, {ease: Power2.easeIn, top: -1025, delay: -0.6}))
        MapsTL.add(TweenMax.to("#text1Line", 0.6, {ease: Power2.easeIn, top: -920, delay: -0.6}));
        // after the animation is done (why the blank tween is here) change opacities so nothing unexpectedly gets shown
        MapsTL.add(TweenMax.to({}, 0.1, {delay: -0.1, onComplete: function() {
            containersDiv.style.opacity = "0";
        }}));
    } else {
        MapsTL.add(TweenMax.to({}, 0.1, {delay: -0.1, onComplete: function() {
            // change positions so no elements are where we don't expect them to be, just in case
            for (i = 0; i < elements3.length; i++) {
                document.getElementById(elements3[i]).style.top = "53px";
            }
        }}));
    }
}

function songTextAnim(newText) {
    var songTimeline = new TimelineMax();
    songTimeline.add(TweenMax.to("#song", 0.5, {opacity: 0, ease: Power2.easeIn, onComplete: function() {
        song.text = newText;
    }}))
    .add(TweenMax.to("#song", 0.5, {opacity: 1}));
} 

function updateSongText() {
    if (mSongEnabled.value) {
        songTextAnim("♫ " + manualsong.value + " ♫");
    } else {
        if (nowPlaying.value.artist === undefined && nowPlaying.value.song === undefined) {
            songTextAnim("♫ Nothing appears to be playing at the moment. ♫");
        } else {
            songTextAnim("♫ " + nowPlaying.value.artist + " - " + nowPlaying.value.song + " ♫");
        }
    }
}

nowPlaying.on("change", (newValue, oldValue) => {
    if (newValue !== oldValue && !mSongEnabled.value) {
        updateSongText();
    }
});

manualsong.on("change", (newValue, oldValue) => {
    if (newValue !== oldValue && mSongEnabled.value) {
        updateSongText();
    }
});

mSongEnabled.on("change", (newValue, oldValue) => {
    if (newValue !== oldValue) {
        updateSongText();
    }
});

songHidden.on("change", (newValue, oldValue) => {
    if (newValue) {
        TweenMax.to("#musicBG", 0.5, { opacity: 0 });
    } else {
        TweenMax.to("#musicBG", 0.5, { opacity: 1 });
    }
});