// Initialize using signing secret from environment variables
const { createEventAdapter } = require('@slack/events-api')
// Slack requires a secret key to run your bot code. We'll find and figure out this signing secret thing in the next steps
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`)
})

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error)

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`)
})
