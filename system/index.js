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
      desc: "Comma seperated list of filters, Expects camel case.",
      type: String,
    });
  },
  templates: function() {
    if (!_.isString(this.options.name) || _.isEmpty(this.options.name)) {
      throw new Error("State name is required");
    } else {
      var context = {
        name: {
          kebab: _.kebabCase(this.options.name),
          constant: _.upperFirst(_.camelCase(this.options.name)),
        },
        filters: (this.options.filters || "").trim().split(",").filter(function(e) {
          return !_.isEmpty(e.trim());
        }).map(function(e) {
          return "\"" + e + "\"";
        }).join(", "),
      };
    }

    this.template("_system.js", "src/systems/" + context.name.kebab + "-system.js", context);
  },
});

