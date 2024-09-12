import createHttpError from 'http-errors';
import * as ContactsServices from '../servicer/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactFilterParams from '../utils/filters/parseContactFilterParams.js';
import { sortFilds } from '../db/models/Contact.js';

export const getAllContactsControllers = async (req, res, next) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFilds });
  const filter = parseContactFilterParams(req.query);

  console.log(filter);
  const data = await ContactsServices.getAllContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter,
  });

  if (!data) {
    next(createHttpError(404, 'Failed to get contacts'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getAllContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await ContactsServices.getContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Contact with ${id} successfully find`,
    data,
  });
};
export const addContactController = async (req, res) => {
  const data = await ContactsServices.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact add successfully!',
    data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  const { isNew, data } = await ContactsServices.updateContact(
    { _id: id },
    req.body,
    {
      upsert: true,
    }
  );
  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Contact upsert successfully!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await ContactsServices.updateContact({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: 'Contact patched successfully!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await ContactsServices.deleteContact({ _id: id }, req.body);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.status(204).send();
};
