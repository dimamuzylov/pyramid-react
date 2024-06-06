import { useTonConnectUI } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';

export function useConnection(): {
  sender: Sender;
  connected: boolean;
  disconnect(): Promise<void>;
} {
  const [TonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        TonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
        });
      },
    },
    connected: TonConnectUI.connected,
    disconnect: () => TonConnectUI.disconnect(),
  };
}
