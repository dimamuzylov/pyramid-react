import { TonClient } from '@ton/ton';
import { useInit } from './useInit';
import { environment } from '@environment';

export function useTonClient() {
  return useInit(
    async () =>
      new TonClient({
        endpoint: environment.tonClientEndpoint,
      })
  );
}
