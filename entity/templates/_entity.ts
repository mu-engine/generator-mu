import * as Immutable from "immutable";

<% if (components.length > 0) { -%>
<% for (c of components) { -%>
import <%= c.constant %>Component from "<%= c.path %>";
<% } -%>

<% } -%>
export default Immutable.Record({
  meta: null,
<% for (i in components) { -%>
  <%= components[i].camel %>: new <%= components[i].constant %>Component({}),
<% } -%>
}, "<%= name.constant %>Entity");
