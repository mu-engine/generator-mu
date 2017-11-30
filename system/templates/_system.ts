<% for (let e of imports) { -%>
<% if (e.list.length > 1) { -%>
import {
<% for (let f of e.list) { -%>
  <%= f %>
<% } -%>
} from "<%= e.name %>";

<% } else { -%>
import { <%= e.list[0] %> } from "<%= e.name %>";

<% } -%>
<% } -%>
export interface <%= name.constant %>SystemEntity extends <%= parent.type %>Entity {
<% for (let e of components) { -%>
  <%= e.key %>: <%- e.type %>Data,
<% } -%>
}

export function <%= name.constant %>System(entity: <%= name.constant %>SystemEntity): void {
<% for (let e of events) { -%>
<% if (e.type !== "") { -%>

  entity.on("<%= e.key %>", (ev: <%= e.type %>EventData) => {
  });
<% } else { -%>

  entity.on("<%= e.key %>", () => {
  });
<% } -%>
<% } -%>
}
