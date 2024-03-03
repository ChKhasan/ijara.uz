<template>
  <section class="home-section">
    <LoaderBtn />
  </section>
</template>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vh;
  overflow: hidden;
  margin: 0;
  min-height: 100vh;
}
.home-section {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: 10000;
  background-color: rgb(0, 0, 0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
