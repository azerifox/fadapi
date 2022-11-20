import { NextPage } from "next";
import { useCallback } from "react";
import type {
  Container,
  Engine,
  IOptions,
  RecursivePartial,
} from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

const ConfettiPage: NextPage = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  const options: RecursivePartial<IOptions> = {
    preset: "confetti",
    particles: {
      color: {
        //value: ["#06a95b", "#e43537", "#e8d04d", "#f4ebc7", "#079ddc"],
        value: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 2,
          startValue: "max",
          destroy: "min",
        },
      },
      life: {
        duration: {
          sync: true,
          value: 5,
        },
        count: 1,
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 10,
        },
        speed: 30,
        decay: 0.05,
        outModes: {
          default: "destroy",
          top: "none",
        },
      },
    },
    emitters: [
      {
        life: {
          count: 0,
          duration: 0.1,
          delay: 0.1,
        },
        rate: {
          delay: 3,
          quantity: 300,
        },
        size: {
          width: 80,
          height: 30,
        },
        position: {
          x: 50,
          y: 40,
        },
      },
      {
        life: {
          count: 0,
          duration: 0.1,
          delay: 0.1,
        },
        rate: {
          delay: 0.4,
          quantity: 20,
        },
        size: {
          width: 0,
          height: 0,
        },
      },
    ],
  };

  return <Particles options={options} init={particlesInit} />;
};

export default ConfettiPage;
