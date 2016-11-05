import { Engine, Entity } from "mu-engine";

export default function <%= name.constant %>System(engine: Engine): Engine {
<% if (filters.length > 0) { -%>
  return engine.runIterator([ <%- filters %> ], (value: Engine,
                                                 entity: Entity): Engine => {
    return value;
  });
<% } else { -%>
  return engine; 
<% } -%>
};
