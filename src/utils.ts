import fs from 'fs';
import Client from 'tdl';
import { MessageContent, messageText } from 'tdlib-types';

/**
 * type guard for {@link messageText}
 * @param message the {@link MessageContent} to check
 * @returns true or false
 */
export const isMessageText = (
  message: MessageContent
): message is messageText => {
  return (message as messageText).text?.text !== undefined;
};

/**
 * get info about a specific chat
 * @param client the {@link Client} to use to access Telegram
 * @param chat_id the chat ID to inspect
 * @returns a Promise of a {@link chat} object with all the chat's data
 */
export const getChat = (client: Client, chat_id: number) => {
  return client.invoke({
    _: 'getChat',
    chat_id: chat_id
  });
};

/**
 * get info about a specific chat
 * @param client the {@link Client} to use to access Telegram
 * @param user_id the user ID to inspect
 * @returns a Promise of a {@link user} object with all the user's data
 */
export const getUser = (client: Client, user_id: number) => {
  return client.invoke({
    _: 'getUser',
    user_id: user_id
  });
};

/**
 * get info about the logged in user
 * @param client the {@link Client} to use to access Telegram
 * @returns a Promise of the current {@link user} object with all the user's data
 */
export const getMe = (client: Client) => {
  return client.invoke({
    _: 'getMe'
  });
};

/**
 * deletes the database file so old messages aren't seen as new ones
 */
export const clearDb = () => {
  try {
    fs.unlinkSync('./_td_lib/db.sqlite');
  } catch (error) {
    // do nothing because we don't care
  }
};
