import { Participant, Role } from "@prisma/client";
import { useState, useEffect, useCallback, useRef } from "react";
import Particles from "react-tsparticles";
import { Container, Engine } from "tsparticles-engine";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import Api from "../api";
import { PickRequestBody } from "../../pages/api/pick-memory";
import styles from "./Picker.module.css";
import { onDemandConfettiOptions } from "../particleOptions";
import { getRandomInt } from "../calculations";

type RouletteProps = {
  participants: Array<Participant>;
  pickedParticipants: Array<Participant>;
};

export default function Roulette(props: RouletteProps) {
  let counter: number = 0;
  let timerId: number | null = null;
  const numberOfParticipants = props.participants.length;

  const [selected, setSelected] = useState<string>("?");
  const [rouletteQueue, setRouletteQueue] = useState<Array<Participant>>();
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [picking, setPicking] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [inactiveParticipants, setInactiveParticipants] = useState<
    Array<Participant>
  >([]);

  const particleContainerRef = useRef<Container>(null);
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback((container: Container | undefined) => {
    console.log(container);
  }, []);

  useEffect(() => {
    setRouletteQueue(shuffle(props.participants));
    setInactiveParticipants(props.pickedParticipants);
  }, []);

  useEffect(() => {
    if (rouletteQueue !== undefined) {
      setSelected(rouletteQueue[currentQueueIndex].name);
    }
  }, [currentQueueIndex]);

  useEffect(() => {
    if (rouletteQueue !== undefined && hasResult) {
      const winner = rouletteQueue[currentQueueIndex];
      console.log(`submitting winner ${winner.name}`);
      const requestBody: PickRequestBody = {
        pickedParticipant: winner,
      };

      Api.post("/api/pick-memory", requestBody)
        .then(() => {
          setInactiveParticipants((previous) => previous.concat(winner));
        })
        .catch((error) => console.log(error));
    }
  }, [hasResult]);

  const pick = () => {
    setPicking(true);

    let runCount = getRandomInt(
      numberOfParticipants * 2,
      numberOfParticipants * 3
    );

    const winParticipationByIndex =
      rouletteQueue?.map((participant) => {
        if (
          participant.role === Role.JokeFiller ||
          inactiveParticipants.some(
            (inactiveParticipant) => participant.id === inactiveParticipant.id
          )
        ) {
          return false;
        } else {
          return true;
        }
      }) ?? [];

    let winnerIndex;
    while (winnerIndex === undefined) {
      const endPosition = runCount % numberOfParticipants;
      const isAvailableParticipant = winParticipationByIndex[endPosition];

      if (isAvailableParticipant) {
        winnerIndex = endPosition;
        console.log(`winner index: ${winnerIndex}`);
      } else {
        runCount++;
      }
    }

    console.log(`runCount: ${runCount}`);

    timerId = window.setInterval(() => {
      counter++;

      setCurrentQueueIndex((previousIndex) =>
        previousIndex === numberOfParticipants - 1 ? 0 : previousIndex + 1
      );

      if (counter === runCount) {
        window.clearInterval(timerId as number);
        counter = 0;
        setPicking(false);
        setHasResult(true);
      }
    }, 100);
  };

  const reset = () => {
    setCurrentQueueIndex(0);
    setHasResult(false);
    setSelected("?");
  };

  const listItems = rouletteQueue?.map((participant, index) => {
    return (
      <li key={participant.id}>
        <div className={styles.row}>
          <div className={styles.cursor}>
            {currentQueueIndex === index && (picking || hasResult) ? ">" : ""}
          </div>
          <div className={styles.column}>
            {participant.name} (
            {participant.role === Role.TeamMember ? "T" : "JF"})
          </div>
        </div>
      </li>
    );
  });

  const button = hasResult ? (
    <button onClick={reset}>Reset</button>
  ) : (
    <button disabled={picking} onClick={pick}>
      {picking ? "Picking" : "Pick"}
    </button>
  );

  const alreadyPickedListItems = inactiveParticipants.map((participant) => {
    return <li key={participant.id}>{participant.name}</li>;
  });

  let particles = hasResult ? (
    <Particles
      container={particleContainerRef}
      init={particlesInit}
      options={onDemandConfettiOptions}
    />
  ) : (
    <div></div>
  );

  return (
    <>
      <div>
        <h1>Roulette</h1>
        <p>{picking || hasResult ? selected : "?"}</p>
        <ul className={styles.nakedList}>{listItems}</ul>
        {button}
      </div>
      <div>
        <label>Already picked:</label>
        <ul>{alreadyPickedListItems}</ul>
      </div>
      {particles}
    </>
  );
}

// Fisher-Yates algorithm - for equally probable random permutations
function shuffle(input: Participant[]) {
  let elements = input.slice();

  for (
    let walkingIndex = elements.length - 1;
    walkingIndex > 0;
    walkingIndex--
  ) {
    // random index from 0 to current position of reverse walking index
    let randomIndex = Math.floor(Math.random() * (walkingIndex + 1));

    // destructuring assignment syntax
    [elements[walkingIndex], elements[randomIndex]] = [
      elements[randomIndex],
      elements[walkingIndex],
    ];
  }

  return elements;
}
