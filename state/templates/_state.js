import Mu from "mu-engine";

export default function <%= name.constant %>State(engine, state) {
  return [ engine, state.unshift(function(engine, state) {
    return Mu.chainSystems(engine, state, []);
  }) ];
};
