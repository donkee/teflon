import { init } from './init';
import { getChat, getUser, isMessageText } from './utils';

const client = init();

// output errors
client.on('error', console.error);
client.on('update', (update) => {
  if (
    update._ === 'updateNewMessage' &&
    update.message &&
    update.message.content._ === 'messageText' &&
    update.message.sender_id._ === 'messageSenderUser'
  ) {
    getUser(client, update.message.sender_id.user_id).then((user) => {
      getChat(client, update.message.chat_id).then((chat) => {
        if (isMessageText(update.message.content)) {
          // output the formatted message to the console
          // TODO: handle errors from the promises
          console.log(
            `${chat.title} => ${user.first_name} ${user.last_name}: ${update.message.content.text.text}`
          );
        }
      });
    });
  }
});

const main = async () => {
  await client.connectAndLogin();
};

main();
