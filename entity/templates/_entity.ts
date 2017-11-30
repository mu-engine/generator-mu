<% for (let e of imports) { -%>
<% if (e.list.length > 1) { -%>
import {
<% for (f of e.list) { -%>
  <%= f %>
<% } -%>
} from "<%= e.name %>";

<% } else { -%>
import { <%= e.list[0] %> } from "<%= e.name %>";

<% } -%>
<% } -%>
export interface <%= name.constant %>EntityConfig extends <%= parent.type %>EntityConfig {
<% for (let e of components) { -%>
  <%= e.key %>: Partial<<%= e.type %>Data>;
<% } -%>
}

export class <%= name.constant %>Entity extends <%= parent.type %>Entity {
<% for (let e of components) { -%>
  <%= e.key %>: <%= e.type %>Data;
<% } -%>

  constructor(config?: Partial<<%= name.constant %>EntityConfig>) {
    super(config);
<% for (let e of components) { -%>

    this.<%= e.key %> = <%= e.type %>Component({});
<% } -%>
<% for (let e in systems) { -%>

    <%= e.type %>System(this);
<% } -%>
  }
}
