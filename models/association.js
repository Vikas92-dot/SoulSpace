import User from './user.model.js';
import ForumPostLikes from './forumLikes.js';
import ForumPostComments from './forumPostComments.model.js';
import SavedQuotes from './savedQuotes.js';
import Journal from './journal.model.js';
import ForumPost from './forum.model.js';
import MeditationSession from './meditation.model.js';
import Quote from './quote.model.js';
import Notification from './notification.model.js';
import { Association } from 'sequelize';


//One to Many 
User.hasMany(ForumPostComments); //Matlab ek User multiple ForumPostComments likh sakta hai
ForumPostComments.belongsTo(User); //Matlab har ek ForumPostComment kisi ek User se belong karega

User.hasMany(ForumPostLikes);
ForumPostLikes.belongsTo(User);

User.hasMany(SavedQuotes);
SavedQuotes.belongsTo(User);

User.hasMany(Journal);
Journal.belongsTo(User);

User.hasMany(ForumPost);
ForumPost.belongsTo(User);

User.hasMany(MeditationSession);
MeditationSession.belongsTo(User);

User.hasMany(Notification); 
Notification.belongsTo(User);

ForumPost.hasMany(ForumPostComments, { as: "comments" });
ForumPostComments.belongsTo(ForumPost);

ForumPost.hasMany(ForumPostLikes, { as: "likes" });
ForumPostLikes.belongsTo(ForumPost);

Quote.hasMany(SavedQuotes, { as: "savedQuotes" });
SavedQuotes.belongsTo(Quote);



export default Association;