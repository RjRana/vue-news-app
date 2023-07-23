import Vuex from 'vuex';
import headlines from './headlines';

const modules = {
  headlines,
};

const Store = () => new Vuex.Store({
  modules,
});
const store = Store();

export default store;
