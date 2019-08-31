/* eslint-env node */

const NodeID3 = require('node-id3');
const minimatch = require('minimatch');
const DEFAULT_PATTERN = '**/*.+(jpeg|jpg)';
const ffmetadata = require("ffmetadata");

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
        let tags = NodeID3.read(file)
        NodeID3.read(file, function(err, tags) {
          if (err) console.log(err);
          else files[file][property] = tags;
        })        
      } catch(err) {
	      // got invalid data, handle error
      }
    });
  };
}
