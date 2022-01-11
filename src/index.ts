import path from 'node:path';
import Client from 'tdl';
import { TDLib } from 'tdl-tdlib-addon';
import { chat } from 'tdlib-types';

const client = new Client(
  new TDLib(path.resolve('/home/chase/td/tdlib/lib/libtdjson.so')),
  {
    apiId: 1111, // your apiId here
    apiHash: '0000' // your apiHash here
  }
);

// output errors
client.on('error', console.error);
// output every update that comes through (very verbose)
// client.on('update', (update) => {
//   console.log('Received update: ', update);
// });

const main = async () => {
  // log in and output the top 5 chats
  await client.connectAndLogin();
  const chats = await client.invoke({
    _: 'getChats',
    chat_list: { _: 'chatListMain' },
    limit: 5
  });

  console.log(chats);

  // get more info about each chat
  let basicGroups: Promise<chat>[] = [];
  chats.chat_ids.forEach((chat) => {
    basicGroups.push(getChat(chat));
  });

  // wait for all Promises to complete then output the text of each chat (if the type is text
  // and not something like an image or video)
  Promise.all(basicGroups).then((results) => {
    results.forEach((chat) => {
      // just some dumb type checking
      if (
        chat.last_message &&
        'text' in chat.last_message.content &&
        typeof chat.last_message.content.text !== 'string'
      )
        console.log(chat.last_message.content.text.text);
    });
  });
};

// get info about a specific chat
const getChat = (chat_id: number) => {
  return client.invoke({
    _: 'getChat',
    chat_id: chat_id
  });
};

main();
