var gulp       = require('gulp'), 
	sass         = require('gulp-sass'), 
	browserSync  = require('browser-sync'), 
	concat       = require('gulp-concat'), 
	uglify       = require('gulp-uglifyjs'), 
	cssnano      = require('gulp-cssnano'), 
	rename       = require('gulp-rename'), 
	del          = require('del'), 
	imagemin     = require('gulp-imagemin'), 
	pngquant     = require('imagemin-pngquant'), 
	cache        = require('gulp-cache'), 
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('app/template/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.sass'
  }));
  return spriteData.pipe(gulp.dest('app/template/sprite/'));
});

gulp.task('sass', function(){ 
	return gulp.src('app/template/styles/sass/**/*.sass') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/template/styles/css')) 
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});

gulp.task('scripts', function() {
	return gulp.src([ 
		'app/template/libs/jquery/dist/jquery.js',
		'app/template/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js'
		])
		.pipe(concat('libs.js')) 
		.pipe(gulp.dest('app/template/scripts')); 
});

gulp.task('scriptsMin', function() {
	return gulp.src([ 
		'app/template/scripts/libs.min.js'
		])
		.pipe(uglify()) 
		.pipe(gulp.dest('app/template/scripts')); 
});


gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/template/styles/libs.css') 
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('app/template/styles/css')); 
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'scriptsMin'], function() {
	gulp.watch('app/template/styles/sass/**/*.sass', ['sass']); 
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/template/scripts/**/*.js', browserSync.reload);   
});

gulp.task('clean', function() {
	return del.sync('dist'); 
});

gulp.task('img', function() {
	return gulp.src('app/template/img/**/*') 
		.pipe(cache(imagemin({  
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
});


gulp.task('default', ['watch']);
