var Generator = require("yeoman-generator");
var util = require("../util");

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
    var name = util.nameFor(this.options.name);
    var fields = util.fieldsFor(this.options.fields);
    var imports = util.importsFor(fields);

    this.fs.copyTpl(
      this.templatePath("_component.ts"),
      this.destinationPath("src/components/" + name.kebab + "-component.ts"),
      { name: name,
        fields: fields,
        imports: imports,
      });
  }
}
