var https  = require('https')
  , crypto = require('crypto')
  , qs     = require('querystring')

function Face(publicKey, privateKey){
    this.publicKey = publicKey
    this.privateKey = privateKey
    this.authorization = this.createHash()
}

Face.prototype.createHash = function(){
    var hash = crypto.createHmac('sha1', this.privateKey)
        .update(this.publicKey)
        .digest('hex')

    return new Buffer(this.publicKey+':'+hash).toString('base64')
}

Face.RequestOptions = function(auth, images){
    this.headers['X-Mashape-Authorization'] = auth
    this.path += qs.stringify({ images: images })
}

Face.RequestOptions.prototype = {
    host: 'lambda-face-detection-and-recognition.p.mashape.com'
  , path: '/detect?'
  , headers: { 'X-Mashape-Authorization': null }
}

Face.prototype.getOptions = function(images){
    return new Face.RequestOptions(this.authorization, images)
}

Face.prototype.request = function(options, callback){
    var req = https.get(options, function(res){
        var data = ''
        res.on('data', function(d){
            data += d
        })

        res.on('end', function(){
            try {
                data = JSON.parse(data)
            } catch (err) {
                return callback(err)
            }
            callback(null, data)
        })
        
    }).on('error', callback)

    return req
}

Face.prototype.detect = function(images, callback){

    if (!/Array|String/.test(Object.prototype.toString.call(images))){
        callback(new Error('images must be String or Array'))
        return
    }
    var options = this.getOptions(images)
    return this.request(options, callback)
    
}

module.exports = Face
