# metalsmith-ffmetadata

A small lib for metalmsith, to read metadata in media files using ffmpeg et node-ffmetadata.

## Usage

To install the module add it to your project's ``package.json`` dependencies or install manually running:
```
npm install metalsmith-ffmetadata
```

Then pull it in your code:
```javascript
const Metalsmith = require('metalsmith')
const ffmetadata = require('metalsmith-ffmetadata')
Metalsmith(__dirname)
  .use(
    ffmetadata({
      pattern: '**/*.+(mp3)',
      property: 'metadata'
    })
  )
  .build((err) => {
    if (err) return console.error(err)
    console.log('Build successfully finished! It is 🥙 time!')
  })
```
## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
