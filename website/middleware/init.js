import { GlobalOptions, authentication } from '@mres/web';

/**
 * Setup mrest-web module
 */
GlobalOptions.set({
    host: 'http://localhost:3001'
})

export default function ({ fetch }) {
    
    // if (!authentication.isLogin)
        return authentication.loginAsAnonymous();
}