import Mu from "mu-engine";

<% for (i in systems) { -%>
import <%= systems[i].constant %>Component from "../systems/<%= systems[i].kebab %>-component.js";
<% } -%>

export default function <%= name.constant %>State(engine, state) {
  return [ engine, state.unshift(function(engine, state) {
    return Mu.chainSystems(engine, state, [
<% for (i in systems) { -%>
      <%= i.constant %>System(),
<% } -%>
    ]);
  }) ];
};
