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
        components: _.chain(this.options.components || "")
          .split(",")
          .filter((e) => !_.isEmpty(e.trim()))
          .map((e) => {
            let component = e.split("/", 2);

            if (_.size(component) == 2) {
              if (_.isEmpty(component[0].trim())) {
                return {
                  constant: _.upperFirst(_.camelCase(component[1].trim())),
                  path: "mu-engine",
                  camel: _.camelCase(component[1].trim()),
                };
              } else {
                return {
                  constant: _.upperFirst(_.camelCase(component[1].trim())),
                  path: `${_.kebabCase(component[0].trim())}`,
                  camel: _.camelCase(component[1].trim()),
                };
              }
            } else {
              return {
                constant: _.upperFirst(_.camelCase(component[0].trim())),
                path: `../components/${_.kebabCase(component[0].trim())}-component`,
                camel: _.camelCase(component[0].trim()),
              };
            }
          }).value(),
      };
    }

    this.template("_entity.ts", "src/entities/" + context.name.kebab + "-entity.ts", context);
  },
});
