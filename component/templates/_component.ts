import * as Immutable from "immutable";

export default Immutable.Record({
<% for (i in fields) { -%>
  <%= fields[i].key %>: <%- fields[i].value %>,
<% } -%>
}, "<%= name.constant %>Component");
