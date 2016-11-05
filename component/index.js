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
        fields: _.chain(this.options.fields || "")
          .split(",")
          .filter((e) => !_.isEmpty(e.trim()))
          .map((e) => {
            var pair = e.split("=", 2);
            if (pair.length === 2) {
              return { key: pair[0], value: pair[1] };
            } else {
              return { key: pair[0], value: "null" };
            }
          }).value(),
      };
    }

    this.template("_component.ts", "src/components/" + context.name.kebab + "-component.ts", context);
  },
});
