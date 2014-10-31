var through     = require('through2');
var gutil       = require('gulp-util');
var PluginError = gutil.PluginError;
var path 		 = require('path');

module.exports = function printUnusedDependencies(options){
	var files = [];
	var errorCount = 0;
	
	var getDependencies = function(fileContent){
		return fileContent.match(/function\((.*?)\)/)[1]
									.split(',');
	};
	
	sanitize = function(dependency){
		if(dependency === '$'){
			return '\\$';
		}
		
		return dependency;
	};
	
	getUnusedDependencies = function(fileContent, dependencies){
		var unusedDependencies = [];
		dependencies.forEach(function(dependency){ 
			var regex = new RegExp(dependency, 'g');
			var count = (fileContent.match(regex) || []).length;
			
			if(isDependencyUnused(fileContent, dependency)) {
				unusedDependencies.push(dependency);
			}				
		});
		return unusedDependencies;
	};
	
	isDependencyUnused = function(fileContent, dependency){
		dependencyString = sanitize(dependency);
		var regex = new RegExp(dependencyString, 'g');
		var count = (fileContent.match(regex) || []).length;
		
		return count === 1;
	};

	return through.obj(function(file, enc, cb){
		if(file.isNull()){
			return cb(null, file);
		}

		if(file.isStream()){
			return cb(new PluginError('bar', 'Streaming not supported'));
		}
		
		var base = path.relative(file.cwd, file.path);
		var fileContent = file.contents.toString()
								 .replace(/[\n\r ]/gm, '');
		
		var i = fileContent.indexOf('function');
		
		if(i > -1) {
			fileContent = fileContent.substring(i);
			
			var dependencies = getDependencies(fileContent);
				
			var unusedDependencies = getUnusedDependencies(fileContent, dependencies);

			if(unusedDependencies.length > 0){
				console.log('uudpend: ' + base + ': \n[' + unusedDependencies + '] not used\n');
			}
		}

		this.push(file);
		return cb();
	});
}