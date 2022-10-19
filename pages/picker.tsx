import { NextPage } from "next";
import Roulette from "../components/roulette";
import styles from "../styles/Picker.module.css";
import { prisma } from "../prisma/instance";

type PageProps = {
  participants: Array<string>
}

const PickerPage: NextPage<PageProps> = (props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Roulette
          participants={props.participants}
        ></Roulette>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const participants = await prisma.participant.findMany();
  const participantNames = participants.map((participant) => participant.name);

  return {
    props: {
      participants: participantNames
    }
  }
}

export default PickerPage;
