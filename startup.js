var format = require('util').format
  , ZenIRCBot = require('zenircbot-api').ZenIRCBot
  , request = require('request')
  , zen = new ZenIRCBot()
  , url = 'http://itsthisforthat.com/api.php?json'

idea_formats = [
  "Guys, I've got this great idea, how about %s for %s",
  "So, I'm thinking, %s for... wait for it... %s!"
]

zen.register_commands(
  'startup.js',
  [{
    name: '!startup'
  , description: 'Tells you about a great startup idea.'
  }]
)

var directed = zen.filter({version: 1, type: 'directed_privmsg'})
directed.on('data', function(msg) {
  if (/^startup$/i.test(msg.data.message)) {
    request({url: url, json: true}, function(err, res, body) {
      var idea = idea_formats[Math.floor(Math.random()*idea_formats.length)]
      var values = Object.keys(body).map(function(key) {
        return body[key]
      })
      values.unshift(idea)
      zen.send_privmsg(msg.data.channel,
                       format.apply(null, values))
    })
  }
})