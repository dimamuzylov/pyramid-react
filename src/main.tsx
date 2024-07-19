import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ContractContextProvider } from './context/ContractContextProvider.tsx';
import { SDKProvider } from '@tma.js/sdk-react';
import './index.css';
import './i18n';

const manifestUrl = 'https://pyramid-react.github.io/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SDKProvider debug acceptCustomStyles>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <ContractContextProvider>
          <App />
        </ContractContextProvider>
      </TonConnectUIProvider>
    </SDKProvider>
  </React.StrictMode>
);
