import { RecursivePartial, IOptions } from "tsparticles-engine";

export const onDemandConfettiOptions: RecursivePartial<IOptions> = {
  preset: "confetti",
  particles: {
    color: {
      //value: ["#06a95b", "#e43537", "#e8d04d", "#f4ebc7", "#079ddc"],
      value: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    },
    life: {
      duration: {
        sync: false,
        value: 7,
      },
      count: 1,
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        acceleration: 40,
      },
      speed: 80,
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
        quantity: 400,
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
