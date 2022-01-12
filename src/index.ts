import dotenv from 'dotenv';
import path from 'node:path';
import Client from 'tdl';
import { TDLib } from 'tdl-tdlib-addon';

dotenv.config();

const tdLibLoc = process.env.LIB_TD_LOCATION;
const apiId = process.env.TEFLON_API_ID
  ? parseInt(process.env.TEFLON_API_ID)
  : undefined;
const apiHash = process.env.TEFLON_API_HASH;

if (!tdLibLoc || !apiId || !apiHash) {
  process.abort();
}

// your location of libtdjson.so here
const client = new Client(new TDLib(path.resolve(tdLibLoc)), {
  apiId: apiId, // your apiId here
  apiHash: apiHash // your apiHash here
});

// output errors
client.on('error', console.error);
// output every update that comes through (very verbose)
client.on('update', (update) => {
  // console.log('Received update: ', update);
  if (
    update._ === 'updateChatLastMessage' &&
    update.last_message &&
    update.last_message.content._ === 'messageText' &&
    update.last_message.sender_id._ === 'messageSenderUser'
  ) {
    getUser(update.last_message.sender_id.user_id).then((user) => {
      if (
        update._ === 'updateChatLastMessage' &&
        update.last_message &&
        update.last_message.content._ === 'messageText' &&
        update.last_message.sender_id._ === 'messageSenderUser'
      ) {
        console.log(
          `${update.last_message.content.text.text} from ${user.first_name} ${user.last_name}`
        );
      }
    });
  }
});

const main = async () => {
  // log in and output the top 5 chats
  await client.connectAndLogin();
  // const chats = await client.invoke({
  //   _: 'getChats',
  //   chat_list: { _: 'chatListMain' },
  //   limit: 5
  // });

  // console.log(chats);

  // // get more info about each chat
  // let basicGroups: Promise<chat>[] = [];
  // chats.chat_ids.forEach((chat) => {
  //   basicGroups.push(getChat(chat));
  // });

  // // wait for all Promises to complete then output the text of each chat (if the type is text
  // // and not something like an image or video)
  // Promise.all(basicGroups).then((results) => {
  //   results.forEach((chat) => {
  //     // just some dumb type checking
  //     if (
  //       chat.last_message &&
  //       'text' in chat.last_message.content &&
  //       typeof chat.last_message.content.text !== 'string'
  //     )
  //       console.log(chat.id, chat.last_message.content.text.text);
  //   });
  // });
};

// get info about a specific chat
const getChat = (chat_id: number) => {
  return client.invoke({
    _: 'getChat',
    chat_id: chat_id
  });
};

// get info about a specific chat
const getUser = (user_id: number) => {
  return client.invoke({
    _: 'getUser',
    user_id: user_id
  });
};

main();
