/* eslint-env node */

const minimatch = require('minimatch');
const DEFAULT_PATTERN = '**/*.+(mp3|ogg)';
const ffmetadata = require("ffmetadata");
const path = require("path");

module.exports = function plugin(options) {
  return function(files, metalsmith, done){

    const matcher = minimatch.Minimatch(options.pattern || DEFAULT_PATTERN );
    const property = options.property || 'metadata' ;

    setImmediate(done);
    Object.keys(files).forEach(function(file){

      if (!matcher.match(file)) {
        return;
      }
      var data = files[file];
      if (data.draft) delete files[file];

      try {
        ffmetadata.read(path.join(metalsmith._source,file), function(err, data) {
            if (err) console.error("Error reading metadata", err);
            else files[file][property] = data;
        });     
      } catch(err) {
	      // got invalid data, handle error
      }
    });
  };
}
