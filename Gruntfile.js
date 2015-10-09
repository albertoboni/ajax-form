module.exports = function(grunt) {

  var pkg_data = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig({
    pkg: pkg_data,

    copy: {
      main: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js',
        options: {
          process: function (content, srcpath) {
            return (
              grunt.template.process(
                '/**\n' +
                ' * <%= pkg.description %>\n' +
                ' *\n' +
                ' * @project     <%= pkg.name %>\n' +
                ' * @author      <%= pkg.author %>\n' +
                ' * @version     <%= pkg.version %>\n' +
                ' * @website     <%= pkg.homepage %>\n' +
                ' */\n',
                {data: {pkg: pkg_data}}
              ) + content);
          },
        },
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    replace: {
      bump_bower_version: {
        src: ['bower.json'],
        overwrite: true,
        replacements: [{
          from: /"version": ".*",/g,
          to: "\"version\": \"<%= pkg.version %>\","
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify', 'replace']);

};
