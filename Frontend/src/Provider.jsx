import PropTypes from "prop-types";
import { BrowserProvider } from "ethers";
import { useState, useEffect } from "react";
import { SiweMessage } from "siwe";
import WalletContext from "./contexts/walletContext";
import { useNavigate } from "react-router-dom";
import blockies from "ethereum-blockies";

export default function Providers({ children }) {
  const domain = window.location.host;
  const origin = window.location.origin;
  const provider = new BrowserProvider(window.ethereum);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [connected, setIsConnected] = useState(false);
  const [ENSMetadata, setENSMetadata] = useState(null);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  const BACKEND_ADDR = "http://localhost:5000";

  async function createSiweMessage(address, statement) {
    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
      credentials: "include",
    });
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: "1",
      nonce: await res.text(),
    });
    return message.prepareMessage();
  }

  async function connectWallet() {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
      setIsConnected(true);
      console.log("Connected address:", accounts[0]);
    } catch {
      console.log("User rejected wallet connection request");
    }
  }

  async function disconnectWallet() {
    setIsConnected(false);
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  async function signInWithEthereum() {
    try {
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      const message = await createSiweMessage(
        walletAddress,
        "Sign in with Ethereum to the app."
      );
      const signature = await signer.signMessage(message);

      const res = await fetch(`${BACKEND_ADDR}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
        credentials: "include",
      });

      console.log("Verification response:", await res.text());
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("Error signing in:", error);
    }
  }

  async function getInformation() {
    const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.error(`Failed in getInformation: ${res.statusText}`);
      return;
    }

    const result = await res.text();
    const fetchedAddress = result.split(" ").pop();
    setAddress(fetchedAddress);

    // Ensure ENSMetadata updates properly in context by awaiting displayENSProfile
    await displayENSProfile(fetchedAddress);
  }

  async function displayENSProfile(fetchedAddress) {
    try {
      if (!fetchedAddress) {
        console.error("No valid address provided to display ENS profile.");
        return;
      }
      const ensName = await provider.lookupAddress(fetchedAddress);

      if (ensName) {
        const resolver = await provider.getResolver(ensName);
        const keys = ["email", "url", "description", "com.twitter"];

        const ensData = {
          name: ensName,
          avatar: generateAvatar(fetchedAddress),
          records: {},
        };

        for (const key of keys) {
          ensData.records[key] = await resolver.getText(key);
        }

        setENSMetadata(ensData); // Set at the end after fetching all records
      } else {
        setENSMetadata({
          name: fetchedAddress,
          avatar: generateAvatar(fetchedAddress),
        });
      }

      console.log("Updated ENSMetadata: ", ENSMetadata); // Check if data shows up here
    } catch (error) {
      console.log("Error fetching ENS data:", error);
    }
  }

  function generateAvatar(address) {
    return blockies.create({ seed: address, size: 8, scale: 16 }).toDataURL();
  }

  useEffect(() => {
    if (address) {
      displayENSProfile(address);
    }

    if (ENSMetadata) {
      console.log("ENSMetadata updated: ", ENSMetadata); // Confirm updates here
    }
  }, [address]);

  return (
    <WalletContext.Provider
      value={{
        isLoggedIn,
        connected,
        connectWallet,
        disconnectWallet,
        signInWithEthereum,
        getInformation,
        ENSMetadata,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.node,
};
