import { useContext, useEffect, useState, useMemo } from "react";
import WalletContext from "../contexts/walletContext";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useAccount, useDisconnect } from "wagmi";
import Identicon from "identicon.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, connectWallet, setIsLoggedIn } =
    useContext(WalletContext);
  const [darkMode, setDarkMode] = useState(false);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const disconnectWallet = async () => {
    await disconnect();
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Generate identicon from the address
  const avatar = useMemo(() => {
    if (isConnected && address) {
      const hash = address.toLowerCase(); // Use address as input for identicon
      const identicon = new Identicon(hash, { size: 50, format: "svg" });
      return `data:image/svg+xml;base64,${btoa(identicon.toString())}`; // Returns SVG as base64 string
    }
    return null;
  }, [isConnected, address]);

  // Default avatar and address if not logged in
  const defaultAvatar = "https://via.placeholder.com/64";
  const walletAddress = isConnected
    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
    : "0x0000...";

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="fixed w-full bg-gray-400 dark:bg-gray-900 dark:text-gray-100 shadow-lg">
      <div className="flex justify-around items-center px-6 py-4">
        {/* Logo Section */}
        <div className="text-3xl font-bold text-white">
          <img
            src={"/gem1.svg"}
            className="w-10 hover:cursor-pointer"
            alt="Logo"
          />
        </div>

        {/* Nav Links */}
        <nav className="flex space-x-8 text-lg text-white">
          <a href="/" className="hover:text-gray-300 transition duration-300">
            Home
          </a>
          <a
            href="/about"
            className="hover:text-gray-300 transition duration-300"
          >
            About
          </a>
          <a
            href="/services"
            className="hover:text-gray-300 transition duration-300"
          >
            Services
          </a>
        </nav>

        {isLoggedIn ? (
          <p
            onClick={disconnectWallet}
            className="hover:text-red-500 hover:underline text-red-600 font-semibold transition duration-300 hover:cursor-pointer"
          >
            Disconnect
          </p>
        ) : (
          <p
            onClick={connectWallet}
            className="text-yellow-500 font-semibold hover:underline transition duration-300 hover:cursor-pointer"
          >
            Connect Wallet
          </p>
        )}

        <button className="mx-10" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <MdOutlineLightMode className="w-6 h-6 text-gray-800 dark:text-white" />
          ) : (
            <MdDarkMode className="w-6 h-6 text-gray-800 dark:text-white" />
          )}
        </button>

        {/* Wallet Avatar and Address */}
        <div className="flex items-center space-x-3">
          <img
            src={isLoggedIn ? avatar || defaultAvatar : defaultAvatar}
            alt="Wallet Avatar"
            className="w-10 h-10 rounded-lg border-2 border-white dark:border-yellow-500 shadow-md object-cover"
          />
          <span className="text-lg text-white font-semibold dark:text-yellow-500">
            {walletAddress}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
