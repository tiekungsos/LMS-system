var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat');

var config = {
    src: './scss/*.scss',
    dest: './css/'
};

// Error message
var onError = function(err) {
    notify.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        sound: 'Beep'
    })(err);

    this.emit('end');
};

// Compile CSS
gulp.task('styles', function() {
    var stream = gulp
        .src([config.src])
        .pipe(livereload())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass().on('error', sass.logError));

    stream
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css/'));


    return gulp.pipe(cleanCSS({ compatibility: 'ie8' }));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(config.src, gulp.series('styles'));
    // Other watchers
});