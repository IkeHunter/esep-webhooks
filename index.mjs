export const handler = async function (event, context) {
  try {
    const data = JSON.parse(JSON.stringify(event))
    const slackUrl = process.env.SLACK_URL

    const payload = {
      text: `Issue Created: ${data.issue.html_url}`
    }

    await fetch({ method: 'POST', url: slackUrl, body: payload })

    return {
      message: 'Successfully posted to slack.'
    }
  } catch (e) {
    return {
      message: 'Error posting to slack.',
      error: e
    }
  }
}
