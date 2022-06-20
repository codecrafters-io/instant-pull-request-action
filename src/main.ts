import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    // Create Pull Request
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
