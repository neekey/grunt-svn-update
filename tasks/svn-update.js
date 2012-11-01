/*
 * grunt-svn-update
 * https://github.com/neekey/grunt-svn-update
 *
 * Copyright (c) 2012 neekey
 * Licensed under the MIT license.
 */

var Exec = require('child_process').exec;
var Green = '\033[0;32m';
var Reset = '\033[0m';

module.exports = function (grunt) {

    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

    // ==========================================================================
    // TASKS
    // ==========================================================================

    grunt.registerMultiTask('svnu', 'Upload your svn directory.', function () {

        var done = this.async();
        // 一个需要更新的路径数组
        var paths = this.data;

        if (paths && 0 < paths.length) {

            var pathLen = paths.length;
            var taskCount = 0;

            paths.forEach(function( path ){

                var command = 'svn update ' + path;
                grunt.log.write( Green + '>>' + ' Command:' + Reset + '`' + command + '`\n' );

                Exec( command, function( error, stdout, stderr ){

                    grunt.log.write( '\n' + stdout );

                    if( null !== error ){

                        grunt.log.error( '\n' + error );
                    }

                    taskCount++;
                    if( taskCount === pathLen ){
                        grunt.log.write( '\n' + Green + 'All SVN update jobs are done.' + Reset );
                    }
                });
            });
        }
        else {
            grunt.log.write( '\n' + Green + 'No path to be updated.' + Reset );
            done(true);
        }
    });
};
