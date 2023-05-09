import { Meteor } from "meteor/meteor";
import "/api/farts";
import { Farts } from "../api/farts";

Meteor.startup(() => {
  // code to run on server at startup
  if (Farts.find({ _id: "world" }).count() === 0) {
    Farts.insert({ _id: "world", total: 0 });
  }
});
