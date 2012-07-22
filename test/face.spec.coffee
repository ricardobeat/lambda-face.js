Face = require '../face'

authHeader = 'X-Mashape-Authorization'

publicKey = 'aaa'
privateKey = 'bbb'

# overwrite options for mock requests
Face.RequestOptions::path = 'nil'

# create a client
client = new Face publicKey, privateKey

#########################################

describe 'Face client', ->

	it 'should store public and private keys', ->
		client.publicKey.should.equal publicKey
		client.privateKey.should.equal privateKey

	it 'should create an authorization hash from the keys', ->
		client.authorization.should.equal client.createHash()

	describe 'request options', ->
		it 'should include the authorization header', ->
			options = client.getOptions()
			options.headers.should.have.property authHeader, client.authorization

	describe 'detect method', ->

		it 'should exist', ->
			client.detect.should.be.a 'function'

		it 'should return an error if called with invalid image argument', (done) ->
			client.detect 111, (err) ->
				err.should.be.an.instanceOf Error
				done()

		it 'should return request object with authorization header', ->
			req = client.detect '', ->
			req.should.be.an.instanceOf require('http').ClientRequest
			req._headers.should.have.property authHeader.toLowerCase(), client.authorization
