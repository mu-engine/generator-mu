var yo = require("yeoman-generator");
var util = require("../util");

module.exports = yo.Base.extend({
  constructor: function() {
    yo.Base.apply(this, arguments);

    this.option("name", {
      desc: "Component name. Expects kebab case.",
      type: String,
    });

    this.option("fields", {
      desc: "Comma seperated list of fields. Expects camel case.",
      type: String,
    });
  },
  templates: function() {
    var context = {
      name: util.nameFor(this.options.name),
      fields: util.fieldsFor(this.options.fields),
    };

    this.template("_component.ts",
                  "src/components/" + context.name.kebab + "-component.ts",
                  context);
  },
});
