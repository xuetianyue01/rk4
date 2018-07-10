 var gulp = require("gulp");
 var minCss = require("gulp-clean-css");
 //  var sass = require("gulp-sass");
 var rev = require("gulp-rev");
 var server = require("gulp-rev-collector");
 var url = require("url");
 var path = require("path");
 var uglify = require("gulp-uglify");
 var htmlmin = require("gulp-htmlmin");
 var webserver = require("gulp-webserver");
 //创建服务
 gulp.task("server", function() {
     gulp.src('./src')
         .pipe(webserver({
             port: 8008,
             host: '169.254.75.235',
             middleware: function(req, res, next) {
                 var pathname = url.path(req.url).pathname;
                 if (pathname === "/favicon.ico") {
                     return false
                 }

                 if (pathname === "/") {
                     res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                 } else {
                     res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                 }
                 pathname = pathname === "/" ? 'index.html' : pathname;
             }
         }))
 })

 //压缩 js 文件
 gulp.task('uglify', function() {
     return gulp.src('./src/js/*.js')
         .pipe(uglify({

         }))
         .pipe(rev())
         .pipe(gulp.task('rev/js'))
         .pipe(server({
             collapseWhiteeved: true
         }))
 })

 //压缩css文件
 gulp.task('minCss', function() {
     return gulp.src('./src/css/*.css')
         .pipe(minCss())
         .pipe(rev())
         .pipe(gulp.task('rev/css'))
         .pipe(server({
             collapseWhiteeved: true
         }))
 })

 //压缩html文件

 gulp.task('htmlmin', function() {
     return gulp.src('./src/css/*.css')
         .pipe(htmlmin({

         }))
         .pipe(rev())
         .pipe(gulp.task('rev/css'))
         .pipe(server({
             collapseWhiteeved: true
         }))
 })

 gulp.task('dev', ['minCss', 'htmlmin', 'uglify'])