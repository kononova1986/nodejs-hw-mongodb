import ContactsCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const contactQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.userId) {
    contactQuery.where('userId').equals(filter.userId);
  }

  const count = await ContactsCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData({ count, perPage, page });

  return {
    data: data,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};

export const getContact = filter => ContactsCollection.findOne(filter);

export const createContact = payload => ContactsCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
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
