<template>
  <section 
    class="section section-shaped section-lg my-0"
    :class="[{'section-hero':hero}]"
    >
    <div
      class="shape"
      :class="[
        'shape-style-' + shape,
        'shape-' + color,
        { 'shape-skew': skew },
      ]"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "shape-section",
  inheritAttrs: true,
  props: {
    color: {
      type: String,
      default: "default",
      validator: (color) => {
        return ["primary", "default", "light", "dark"].indexOf(color) > -1;
      },
    },
    shape: {
      type: String,
      default: "1",
      validator: (style) => {
        return ["1", "2", "3"].indexOf(style) > -1;
      },
    },

    skew: Boolean,
    hero: Boolean,
  },
};
</script>