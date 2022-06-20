import * as core from '@actions/core'
import {inspect} from 'util'
import {Inputs, createPullRequest} from './create-pull-request'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      assignees: core.getInput('assignees').split(','),
      baseBranch: core.getInput('base-branch'),
      githubToken: core.getInput('github-token'),
      headBranch: core.getInput('head-branch')
    }

    core.debug(`Inputs: ${inspect(inputs)}`)

    const pullRequestUrl = await createPullRequest(inputs)

    if (pullRequestUrl) {
      core.info(`Pull request created: ${pullRequestUrl}`)
      core.setOutput('pull-request-url', pullRequestUrl)
    }
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
