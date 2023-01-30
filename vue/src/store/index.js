import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "Laravel 8",
    slug: "laravel-8",
    status: "draft",
    image: "https://www.giantbomb.com/a/uploads/square_medium/1/19745/889857-the_last_doujutsu___itachi_by_kuja_trance.png",
    description: "Laravel is a web application framework with expressive",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-31 18:00:00",
    questions: [
      {
        id: 101,
        type: "select",
        question: "Favourite framework ?",
        description : null,
        data: {
          options: [
            {
              uuid: "ecc34c24-0eaf-4628-9146-c057c1a3ddfb", text: "Laravel"
            },
            {
              uuid: "82a41572-4525-4d6d-8729-62121df69da6", text: "Node"
            },
            {
              uuid: "b604bdc7-cbf6-4f23-8041-6666f323e881", text: "django"
            }
          ]
        }
      },
      {
        id: 102,
        type: "select",
        question: "Favourite Language ?",
        description : null,
        data: {
          options: [
            {
              uuid: "ecc34c24-0eaf-4628-9146-c057c1a3ddfb", text: "Laravel"
            },
            {
              uuid: "82a41572-4525-4d6d-8729-62121df69da6", text: "Node"
            },
            {
              uuid: "b604bdc7-cbf6-4f23-8041-6666f323e881", text: "django"
            }
          ]
        }
      },
    ]
  },
  {
    id: 103,
    title: "Vue",
    slug: "vue",
    status: "draft",
    image: "https://www.giantbomb.com/a/uploads/square_medium/1/19558/896503-7261_itachi004_super.jpg",
    description: "Laravel is a web application framework with expressive,",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-31 18:00:00",
    questions: [
      {
        id: 104,
        type: "checkbox",
        question: "Favourite framework ?",
        description : null,
        data: {
          options: [
            {
              uuid: "ecc34c24-0eaf-4628-9146-c057c1a3ddfb", text: "Javascript"
            },
            {
              uuid: "82a41572-4525-4d6d-8729-62121df69da6", text: "Node"
            },
            {
              uuid: "b604bdc7-cbf6-4f23-8041-6666f323e881", text: "django"
            }
          ]
        }
      }
    ]
  },
  {
    id: 105,
    title: "Vue",
    slug: "vue",
    status: "draft",
    image: "https://www.giantbomb.com/a/uploads/square_medium/1/19745/889825-itachi___represent_by_h0shii.jpg",
    description: "Laravel is a web application framework with expressive,",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-31 18:00:00",
    questions: [
      {
        id: 106,
        type: "radio",
        question: "Favourite framework ?",
        description : null,
        data: {
          options: [
            {
              uuid: "ecc34c24-0eaf-4628-9146-c057c1a3ddfb", text: "Javascript"
            },
            {
              uuid: "82a41572-4525-4d6d-8729-62121df69da6", text: "Node"
            },
            {
              uuid: "b604bdc7-cbf6-4f23-8041-6666f323e881", text: "django"
            }
          ]
        }
      }
    ]
  },
  {
    id: 107,
    title: "Vue",
    slug: "vue",
    status: "draft",
    image: "",
    description: "Laravel is a web application framework with expressive,",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-31 18:00:00",
    questions: [
      {
        id: 108,
        type: "radio",
        question: "Favourite framework ?",
        description : null,
        data: {
          options: [
            {
              uuid: "ecc34c24-0eaf-4628-9146-c057c1a3ddfb", text: "Javascript"
            },
            {
              uuid: "82a41572-4525-4d6d-8729-62121df69da6", text: "Node"
            },
            {
              uuid: "b604bdc7-cbf6-4f23-8041-6666f323e881", text: "django"
            }
          ]
        }
      }
    ]
  },
  {
    id: 109,
    title: "Vue",
    slug: "vue",
    status: "draft",
    image: "",
    description: "Laravel is a web application framework with expressive,",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-31 18:00:00",
    questions: [
      {
        id: 110,
        type: "radio",
        question: "Favourite framework ?",
        description : null,
        data: {
          options: [
            {
              uuid: "ecc34c24-0eaf-4628-9146-c057c1a3ddfb", text: "Javascript"
            },
            {
              uuid: "82a41572-4525-4d6d-8729-62121df69da6", text: "Node"
            },
            {
              uuid: "b604bdc7-cbf6-4f23-8041-6666f323e881", text: "django"
            }
          ]
        }
      }
    ]
  }

]
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
    surveys: [...tmpSurveys],
    questionTypes: ["text","select","radio","checkbox","textarea"],
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
    }
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
    // saveSurvey: (state,survey) => {
    //     state.surveys = [...state.surveys,survey.data];
    // },
    // updateSurvey: (state,survey) => {
    //   state.surveys =  state.surveys.map((s) => {
    //     if(s.id == survey.data.id) {
    //       return survey.data;
    //     }
    //     return s;
    //   });
    // },

    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
  },
  modules: {},
});

export default store;
