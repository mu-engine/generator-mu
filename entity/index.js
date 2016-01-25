var _ = require("lodash");
var yo = require("yeoman-generator");

module.exports = yo.Base.extend({
  constructor: function() {
    yo.Base.apply(this, arguments);

    this.option("name", {
      desc: "Component name. Expects kebab case.",
      type: String,
    });

    this.option("components", {
      desc: "Comma seperated list of components. Expects camel case.",
      type: String,
    });
  },
  templates: function() {
    if (!_.isString(this.options.name) || _.isEmpty(this.options.name)) {
      throw new Error("Entity name is required");
    } else {
      var context = {
        name: {
          kebab: _.kebabCase(this.options.name),
          constant: _.upperFirst(_.camelCase(this.options.name)),
        },
        components: (this.options.components || "").trim().split(",").filter(function(e) {
          return !_.isEmpty(e.trim());
        }).map(function(e) {
          return {
            constant: _.upperFirst(_.camelCase(e)),
            kebab: _.kebabCase(e),
            camel: _.camelCase(e),
          }
        }),
      };
    }

    this.template("_entity.js", "src/entities/" + context.name.kebab + "-entity.js", context);
  },
});
