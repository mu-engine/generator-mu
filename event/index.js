var Generator = require("yeoman-generator");
var util = require("../util");

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
    var name = util.nameFor(this.options.name);
    var types = util.typesFor(this.options.types);
    var fields = util.fieldsFor(this.options.fields);

    var imports = util.importsFor(fields);

    if (types.length === 0) {
      types.push(name.kebab);
    }

    this.fs.copyTpl(
      this.templatePath("_event.ts"),
      this.destinationPath("src/events/" + name.kebab + "-event.ts"),
      { name: name,
        types: types,
        fields: fields,
        imports: imports,
      });
  }
}
