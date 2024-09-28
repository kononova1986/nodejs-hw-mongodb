import fs from 'node:fs/promises';

const createDirIfNotExists = async patch => {
  try {
    await fs.access(patch);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(patch);
    }
  }
};

export default createDirIfNotExists;
