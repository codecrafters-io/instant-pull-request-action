import * as core from '@actions/core'
import {inspect} from 'util'
import {Inputs, createPullRequest} from './create-pull-request'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      assignees: core.getInput('assignees').split(','),
      baseBranch: core.getInput('base_branch'),
      githubToken: core.getInput('github_token'),
      headBranch: core.getInput('head_branch')
    }

    core.debug(`Inputs: ${inspect(inputs)}`)

    await createPullRequest(inputs)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
