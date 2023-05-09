import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Farts = new Mongo.Collection('farts');

Farts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Meteor.methods({
  iJustFarted() {
    return Farts.update({ _id: 'world' }, { $inc: { total: 1 } });
  },
});

if (Meteor.isServer) {
  Meteor.publish('worldFarts', () => Farts.find({ _id: 'world' }));
}
