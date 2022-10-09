import { NextPage } from "next";
import React from "react";
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

interface RouletteState {
  rouletteQueue: Array<string>;
  currentQueueIndex: number;
  selected?: string;
  timerId?: number;
}

class Roulette extends React.Component<RouletteProps, RouletteState> {
  private numberOfParticipants: number;
  private counter: number;

  constructor(props: RouletteProps) {
    super(props);
    this.state = {
      rouletteQueue: [],
      currentQueueIndex: 0,
    };
    this.numberOfParticipants = props.participants.length;
    this.counter = 0;
  }

  componentDidMount(): void {
    console.log("Did mount!");
    this.setState({ rouletteQueue: shuffle(this.props.participants) });
  }

  handlePick(): void {
    console.log("handling pick");
    const tick = () => {
      this.counter++;

      this.setState((state) => ({
        currentQueueIndex:
          state.currentQueueIndex === this.numberOfParticipants - 1
            ? state.currentQueueIndex + 1
            : 0,
        selected: state.rouletteQueue[state.currentQueueIndex + 1],
      }));

      if (this.counter === 15) {
        clearInterval(this.state.timerId);
      }
    }

    const interval = window.setInterval(tick, 500);
    this.setState({ timerId: interval });
  }

  tick(): void {}

  render() {
    return (
      <>
        <h1>Roulette</h1>
        <div>
          {this.state.selected === undefined ? "?" : this.state.selected}
        </div>
        <ul>
          {this.state.rouletteQueue.map((participant, index) => {
            return (
              <li key={participant}>
                {this.state.currentQueueIndex === index &&
                this.state.selected != undefined
                  ? ">"
                  : ""}
                {participant}
              </li>
            );
          })}
        </ul>
        <button onClick={this.handlePick}>Pick</button>
      </>
    );
  }
}

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
