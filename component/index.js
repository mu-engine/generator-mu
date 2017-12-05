const Generator = require("yeoman-generator");
const util = require("../util");

module.exports = class ComponentGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("name", {
      desc: "Component name. Expects kebab case.",
      type: String,
    });

    this.option("fields", {
      desc: "Comma seperated list of fields. Expects camel case.",
      type: String,
      default: "",
    });
  }

  templates() {
    const name = util.nameFor(this.options.name);
    const fields = util.fieldsFor(this.options.fields);
    const imports = util.importsFor(fields);

    this.fs.copyTpl(
      this.templatePath("_component.ejs"),
      this.destinationPath("src/components/" + name.kebab + "-component.ts"),
      { name: name,
        fields: fields,
        imports: imports,
      });
  }
}
