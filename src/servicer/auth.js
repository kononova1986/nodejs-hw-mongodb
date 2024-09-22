import UserCollection from '../db/models/Users.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import { randomBytes } from 'crypto';

import SessionCollection from '../db/models/Session.js';

import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/Users.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const signup = async payload => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already exist');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const data = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
  delete data._doc.password;
  return data._doc;
};

export const signin = async payload => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

  const userSession = await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return userSession;
};

export const findSessionByAccessToken = accessToken =>
  SessionCollection.findOne({ accessToken });

export const refreshSession = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!oldSession) {
    throw createHttpError(401, 'Session not found!');
  }

  const isSessionTokenExpired =
    new Date() > new Date(oldSession.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired!');
  }

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });
  const newSession = createSession();

  return await SessionCollection.create({
    userId: oldSession.userId,
    ...newSession,
  });
};

export const signout = async sessionId => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const findUser = filter => UserCollection.findOne(filter);
