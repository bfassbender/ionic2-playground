var gulp = require('gulp');

gulp.task('bump', function () {
  require('gulp-cordova-bump').run({autofiles: true});
});

gulp.task('default', [ 'bump' ]);