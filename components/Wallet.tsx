import Image from "next/future/image";
import Link from "next/link";
import { useMetamask } from "../hooks/useMetamask";
import { Loading } from "./Loading";

export default function Wallet() {
  const {
    dispatch,
    state: { status, isMetamaskInstalled },
  } = useMetamask();

  const showInstallMetamask =
    status !== "pageNotLoaded" && !isMetamaskInstalled;
  const showConnectButton = status !== "pageNotLoaded" && isMetamaskInstalled;

  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      dispatch({ type: "connect", wallet: accounts[0] });
    }
  };

  return (
    <div className="bg-truffle">
      <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
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
        </p>
        {showConnectButton && (
          <button
            onClick={handleConnect}
            className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto"
          >
            {status === "loading" ? <Loading /> : "Connect Wallet"}
          </button>
        )}

        {showInstallMetamask && (
          <Link href="https://metamask.io/" target="_blank">
            <a className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto">
              Connect Wallet
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
