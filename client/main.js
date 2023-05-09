import { Template } from "meteor/templating";

import "./main.html";

const getRandomInt = () => Math.floor(Math.random() * 8) + 1;

Template.home.events({
  "click .jaiPtBtn"() {
    const num = getRandomInt();
    console.log(num);
    const audio = new Audio(`/snd/fart-0${num}.mp3`);
    audio.play();
  },
});

Template.darkMode.onRendered(() => {
  // Dark mode detection
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    $("body").addClass("dark");
  }
});

Template.darkMode.helpers({
  isDark() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }
    return false;
  },
});

Template.darkMode.events({
  "click #darkModeBtn"() {
    $("body").toggleClass("dark");
    if (document.body.classList.contains("dark")) {
      document.getElementById("dlModeIcon").innerHTML = "light_mode";
    } else {
      document.getElementById("dlModeIcon").innerHTML = "dark_mode";
    }
  },
});
