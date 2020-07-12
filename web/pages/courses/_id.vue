<template>
  <div class="pa-3">
    <h3>{{ courses.name }}</h3>
    <v-select
      v-model="currentIndex"
      :items="
        courses.episodes.map(({ name }, i) => ({
          text: name,
          value: i,
        }))
      "
    ></v-select>
    <video width="100%" :src="videoList[0]" controls></video>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const courses = await $axios.$get(`courses/${id}`, {
      params: {
        query: {
          populate: 'episodes',
        },
      },
    })

    return {
      id,
      courses,
    }
  },
  data() {
    return {
      currentIndex: 0,
      videoList: ['http://vjs.zencdn.net/v/oceans.mp4'],
    }
  },
  computed: {
    episode() {
      return this.courses.episodes[this.currentIndex]
    },
  },
}
</script>
