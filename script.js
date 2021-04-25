txtinput = document.getElementById('txtinput');
rateI = document.getElementById('rateI');
InputRate = document.getElementById('InputRate');
pitchI = document.getElementById('pitchI');
InputPitch = document.getElementById('InputPitch');
InputVoice = document.getElementById('InputVoice');
speakBtn = document.getElementById('speakBtn');


InputRate.addEventListener('change',function(){
    rateI.textContent = InputRate.value
})


InputPitch.addEventListener('change',function(){
    pitchI.textContent = InputPitch.value
})

 synth = window.speechSynthesis;


 getVoices = () => {
    
  allVoices = synth.getVoices();
  allVoices.forEach(voice => {
    option  = document.createElement('option')
    option.textContent = voice.name;
    option.setAttribute('data-voice',voice.name);
    InputVoice.appendChild(option)
  }) 
} 

speechSynthesis.onvoiceschanged  = getVoices 
getVoices()

function speakIT(){
if(txtinput.value!=''){
sayThis = new SpeechSynthesisUtterance(txtinput.value); 
 selectedVoice = InputVoice.selectedOptions[0].getAttribute('data-voice');

 allVoices.forEach(voice => {
if(selectedVoice == voice.name){
    sayThis.voice = voice;
}
}) 

sayThis.rate = InputRate.value
sayThis.pitch = InputPitch.value
synth.speak(sayThis)
} 
}
speakBtn.addEventListener('click',function(){
    speakIT()
})


