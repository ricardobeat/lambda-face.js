var Face = require('../face')

api = new Face('publicKey', 'privateKey')

var image = "http://farm4.staticflickr.com/3079/2664632587_de972f9891_z.jpg"
console.log("requesting", image)

api.detect(image, function(err, data){
    if (err) return console.log(err)
    
    console.log(data.photos[0].tags)
})