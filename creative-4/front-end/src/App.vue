<template>
  <div id="app">
    <div id="nav">
      <div>
        <h2>Til Death Don't Us Part</h2>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <div class="content">
      <router-view/>
    </div>
    <div class="footer">
      <a href="https://github.com/werndog/260/tree/master/creative-4">Click here for my Github</a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

body {
  height: 100%;
}

html {
  height: 100%;
}

.footer {
  height: 70px;
  background: #2c3e50;
  font-size: 1.2em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer a {
  color: #17b69b;
}

.content {
  padding: 20px;
  min-height: 500px;
}

#nav {
  padding: 30px;
  background-color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #17b69b;
}

#nav a.router-link-exact-active {
  color: #000000;
}
</style>
