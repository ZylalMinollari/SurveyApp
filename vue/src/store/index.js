import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    currentSurvey: {
      data: {},
      loading: false,
    },
    surveys: {
      loading: false,
      links: [],
      data: [],
    },
    questionTypes: ["text","select","radio","checkbox","textarea"],
    notification: {
      show: false,
      type: null,
      message: null,
    },
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },

    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response
        })
    },

    saveSurvey({commit},survey) {
      delete survey.image_url
      let response;
      if(survey.id) {
        response = axiosClient.put(`/survey/${survey.id}`,survey)
        .then((res)=> {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      } else {
          response = axiosClient.post("/survey",survey).then((res)=>{
            commit("setCurrentSurvey",res.data)
          });
      }
      return response;
    },
    getSurveys({ commit }, {url = null} = {}) {
      commit('setSurveysLoading', true);
      url = url || "/survey";
      return axiosClient.get(url).then((res) => {
        commit('setSurveysLoading', false)
        commit("setSurveys", res.data);
        return res;
      });
    },
    getSurveyBySlug({commit},slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
      .get(`/survey-by-slug/${slug}`)
      .then((res) => {
        commit("setCurrentSurvey", res.data);
        commit("setCurrentSurveyLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentSurveyLoading", false);
        throw err;
      });
    },

    deleteSurvey({ }, id) {
      return axiosClient.delete(`/survey/${id}`);
    },
    getSurvey({commit},id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },

    saveSurveyAnswer({commit}, {surveyId, answers}) {
      return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },

    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
      state.surveys.links = surveys.meta.links;
    },
    notify: (state,{message,type}) =>{
      state.notification.show = true,
      state.notification.type = type,
      store.notification.message = message,
      setTimeout(() => {
        set.notification.show = false;
      }, 3000);
    },
  },
  modules: {},
});

export default store;
