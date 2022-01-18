import dotenv from 'dotenv';
import path from 'node:path';
import Client from 'tdl';
import { TDLib } from 'tdl-tdlib-addon';

/**
 * initializes the app
 * @returns a {@link Client} that's all set up and ready to go,
 * provided that it is passed the correct environment variables
 */
export const initializeClient = (): Client => {
  dotenv.config();

  // your copy of libtdjson.so here
  const tdLibLoc = process.env.LIB_TD_LOCATION;
  // your apiId from the Telegram app dashboard
  const apiId = process.env.TEFLON_API_ID
    ? parseInt(process.env.TEFLON_API_ID)
    : undefined;
  // your apiHash from the Telegram app dashboard
  const apiHash = process.env.TEFLON_API_HASH;

  if (!tdLibLoc || !apiId || !apiHash) {
    process.abort();
  }

  return new Client(new TDLib(path.resolve(tdLibLoc)), {
    apiId: apiId,
    apiHash: apiHash
  });
};
