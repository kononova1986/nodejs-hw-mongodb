import ContactsCollection from '../db/models/Contact.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);
