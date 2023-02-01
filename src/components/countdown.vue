<template>
  <div>
    <span> {{ this.min }} : {{ this.sec }} </span>
  </div>
</template>

<script>
export default {
  props: ["minutes"],
  data() {
    return {
      now: new Date(),
      sec: null,
      min: null,
      interval: null
    };
  },
  mounted() {
    this.timer();
  },
  methods: {
    timer: function() {
      console.log(minutes);
      this.interval = setInterval(function() {
        this.min = minutes;
        this.sec = 0;
        if (this.sec === 0) {
          this.min -= 1;
          this.sec = 59;
        } else {
          this.sec -= 1;
        }
        if (this.min === 0 && this.sec === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
};
</script>
