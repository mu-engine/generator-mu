<% for (i in imports) { -%>
<% if (imports[i].list.length > 1) { -%>
import {
<% for (j in imports[i].list) { -%>
  <%= imports[i].list[j] %>
<% } -%>
} from "<%= imports[i].name %>";

<% } else { -%>
import { <%= imports[i].list[0] %> } from "<%= imports[i].name %>";

<% } -%>
<% } -%>
export interface <%= name.constant %>SystemEntity extends <%= parent.type %>Entity {
<% for (i in components) { -%>
  <%= components[i].key %>: <%- components[i].type %>Data,
<% } -%>
}

export function <%= name.constant %>System(entity: <%= name.constant %>SystemEntity): void {
<% for (i in events) { -%>
<% if (events[i].type !== "") { -%>

  entity.on("<%= events[i].key %>", (ev: <%= events[i].type %>EventData) => {
  });
<% } else { -%>

  entity.on("<%= events[i].key %>", () => {
  });
<% } -%>
<% } -%>
}
