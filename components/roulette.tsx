import { useState, useEffect } from "react";
import styles from "../styles/Picker.module.css";

type RouletteProps = {
  participants: Array<string>;
};

export default function Roulette(props: RouletteProps) {
  let counter: number = 0;
  let timerId: number | null = null;
  const numberOfParticipants = props.participants.length;

  const [selected, setSelected] = useState<string>("?");
  const [rouletteQueue, setRouletteQueue] = useState<Array<string>>(["?"]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [picking, setPicking] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);

  useEffect(() => {
    setRouletteQueue(shuffle(props.participants));
  }, []);

  useEffect(() => {
    setSelected(rouletteQueue[currentQueueIndex]);
  }, [currentQueueIndex]);

  const pick = () => {
    setPicking(true);

    const runCount = getRandomInt(
      numberOfParticipants * 3,
      numberOfParticipants * 4
    );

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

  const listItems = rouletteQueue.map((participant, index) => {
    return (
      <li key={participant}>
        <div className={styles.row}>
          <div className={styles.cursor}>
            {currentQueueIndex === index && (picking || hasResult) ? ">" : ""}
          </div>
          <div className={styles.column}>{participant}</div>
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

  return (
    <div>
      <h1>Roulette</h1>
      <p>{picking || hasResult ? selected : "?"}</p>
      <ul className={styles.nakedList}>{listItems}</ul>
      {button}
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

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // minimum inclusive, maximum exclusive
  return Math.floor(Math.random() * (max - min) + min);
}
