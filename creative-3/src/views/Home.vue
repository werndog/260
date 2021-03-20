<template>
  <div class="home">
    <h2>Welcome to restaurant picker!
      This is a website to help you narrow down your choices on where you want to eat.</h2>
    <h3>To start, click on restaurants above and add your favorite restaurants</h3>
    <img class="logo" alt="Restaurant" src="../assets/restaurant.jpeg">
    <div v-if="!started">
      <button class="startButton" @click="start">Start</button>
    </div>
    <div class="contenders" v-if="started && winner === ''">
      <div class="contender" v-for="restaurant in curRestaurants" :key="restaurant">
        <p>{{restaurant}}</p>
        <button @click="selectWinner(restaurant)">Select</button>
      </div>
    </div>
    <div class="winner" v-if="started && winner !== ''">
      <p><strong>{{winner}} is the winner!</strong></p>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      started: false,
      winners: [],
      restaurants: [...this.$root.$data.restaurants],
      winner: '',
      curRestaurants: [],
    }
  },
  methods: {
    start() {
      if (this.restaurants.length > 0) {
        this.started = true;
        this.curRestaurants = this.grabRestaurants();
      }
    },
    grabRestaurants() {
      let numRestaurants = this.restaurants.length;
      //if only 2 or 3 remain, pit them against each other
      if (numRestaurants <= 3) {
        let toReturn = this.restaurants;
        this.restaurants = []
        return toReturn;
      }

      //grab 2 random restaurants
      let first = Math.floor(Math.random() * (numRestaurants-1));
      let second = first;
      while (second === first) {
        second = Math.floor(Math.random() * (numRestaurants-1));
      }

      first = this.restaurants[first]
      second = this.restaurants[second]
      //remove from restaurants
      this.restaurants.splice(this.restaurants.indexOf(first), 1)
      this.restaurants.splice(this.restaurants.indexOf(second), 1)
      debugger
      return [first, second];
    },
    selectWinner(rest) {
      console.log(rest)
      this.winners.push(rest);
      if (this.restaurants.length === 0 && this.winners.length > 1) {
        this.restaurants = this.winners;
        this.winners = [];
      }
      // debugger
      if (this.restaurants.length > 0) {
        this.curRestaurants = this.grabRestaurants();
      }

      if (this.restaurants.length === 0 && this.winners.length === 1) {
        this.winner = this.winners[0]
      }
    },
    reset() {
      this.restaurants = [...this.$root.$data.restaurants];
      this.winners = [];
      this.started = false;
      this.winner = '';
    }
  }
}
</script>

<style scoped>
  .logo {
    max-width: 15%;
    min-width: 200px;
  }

  .contenders {
    display: flex;
    max-width: 80%;
    justify-content: space-evenly;
    font-size: 2em;
    margin: 2% auto auto auto;
  }

  .contender {
    width: 30%;
  }

  .startButton {
    font-size: 2em;
    margin-top: 1%;
  }

  .winner {
    font-size: 150%;
  }
</style>