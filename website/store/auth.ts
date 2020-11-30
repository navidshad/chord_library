import { Types, Authentication } from '@mres/web';
import toaster from '../utilities/toaster';

const authService = Authentication.getInstance();

interface Context {
    commit: any,
    dispatch: any,
}

interface State {
    user: any,
    error: any,
}

export default {
    state() {
        return {
            user: null,
            error: null,
        }
    },

    getters: {
        isLogin(state: any) {
            return !!state.user
        }
    },

    mutations: {
        SET_USER(state: State, user: object) {
            state.user = user;
        },
        SET_ERROR(state: State, error: any) {
            state.error = error;
        }
    },

    actions: {
        login({ commit }: Context, option: Types.LoginOptions) {

            return authService.login(option, true)
                .then(user => {
                    commit('SET_USER', user);
                })
                .catch((result: Types.RequestError) => {
                    toaster.toast({
                        label: 'Login error',
                        description: result.error
                    })

                    commit('SET_ERROR', result.error)
                    throw result;
                })

        },

        submitIdentity({ commit }: Context, option: Types.Identity) {

            return authService.registerIdentity(option)
                .catch((result: Types.RequestError) => {
                    toaster.toast({
                        label: 'Register error',
                        description: result.error
                    })

                    commit('SET_ERROR', result.error)
                    throw result.error;
                })
        },

        verifyId({ commit }: Context, option: { code: string, id: string }) {

            return authService.validateCode(option)
                .catch((result: Types.RequestError) => {
                    toaster.toast({
                        label: 'Verify code error',
                        description: result.error
                    })

                    commit('SET_ERROR', result.error)
                    throw result.error;
                })
        },

        submitPassword({ commit }: Context, option: { code: string, id: string, password: string }) {

            return authService.submitPassword(option)
                .catch((result: Types.RequestError) => {
                    toaster.toast({
                        label: 'Submit password error',
                        description: result.error
                    })

                    commit('SET_ERROR', result.error)
                    throw result.error;
                })
        },

        changePassword({ commit }: Context, option: { code: string, id: string, password: string }) {

            return authService.changePassword(option)
                .catch((result: Types.RequestError) => {
                    toaster.toast({
                        label: 'Change password error',
                        description: result.error
                    })

                    commit('SET_ERROR', result.error)
                    throw result.error;
                })
        },
    }
}