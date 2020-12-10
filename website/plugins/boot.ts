import { GlobalOptions, authentication } from '@modular-rest/client'

// Styles
import '../assets/style/style.scss';
import 'boxicons/css/boxicons.min.css';

/**
 * Setup mrest-web module
 */
GlobalOptions.set({
    host: process.env.BASE_URL || ''
})

export default async function () {
    await authentication.loginAsAnonymous()
}