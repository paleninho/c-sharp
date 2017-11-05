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
	spritesmith  = require('gulp.spritesmith'),
	rsync        = require('gulp-rsync'),
	zip          = require('gulp-zip');


gulp.task('sprite', function () {
	var spriteData = gulp.src('src/template/img/icons/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.sass'
	}));
	return spriteData.pipe(gulp.dest('src/template/sprite/'));
});

gulp.task('sass', function(){ 
	return gulp.src('src/template/styles/sass/**/*.sass') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('src/template/styles/css')) 
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'src' 
		},
		notify: false 
	});
});

gulp.task('scripts', function() {
	return gulp.src([ 
		'src/template/libs/jquery/dist/jquery.js',
		'src/template/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js'
		])
		.pipe(concat('libs.js')) 
		.pipe(gulp.dest('src/template/scripts')); 
});

gulp.task('scriptsMin', function() {
	return gulp.src([ 
		'src/template/scripts/libs.min.js'
		])
		.pipe(uglify()) 
		.pipe(gulp.dest('src/template/scripts')); 
});


gulp.task('css-libs', ['sass'], function() {
	return gulp.src('src/template/styles/libs.css') 
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('src/template/styles/css')); 
	});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'scriptsMin'], function() {
	gulp.watch('src/template/styles/sass/**/*.sass', ['sass']); 
	gulp.watch('src/*.html', browserSync.reload); 
	gulp.watch('src/template/scripts/**/*.js', browserSync.reload);   
});

gulp.task('clean', function() {
	return del.sync('dist'); 
});

gulp.task('img', function() {
	return gulp.src('src/template/img/**/*') 
		.pipe(cache(imagemin({  
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
});


gulp.task('ftp', function() {
	return gulp.src('src/**')
		.pipe(rsync({
			root: 'src/',
			hostname: 'e5ashb4k_io@e5ashb4k.beget.tech',
			destination: 'fl/layout/site-',
			archive: true,
			silent: false,
			compress: true
		}));
});


gulp.task('zip', () =>
    gulp.src('src/*')
        .pipe(zip('site.zip'))
        .pipe(gulp.dest('./'))
);

gulp.task('default', ['watch']);
