var gulp = require("gulp");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps")
var autoprefixer = require('gulp-autoprefixer');

gulp.task("watch", function(){ 
	gulp.watch('scss/*.scss', ['sass']);
});

gulp.task("sass",function(){
	return gulp.src("scss/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: "nested"}))
	.pipe(sourcemaps.write())
	.pipe(autoprefixer({
			browsers: ['last 2 version'],
			cascade: false
		}))
	.pipe(gulp.dest("css"));
});