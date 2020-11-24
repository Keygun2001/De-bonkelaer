<template>
  <div class="carousel">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Carousel",

  data() {
    return {

    }
  },
  methods: {
    next() {
      this.$emit('next')
    },
    prev() {
      this.$emit('prev')
    }
  }
};
</script>

<style scoped>
  .carousel {
    position: relative;
    width: 600px;
    height: 350px;
    overflow: hidden;
  }

  img {
    position: absolute;
    height: 40px;
    width: 80px;
    top: calc(50% - 20px);
    background-color: rgba(0,0,0,0.8);
    border: none;
    color: #fff;
  } 
  img:focus, img:hover {
    outline:none;
    cursor: pointer;

  }
  .next {
    right: 0;
    z-index: 999;
    cursor: pointer;
  }
  .prev {
    left: 0;
    z-index: 999;
    cursor: pointer;
  }
  .left-enter-active {
        animation: leftInAnimation 0.4s ease-in-out;
    }
    .left-leave-active {
        animation: leftOutAnimation 0.4s ease-in-out;
    }
    @keyframes leftInAnimation {
        from {transform: translateX(100%);}
        to { transform: translateX(0) }
    }
    @keyframes leftOutAnimation {
        from {transform: translateX(0);}
        to { transform: translateX(-100%) }
    }

    .right-enter-active {
        animation: rightInAnimation 0.4s ease-in-out;
    }
    .right-leave-active {
        animation: rightOutAnimation 0.4s ease-in-out;
    }
    @keyframes rightInAnimation {
        from {transform: translateX(-100%);}
        to { transform: translateX(0) }
    }
    @keyframes rightOutAnimation {
        from {transform: translateX(0);}
        to { transform: translateX(100%) }
    }
</style>