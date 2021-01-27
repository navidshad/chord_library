import { dataProvider } from '@modular-rest/client';
export default {
    state() {
        return {
            tables: [],
        }
    },

    mutations: {
        SET_TABLES(state, list) {
            state.tables = list;
        }
    },

    actions: {
        getTables({ commit, state }, options = { reload: false }) {
            if (options.reload || !state.tables.length) {
                return dataProvider.find({
                    database: 'chord',
                    collection: 'table',
                    query: {},
                    populates: [
                        'keySignature',
                        'type',
                        'rows.major',
                        'rows.naturalMinor',
                        'rows.harmonicMinor',
                        'rows.melodicMinor',
                        'chromaticRows.one',
                        'chromaticRows.two',
                        'chromaticRows.three',
                        'chromaticRows.four',
                    ]
                })
                    .then(list => commit('SET_TABLES', list));
            }
            else {
                return new Promise((done) => done());
            }
        }
    }
}   