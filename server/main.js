import '../imports/api/tasks.js';
import { Tasks } from '../imports/api/tasks';



Meteor.startup(() => {
  console.log(Tasks.findOne());
});
