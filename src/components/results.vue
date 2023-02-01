<template>
  <div>
    <app-header></app-header>
    <div id="results">
      <div class="mt-5 text-center">
        <h3>Results</h3>
      </div>
      <table class="table table-dark" v-if="!is_teacher">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Result</th>
            <th scope="col">Faculty</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ result.category }}</td>
            <td>{{ result.marks }} / {{ result.totalmarks }}</td>
            <td>{{ result.teachername }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-dark" v-else-if="is_teacher">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Student</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ result.category }}</td>
            <td>{{ result.name }}</td>
            <td>{{ result.marks }} / {{ result.totalmarks }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import header from "./header.vue";
export default {
  components: { "app-header": header },
  data() {
    return {
      is_teacher: true,
      results: []
    };
  },
  created() {
    this.getUser();
    this.fetchResult();
  },
  methods: {
    getUser: function() {
      fetch("http://localhost:3000/api/getuser", {
        method: "get",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          this.is_teacher = data.is_teacher;
        });
    },
    fetchResult: function() {
      fetch("http://localhost:3000/api/getresults", {
        method: "get",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          this.results = data.data;
          console.log(this.results);
        });
    },
    StartQuiz: function(id) {
      this.$router.push({ path: "/quiz/" + id });
    }
  }
};
</script>
<style scoped>
#results {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
