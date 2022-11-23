import { NextPage } from "next";
import Roulette from "../components/roulette";
import styles from "../styles/Picker.module.css";
import { Participant, PickMemory } from "@prisma/client";
import { useEffect, useState } from "react";
import Api from "../api";

const PickerPage: NextPage = () => {
  const [participants, setParticipants] = useState<Array<Participant>>();
  const [pickMemory, setPickMemory] = useState<Array<PickMemory>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Api.get<Array<Participant>>("/api/participants").then((participants) =>
      setParticipants(participants)
    );
    Api.get<Array<PickMemory>>("/api/pick-memory").then((pickMemory) =>
      setPickMemory(pickMemory)
    );
  }, []);

  useEffect(() => {
    if (participants !== undefined && pickMemory !== undefined) {
      setIsLoading(false);
    }
  }, [participants, pickMemory]);

  const pickedParticipants = participants?.filter((participant) =>
    pickMemory?.some((pick) => pick.participantId === participant.id)
  );

  const content = isLoading ? (
    <h1>Sekündchen...</h1>
  ) : (
    <Roulette
      participants={participants ?? []}
      pickedParticipants={pickedParticipants ?? []}
    ></Roulette>
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>{content}</main>
    </div>
  );
};

export default PickerPage;
