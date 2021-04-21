const maxCharacters = 1000;
const url = 'http://api.voicerss.org/';
const apiKey = 'a2257984416a454da117006e5db0e280';
var speed = 0;
var lang = "en-in";

const tooLongError = 'Text exceeds 1000 character maximum.';
const whitespaceError ='Warning:"Text must contain text characters other than empty spaces."';

const buildUrl = (str) => `${url}?key=${apiKey}&src=${str}&f=48khz_16bit_stereo&r=${speed}&hl=${lang}`;
const tooLong = (str) => str.length >= maxCharacters;
const emptyString = (str) => str.split(' ').every(_char => _char === '' || _char === '\n');

const langBtnhi = () => document.getElementById('lang-btn-hi');
const playBtn = () => document.getElementById('play-btn');
const playBtn5x = () => document.getElementById('play-btn-5x');
const playBtnm5x = () => document.getElementById('play-btn-m5x');
const langBtnfr = () => document.getElementById('lang-btn-fr');
const textInput = () => document.getElementById('text-input');
const appContainer = () => document.getElementById('app-container');
const errorContainer = () => document.getElementById('error-message');
const clearErrors = () => errorContainer().innerHTML = '';

const listenerFn = ($event) => {
    if ($event.target.value || $event.type === 'paste'){
        playBtn().disabled = false;
        playBtn5x().disabled = false;
        playBtnm5x().disabled = false;
        langBtnhi().disabled = false;
        langBtnfr().disabled = false;
    }
    else{
        playBtn().disabled = true;
        playBtn5x().disabled = true;
        playBtnm5x().disabled = true;
        langBtnhi().disabled = true;
        langBtnfr().disabled = true;
    }
};

const displayErrorMsg = (val) => {
    var errs = new Array();
    if (tooLong(val)) errs.push(tooLongError);
    if (emptyString(val)) errs.push(whitespaceError);
    errs.forEach(_err => {
        const div = document.createElement('div');
        div.innerText = _err;
        errorContainer().appendChild(div);
    });
};



playBtn().addEventListener('click', () => {
    clearErrors();

    if (!emptyString(textInput().value) && !tooLong(textInput().value)) {
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
        
    }
    else
        displayErrorMsg(textInput().value);

});
playBtn5x().addEventListener('click', () => {
    clearErrors();

    if (!emptyString(textInput().value) && !tooLong(textInput().value)) {
        speed=5;
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
        
    }
    else
        displayErrorMsg(textInput().value);

});
playBtnm5x().addEventListener('click', () => {
    clearErrors();

    if (!emptyString(textInput().value) && !tooLong(textInput().value)) {
        speed=-5;
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
        
    }
    else
        displayErrorMsg(textInput().value);

});
langBtnhi().addEventListener('click', () => {
    clearErrors();

    if (!emptyString(textInput().value) && !tooLong(textInput().value)) {
        lang = "hi-in";
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
        
    }
    else
        displayErrorMsg(textInput().value);

});
langBtnfr().addEventListener('click', () => {
    clearErrors();

    if (!emptyString(textInput().value) && !tooLong(textInput().value)) {
        lang = "fr-fr";
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
        
    }
    else
        displayErrorMsg(textInput().value);

});

document.addEventListener('DOMContentLoaded', () => {
    const containerHeight = appContainer().clientHeight;
    const docHeight = window.innerHeight;
    appContainer().style.marginTop = `${docHeight/2 - containerHeight/2 - 25}px`;
    textInput().addEventListener('keyup', listenerFn);
    textInput().addEventListener('paste', listenerFn);

}
);