//TODO Empty cart message

Vue.component("cart", {
  data: function() {
    return {
      urlBasketData: "/getBasket.json",
      urlBasketAdd: "/addToBasket.json", //TODO Заменить на один адрес с разными параметрами действия (del/add)
      urlBasketDel: "/delFromBasket.json",
      imageCart: "https://placehold.it/100x80",
      isVisible: false,
      vItems: [],
      totalSum: 0
    };
  },
  methods: {
    toggleCartVisibility() {
      this.isVisible = !this.isVisible;
    },
    fetchDataToCart() {
      this.$root.getJson(this.urlBasketData).then(data => {
        this.vItems = data.contents;
      });
    },
    addItemToCart(event) {
      //TODO Обработка ошибки: через data.result=0 или через .then ... error???
      this.$root.postReq(this.urlBasketAdd, event.target).then(
        data => {
          if (data.result == 1) {
            this.vItems = data.cart.contents;
          } else if (data.result == 0) {
            console.log(`Error adding good to cart: ${data.error}`);
          }
        },
        error => console.log(`addItemToCart error= ${error}`)
      );
    },
    delItemFromCart(event) {
      this.$root.postReq(this.urlBasketDel, event.target).then(
        data => {
          if (data.result == 1) {
            this.vItems = data.cart.contents;
          } else if (data.result == 0) {
            console.log(`Error deleting good from cart: ${data.error}`);
          }
        },
        error => console.log(`delItemFromCart error= ${error}`)
      );
    },
    getItemInCartById(id) {
      let find = this.vItems.find(item => +item.id === id);
      return find;
    }
  },
  mounted() {
    this.fetchDataToCart();
  },
  template: `
  <div class="cart">
    <search></search>
    <button class="btn-cart" type="button" @click="toggleCartVisibility">Корзина</button>
    <div class="cart-block" v-show="this.isVisible">
        <cart-item class="cart-item" v-for="item in vItems" :item="item" :img="imageCart" :key="item.id">
        </cart-item>
    </div>
  </div>
  `
});
