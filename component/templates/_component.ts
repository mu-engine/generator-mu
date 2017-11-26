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
<% if (fields[i].defaults !== undefined) { -%>
      <%= fields[i].key %>: <%- fields[i].defaults %>,
<% } -%>
<% } -%>
    });
  }
}
