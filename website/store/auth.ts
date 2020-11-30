import { Types, Authentication } from '@mres/web';
import toaster from '../utilities/toaster';

const authService = Authentication.getInstance();

export default {
    state() {
        return {
            user: null
        }
    },

    getters: {
        isLogin(state:any) {
            return !!state.user
        }
    },

    mutations: {
        SET_USER(state: { user: object }, user: object) {
            state.user = user;
        }
    },

    actions: {
        login(context: { commit: any }, option: Types.LoginOptions) {

            return authService.login(option, true)
                .then(user => {
                    context.commit('SET_USER', user);
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