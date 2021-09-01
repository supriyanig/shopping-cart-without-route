<template>
  <div class="layout-row wrap justify-content-center">
    <section v-for="(product, index) in products"
             :key="index"
             :data-testid="'product-item-' + index"
             class="w-30 product-item">
      <div class="card ma-16">
        <img :src="product.image" class="product-image" :alt="product.name"/>
        <div class="card-text pa-4">
          <h5 class="ma-0 text-center">{{ product.name }}</h5>
          <p class="ma-0 mt-8 text-center">${{ product.price }}</p>
        </div>
        <div class="card-actions justify-content-center pa-4">
          <button v-if="showaddButton[index]" class="x-small outlined" @click="addToCart(index,product)" data-testid="btn-item-add">
            Add To Cart
          </button>

          <button v-else class="x-small danger" @click="removeFromCart(index,product)" data-testid="btn-item-remove">
            Remove
          </button>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: Array
  },
  data(){
    return{
      showaddButton:[]
    }
  },
  mounted(){
    for(let index in this.products){
      this.showaddButton[index]=true;
    }
  },
  methods : {
    removeFromCart(index,product){
      this.showaddButton[index]=!this.showaddButton[index];
      this.$emit('removeFromCart',product);
    },
    addToCart(index,product){
      this.showaddButton[index]=!this.showaddButton[index];
      this.$emit('addToCart',product);
    }
  }
}
</script>

<style scoped lang="scss">

.product-image {
  margin: 32px 30%;
  width: 40%;
  min-height: 90px;
}

</style>

