<template>
  <div class="pa-3">
    <h3>hot courses</h3>
    <v-row>
      <v-col v-for="item in courses" :key="item._id" md="4">
        <v-card class="mx-auto" max-width="344">
          <router-link :to="`/courses/${item._id}`">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>
          </router-link>

          <v-card-title>
            {{ item.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ item.createdAt }}
          </v-card-subtitle>

          <v-card-actions>
            <LinkBtn type="Course" :object="item._id"></LinkBtn>
            <v-btn text>Share</v-btn>

            <v-btn color="purple" text>
              Explore
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LinkBtn from '../../components/LinkBtn'
export default {
  component: {
    LinkBtn,
  },
  async asyncData({ $axios }) {
    const { data: courses } = await $axios.$get('courses')
    return {
      courses,
    }
  },
}
</script>

<style scoped></style>
