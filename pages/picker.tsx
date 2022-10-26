import { NextPage } from "next";
import Roulette from "../components/roulette";
import styles from "../styles/Picker.module.css";
import { Participant } from "@prisma/client";
import { useEffect, useState } from "react";

const PickerPage: NextPage = () => {
  const [participants, setParticipants] = useState<Array<Participant>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/participants").then((response) => {
      response.json().then((data) => setParticipants(data.participants));
      setIsLoading(false);
    });
  }, []);

  const content = isLoading ? (
    <p>Loading...</p>
  ) : (
    <Roulette participants={participants}></Roulette>
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>{content}</main>
    </div>
  );
};

export default PickerPage;
