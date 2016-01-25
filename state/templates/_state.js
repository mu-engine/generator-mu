import Mu from "mu-engine";

export default function <%= name.constant %>State() {
  return function(engine, state) {
    return Mu.chainSystems(engine, state, []);
  };
};
