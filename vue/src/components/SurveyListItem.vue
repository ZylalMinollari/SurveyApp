<template>
  <div class="
  flex flex-col
  py-4
  px-6
  shadow-md
  hover:bg-white-50
  h-[470px]
  ">
    <img :src="survey.image_url" alt="" class="w-full h-48 object-cover" />
    <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
    <div v-html="survey.description"></div>

    <div class="flex justify-between items-center mb-3">
      <router-link :to="{ name: 'SurveyView', params: { id: survey.id } }" class="
        flex
        py-2
        px-4
        border border-transparent
        text-sm
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit
      </router-link>
      <button v-if="survey.id" type="button" @click="emit('delete',survey)" class="
    h-8
    w-8
    flex
    items-center
    justify-center
    rounded-full
    border border-transparent
    text-sm text-red-500
    focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>

      </button>
    </div>
  </div>
</template>
<script setup>

const { survey } = defineProps({
  survey: Object,
});
const emit = defineEmits(['edit', 'delete']);
</script>
<style>

</style>
