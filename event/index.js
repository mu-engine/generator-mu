const Generator = require("yeoman-generator");
const util = require("../util");

module.exports = class ComponentGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("name", {
      desc: "Component name. Expects kebab case.",
      type: String,
    });

    this.option("types", {
      desc: "Comma seperated list of fields. Expects kebab case.",
      type: String,
      default: "",
    });

    this.option("fields", {
      desc: "Comma seperated list of fields. Expects camel case.",
      type: String,
      default: "",
    });
  }

  templates() {
    const name = util.nameFor(this.options.name);
    const types = util.typesFor(this.options.types);
    const fields = util.fieldsFor(this.options.fields);

    const imports = util.importsFor(fields);

    if (types.length === 0) {
      types.push(name.kebab);
    }

    this.fs.copyTpl(
      this.templatePath("_event.ejs"),
      this.destinationPath("src/events/" + name.kebab + "-event.ts"),
      { name: name,
        types: types,
        fields: fields,
        imports: imports,
      });
  }
}
