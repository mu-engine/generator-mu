const Generator = require("yeoman-generator");
const util = require("../util");

module.exports = class SystemGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("name", {
      desc: "System name. Expects kebab case.",
      type: String,
    });

    this.option("parent", {
      desc: "Parent Entity name. Expects camel case.",
      type: String,
      default: "",
    });

    this.option("components", {
      desc: "Comma seperated list of components. Expects camel case.",
      type: String,
      default: "",
    });

    this.option("events", {
      desc: "Comma seperated list of events. Expects kebab case.",
      type: String,
      default: "",
    });
  }

  templates() {
    const name = util.nameFor(this.options.name);
    const parent = util.parentFor(this.options.parent);
    while (parent.imports.length > 1) {
      parent.imports.pop();
    }
    const components = util.componentsFor(this.options.components);
    for (let e of components) {
      while (e.imports.length > 1) {
        e.imports.pop();
      }
    }
    const events = util.eventsFor(this.options.events);
    for (let e of events) {
      while (e.imports.length > 1) {
        e.imports.shift();
      }
    }
    const imports = util.importsFor(components.concat(events).concat([ parent ]));

    this.fs.copyTpl(
      this.templatePath("_system.ejs"),
      this.destinationPath("src/systems/" + name.kebab + "-system.ts"),
      { parent: parent,
        name: name,
        components: components,
        events: events,
        imports: imports,
      });
  }
}
