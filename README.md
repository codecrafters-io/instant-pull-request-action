# Instant PRs

A GitHub action that automatically creates Pull Requests when a branch is pushed to.

# Usage

**Basic**:

```yaml
name: Create PR

on: [push]

jobs:
  create_pr:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: codecrafters-io/instant-pull-request-action@v1
```

**Allow triggering other push/pull_request workflows**:

If you want pull requests created by this action to trigger an `on: push` or `on: pull_request` workflow then
you cannot use the default `GITHUB_TOKEN`. Use a separate 
[personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) instead: 

```yaml
name: Create PR

on: [push]

jobs:
  create_pr:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: codecrafters-io/instant-pull-request-action@v1
        with:
          github-token: "${{ secrets.GITHUB_TOKEN_FOR_PULL_REQUEST_CREATION }}"
```

**Ignore Certain Branches**:

```yaml
name: Create PR

on:
  push:
    branches-ignore:
      - develop
      - release/*

jobs:
  create_pr:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: codecrafters-io/instant-pull-request-action@v1
```

**Use master as the base branch**:

```yaml
name: Create PR

on: [push]

jobs:
  create_pr:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: codecrafters-io/instant-pull-request-action@v1
      with:
        base-branch: master
```

# Action inputs

All inputs are **optional**. If not set, sensible defaults will be used.

| Name             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default                                                                                                    |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `github-token`   | `GITHUB_TOKEN` (permissions `contents: write` and `pull-requests: write`) or a `repo` scoped [Personal Access Token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).                                                                                                                                                                                                                                                                              | `GITHUB_TOKEN`                                                                                             |
| `base-branch`    | Base branch for the Pull Request                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `main`                                                                                                     |
| `assignees`      | Comma-separated list of users to add as assignees. Defaults to the user who triggered the Git push.                                                                                                                                                                                                                                                                                                                                                                                                   | `${{ github.actor }}`                                                                                      |
| `title`          | The title of the pull request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `Changes from <branch_name>`                                                                               |

# Background

Here's what the typical development process looks like:

1. Create a feature branch
2. Commit some changes
3. Push the branch to GitHub
4. Open a Pull Request
5. Wait for CI + code reviews
6. Merge

GitHub's [auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request) feature automates step 6, this action automates step 4.
