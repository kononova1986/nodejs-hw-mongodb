import { Router } from 'express';
import {
  getAllContactsControllers,
  getAllContactsByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsControllers));
contactsRouter.get('/:id', ctrlWrapper(getAllContactsByIdController));
contactsRouter.post('/', ctrlWrapper(addContactController));
contactsRouter.put('/:id', ctrlWrapper(upsertContactController));
contactsRouter.patch('/:id', ctrlWrapper(patchContactController));
contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));

export default contactsRouter;
