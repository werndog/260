<template>
  <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/list">Restaurants</router-link>
      </div>
      <router-view/>
    <footer><a href="https://github.com/werndog/260/tree/master/creative-3">Here's my Github</a></footer>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background-color: #2987b3;
  height: 100%;
}

footer {
  background-color: orange;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 10%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5em;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

button {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  box-sizing: border-box;
  outline: none;
  border: none;
  text-align: center;
  display: inline-block;
  line-height: 42px;
  padding: 0 16px;
  border-radius: 4px;
  background-color: white;
  transition-property: background, box-shadow;
  transition-duration: 400ms, 280ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1), cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0s, 0s;    font-weight: 500;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: #5e29b3;
}
</style>
