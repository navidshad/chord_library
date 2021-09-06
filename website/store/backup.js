export default {
    state() {
        return {
			list: [],
        }
    },

    getters: {
        list(state) {
            return state.list || []
        },
    },

    mutations: {
        SET_LIST(state, list) {
            state.list = list;
        },

		REMOVE_FROMlIST(state, fileName) {
			let index = state.list.findIndex(fileName);
			state.list.splice(index,1);
		}
    },

    actions: {
        getList({ commit, state }, options = { reload: false }) {
			let url = process.env.BASE_URL + '/backup/list'

            return fetch(url).then(async r => {
				let body = await r.json();
				console.log(body);
                debugger
				commit('SET_LIST', body.list)
				return body;
			})
        },

        createNewBackup({ commit, state }) {
			let url = process.env.BASE_URL + '/backup'
			return fetch(url);
        },

		removeBackfile({ commit, state, }, fileName) {
			let url = process.env.BASE_URL + '/backup/' + fileName
			return fetch(url, {method: 'DELETE'})
			.then(() => commit('REMOVE_FROMlIST', fileName))
        }
    }
}   