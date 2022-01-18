import { initializeClient } from './init';
import Logger from './logger';
import { clearDb, getChat, getMe, getUser, isMessageText } from './utils';

clearDb();

var console = new Logger(process.stdout);

const client = initializeClient();

var myId: number;

// output errors
client.on('error', (err) => {
  console.error(err);
});

client.on('update', (update) => {
  if (
    update._ === 'updateNewMessage' &&
    update.message &&
    update.message.content._ === 'messageText' &&
    update.message.sender_id._ === 'messageSenderUser'
  ) {
    getUser(client, update.message.sender_id.user_id)
      .then((user) => {
        if (user.id !== myId) {
          getChat(client, update.message.chat_id)
            .then((chat) => {
              if (isMessageText(update.message.content)) {
                // output the formatted message to the console
                console.info(
                  `${chat.title} => ${user.first_name} ${user.last_name}: ${update.message.content.text.text}`
                );
              }
            })
            .catch((error) => {
              console.error(`Problem fetching chat info:\n${error}`);
            });
        }
      })
      .catch((error) => {
        console.error(`Problem fetching user info:\n${error}`);
      });
  }
});

const main = async () => {
  await client.connectAndLogin();
  await getMe(client).then((me) => {
    myId = me.id;
    console.info(`Welcome to TEFlon, ${me.first_name} ${me.last_name}!`);
  });
};

main();
