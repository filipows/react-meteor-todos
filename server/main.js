import '../imports/api/tasks.js';
import {
  Meteor
} from 'meteor/meteor';
import {
  Tasks
} from '../imports/api/tasks';



Meteor.startup(() => {
  console.log(Tasks.findOne());
});