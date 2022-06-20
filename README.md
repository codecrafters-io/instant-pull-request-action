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

# Background

Here's what the typical development process looks like:

1. Create a feature branch
2. Commit some changes
3. Push the branch to GitHub
4. Open a Pull Request
5. Wait for CI + code reviews
6. Merge

GitHub's [auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request) feature automates step 6, this action automates step 4.
