const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')

const token = process.env.BOT_OAUTH_TOKEN
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET

const slackEvents = createEventAdapter(slackSigningSecret)
const web = new WebClient(token)
const port = process.env.PORT || 3000

slackEvents.on('message', async event => {
	console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`)

  // Check if the text includes the text we'd want to use to check the leaderboard
	if (/@pointsrus leaderboard/i.exec(event.text)) {
		const result = await web.chat.postMessage({
      // We'll add more functionality in the future. We just want to test it works, first
			text: 'This should output a leaderboard',
			channel: event.channel,
		})

		console.log(`Successfully send message ${result.ts} in conversation ${event.channel}`)
	}
})

slackEvents.on('error', console.error)

slackEvents.start(port).then(() => {
	console.log(`server listening on port ${port}`)
})
