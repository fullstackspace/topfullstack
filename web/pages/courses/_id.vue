<template>
  <div class="pa-3">
    <LinkBtn type="Course" :object="courses._id"></LinkBtn>
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
    <video width="100%" :src="videoList[currentIndex]" controls></video>
  </div>
</template>

<script>
import LinkBtn from '../../components/LinkBtn'
export default {
  components: {
    LinkBtn,
  },
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
      videoList: ['http://vjs.zencdn.net/v/oceans.mp4', ''],
    }
  },
  computed: {
    episode() {
      return this.courses.episodes[this.currentIndex]
    },
  },
}
</script>
