import * as core from '@actions/core'

export interface Inputs {
  assignees: string[]
  baseBranch: string
  githubToken: string
  headBranch: string
}

export async function createPullRequest(inputs: Inputs): Promise<void> {
  try {
    const repoPath = process.env['GITHUB_WORKSPACE']

    if (!repoPath) {
      throw new Error('GITHUB_WORKSPACE not defined')
    }

    if (inputs.baseBranch === inputs.headBranch) {
      core.info(
        'Skip creating pull request because base and head branches are the same'
      )

      return
    }

    core.info(
      `Creating pull request from ${inputs.headBranch} -> ${inputs.baseBranch}`
    )

    // Init the GitHub client
    const githubHelper = new GitHubHelper(inputs.githubToken)
  } finally {
  }
}
