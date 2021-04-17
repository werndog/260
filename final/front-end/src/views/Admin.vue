<template>
  <div>
    <div v-if="user">
      <div class="logout">
        <button @click="logout()">Log out</button>
      </div>
      <h1>Please enter your request:</h1>
      <div class="add">
        <div class="form">
          <textarea v-model="description" placeholder="Description..."/>
          <p/>
          <span>Expires:</span>
          <input type="date" v-model="expires" placeholder="Expires"/>
          <p/>
          <button @click="submitRequest">Submit</button>
        </div>
        <div class="request" v-if="curRequest">
          <p>{{curRequest.description}}</p>
          <p v-if="curRequest.expires">Expires: {{curRequest.expires}}</p>
        </div>
        <div class="request" v-if="error">
          <h3>{{error}}</h3>
        </div>
      </div>
      <div class="delete">
        <div>
          <h1>Find a previous request:</h1>
          <input v-model="id" placeholder="ID">
          <p/>
          <button @click="find(id)">Submit</button>
        </div>
        <div class="request" v-if="findRequest">
          <textarea v-model="findRequest.description"/>
          <p/>
          <input type="date" v-model="editExpires">
          <p/>
          <div>
            <button @click="deleteRequest(findRequest)">Delete</button>
            <button class="edit" @click="editRequest(findRequest)">Edit</button>
          </div>
        </div>
        <div class="request" v-if="editError">
          <h3>{{editError}}</h3>
        </div>
      </div>
    </div>
    <Login v-else />
  </div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue';
export default {
  components: { Login },
  name: 'Admin',
  data() {
    return {
      curRequest: null,
      description: "",
      id: "",
      requests: [],
      findRequest: null,
      expires: "",
      error: "",
      editExpires: "",
      editError: "",
    }
  },
  async created() {
    this.getRequests();
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
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
        let resp = await axios.get('/api/requests');
        this.requests = resp.data;
        return true;
      } catch(error) {
        return false;
      }
    },
    find(id) {
      let req = this.requests.find(element => element.id == id);

      if (req !== undefined) {
        this.findRequest = req;
        this.editError = '';
      } else {
        this.editError = 'Invalid request ID';
      }
    },
    async submitRequest() {
      let dateChecker = new Date(this.expires);
      let curDate = new Date();
      
      if (this.expires === '' || curDate > dateChecker) {
        this.error = 'Invalid date given';
        return;
      }

      if (this.description === '') {
        this.error = 'Invalid description given';
        return
      }
      try {
        let resp = await axios.post('/api/requests', {
          description: this.description,
          expires: this.expires,
        });
        this.curRequest = resp.data;
        this.getRequests();
        this.error = "";
        return true;
      } catch(error) {
        return false;
      }
    },
    async deleteRequest(request) {
      try {
        await axios.delete('/api/requests/' + request.id);
        this.findRequest = null;
        this.getRequests();
        this.editError = "";
        return true;
      } catch(error) {
        return false;
      }
    },
    async editRequest(request) {
      let dateChecker = new Date(this.editExpires);
      let curDate = new Date();
      
      if (curDate > dateChecker) {
        this.editError = 'Invalid date given';
        return;
      }
      try {
        await axios.put('/api/requests/' + request.id, {
          description: request.description,
          expires: this.expires,
        });
        this.getRequests();
        this.editError = "";
        return true;
      } catch(error) {
        return false;
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.delete {
  margin-top: 50px;
}

.add,
.delete {
  display: flex;
}

.request {
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.edit {
  margin-left: 10%;
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 40%;
}
</style>