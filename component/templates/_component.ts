<% for (let e of imports) { -%>
<% if (e.list.length > 1) { -%>
import {
<% for (let j of e.list) { -%>
  <%= j %>
<% } -%>
} from "<%= e.name %>";

<% } else { -%>
import { <%= e.list[0] %> } from "<%= e.name %>";

<% } -%>
<% } -%>
export interface <%= name.constant %>Data {
<% for (let e of fields) { -%>
  <%= e.key %>: <%- e.type %>,
<% } -%>
}

export class <%= name.constant %>Component implements <%= name.constant %>Data {
<% for (let e of fields) { -%>
  <%= e.key %>: <%- e.type %>,
<% } -%>

  constructor(options?: Partial<<%= name.constant %>Data>) {
    Object.assign(this, {
<% for (let e of fields) { -%>
<% if (e.defaults !== "") { -%>
      <%= e.key %>: <%- e.defaults %>,
<% } -%>
<% } -%>
    });
  }
}
