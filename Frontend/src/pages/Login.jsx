import { useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi"; // Import the useAccount hook
import WalletContext from "../contexts/walletContext";

const Login = () => {
  const {
    // connectWallet,
    signInWithEthereum,
    isLoggedIn,
  } = useContext(WalletContext);

  // Get the account status from wagmi
  const { isConnected, isConnecting, address } = useAccount();

  console.log("Is Connected: ", isConnected);
  console.log("Is Connecting: ", isConnecting);
  console.log("Address: ", address);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 dark:bg-gray-700 text-white">
      <div className="bg-transparent shadow-white p-10 rounded-lg shadow-md max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Login
        </h1>

        <div className="space-y-4 justify-center mx-auto items-center flex flex-col">
          {/* ConnectButton displays wallet info */}
          <ConnectButton className="mx-auto items-start justify-center w-full text-center flex" />

          {isConnected && !isLoggedIn && (
            <>
              {/* Custom Sign in button */}
              <button
                onClick={signInWithEthereum}
                className="w-full bg-yellow-500 hover:bg-yellow-600 transition ease-in-out duration-300 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
              >
                Sign in with Ethereum
              </button>
            </>
          )}

          {isLoggedIn && (
            <p className="text-lg font-semibold text-green-400">
              Logged in successfully!
            </p>
          )}

          {isConnecting && <p className="text-yellow-500">Connecting...</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
