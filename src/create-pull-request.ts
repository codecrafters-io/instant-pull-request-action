import * as core from '@actions/core'
import {Octokit} from './octokit-client'
import {inspect} from 'util'

export interface Inputs {
  assignees: string[]
  baseBranch: string
  githubToken: string
  headBranch: string
  title: string
}

export async function createPullRequest(
  inputs: Inputs
): Promise<String | null> {
  const repoPath = process.env['GITHUB_WORKSPACE']

  if (!repoPath) {
    throw new Error('GITHUB_WORKSPACE not defined')
  }

  if (inputs.baseBranch === inputs.headBranch) {
    core.info(
      'Skip creating pull request because base and head branches are the same'
    )

    return null
  }

  core.info(
    `Creating pull request from ${inputs.headBranch} -> ${inputs.baseBranch}`
  )

  const octokitClient = new Octokit({
    auth: inputs.githubToken,
    baseUrl: process.env['GITHUB_API_URL'] || 'https://api.github.com'
  })

  const {data: existingPullRequests} = await octokitClient.rest.pulls.list({
    owner: process.env['GITHUB_REPOSITORY_OWNER'] as string,
    repo: (process.env['GITHUB_REPOSITORY'] as string).split('/')[1],
    head: `${process.env['GITHUB_REPOSITORY_OWNER']}:${inputs.headBranch}`,
    base: inputs.baseBranch,
    state: 'all'
  })

  core.debug(`Existing pull requests: ${inspect(existingPullRequests)}`)

  for (const pullRequest of existingPullRequests) {
    if (pullRequest.closed_at && !pullRequest.merged_at) {
      core.info(
        `Skipping, a closed pull request that isn't merged exists for the same branch.`
      )

      return null
    }

    if (pullRequest.state === 'open') {
      core.info(
        `Skipping, an open pull request already exists for the same branch.`
      )

      return null
    }
  }

  // No existing pull requests exist, let's create one!

  const {data: newPullRequest} = await octokitClient.rest.pulls.create({
    owner: process.env['GITHUB_REPOSITORY_OWNER'] as string,
    repo: (process.env['GITHUB_REPOSITORY'] as string).split('/')[1],
    head: `${process.env['GITHUB_REPOSITORY_OWNER']}:${inputs.headBranch}`,
    base: inputs.baseBranch,
    title: inputs.title
  })

  return newPullRequest.html_url
}
