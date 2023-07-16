import * as THREE from "three";
import Experience from "./Experience.js";


export default class Menu {
    
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;

    this.setMenu()
  }

    setMenu(){
    
   

    let timmy = null;
    let timmyLong = null;
    const delay = 100; //ms delay to be considered a long press

    //document.addEventListener('DOMContentLoaded', () => {
      addClickTouch();
   //});

    
    function addClickTouch() {
      clearTimeout(timmy); //stop the longpress delay if it has started

      if ('ontouchstart' in document.body) {
        document.querySelectorAll('[data-long]').forEach((btn) => {
          btn.addEventListener('touchstart', start, {
            once: true,
          });
        });
      } else {
        document.querySelectorAll('[data-long]').forEach((btn) => {
          btn.addEventListener('mouseover', start, {
            once: true,
          });
        });
      }
    }

    function start(ev) {
      //handle the touchstart context menu
      ev.preventDefault();

      let btn = ev.target.closest('[data-long]');
      btn.innerHTML = '👍'; //remove the other buttons

      timmy = setTimeout(longPress.bind(btn), delay); // the LONG PRESS

      btn.addEventListener('pointerup', addClickTouch);
      btn.addEventListener('touchcancel', addClickTouch);
    }

    function longPress() {
      let btn = this;
      btn.removeEventListener('ponterup', addClickTouch);
      btn.removeEventListener('touchcancel', addClickTouch);

      //remove all the flyout buttons after delay if no interaction for 3 seconds
      timmyLong = setTimeout(resetButtons.bind(btn), 3000);

      let template = document.getElementById('emojis');
      let content = template.content.cloneNode(true);
      btn.appendChild(content);
      btn.querySelectorAll('button').forEach((b) => {
        if ('ontouchstart' in document.body) {
          b.addEventListener('touchend', selected, {
            capture: false,
            once: true,
          });
        } else {
          b.addEventListener('pointerup', selected, {
            capture: false,
            once: true,
          });
        }
        setTimeout(function () {
          b.classList.add('go');
        }, 5);
      });
    }

    function resetButtons() {
      this.innerHTML = '👍';
      addClickTouch();
    }

    function selected(ev) {
      ev.stopImmediatePropagation(); //don't send the click to the main button
      console.log('selected', ev.target);
      clearTimeout(timmyLong); //we have interacted...
      let b = ev.target; // <button class="top happy go">
      let arr = Array.from(b.classList).filter(
        (cls) =>
          cls != 'go' &&
          cls != 'top' &&
          cls != 'right' &&
          cls != 'bottom' &&
          cls != 'left'
      );
      let match = arr[0]; //the selected class
      document.querySelector('header h2').textContent = `You are ${match}`;
      let btn = ev.target.parentElement;
      btn.querySelectorAll('button').forEach((item) => {
        //loop through the 4 child buttons
        if (item.classList.contains(match)) {
          setTimeout(
            function (item) {
              item.remove();
              resetButtons.call(this);
            }.bind(btn, item),
            delay
          );
          //delay removing the selected one same length as the long press
        } else {
          item.remove();
          //remove all the flyout buttons except the selected ones
        }
      });
    }

}
 
update(){

}


}