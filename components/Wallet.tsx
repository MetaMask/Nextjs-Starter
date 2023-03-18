import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetamask } from "../hooks/useMetamask";
import { Loading } from "./Loading";
import { useState } from "react";
export default function Wallet() {
  const {
    dispatch,
    state: { status, isMetamaskInstalled, wallet, balance },
  } = useMetamask();
  const listen = useListen();

  const showInstallMetamask =
    status !== "pageNotLoaded" && !isMetamaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetamaskInstalled && !wallet;

  const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

  const [navbar, setNavbar] = useState(false);
  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      dispatch({ type: "connect", wallet: accounts[0], balance });

      // we can register an event listener for changes to the users wallet
      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleAddUsdc = async () => {
    dispatch({ type: "loading" });

    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          decimals: 18,
          image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=023",
        },
      },
    });
    dispatch({ type: "idle" });
  };

  return (
    <div>
      {/* <div className="bg-truffle">
        <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8"> */}
      {/* <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Metamask API intro</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white">
            Follow along with the{" "}
            <Link
              href="https://github.com/GuiBibeau/web3-unleashed-demo"
              target="_blank"
            >
              <span className="underline cursor-pointer">Repo</span>
            </Link>{" "}
            in order to learn how to use the Metamask API.
          </p> */}

      <nav className="w-full bg-slate-500 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="#!">
                <h2 className="text-2xl font-bold text-white">LOGO</h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1  justify-self-end pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                {/* <li className="text-white hover:text-indigo-200">
                  <Link href="#!">Home</Link>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <Link href="#!">Blog</Link>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <Link href="#!">About US</Link>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <Link href="#!">Contact US</Link>
                </li> */}
                <li className="text-white hover:text-indigo-200">
                  <Link
                    href="#!"
                    className="px-3.5 py-2 rounded-md inline-block bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300 text-white border border-green-500 align-middle font-semibold transition-colors leading-tight focus:outline-none space-x-2 relative lg:hidden"
                  >
                    Sell your ticket
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden space-x-2 md:inline-block">
            <Link
              href="#!"
              className="px-3.5 py-2 rounded-md inline-block bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300 text-white border border-green-500 align-middle font-semibold transition-colors leading-tight focus:outline-none space-x-2 relative"
            >
              Sell your ticket
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative">
        <div
          className="bg-cover bg-center h-96 flex items-center justify-center relative -z-1 w-full object-cover"
          style={{
            backgroundImage: `url('https://tixel.com/cdn-cgi/image/width=1792,format=auto/images/home/hero-20210901.jpg?size=1792')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full h-full bg-transparent-black-600">
            <div className="mx-auto px-4 flex items-center h-full">
              <div className="w-full text-black">
                <div className="text-center">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                      Buy Safe. Sell Easy.
                    </span>
                  </h1>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
                    The honest ticket marketplace.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="pb-6 md:pt-12 md:pb-12 pt-6 max-w-5xl mx-auto relative z-10">
        <div className="flex items-baseline space-x-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold flex items-center">
            What&#39;s on in Sydney
          </h2>
          <p>
            <a
              href="/au/Sydney/discover/all"
              className="hover:text-black text-orange-500 space-x-1"
            >
              <strong className="font-semibold">View all</strong>
            </a>
          </p>
        </div>
      </section>

      {wallet && balance && (
        <div className=" px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <div className="flex items-center">
                <div className="ml-4">
                  <h3 className="text-lg font-medium leading-6 text-white">
                    Address: <span>{wallet}</span>
                  </h3>
                  <p className="text-sm text-white">
                    Balance:{" "}
                    <span>
                      {(parseInt(balance) / 1000000000000000000).toFixed(4)} ETH
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConnectButton && (
        <button
          onClick={handleConnect}
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto"
        >
          {status === "loading" ? <Loading /> : "Connect Wallet"}
        </button>
      )}

      {showInstallMetamask && (
        <Link
          href="https://metamask.io/"
          target="_blank"
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto"
        >
          Install Metamask
        </Link>
      )}

      {isConnected && (
        <div className="flex  w-full justify-center space-x-2">
          <button
            onClick={handleAddUsdc}
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto"
          >
            {status === "loading" ? <Loading /> : "Add Token"}
          </button>
          <button
            onClick={handleDisconnect}
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto"
          >
            Disconnect
          </button>
        </div>
      )}
      {/* </div>
      </div> */}
    </div>
  );
}
