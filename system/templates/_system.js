import Mu from "mu-engine";

export default function <%= name.constant %>System() {
  return function(engine, state) {
<% if (filters.length > 0) { -%>
    return [ Mu.runSystem(engine, [ <%- filters %> ], function(engine, entity) {
      return engine;
    }), state ];
<% } else { -%>
    return [ engine, state ];
<% } -%>
  };
};
