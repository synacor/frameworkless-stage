module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			main: {
				files: {
					'dist/min/stage.min.js': ['dist/stage.js']
				}
			}
		},
		
		copy:{
			main: {
				expand: true,
				cwd: 'src/',
				src: '**',
				dest: 'dist/'
			},
			demo: {
				expand: true,
				cwd: 'src/',
				src: '*.js',
				dest: 'demo/js/lib/'
			},
			style: {
				files: [
					{
						expand: true,
						cwd: 'src/css',
						src: '*.css',
						dest: 'demo/css/'
					},
					{
						expand: true,
						cwd: 'src/css',
						src: '*.css',
						dest: 'dist/css/'
					}
				]
				
			},
			bower: {
				expand: true,
				flatten: true,
				cwd: 'bower_components',
				src: ['**/*.js', '!**/*.min.js'],
				dest: 'demo/js/lib/'
			}
		},
		
		jshint: {
			options: {
				browser: true
			},
			main: ['src/**/*.js']
		},
		
		less: {
			main: {
				options: {
					compress: false,
					yuicompress: false,
					optimization: 0
				},
				files: {
					'src/css/stage.css' : 'src/less/stage.less'
				}
			}
		},
		
		jsdoc: {
			main: {
				src: [
					'src/*.js',
					'README.md'
				],
				jsdoc: './node_modules/.bin/jsdoc',
				dest: 'docs',
				options: {
					configure: 'jsdoc.json'
				}
			}
		},
		watch: {
			options: {
				debounceDelay: 1500
			},
			src: {
				files: ['src/**/*'],
				tasks: ['default']
			}
		}
		
	});
	
	require('load-grunt-tasks')(grunt);
	
	grunt.registerTask('build-watch', ['default', 'watch:src']);

	grunt.registerTask('default', [
		'jshint:main',
		'copy:main',
		'uglify:main',
		'copy:demo',
		'less:main',
		'copy:style'
	]);
};