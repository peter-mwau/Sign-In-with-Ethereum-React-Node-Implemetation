import { useContext } from "react";
import WalletContext from "../contexts/walletContext";

const Login = () => {
  const {
    connectWallet,
    connected,
    // sendForVerification,
    signInWithEthereum,
    isLoggedIn,
    // message,
    // signature,
  } = useContext(WalletContext);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 dark:bg-gray-700 text-white">
      <div className="bg-transparent shadow-white p-10 rounded-lg shadow-md max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold mb-4">Login</h1>

        {!connected && !isLoggedIn ? (
          <button
            onClick={connectWallet}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
          >
            Connect Wallet
          </button>
        ) : !isLoggedIn ? (
          <div className="space-y-4">
            <button
              onClick={signInWithEthereum}
              className="w-full bg-yellow-500 hover:bg-yellow-600 transition ease-in-out duration-300 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
            >
              Sign in with Ethereum
            </button>
            {/* {message && signature && (
              <button
                onClick={sendForVerification}
                className="w-full bg-green-500 hover:bg-green-600 transition ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
              >
                Verify Signature
              </button>
            )} */}
          </div>
        ) : (
          <p className="text-lg font-semibold text-green-400">
            Logged in successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
