const Generator = require("yeoman-generator");
const util = require("../util");

module.exports = class EntityGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("name", {
      desc: "Entity name. Expects kebab case.",
      type: String,
    });

    this.option("parent", {
      desc: "Parent Entity name. Expects camel case.",
      type: String,
      default: "base",
    });

    this.option("components", {
      desc: "Comma seperated list of components. Expects camel case.",
      type: String,
      default: "",
    });

    this.option("systems", {
      desc: "Comma seperated list of systems. Expects camel case.",
      type: String,
      default: "",
    });
  }

  templates() {
    const name = util.nameFor(this.options.name);
    const parent = util.parentFor(this.options.parent);
    const components = util.componentsFor(this.options.components);
    const systems = util.systemsFor(this.options.systems);
    console.log(systems);
    const imports = util.importsFor(components.concat(systems).concat([ parent ]));

    this.fs.copyTpl(
      this.templatePath("_entity.ejs"),
      this.destinationPath("src/entities/" + name.kebab + "-entity.ts"),
      { parent: parent,
        name: name,
        components: components,
        systems: systems,
        imports: imports,
      });
  }
}
