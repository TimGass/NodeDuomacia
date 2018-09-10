var gulp = require("gulp");
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var stream = require("event-stream");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var glob = require("glob");
var sass = require("gulp-sass");


gulp.task("rename", function(){
  return gulp.src("./build/views/**/*.js")
    .pipe(rename({
      extname: ".jsx"
      })
    )
    .pipe(gulp.dest("./build/views")) &&
    gulp.src("./server/bin/**/*")
    .pipe(
      rename({
        extname: ".js"
      })
    )
    .pipe(gulp.dest("./server/bin"));
});


gulp.task("clean", function(){
  return gulp.src("./build/views/**/*.js")
    .pipe(clean({force: true}));
});

gulp.task("www", function(){
  return gulp.src("./build/bin/**/*.js")
    .pipe(
      rename({
        extname: ""
      })
    )
    .pipe(gulp.dest("./build/bin")) &&
    gulp.src("./build/bin/***.js")
    .pipe(clean({force: true})) &&
    gulp.src("./server/bin/***.js")
    .pipe(clean({force: true}));
});

function bundle(file){
  var srcval = file.replace("server/js/", "");
  return browserify({entries: [file], debug: true})
  .transform(babelify, {presets: ["latest", 'react']})
  .bundle()
  .on("error", function(err){
    gutil.beep();
    gutil.log(err.toString());
    this.emit("end");
  })
  .pipe(source(srcval))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest("./server/public/javascripts"));
};

gulp.task("sass", function(){
 gulp.src("server/sass/**/*.scss")
   .pipe(sass.sync().on("error", sass.logError))
   .pipe(gulp.dest("./server/public/stylesheets"));
});

gulp.task("babel", function (done) {
 glob("server/js/**/*.js", function(err, files){
   if(err){
     done(err);
   }
   var tasks = files.map(bundle);
   stream.merge(tasks).on("end", done);
 });
});

gulp.task('copy', function(){
 gulp.src('./resources/assets/images/**/*')
   .pipe(gulp.dest('./public/images'));
 gulp.src('./resources/assets/fonts/**/*')
   .pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function() {
   gulp.watch(['./server/sass/**/*.scss'], ['sass']);
   gulp.watch(["./server/js/**/*.js"], ["babel"]);
});

gulp.task("production", function() {
  gulp.src("./production.json")
  .pipe(rename({
    basename: "package"
  }))
  .pipe(gulp.dest("./build"));
});

gulp.task("default", ["copy", "sass", "babel"]);
