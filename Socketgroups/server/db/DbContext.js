import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GroupSchema } from '../models/Group.js';
import { ChatSchema } from '../models/Chat.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Chats = mongoose.model('Chat', ChatSchema)
}

export const dbContext = new DbContext()
