fs = require('fs')
net = require('net')
cowsay = require('cowsay')

var eightBall = ['Results hazy, ask again later', 'Absolutely', 'Nope', 'BACON!', "I'm not sure", 'maybe? maybe not?', 'Yup', 'No, definitely no', 'It seems likely', "There's a good chance", 'Lookup no in the dictionary. That is your answer']

function getEightBall() {
	return eightBall[Math.floor(Math.random() * eightBall.length)]
}

	var qMark = new RegExp(/((\w+)|(\w+ ))+\?/gi)
server = net.createServer(function(c) {

			c.write(cowsay.say({
				text: 'Welcome to the MOOOOOOOgic eightball\r\nAsk me anything!',
				e: 'oo'
			}) + "\r\n\r\n")


			c.on('data', function(data) {
				input = data.toString().trim();
				if (!qMark.test(input)) {
					c.write(cowsay.say({
						text: 'MOOOOOOO\r\nThat was not a question!\r\n TRY AGAIN!!!',
						e: 'VV'
					}) + "\r\n\r\n")
				} else {
					c.write(cowsay.say({
						text: 'MOOOOOOOOOOOOOOO\r\n' + getEightBall(),
						e: 'uu'
					})+"\r\n\r\n")
				}
			})

				c.on('end', function() {
					console.log('client disconnected')
				})
			})
			server.listen(2000, function() {
				console.log(cowsay.say({
					text: 'listening on the ole 2000',
					e: '@@'
				}))
			})

			server.on('data', function(data) {
				c.write(data.toString().trim() + '\r\n')
			})