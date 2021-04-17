<template>
  <div class="Home">
    <div v-if="user">
      <h2>Requests</h2>
      <section class="requests">
        <div class="request" v-for="request in curRequests" :key="request.id">
          <h3>Request {{request.id}}</h3>
          <p>{{request.description}}</p>
          <p>Expires: {{request.expires}}</p>
          <p>ID: {{request.id}}</p>
        </div>
      </section>
    </div>
    <Login v-else />
  </div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue';
export default {
  components: { Login },
  name: 'Home',
  data() {
    return {
      requests: [],
      person: "",
      filtered: false,
      curRequests: [],
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    this.getRequests();
  },
  computed: {
    user() {
      console.log(this.$root.$data.user);
      return this.$root.$data.user;
    }
  },
  methods: {
    async getRequests() {
      try {
        let resp = await axios.get("/api/requests");
        let expiredReqs = resp.data.filter(request => !this.checkDate(request.expires));
        for (let i = 0; i < expiredReqs.length; i++) {
          this.deleteRequest(expiredReqs[i]);
        }
        resp = await axios.get("/api/requests");
        this.requests = resp.data;
        this.curRequests = resp.data;
        return true;
      } catch (error) {
        return false;
      }
    },
    checkDate(date) {
      let curDate = new Date();
      let checker = new Date(date);
      if (checker < curDate) {
        return false;
      }
      return true;
    },
    filter() {
      this.curRequests = this.requests.filter(request => request.requester == this.person);
      this.filtered = true;
    },
    removeFilter() {
      this.curRequests = this.requests;
      this.person = "";
      this.filtered = false;
    },
    async deleteRequest(request) {
      try {
        await axios.delete('/api/requests/' + request.id);
        return true;
      } catch(error) {
        return false;
      }
    },
  }
}
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: inherit;
}

button {
  margin-left: 20px;
}

.requests {
  column-gap: 1.5em;
}

.request {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

@media only screen and (min-width: 1024px) {
  .requests {
    column-count: 4;
  }
}

@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .requests {
    column-count: 3;
  }
}

@media only screen and (max-width: 767px) and (min-width: 540px) {
  .requests {
    column-count: 2;
  }
}
</style>
