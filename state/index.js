var _ = require("lodash");
var yo = require("yeoman-generator");

module.exports = yo.Base.extend({
  constructor: function() {
    yo.Base.apply(this, arguments);

    this.option("name", {
      desc: "State name. Expects kebab case.",
      type: String,
    });
    this.option("systems", {
      desc: "Comma seperated list of systems. Expects camel case.",
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
        systems: (this.options.systems || "").trim().split(",").filter(function(e) {
          return !_.isEmpty(e.trim());
        }).map(function(e) {
          return {
            constant: _.upperFirst(_.camelCase(e)),
            kebab: _.kebabCase(e),
          }
        }),
      };
    }

    this.template("_state.js", "src/states/" + context.name.kebab + "-state.js", context);
  },
});

