import type { NextPage } from "next";
import Connect from "../components/Connect";
import { useMetamask } from "../hooks/useMetamask";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { state } = useMetamask()
  
  return (
    <>
      <Connect />
    </>
  );
};

export default Home;