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
export interface <%= name.constant %>Data {
<% for (i in fields) { -%>
  <%= fields[i].key %>: <%- fields[i].type %>,
<% } -%>
}

export class <%= name.constant %>Component implements <%= name.constant %>Data {
<% for (i in fields) { -%>
  <%= fields[i].key %>: <%- fields[i].type %>,
<% } -%>

  constructor(options?: Partial<<%= name.constant %>Data>) {
    Object.assign(this, {
<% for (i in fields) { -%>
<% if (fields[i].defaults !== "") { -%>
      <%= fields[i].key %>: <%- fields[i].defaults %>,
<% } -%>
<% } -%>
    });
  }
}
