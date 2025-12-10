const slider = document.getElementById("weight");
const slider2 = document.getElementById("meter");
const valueBox = document.getElementById("valueBox");
const hL = document.getElementById("hL");
const wL = document.getElementById("wL");

slider.oninput = function() {
    wL.textContent ="weight: " + this.value;
    valueBox.textContent = (10_000*slider.value/ (slider2.value * slider2.value )).toFixed(1).toString();
};

slider2.oninput = function() {
    hL.textContent ="height: "+ this.value;
    valueBox.textContent = (10_000*slider.value/ (slider2.value * slider2.value )).toFixed(1).toString();
}