import { Engine } from "mu-engine";

<% if (systems.length > 0)  { -%>
<% for (s of systems) { -%>
import <%= s.constant %>System from "<%= s.path %>";
<% } -%>

<% } -%>
export default function <%= name.constant %>State(engine: Engine): Engine {
  return engine.pushState((engine: Engine: event: Object): Engine => {
    return engine;
  });
};
