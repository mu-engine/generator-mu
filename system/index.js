var _ = require("lodash");
var yo = require("yeoman-generator");

module.exports = yo.Base.extend({
  constructor: function() {
    yo.Base.apply(this, arguments);

    this.option("name", {
      desc: "System name. Expects kebab case.",
      type: String,
    });

    this.option("filters", {
      desc: "Comma seperated list of filters. Expects camel case.",
      type: String,
    });
  },
  templates: function() {
    if (!_.isString(this.options.name) || _.isEmpty(this.options.name)) {
      throw new Error("System name is required");
    } else {
      var context = {
        name: {
          kebab: _.kebabCase(this.options.name),
          constant: _.upperFirst(_.camelCase(this.options.name)),
        },
        filters: _.chain(this.options.filters || "")
          .split(",")
          .filter((e) => !_.isEmpty(e.trim()))
          .map(function(e) {
            return "\"" + e.trim() + "\"";
          }).value().join(", "),
      };
    }

    this.template("_system.ts", "src/systems/" + context.name.kebab + "-system.ts", context);
  },
});
