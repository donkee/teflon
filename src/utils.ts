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
