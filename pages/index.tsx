import type { NextPage } from "next";
import Wallet from "../components/Wallet";
import { useMetamask } from "../hooks/useMetamask";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { state } = useMetamask();

  return (
    <>
      <Wallet />
    </>
  );
};

export default Home;
