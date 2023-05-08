import { Template } from "meteor/templating";

import "./main.html";

const getRandomInt = () => Math.floor(Math.random() * 8) + 1;

Template.home.events({
  "click .jaiPtBtn"() {
    const num = getRandomInt();
    console.log(num);
    const audio = new Audio(`/fart-0${num}.mp3`);
    audio.play();
  },
});
