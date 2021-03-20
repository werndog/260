<template>
  <div class="list">
    <h1>Add restaurants you would like to eat from</h1>
    <h2>When you're done, return home and press start</h2>
    <form v-on:submit.prevent="addRestaurant(restaurantText)" class="pure-form">
      <input v-model="restaurantText"/>
      <button style="margin: 0" type="submit">Add</button>
      <button @click="removeAll">Remove All</button>
    </form>
    <div class="restaurants">
      <div v-for="restaurant in restaurants" :key="restaurant" class="restaurant">
      <p>{{restaurant}}</p>
      <button class="removeButton" v-show="restaurant !== ''" @click="removeRestaurant(restaurant)">Remove</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'List',
  data() {
    return {
      restaurantText: '',
    }
  },
  computed: {
    restaurants() {
      return this.$root.$data.restaurants;
    }
  },
  methods: {
    addRestaurant(rest) {
      if (rest === '') {
        return;
      }
      this.$root.$data.restaurants.push(rest);
      this.restaurantText = '';
    },
    removeRestaurant(rest) {
      this.$root.$data.restaurants.splice(this.$root.$data.restaurants.indexOf(rest), 1);
    },
    removeAll() {
      this.$root.$data.restaurants = [];
      console.log(this.$root.$data.restaurants.length);
      console.log(this.restaurants.length)
    }
  }
}
</script>

<style scoped>
.restaurants {
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  margin: auto;
  flex-wrap: wrap;
}

.restaurant {
  width: 20%;
}

.pure-form {
  max-width: 450px;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
  flex-wrap: wrap;
}

.removeButton {
  padding: 0 14%;
}

p {
  font-size: 150%;
}

</style>