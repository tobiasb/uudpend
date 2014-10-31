
## Information

<table>
<tr>
<td>Package</td><td>gulp-uudpend</td>
</tr>
<tr>
<td>Description</td>
<td>Unused AMD dependency analyzer plugin for gulp</td>
</tr>
</table>

## Install

    npm install gulp-uudpend

## Usage

```js
var gulp = require('gulp');
var uudpend = require('gulp-uudpend');

gulp.task('uudpend', function(){
	return gulp.src('app/**/*.js')
			   .pipe(uudpend());
});
```