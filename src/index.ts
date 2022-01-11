import path from 'node:path';
import Client from 'tdl';
import { TDLib } from 'tdl-tdlib-addon';

const client = new Client(
  new TDLib(path.resolve('~/td/tdlib/lib/libtdjson.so')),
  {
    apiId: 2222,
    apiHash: 'hash'
  }
);

client.on('error', console.error);
client.on('update', (update) => {
  console.log('Received update: ', update);
});

const main = async () => {
  await client.connectAndLogin();
  console.log(await client.invoke({ _: 'getMe' }));
};

main();
