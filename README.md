lambda-face.js
==============

Node.JS client for the Lambda Labs face-detection API. 

##Usage

    var Face = require('./face')

    api = new Face(PUBLIC_KEY, PRIVATE_KEY)

	api.detect(image, function(err, data){
	    if (err) throw err
	    console.log(data.photos[0].tags)
	})

See `example/test.js`.

http://api.lambdal.com/

*Not published to NPM.*