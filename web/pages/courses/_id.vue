<template>
  <div class="pa-3">
    <v-row>
      <v-col :md="8">
        <video width="100%" :src="videoList[currentIndex]" controls></video>
        <link-btn type="Course" :object="courses._id"></link-btn>
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
      </v-col>
      <v-col :d="4">
        <comment-list type="Episode" :object="episode._id"></comment-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LinkBtn from '../../components/LinkBtn'
import CommentList from '../../components/CommentList'
export default {
  components: {
    LinkBtn,
    CommentList,
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
