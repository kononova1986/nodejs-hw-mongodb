import ContactsCollection from '../db/models/Contact.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);

export const createContact = payload => ContactsCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};

export const deleteContact = filter =>
  ContactsCollection.findOneAndDelete(filter);
