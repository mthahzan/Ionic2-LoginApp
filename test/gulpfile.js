'use strict';

// import {join} from 'path';
var path = require('path');

const config = {
  gulp: require('gulp'),
  appDir: 'app',
  testDir: 'test',
  testDest: 'www/build/test',
  typingsDir: 'typings',
};

const imports = {
  gulp: require('gulp'),
  runSequence: require('run-sequence'),
  ionicGulpfile: require(path.join(process.cwd(), 'gulpfile.js')),
};

const gulp = imports.gulp;
const runSequence = imports.runSequence;

// just a hook into ionic's build
gulp.task('build-app', (done) => {
  runSequence('build', (done));
});

// compile E2E typescript into individual files, project directoy structure is replicated under www/build/test
gulp.task('build-e2e', ['clean-test'], () => {
  let typescript = require('gulp-typescript');
  let tsProject = typescript.createProject('tsconfig.json');
  let src = [
    path.join(config.typingsDir, '/index.d.ts'),
    path.join(config.appDir, '**/*e2e.ts'),
  ];
  let result = gulp.src(src)
    .pipe(typescript(tsProject));

  return result.js
    .pipe(gulp.dest(config.testDest));
});

// delete everything used in our test cycle here
gulp.task('clean-test', () => {

  let del = require('del');

  // You can use multiple globbing patterns as you would with `gulp.src`
  return del([config.testDest]).then((paths) => {
    console.log('Deleted', paths && paths.join(', ') || '-');
  });
});

// run jasmine unit tests using karma with PhantomJS2 in single run mode
gulp.task('karma', (done) => {

  let karma = require('karma');
  let karmaOpts = {
    configFile: path.join(process.cwd(), config.testDir, 'karma.config.js'),
    singleRun: true,
  };

  // Have to call the done() inside our own callback
  // see http://stackoverflow.com/questions/26614738/issue-running-karma-task-from-gulp
  // new karma.Server(karmaOpts, done).start();
  // new karma.Server(karmaOpts, done()).start();
  new karma.Server(karmaOpts, function() {
    done();
  }).start();
});

// run jasmine unit tests using karma with Chrome, Karma will be left open in Chrome for debug
gulp.task('karma-debug', (done) => {

  let karma = require('karma');
  let karmaOpts = {
    configFile: path.join(process.cwd(), config.testDir, 'karma.config.js'),
    singleRun: false,
    browsers: ['Chrome'],
  };

  new karma.Server(karmaOpts, done).start();
});

// run tslint against all typescript
gulp.task('lint', () => {

  let tslint = require('gulp-tslint');

  return gulp.src(path.join(config.appDir, '**/*.ts'))
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
});

// build unit tests, run unit tests, remap and report coverage
gulp.task('unit-test', (done) => {
  runSequence(['lint', 'html'], 'karma', (done));
});
