import { GlobalOptions, authentication } from '@mres/web'

// Styles
import '../assets/style/style.scss';
import 'boxicons/css/boxicons.min.css';

/**
 * Setup mrest-web module
 */
GlobalOptions.set({
    host: 'http://localhost:3001'
})

export default async function () {
    await authentication.loginAsAnonymous()
}