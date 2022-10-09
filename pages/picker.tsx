import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Picker.module.css";

const PickerPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Roulette
          participants={["Max", "Susi", "Peter", "Rudolf", "Anna", "Luise"]}
        ></Roulette>
      </main>
    </div>
  );
};

type RouletteProps = {
  participants: Array<string>;
};

function Roulette(props: RouletteProps) {
  let counter: number = 0;
  let timerId: number | null = null;
  const numberOfParticipants = props.participants.length;
  const [selected, setSelected] = useState<string>("?");
  const [rouletteQueue, setRouletteQueue] = useState<Array<string>>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);

  useEffect(() => {
    setRouletteQueue(shuffle(props.participants));
  }, []);

  useEffect(() => {
    setSelected(rouletteQueue[currentQueueIndex]);
  }, [currentQueueIndex]);

  const pick = () => {
    timerId = window.setInterval(() => {
      counter++;

      setCurrentQueueIndex((previousIndex) =>
        previousIndex === numberOfParticipants - 1 ? 0 : previousIndex + 1
      );

      if (counter === 15) {
        window.clearInterval(timerId as number);
      }
    }, 100);
  };

  const listItems = rouletteQueue.map((participant, index) => {
    return (
      <li key={participant}>
        {currentQueueIndex === index && selected != undefined ? ">" : ""}
        {participant}
      </li>
    );
  });

  return (
    <div>
      <h1>Roulette</h1>
      <p>{selected}</p>
      <ul>{listItems}</ul>
      <button onClick={pick}>Pick</button>
    </div>
  );
}

// Fisher-Yates algorithm - for equally probable random permutations
function shuffle(input: string[]) {
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

export default PickerPage;
