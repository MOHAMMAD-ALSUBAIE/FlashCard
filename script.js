"use strict"
const word = document.querySelector(".Word");
const definig = document.querySelector(".Definig");
const send = document.querySelector(".send");

const FlashCard = document.querySelector(".FlashCard");
const JustCard = document.querySelector(".JustCard");
let cards = "";
const swipeing = document.querySelector(".swipeingBut");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

const ClearBut = document.querySelector(".Clear");
let contplus = 0;
let cont = 0;

let CardWord;
let definigWord;
let listFont = [];
let listBack = [];
let getDataFont;
let getDataBack;

getDataFont = localStorage.getItem("listFont");
getDataBack = localStorage.getItem("listBack");



if (getDataFont!=null&& getDataBack!=null ) {

    listFont = getDataFont.split(",");
    listBack = getDataBack.split(",");
    for (let i = 0; i < listFont.length; i++) {
        contplus = i;

        //create cards when page loaded
        createCard(contplus);
    }
    contplus++;
    cards = document.querySelectorAll(".Card");
}
if (cont === 0) {
    prev.classList.add("hide");
}
//if there are not a cards then hide the next input and swip button
if (listFont.length === 0) {
    next.classList.add("hide");
    swipeing.classList.add("hide");
}
//if there are at least one  card then show the next input and swip button
if (listFont.length != 0) {
    next.classList.remove("hide");
    swipeing.classList.remove("hide");
}
send.addEventListener("click", (e) => {
    ///show clear button
    ClearBut.classList.remove("hide");
    //show next button and swipig but
    next.classList.remove("hide");
    swipeing.classList.remove("hide");
    e.preventDefault();
    //store the inputs from the interface
    CardWord = word.value;
    definigWord = definig.value;

    //push the inputs as array to the list
    listFont.push(CardWord);
    listBack.push(definigWord);
    //create card whe user send rquest
    createCard(contplus);
    //
    contplus++;
    word.value = definig.value = "";
    cards = document.querySelectorAll(".Card");

    //if there are at least one  card then show the next input and swip button

    localStorage.listFont = listFont;
    localStorage.listBack = listBack;
});
next.addEventListener("click", nextFunction);

prev.addEventListener("click", prevFunction);

swipeing.addEventListener("click", swip);
ClearBut.addEventListener("click", clearFunction);
//
//
///
//
//
///
///
///
///
//
///functions side
function nextFunction() {
    if (cont < cards.length - 1) {
        cont++;
        cards[cont].classList.remove("nonDisply");
        console.log(cont);
        if (cont > 0) {
            prev.classList.remove("hide");
        }
        if (cont === cards.length - 1) {
            next.classList.add("hide");
        }
        for (let i = 0; i < cards.length; i++) {
            if (i === cont) {
                continue;
            }

            cards[i].classList.add("nonDisply");
        }

        //to rest the card, so the word will be in the fornt
        swip2();
    }
}
function prevFunction() {
    if (cont > 0) {
        cont--;
        cards[cont].classList.remove("nonDisply");

        for (let i = 0; i < cards.length; i++) {
            if (i === cont) {
                continue;
            }

            cards[i].classList.add("nonDisply");
        }
        if (cont < cards.length - 1) {
            next.classList.remove("hide");
        }
        if (cont === 0) {
            prev.classList.add("hide");
        }
        //to rest the card, so the word will be in the fornt
        swip2();
    }
}
function swip() {
    for (let i = 0; i < cards.length; i++) {
        //if the user click the card then it's definig will appear
        // and the word will disppear
        const firstChid = cards[i].firstElementChild.classList;
        const lastChild = cards[i].lastElementChild.classList;

        firstChid.toggle("nonDisply");
        lastChild.toggle("nonDisply");
    }
}

function swip2() {
    for (let i = 0; i < cards.length; i++) {
        //if the user click the card then it's definig will appear
        // and the word will disppear
        const firstChid = cards[i].firstElementChild.classList;
        const lastChild = cards[i].lastElementChild.classList;

        firstChid.remove("nonDisply");
        lastChild.add("nonDisply");
    }
}

function clearFunction() {
    //first clear the srotge the browser
    localStorage.listFont = "";
    localStorage.listBack = "";
    // clear the list
    listFont = [];
    listBack = [];
    //remvoeAllCard
    JustCard.innerHTML = "";
    contplus = 0;
    //hide the clear button
    ClearBut.classList.add("hide");

    //hide swip ,next,prev button

    next.classList.add("hide");
    swipeing.classList.add("hide");
    prev.classList.add("hide");
    //cont the next and prev
    cont = 0;
}

///function that create the cards

function createCard(contplus) {
    if (contplus === 0) {
        JustCard.insertAdjacentHTML(
            "beforeend",
            `<div class="Card">
            <div class="ContnetCard Front">${listFont[contplus]}</div>
    <div class="ContnetCard nonDisply ">
    ${listBack[contplus]}
    </div></div>`
        );
    } else {
        JustCard.insertAdjacentHTML(
            "beforeend",
            `<div class="Card nonDisply">
        <div class="ContnetCard Front">${listFont[contplus]}</div>
<div class="ContnetCard nonDisply ">
${listBack[contplus]}
</div></div>`
        );
    }
    cards = document.querySelectorAll(".Card");

    hideAndShowNextButt();
}

function hideAndShowNextButt() {
    //to hide next
    if (cards.length === 1) {
        next.classList.add("hide");
    }
    //to show next
    if (cards.length > 1) {
        next.classList.remove("hide");
    }
}
