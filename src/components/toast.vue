<template>
  <div>
    <div
      v-if="showWrap "
      :class="[showContent ?'fadein':'fadeout',whether ? 'wrap' : 'wrapFail']"
    >{{text}}</div>
  </div>
</template>

<style scoped>
.wrap {
  position: fixed;
  left: 50%;
  top: 40vh;
  background: rgb(42,41,62);
  padding: 10px 15px;
  /* border: 3px solid rgba(217, 222, 255, 1); */
  /* box-shadow: 0px 10px 20px rgba(58, 73, 245, 0.41); */
  border-radius: 20px;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
  z-index: 9999;
}
.wrapFail {
  position: fixed;
  left: 50%;
  top: 40vh;
  background: rgba(255, 220, 217, 1);
  padding: 10px 15px;
  /* border: 3px solid rgba(255, 64, 49, 1);
  box-shadow: 0px 10px 20px rgba(255, 64, 49, 0.21); */
  border-radius: 20px;
  transform: translate(-50%, -50%);
  color: #ff4031;
  font-size: 14px;
  font-weight: bold;
  z-index: 9999;
}
.fadein {
  animation: animate_in 0.5s;
}
.fadeout {
  animation: animate_out 0.5s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
