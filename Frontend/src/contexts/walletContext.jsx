import { createContext } from "react";

const WalletContext = createContext({
  balance: 0,
  isLoggedIn: false,
  connected: false,
  connectWallet: () => {},
  disconnectWallet: () => {},
  getInformation: () => {},
  signInWithEthereum: () => {},
  ENSMetadata: [],
});

export default WalletContext;
