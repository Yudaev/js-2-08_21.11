Vue.component('search', {
    data() {
        return {
            message: '',
            fullItems: []
        };
    },
    watch: {
        message: function (val) {
            if (this.message === '') {
                this.$parent.$refs.catalog.items = this.fullItems;
            } else {
                this.$parent.$refs.catalog.items = [];
                for (let i of this.fullItems) {
                    if(i.product_name.search(new RegExp(val.toString(), 'i')) !== -1){
                        // i.product_name.innerHTML = `<span class=".search-bg">${i.product_name}</span>`;
                        this.$parent.$refs.catalog.items.push(i);
                    }
                }
            }
        }
    },
    template: `
        <div class="search">
            <input type="text" class="search-field" v-model="message">
            <a href="#"><span class="icon icon-Search"></span></a>
        </div>
    `
});