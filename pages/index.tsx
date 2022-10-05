import type { NextPage } from "next";
import Wallet from "../components/Wallet";
import { useMetamask } from "../hooks/useMetamask";

const Home: NextPage = () => {
  const { state } = useMetamask();

  return (
    <>
      <Wallet />
    </>
  );
};

export default Home;
