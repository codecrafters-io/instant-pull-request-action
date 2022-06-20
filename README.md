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
    - uses: codecrafters-io/action-instant-pull-request@v1
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
      - uses: codecrafters-io/action-instant-pull-request@v1
```

# How it works

This action listens for `push` events. When a `push` event is detected on a branch, it creates a Pull Request if an open/closed (not merged) Pull Request does not already exist for the branch.

# Background

Here's what the typical development process looks like:

1. Create a feature branch
2. Commit some changes
3. Push the branch to GitHub
4. Open a Pull Request
5. Wait for CI + code reviews
6. Merge

GitHub's [auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request) feature automates step 6, this action automates step 4.
