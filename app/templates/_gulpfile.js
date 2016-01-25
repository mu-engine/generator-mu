var gulp = require("gulp");
var inject = require("gulp-inject");
var nodemon = require("gulp-nodemon");
var watch = require("gulp-watch");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-cssmin");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var gulpIf = require("gulp-if");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var es = require("event-stream");
var lazypipe = require("lazypipe");
var browserify = require("browserify");
var es6ify = require("es6ify");
var del = require("del");

gulp.task("default", [ "server", "watch" ]);

gulp.task("server", function() {
  nodemon({
    script: "server.js",
    ext: "js",
    ignore: [ "public/**/*" ]
  });
});

gulp.task("watch", [ "build" ], function(done) {
  watch("src/**/*", function() {
    gulp.start("build");
  });
});

gulp.task("build", function() {
  return gulp.src([ "src/**/*.html", "!src/**/*.tpl.html" ])
    .pipe(inject(es.merge([
      browserify({ entries: "./src/index.js", debug: true })
        .add(es6ify.runtime)
        .transform(es6ify)
        .bundle()
        .on("error", function(error) {
          console.error(error.message);
          this.emit("end");
        }).pipe(source("index.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpIf((process.env.NODE_ENV === "production"), lazypipe()
          .pipe(uglify)
          .pipe(rename, { suffix: ".min" })()))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("public")),
      gulp.src("src/**/*.css")
        .pipe(gulpIf((process.env.NODE_ENV === "production"), lazypipe()
          .pipe(sourcemaps.init)
          .pipe(concat, "index.css")
          .pipe(cssmin)
          .pipe(rename, { suffix: ".min" })
          .pipe(sourcemaps.write, "./")()))
        .pipe(gulp.dest("public")),
    ]), { ignorePath: "public" })).pipe(gulp.dest("public"));
});

gulp.task("clean", function() {
  return del([ "public/**/*" ]);
});
