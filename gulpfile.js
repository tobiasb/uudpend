var gulp = require('gulp');
var uudpend = require('./uudpend');

gulp.task('uudpend', function(){
	return gulp.src('app/**/*.js')
			 .pipe(uudpend());
});