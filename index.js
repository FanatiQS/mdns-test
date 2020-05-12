'use strict';
const os = require('os');

const name = process.argv[2];
if (!name) {
	throw new Error("Requires first argument to be the name of the mDNS responder");
}

const ip = os.networkInterfaces().en0.filter((net) => net.family === 'IPv4')[0].address;
const mdnsName = name + ".local";

// Log that the service has started and what URL it is responding to
console.log('starting mDNS forwarding server');
console.log('responding to:', mdnsName);
console.log("routing to ip:", ip);

// Respond to mDNS queries
const mdns = require('multicast-dns')();
mdns.on('query', function (query, info) {
	if (query.questions[0] && query.questions[0].name !== mdnsName) return;
	console.log('respoding to mDNS query from:', info.address);
	mdns.respond([{
		name: mdnsName,
		type: 'A',
		data: ip,
		ttl: 300
	}]);
});

// Setup http server
const http = require('http');
http.createServer((req, res) => {
	res.end("Hey there!");
}).listen(80);
console.log('http server listening on port 80');
