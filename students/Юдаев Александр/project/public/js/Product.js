Vue.component('product', {
    template: `
        <div class="product-item-full">
            <div class="product-item">
                <img :src="item.img" :alt="item.product_name">
                <div class="desc">
                    <h3>{{ item.product_name }}</h3>
                    <span class="price">price: </span><span>{{ '$' + item.price }}</span>
                    <button class="btn-cart" type="button" @click="$root.$refs.basket.addProduct (item)">Add to cart <i class="icon icon-ShoppingCart"></i></button>
                </div>
            </div>
        </div>
    `,
    props: ['item']
});