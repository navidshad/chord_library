import { GlobalOptions, authentication } from '@modular-rest/client';

/**
 * Setup mrest-web module
 */
GlobalOptions.set({
    host: process.env.VUE_APP_BASE_URL || ''
})

export default function ({ fetch }) {

    if (!authentication.isLogin)
        return authentication.loginAsAnonymous();
}