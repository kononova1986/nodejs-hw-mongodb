import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './hooks.js';
import { emailRegexp } from '../../constants/Users.js';
const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
usersSchema.post('save', handleSaveError);
usersSchema.post('findOneAndUpdate', handleSaveError);
usersSchema.pre('findOneAndUpdate', setUpdateOptions);

const UserCollection = model('user', usersSchema);

export default UserCollection;
