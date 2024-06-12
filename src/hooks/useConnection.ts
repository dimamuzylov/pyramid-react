import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';

export function useConnection(): {
  sender: Sender;
  connected: boolean;
  disconnect(): Promise<void>;
} {
  const [TonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

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
    connected: !!wallet?.account,
    disconnect: () => TonConnectUI.disconnect(),
  };
}
