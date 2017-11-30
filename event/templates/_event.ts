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
<% for (let e of fields) { -%>
  <%= f.key %>: <%= e.type %>,
<% } -%>
}

export class <%= name.constant %>Event implements <%= name.constant %>Event {
  type: <%= name.constant %>EventType;
<% for (let e of fields) { -%>
  <%= e.key %>: <%= e.type %>,
<% } -%>

  constructor(options?: Partial<<%= name.constant %>EventData>) {
    Object.assign(this, {
      type: "<%= types[0] %>",
<% for (let e of fields) { -%>
<% if (e.defaults !== "") { -%>
      <%= e.key %>: <%= e.defaults %>,
<% } -%>
<% } -%>
    });
  }
}
