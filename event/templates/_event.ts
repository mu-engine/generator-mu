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
<% if (types.length > 1) { -%>
export type <%= name.constant %>EventType = "<%= types[0] %>" |
<% for (let i = 1; i < types.length - 1; ++i) { -%>
  "<%= types[i] %>" |
<% } -%>
  "<%= types[types.length - 1] %>";
<% } else { -%>
export type <%= name.constant %>EventType = "<%= types[0] %>";
<% } -%>

export interface <%= name.constant %>EventData {
  type: <%= name.constant %>EventType;
<% for (i in fields) { -%>
  <%= fields[i].key %>: <%- fields[i].type %>,
<% } -%>
}

export class <%= name.constant %>Event implements <%= name.constant %>Event {
  type: <%= name.constant %>EventType;
<% for (i in fields) { -%>
  <%= fields[i].key %>: <%- fields[i].type %>,
<% } -%>

  constructor(options?: Partial<<%= name.constant %>EventData>) {
    Object.assign(this, {
      type: "<%= types[0] %>",
<% for (i in fields) { -%>
<% if (fields[i].defaults !== "") { -%>
      <%= fields[i].key %>: <%- fields[i].defaults %>,
<% } -%>
<% } -%>
    });
  }
}
