var yo = require("yeoman-generator");
var util = require("../util");

module.exports = yo.Base.extend({
  constructor: function() {
    yo.Base.apply(this, arguments);

    this.option("name", {
      desc: "Entity name. Expects kebab case.",
      type: String,
    });

    this.option("parent", {
      desc: "Parent Entity name. Expects camel case.",
      type: String,
    });

    this.option("components", {
      desc: "Comma seperated list of components. Expects camel case.",
      type: String,
    });

    this.option("systems", {
      desc: "Comma seperated list of systems. Expects camel case.",
      type: String,
    });
  },
  templates: function() {
    var name = util.nameFor(this.options.name);
    var parent = util.parentFor(this.options.parent);
    var components = util.componentsFor(this.options.components);
    var systems = util.componentsFor(this.options.systems);
    var imports = util.importsFor(components.concat(systems).concat([ parent ]));

    this.template("_entity.ts",
                  "src/entities/" + name.kebab + "-entity.ts", {
      parent: parent,
      name: name,
      components: components,
      systems: systems,
      imports: imports,
    });
  },
});
