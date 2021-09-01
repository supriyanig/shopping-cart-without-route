<template>
  <div class="layout-row">
    <ProductList class="flex-70" v-on:removeFromCart="removeFromCart($event)" v-on:addToCart="addToCart($event)" :products="products" />
    <Cart class="flex-30" v-on:discountedAmount="discountedAmount($event)" :cart="cart" />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";

export default {
  name: "Checkout",
  components: {Cart, ProductList},
  data() {
    return {
      cart: {
        items: [],
        subTotal: 0,
        totalPrice: 0,
        discount: 0,
        selectedCoupon: 0,
        discountToken:0
      },
      products: []
    }
  },
  created() {
    this.products = PRODUCTS.map((product, index) => {
      product.id = index + 1;
      product.image='@/assets/logo.png'
    //   product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
  },
  methods: {
    addToCart(product) {
        console.log("addd",product)
      const index = this.products.findIndex(p => p.id === product.id);
      this.products[index].cartQuantity = 1;
      this.cart.items.push({
        id: this.products[index].id,
        item: this.products[index].heading,
        price: this.products[index].price,
        quantity: 1
      });
      this.cartTotal();
    },
    removeFromCart(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      this.products[index].cartQuantity = 0;
      const cartIndex = this.cart.items.findIndex(c => c.id === product.id);
      this.cart.items.splice(cartIndex, 1);
      this.cartTotal();
    },
    cartTotal(){
      this.cart.subTotal=this.cart.items.reduce((a,b)=>a+(b.price*b.quantity),0);
      this.discountedAmount(this.cart.discountToken);     
    },
    discountedAmount(amount){
        console.log("aammm",amount);
        this.cart.discountToken=amount;
        let tdiscount = 0;
        for (let x of this.cart.items) {
            tdiscount = tdiscount + (this.cart.discountToken / 100) * x.price;
        }
        this.cart.discount=tdiscount;
        this.cart.totalPrice= this.cart.subTotal-this.cart.discount;
    }
  }
}
export const PRODUCTS = [
  {
    heading: "Cap - $10",
    name: "Cap",
    price: 10
  },
  {
    heading: "Hand Bag - $30",
    name: "HandBag",
    price: 30
  },
  {
    heading: "Shirt - $30",
    name: "Shirt",
    price: 30
  },
  {
    heading: "Shoes - $50",
    name: "Shoe",
    price: 50
  },
  {
    heading: "Pant - $40",
    name: "Pant",
    price: 40
  },
  {
    heading: "Slipper - $20",
    name: "Slipper",
    price: 20
  }
]

</script>

<style scoped>

</style>