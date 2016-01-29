import Immutable from "immutable";

<% for (i in components) { -%>
import <%= components[i].constant %>Component from "./components/<%= components[i].kebab %>-component.js";
<% } -%>

export default Immutable.Record({
  meta: null,
<% for (i in components) { -%>
  <%= components[i].camel %>: <%= components[i].constant %>Component({}),
<% } -%>
}, "<%= name.constant %>Entity");
