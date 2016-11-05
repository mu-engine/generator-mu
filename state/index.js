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
        systems: _.chain(this.options.systems || "")
          .split(",")
          .filter((e) => !_.isEmpty(e.trim()))
          .map((e) => {
            let system = e.split("/", 2);

            if (_.size(system) == 2) {
              if (_.isEmpty(system[0].trim())) {
                return {
                  constant: _.upperFirst(_.camelCase(system[1].trim())),
                  path: "mu-engine",
                };
              } else {
                return {
                  constant: _.upperFirst(_.camelCase(system[1].trim())),
                  path: `${_.kebabCase(system[0].trim())}`,
                };
              }
            } else {
              return {
                constant: _.upperFirst(_.camelCase(system[0].trim())),
                path: `../systems/${_.kebabCase(system[0].trim())}-system`,
              };
            }
          }).value(),
      };
    }

    this.template("_state.ts", "src/states/" + context.name.kebab + "-state.ts", context);
  },
});

