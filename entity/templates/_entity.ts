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
export interface <%= name.constant %>EntityConfig extends <%= parent.constant%>EntityConfig {
<% for (i in components) { -%>
  <%= components[i].key %>: Partial<<%= components[i].constant %>Data>;
<% } -%>
}

export class <%= name.constant %>Entity extends <%= parent.constant %>Entity {
<% for (i in components) { -%>
  <%= components[i].key %>: <%= components[i].constant %>Data;
<% } -%>

  constructor(config?: Partial<<%= name.constant %>EntityConfig>) {
    super(config);
<% for (i in components) { -%>

    this.<%= components[i].key %> = <%= components[i].constant %>Component({});
<% } -%>
<% for (i in systems) { -%>

    <%= systems[i].constant %>System(this);
<% } -%>
  }
}
