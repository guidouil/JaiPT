import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { Farts } from '/api/farts';

Template.farts.onCreated(() => {
  const instance = Template.instance();
  instance.subscribe('worldFarts');
});

Template.home.onCreated(() => {
  const instance = Template.instance();
  instance.counter = new ReactiveVar(0);
});

Template.registerHelper('formatNumber', (number) => {
  return number ? new Intl.NumberFormat().format(number) : false;
});

Template.registerHelper('worldCounter', () => {
  const { total } = Farts.findOne({ _id: 'world' });
  return total;
});

Template.home.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.home.events({
  'click #jaiPtBtn'(event, templateInstance) {
    const getRandomInt = () => Math.floor(Math.random() * 8) + 1;
    const num = getRandomInt();
    const audio = new Audio(`/snd/fart-0${num}.mp3`);
    audio.play();
    templateInstance.counter.set(templateInstance.counter.get() + 1);
    Meteor.call('iJustFarted');
  },
});

Template.darkMode.onRendered(() => {
  // Dark mode detection
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $('body').addClass('dark');
  }
});

Template.darkMode.helpers({
  isDark() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  },
});

Template.darkMode.events({
  'click #darkModeBtn'() {
    $('body').toggleClass('dark');
    if (document.body.classList.contains('dark')) {
      document.getElementById('dlModeIcon').innerHTML = 'light_mode';
    } else {
      document.getElementById('dlModeIcon').innerHTML = 'dark_mode';
    }
  },
});
