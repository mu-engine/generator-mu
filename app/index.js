const path = require("path");

const Generator = require("yeoman-generator");
const util = require("../util");

module.exports = class AppGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("name", {
      desc: "Application name. Expects kebab case.",
      type: String,
      defaults: path.basename(process.cwd()),
    });

    this.option("description", {
      desc: "Package description.",
      type: String,
      defaults: "A generated Mu Engine game.",
    });
  }

  packageFile() {
    const done = this.async();

    this.user.github.username().then((username) => {
      this.fs.writeJSON("package.json", {
        name: this.options.name,
        version: "0.1.0",
        description: this.options.description,
        scripts: {
          start: "webpack-dev-server"
        },
        repository: {
          type: "git",
          url: "git+https://github.com/" + username + "/" + this.options.name + ".git"
        },
        keywords: [
          "mu-engine"
        ],
        author: this.user.git.name(),
        bugs: {
          url: "https://github.com/" + username + "/" + this.options.name + "/issues"
        },
        homepage: "https://github.com/" + username + "/" + this.options.name + "#readme",
        license: "UNLICENSED",
      }, null, 2);

      done();
    }).catch((error) => {
      done(err);
    });
  }

  templates() {
    const context = {
      name: util.nameFor(this.options.name),
      description: this.options.description,
    };

    this.fs.copyTpl(this.templatePath("_gitignore"),
                    this.destinationPath(".gitignore"),
                    context);
    this.fs.copyTpl(this.templatePath("_README.md"),
                    this.destinationPath("README.md"),
                    context);
    this.fs.copyTpl(this.templatePath("_tsconfig.json"),
                    this.destinationPath("tsconfig.json"),
                    context);
    this.fs.copyTpl(this.templatePath("_webpack.config.js"),
                    this.destinationPath("webpack.config.js"),
                    context);
    this.fs.copyTpl(this.templatePath("_assets.config.json"),
                    this.destinationPath("assets.config.json"),
                    context);
    this.fs.copyTpl(this.templatePath("_postcss.config.js"),
                    this.destinationPath("postcss.config.js"),
                    context);
    this.fs.copyTpl(this.templatePath("src/_index.ts"),
                    this.destinationPath("src/index.ts"),
                    context);
    this.fs.copyTpl(this.templatePath("src/_typings.d.ts"),
                    this.destinationPath("src/typeings.d.ts"),
                    context);
    this.fs.copyTpl(this.templatePath("src/_index.html"),
                    this.destinationPath("src/index.html"),
                    context);
    this.fs.copyTpl(this.templatePath("src/_index.scss"),
                    this.destinationPath("src/index.scss"),
                    context);
  }

  dependencies() {

    this.yarnInstall([ "mu-engine" ]);
    this.yarnInstall([
      "autoprefixer",
      "babel-core",
      "babel-loader",
      "babel-preset-env",
      "css-loader",
      "extract-text-webpack-plugin",
      "html-webpack-plugin",
      "mu-assets-loader",
      "node-sass",
      "postcss-loader",
      "sass-loader",
      "style-loader",
      "ts-loader",
      "typescript",
      "webpack",
      "webpack-dev-server",
    ], { dev: true });
  }
};
