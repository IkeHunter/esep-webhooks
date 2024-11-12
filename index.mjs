export const handler = async function (event, context) {
  try {
    const data = JSON.parse(JSON.stringify(event))
    const slackUrl = String(process.env.SLACK_URL)

    const payload = {
      text: `Issue Created: ${data.issue.html_url}`
    }

    console.log('Posting to slack:', slackUrl)
    const res = await fetch(slackUrl, { method: 'POST', body: JSON.stringify(payload) })
    console.log('Response from slack:', res)

    return {
      message: 'Successfully posted to slack.'
    }
  } catch (e) {
    console.log('Error posting to slack:', e)
    return {
      message: 'Error posting to slack.',
      error: e
    }
  }
}
