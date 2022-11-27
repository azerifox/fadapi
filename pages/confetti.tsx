import { NextPage } from "next";
import { useCallback } from "react";
import type {
  Container,
  Engine,
} from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { onDemandConfettiOptions } from "../app/particleOptions";

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

  return <Particles options={onDemandConfettiOptions} init={particlesInit} />;
};

export default ConfettiPage;
