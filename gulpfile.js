const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const nodemon = require('gulp-nodemon')

gulp.task("compile", function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', ['compile'], function () {
  // gulp.watch('src/**/*', ['compile'], () => { });
  return nodemon({
    ext: 'ts',
    // watch: 'src/**/*',// watch ES2015 code
    tasks: ['compile'], // compile synchronously onChange
    script: 'dist/server.js' // run ES5 code
  });
});