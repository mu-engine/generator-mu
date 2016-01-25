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
      if (!err) {
        this.fs.writeJSON("package.json", {
          name: this.options.name,
          version: "0.1.0",
          description: this.options.description,
          main: "server.js",
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
          homepage: "https://github.com/" + username + "/" + this.options.name + "#readme"
        }, null, 2);
      }

      done(err);
    }.bind(this));
  },
  dependencies: function() {
    this.npmInstall([
      "express",
      "morgan",
      "serve-static",
    ], { save: true });
    this.npmInstall([
      "browserify",
      "del",
      "es6ify",
      "event-stream",
      "gulp",
      "gulp-concat",
      "gulp-cssmin",
      "gulp-if",
      "gulp-inject",
      "gulp-nodemon",
      "gulp-plumber",
      "gulp-rename",
      "gulp-sourcemaps",
      "gulp-uglify",
      "gulp-watch",
      "immutable",
      "lazypipe",
      "mu-engine",
      "vinyl-buffer",
      "vinyl-source-stream",
    ], { saveDev: true });
  },
  templates: function() {
    var context = {
      name: {
        kebab: this.options.name,
        constant: _.upperFirst(_.camelCase(this.options.name)),
      },
      description: this.options.description,
    };

    this.template("_gitignore", ".gitignore", context);
    this.template("_README.md", "README.md", context);
    this.template("_gulpfile.js", "gulpfile.js", context);
    this.template("_server.js", "server.js", context);
    this.template("_index.js", "src/index.js", context);
    this.template("_index.html", "src/index.html", context);
    this.template("_index.css", "src/index.css", context);
    this.template("_game.js", "src/" + context.name.kebab + ".js", context);
    this.template("_game-state.js", "src/states/" + context.name.kebab + "-state.js", context);
  },
});
