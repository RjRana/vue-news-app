<template>
  <div>
    <base-layout v-if="$route.name === 'home'" :loading="loading" title="Today's Headlines">
      <template #search>
        <v-text-field
          v-if="!toggleView"
          placeholder="Search Headlines"
          v-model="doSearch"
          filled
          dense
          clearable
          append-icon="mdi-magnify"
          hide-details
          @input="searchHeadlines"
        >
        </v-text-field>
      </template>
      <template #actions>
        <v-sheet elevation="2" class="px-4 pt-0 pb-8 mb-8">
          <v-row align="center">
            <v-col cols="12" md="4" v-if="!toggleView">
              <v-autocomplete
                v-model="sources"
                :items="getSources"
                :loading="sourcesLoading"
                :disabled="sourcesLoading"
                label="Select channels"
                placeholder="Select channel to load news"
                item-text="name"
                item-value="id"
                deletable-chips
                multiple
                small-chips
                hide-details
                @change="loadNewsViaSources"
              ></v-autocomplete>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2">
              <v-switch v-model="toggleView" :label="getView" hide-details></v-switch>
            </v-col> </v-row
        ></v-sheet>
      </template>
      <template #loader>
        <v-col v-for="n in 100" cols="12" sm="6" md="4" lg="3" :key="n">
          <skeleton type="headline" :loading="loading"></skeleton>
        </v-col>
      </template>
      <template v-if="shouldShowNews">
        <v-col
          v-for="(item, index) in getNewsItems"
          :key="`${item.title}-${index}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex flex-column mb-4"
        >
          <headline-card
            :headline="item"
            :hide-edit="toggleView"
            @redirect-to-detail="redirectToDetail(item)"
            @edit="editHeadline(item)"
          ></headline-card>
        </v-col>
      </template>
      <template v-else>
        <v-col
          cols="12"
          class="d-flex justify-center align-center overflow-hidden pa-9"
          style="height: calc(100vh - 100px)"
        >
          <v-img src="/assets/not_found.svg" conatin max-width="600"> </v-img>
        </v-col>
      </template>
    </base-layout>
    <form-dialog
      v-model="showEditDialog"
      :headline="headlineToEdit"
      @update-title="updateHeadline"
    ></form-dialog>
    <router-view name="detail"></router-view>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import HeadlineCard from '@components/HeadlineCard';
// eslint-disable-next-line import/no-unresolved
import BaseLayout from '@modules/home/BaseLayout';
// eslint-disable-next-line import/no-unresolved
import FormDialog from '@components/Form';
// eslint-disable-next-line import/no-unresolved
import Skeleton from '@skeletons';
import { mapGetters, mapMutations, mapActions } from 'vuex';

// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';

const data = () => ({
  showEditDialog: false,
  headlineToEdit: {},
  toggleView: false,
  sources: [],
});

export default {
  components: {
    Skeleton,
    BaseLayout,
    FormDialog,
    HeadlineCard,
  },

  created() {
    this.fetchData();
    this.fetchSources();
  },

  data: () => data(),

  computed: {
    ...mapGetters('headlines', {
      headlines: 'all',
      loading: 'loading',
      search: 'search',
      history: 'history',
      getSources: 'getSources',
      sourcesLoading: 'sourcesLoading',
    }),

    // Use mapMutations to create a setter for 'search'
    doSearch: {
      get() {
        return this.search;
      },
      set(value) {
        this.SET_SEARCH(value);
      },
    },

    getView() {
      return this.toggleView ? 'History' : ' Headlines';
    },

    getNewsItems() {
      return this.toggleView ? this.history : this.headlines;
    },

    shouldShowNews() {
      return this.getNewsItems.length;
    },
  },

  methods: {
    ...mapMutations('headlines', ['SET_SEARCH']),

    ...mapActions('headlines', [
      'fetchData',
      'searchData',
      'updateHeadline',
      'updateHistory',
      'fetchSources',
      'fetchNewsViaSources',
    ]),

    searchHeadlines: debounce(function () {
      this.sources = [];
      if (!this.doSearch) {
        this.fetchData();
        return;
      }
      this.searchData();
    }, 1000),

    loadNewsViaSources() {
      this.doSearch = '';
      if (!this.sources.length) {
        this.fetchData();
        return;
      }
      this.fetchNewsViaSources(this.sources);
    },

    editHeadline(headline) {
      this.showEditDialog = true;
      this.headlineToEdit = headline;
    },

    redirectToDetail(item) {
      const { id } = item;
      if (!id) return;
      this.updateHistory(item);
      this.$router.push({ name: 'headline_detail', params: { newsId: id } });
    },
  },
};
</script>
