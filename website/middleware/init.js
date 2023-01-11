import {
  GlobalOptions,
  authentication
} from '@modular-rest/client';

export default function ({
  fetch,
}) {
  let baseUrl = process.env.BASE_URL || 'http://localhost:8081';

  /**
   * Setup mrest-web module
   */
  GlobalOptions.set({
    host: baseUrl
  })

  if (!authentication.isLogin)
    return authentication.loginAsAnonymous();
}
