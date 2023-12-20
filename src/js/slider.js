import { parcours_liste } from "./parcours.js";
import { places } from "./place.js";
import { isEmpty_localStorage, save } from "./data/data.js"

var slider = document.getElementById("slider");

var data_places = await places();
var data_parcours = await parcours_liste();

//remplir le slider avec les données du lieu cliqué
function fillSlider() {
    slider = document.getElementById("slider");
    var sliderTitle = document.getElementById('slider-name');
    var sliderDescription = document.getElementById('slider-description');
    var sliderParcours = document.getElementById('slider-parcours');
    var sliderListe = document.getElementById('slider-liste');
    var sliderImage = document.getElementById('slider-img');
    var place = data_places.find(place => place.c[0].v == event.target.id); //  place.c[0].v != null &&
    var parcours = data_parcours.filter(place => place.c[4].v == event.target.id);
    var first_parcours_html = ""

    parcours.forEach((_parcours) => {
        var css = isEmpty_localStorage("fin_parcours_" + _parcours.c[0].v) == true ? "parcours-done" : "parcours";
        console.log(isEmpty_localStorage("fin_parcours_" + _parcours.c[0].v));
        first_parcours_html += `<button class = '` + css + `' @click="((count = 0, state = 1, id_parcours = ` + _parcours.c[0].v + `) , App().page(` + _parcours.c[0].v + `, count, state))" id='` + _parcours.c[0].v + `'class='parcours'>` + _parcours.c[1].v + `</button>`
    });

    sliderParcours.innerHTML = first_parcours_html
    sliderTitle.innerText = place.c[1].v;
    sliderDescription.innerHTML = place.c[2].v;
    sliderImage.src = place.c[6].v;
    slider.style.visibility = "visible";
}

//eventListener pour afficher le slider
document.addEventListener('click', function (e) {
    slider = document.getElementById("slider");
    if (e.target.id == 'slider-close' || e.target.id == 'map') {
        slider.style.visibility = "hidden";
    }
    else if (e.target.className == 'show') {
        console.log(e.target.id)
        let show = document.getElementsByClassName('card-item')
        console.log(show)
        for (let item of show) {
            item.style.display = 'none';
        }
        document.getElementsByClassName(e.target.id)[0].style.display = 'block';
    }

    else if (e.target.className == 'parcours' || e.target.className == 'parcours-done') {

        save("actual_quiz", e.target.id)
        save(e.target.id, 0)


    }
    else if (e.target.className == 'marker-image' || e.target.id != 'map') {
        fillSlider();
    }
}, false);





