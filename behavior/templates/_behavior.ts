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
export class <%= name.constant %>Behavior implements Behavior {
  reset(): void {
  }

  call(_options: BehaviorOptions): BehaviorState {
    return "success";
  }
}
