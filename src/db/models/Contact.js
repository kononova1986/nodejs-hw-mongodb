import { model, Schema } from 'mongoose';
import { contactTypeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateOptions } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: contactTypeList,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false }
);
contactsSchema.post('save', handleSaveError);
contactsSchema.post('findOneAndUpdate', handleSaveError);
contactsSchema.pre('findOneAndUpdate', setUpdateOptions);

const ContactsCollection = model('contact', contactsSchema);
export const sortFilds = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updateAt',
];
export default ContactsCollection;
