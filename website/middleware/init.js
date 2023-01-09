import {
  GlobalOptions,
  authentication
} from '@modular-rest/client';

export default function ({
  fetch,
}) {
  let baseUrl;

  if (process.server) {
    baseUrl = 'http://localhost:8081'
  } else {
    baseUrl = process.env.BASE_URL || ''
  }

  /**
   * Setup mrest-web module
   */
  GlobalOptions.set({
    host: baseUrl
  })

  if (!authentication.isLogin)
    return authentication.loginAsAnonymous();
}
