// Importar pacotes

// 1) Para o SASS
const gulp = require('gulp'); // 1) npm i --global gulp-cli -> 2) npm init -> 3) npm i --save-dev gulp -> 4) git init
const sass = require('gulp-sass')(require('sass')); // npm i --save-dev gulp gulp-sass sass
const sourcemaps = require('gulp-sourcemaps'); // npm i --save-dev gulp-sourcemaps 
const cleanCss = require('gulp-clean-css'); // npm i --save-dev gulp-clean-css --save-dev
// 2) Para o HTML
const htmlmin = require('gulp-htmlmin'); // npm i --save-dev gulp-htmlmin
// 3) Para o javascript
const uglify = require('gulp-uglify-es').default; // npm i --save-dev gulp-uglify-es
const obfuscate = require('gulp-obfuscate'); // npm i --save-dev gulp gulp-obfuscate
// 4) Para imagens
const imagemin = require('gulp-imagemin'); // npm i gulp-imagemin@7.1.0 


// Compilar as imagens
function compilaImagens() {
    return gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

// Compilar o JavaScript
function compilaJs() {
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

// Compilar o SASS
function compilaSass() {
    return gulp.src('./src/styles/main.scss')
    .pipe(sourcemaps.init()) 
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

// Minificar o HTML
function compilaHtml() {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(gulp.dest('./build'));
}


// Tarefas exportadas
const watch = () => {
  gulp.watch('./src/styles/*.scss', compilaSass);
  gulp.watch('./src/images/**/*', compilaImagens);
  gulp.watch('./src/*.html', compilaHtml);
  gulp.watch('./src/scripts/*.js', compilaJs);
};

exports.default = gulp.parallel(compilaSass, compilaImagens, compilaHtml, compilaJs);
exports.watch = watch;
