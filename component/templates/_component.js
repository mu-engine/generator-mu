import Immutable from "immutable";

export default Immutable.Record({
<% for (i in fields) { -%>
  <%= fields[i] %>: null,
<% } -%>
}, "<%= name.constant %>Component");
