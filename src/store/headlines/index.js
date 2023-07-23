import {
  fetchNews, searchNews, getAllSources, getNewsFromSource,
// eslint-disable-next-line import/no-unresolved, import/extensions
} from '@/app/services';

export default {
  namespaced: true,

  state: {
    all: [],
    loading: false,
    sourcesLoading: false,
    search: '',
    history: [],
    sources: [],
  },

  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },

    SET_SOURCES_LOADING(state, loading) {
      state.sourcesLoading = loading;
    },

    SET_SEARCH(state, search) {
      state.search = search || '';
    },

    SET_SOURCES(state, sources) {
      state.sources = sources;
    },

    SET_HEADLINES(state, headlines) {
      const processedHeadlines = headlines.reduce((acc, headline, index) => {
        if (headline.source && headline.source.id && headline.source.name) {
          const processedHeadline = { ...headline, id: index + 1 };
          acc.push(processedHeadline);
        }
        return acc;
      }, []);
      state.all = processedHeadlines;
    },

    ADD_ITEM_TO_HISTORY(state, headline) {
      if (!headline) return;
      const index = state.history.findIndex((h) => h.id === headline.id);
      if (index === -1) {
        state.history.push(headline);
      }
    },

    UPDATE_HEADLINE(state, { title, id }) {
      const index = state.all.findIndex((headline) => headline.id === id);
      if (index !== -1) {
        Vue.set(state.all, index, { ...state.all[index], title });
      }
    },

    DELETE_HEADLINE(state, id) {
      state.all = state.all.filter((headline) => headline.id !== id);
    },
  },

  getters: {
    all: (state) => state.all,
    loading: (state) => state.loading,
    search: (state) => state.search,
    history: (state) => state.history,
    getSources: (state) => state.sources,
    sourcesLoading: (state) => state.sourcesLoading,
    getHeadlineById: (state) => (id) => state.all.find((headline) => headline.id === id),
  },

  actions: {
    async fetchData({ commit }) {
      commit('SET_LOADING', true);

      try {
        const response = await fetchNews();
        const { data } = response;
        const headlines = data?.articles || [];
        commit('SET_HEADLINES', headlines);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      commit('SET_LOADING', false);
    },

    async searchData({ state, commit }) {
      commit('SET_LOADING', true);

      try {
        const response = await searchNews(state.search);
        const { data } = response;
        const headlines = data?.articles || [];
        commit('SET_HEADLINES', headlines);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      commit('SET_LOADING', false);
    },

    async fetchSources({ commit }) {
      commit('SET_SOURCES_LOADING', true);

      try {
        const response = await getAllSources();
        const { data } = response;
        const sources = data?.sources || [];
        commit('SET_SOURCES', sources);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      commit('SET_SOURCES_LOADING', false);
    },

    async fetchNewsViaSources({ commit }, sources = []) {
      if (!sources.length) return;
      commit('SET_LOADING', true);

      // eslint-disable-next-line no-shadow
      const formatArray = (a) => a.join(', ');

      try {
        const response = await getNewsFromSource(formatArray(sources));
        const { data } = response;
        const headlines = data?.articles || [];
        commit('SET_HEADLINES', headlines);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      commit('SET_LOADING', false);
    },

    updateHistory({ commit }, payload) {
      commit('ADD_ITEM_TO_HISTORY', payload);
    },

    updateHeadline({ commit }, { title, id }) {
      commit('UPDATE_HEADLINE', { title, id });
    },
  },
};
