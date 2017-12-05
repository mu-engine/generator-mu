const Generator = require("yeoman-generator");
const util = require("../util");

module.exports = class BehaviorGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.option("name", {
      desc: "Component name. Expects kebab case.",
      type: String,
    });
  }

  templates() {
    const name = util.nameFor(this.options.name);
    const imports = util.importsFor([
      {
        module: "mu-engine",
        imports: [
          "Behavior",
          "BehaviorState",
          "BehaviorOptions",
        ],
      },
    ]);

    this.fs.copyTpl(
      this.templatePath("_behavior.ejs"),
      this.destinationPath("src/behaviors/" + name.kebab + "-behavior.ts"),
      { name: name,
        imports: imports,
      });
  }
}
