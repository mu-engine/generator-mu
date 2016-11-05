var path = require("path");
var _ = require("lodash");
var yo = require("yeoman-generator");

module.exports = yo.Base.extend({
  constructor: function() {
    yo.Base.apply(this, arguments);

    this.option("name", {
      desc: "Application name. Expects kebab case.",
      type: String,
      defaults: _.last(process.cwd().split(path.sep)),
    });

    this.option("description", {
      desc: "Package description.",
      type: String,
      defaults: "A generated Mu Engine game.",
    });

  },
  packageFile: function() {
    var done = this.async();

    this.user.github.username(function(err, username) {
      if (err) {
        done(err);
      } else {
        this.fs.writeJSON("package.json", {
          name: this.options.name,
          version: "0.1.0",
          description: this.options.description,
          main: "index.js",
          scripts: {
            start: "node index.js"
          },
          repository: {
            type: "git",
            url: "git+https://github.com/" + username + "/" + this.options.name + ".git"
          },
          keywords: [
            "mu-engine"
          ],
          author: this.user.git.name(),
          license: "MIT",
          bugs: {
            url: "https://github.com/" + username + "/" + this.options.name + "/issues"
          },
          homepage: "https://github.com/" + username + "/" + this.options.name + "#readme",
        }, null, 2);

        done();
      }
    }.bind(this));
  },
  templates: function() {
    var context = {
      name: {
        kebab: _.kebabCase(this.options.name),
        constant: _.upperFirst(_.camelCase(this.options.name)),
      },
      description: this.options.description,
    };

    this.template("_gitignore", ".gitignore", context);
    this.template("_README.md", "README.md", context);
    this.template("_tslint.json", "tslint.json", context);
    this.template("_tsconfig.json", "tsconfig.json", context);
    this.template("_webpack.config.js", "webpack.config.js", context);
    this.template("_index.js", "index.js", context);
    this.template("_index.ts", "src/index.ts", context);
    this.template("_index.html", "src/index.html", context);
    this.template("_index.scss", "src/index.scss", context);
    this.template("_game.ts", "src/" + context.name.kebab + ".ts", context);
  },
  dependencies: function() {
    this.on("end", () => {
      this.spawnCommandSync("yarn",[
        "add",
        "immutable",
        "mu-engine",
      ]);

      this.spawnCommandSync("yarn",[
        "add",
        "css-loader",
        "express",
        "extract-text-webpack-plugin",
        "html-webpack-plugin",
        "morgan",
        "node-sass",
        "sass-loader",
        "serve-static",
        "style-loader",
        "ts-loader",
        "tslint",
        "tslint-loader",
        "typescript",
        "webpack",
        "--dev",
      ]);
    });
  },
});
