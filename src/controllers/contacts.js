import createHttpError from 'http-errors';
import * as ContactsServices from '../servicer/contacts.js';

export const getAllContactsControllers = async (req, res) => {
  const data = await ContactsServices.getAllContacts();
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

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await ContactsServices.updateContact(
    { _id: id },
    req.body,
    {
      upsert: true,
    }
  );

  const status = isNew ? 200 : 201;
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
