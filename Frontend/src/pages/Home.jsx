import { useContext } from "react";
import WalletContext from "../contexts/walletContext";
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { disconnect } = useDisconnect();
  const { getInformation, isLoggedIn, setIsLoggedIn } =
    useContext(WalletContext);
  const navigate = useNavigate();

  const disconnectWallet = async () => {
    await disconnect();
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  console.log(isLoggedIn);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to My Home Page
        </h1>
        <div className="flex flex-wrap gap-2 w-[70%] items-center justify-center mx-auto"></div>
        <p className="text-lg text-gray-200 mb-6">
          Explore our features and connect with your wallet to get started!
        </p>
        <button
          onClick={disconnectWallet}
          className="w-full bg-red-600 hover:bg-red-700 transition ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
        >
          Disconnect Wallet
        </button>

        <button
          onClick={getInformation}
          className="w-full bg-cyan-950 hover:bg-gray-100 transition ease-in-out duration-300 text-white hover:text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
        >
          Get Info
        </button>
      </div>
      {/* create a div fro ENS Metadata if it exists */}
    </div>
  );
};

export default Home;
