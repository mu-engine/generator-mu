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
    if (!_.isString(this.options.name) || _.isEmpty(this.options.name.trim())) {
      throw new Error("Component name is required");
    }

    var name = this.options.name.trim();
    var fields = _.chain(this.options.fields)
      .split(",")
      .filter(function(e) { return !_.isEmpty(e.trim()); })
      .map(function(e) {
        var pair = e.split("=", 2);
        var lval = pair[0].split(":", 2);

        return {
          key: _.camelCase(lval[0]),
          type: (lval[1] !== undefined ? lval[1] : "any"),
          defaults: pair[1],
        };
      }).value();

    var context = {
      name: {
        kebab: _.kebabCase(name),
        constant: _.upperFirst(_.camelCase(name)),
      },
      fields: fields,
    };

    this.template("_template", "src/components/" + context.name.kebab + "-component.ts", context);
  },
});
