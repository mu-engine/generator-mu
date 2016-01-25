var _ = require("lodash");
var yo = require("yeoman-generator");

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
    if (!_.isString(this.options.name) || _.isEmpty(this.options.name)) {
      throw new Error("Component name is required");
    } else {
      var context = {
        name: {
          kebab: _.kebabCase(this.options.name),
          constant: _.upperFirst(_.camelCase(this.options.name)),
        },
        fields: (this.options.fields || "").trim().split(",").filter(function(e) {
          return !_.isEmpty(e.trim());
        }),
      };
    }

    this.template("_component.js", "src/components/" + context.name.kebab + "-component.js", context);
  },
});
