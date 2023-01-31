<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ model.id ? model.title : "Create Survey" }}</h1>
        <button v-if="route.params.id"
        type="button"
        @click="deleteSurvey()"
        class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-1 inline-block">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
          Delete
        </button>
      </div>
    </template>
    <!-- <div v-if="surveyLoading" class="flex justify-center">Loading...</div> -->
    <form @submit.prevent="saveSurvey" class="animate-fade-in-down">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5  bg-white space-y-6 sm:p-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Image</label>
            <div class="mt-1 flex item-center">
              <img v-if="model.image_url" :src="model.image_url" :alt="model.title" class="w-64 h-48 object-cover" />
              <span v-else class="
              flex
              items-center
              justify-center
              h-12
              w-12
              rounded-full
              overflow-hidden
              bg-grey-100
              ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-[80%] w-[80%] text-gray-300">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </span>
              <button type="button" class="relative
              overflow-hidden ml-5
              bg-white
              py-2
              px-3
              border
              border-gray-300
              rounded-md
              shadow-sm
              text-sm
              leading-4
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500">
                <input type="file" @change="onImageChoose" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer" />
                Change
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" v-model="model.title" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full
            shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <div class="mt-1">
              <textarea name="description" id="description" rows="3" v-model="model.description"
                autocomplete="survey_description"
                class="
              shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Survey Description"></textarea>
            </div>
          </div>

          <div>
            <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
            <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full
            shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="status" name="status" type="checkbox" class="
                  focus:ring-indigo-500
                  h-4
                  w-4
                  text-indigo-600
                  border-gray-300
                  rounded
                " />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">Active</label>
              <p class="text-gray-500">
                Active survey and make public
              </p>
            </div>
          </div>

          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <h3 class="text-2xl font-semibold">Questions
              <button type="button" @click="addQuestion()" class=" flex items-center text-sm py-1
              px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                Add Question
              </button>
            </h3>
            <!-- <div v-for="question in survey.questions" :key="question.id" >
              <pre>{{question}}</pre>
            </div> -->
            <div v-if="!model.questions.length" class="text-center text-gray-600">
              You dont have questions
            </div>
            <div v-for="(question, index) in model.questions" :key="question.id">
              <QuestionEditor :question="question" :index="index" @onchange="questionChange" @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion" />
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                ">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- <pre>{{ survey }}</pre> -->
  </PageComponent>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed } from "vue";
import { ref,watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const router = useRouter();
const route = useRoute();

let model = ref({
  title: "",
  slug: "",
  status: false,
  description: null,
  image: null,
  image_url: null,
  expire_date: null,
  questions: [],

});

const surveyLoading = computed(() => store.state.currentSurvey.loading);

if (route.params.id) {
  store.dispatch('getSurvey', route.params.id);
}

watch(
  () => store.state.currentSurvey.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: newVal.status !== 'draft',
    };
  }
);

const survey = computed(() =>
  store.state.surveys.find((s) => s.id === parseInt(route.params.id))
);

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    title: "text",
    question: "",
    description: null,
    data: {}
  };

  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}

function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  })
}

function onImageChoose(ev) {
  const file = ev.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    model.value.image = reader.result;
    model.value.image_url = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}

function saveSurvey() {
  store.dispatch("saveSurvey", model.value).then(({ data }) => {
    store.commit('notify', {
      type: 'success',
      message: "The survey was successfully updated",
    })
    router.push({
      name: "SurveyView",
      params: { id: data.data.id }
    });
  })
}

function deleteSurvey() {
  if (
    confirm(
      `Are you sure you want to delete this survey? Operation can't be undone!!`
    )
  ) {
    store.dispatch("deleteSurvey", model.value.id).then(() => {
      router.push({
        name: "Surveys",
      });
    });
  }
}


</script>

<style>

</style>
