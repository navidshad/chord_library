import { Types, Authentication } from '@mres/web';
import toaster from '../utilities/toaster';

const authService = Authentication.getInstance();

export default {
    state() {
        return {

        }
    },

    actions: {
        login(context: { commit: any }, option: Types.LoginOptions) {

            return authService.login(option)
                .then(body => {
                    debugger
                })
                .catch((result: Types.RequestError) => {
                    toaster.toast({
                        label: 'Login Error',
                        description: result.error
                    })

                    throw result;
                })

        }
    }
}