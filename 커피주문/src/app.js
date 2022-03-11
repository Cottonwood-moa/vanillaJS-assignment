import Component from "./core/Component.js";
import api from "./api/api.js";
import ProductListPage from "./components/ProductListPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import CartPage from "./components/CartPage.js";
export default class App extends Component {
  // 초기 state
  setup() {
    this.$state = {};
    this.$cache = {};
    // api 사용시 state에 api data 추가
    (async () => {
      const data = await api();
      this.$state.items = data;
      this.$cache.items = data;
      this.render();
    })();
  }

  // App DOM
  template() {
    console.log(window.location.pathname);
    return `
    ${
      window.location.pathname === "/web/"
        ? `<div class="ProductListPage"></div>`
        : ``
    }
    ${
      window.location.pathname.includes("product")
        ? `<div class="ProductDetailPage"></div>`
        : ``
    }
    ${
      window.location.pathname.includes("cart")
        ? `<div class="CartPage"></div>`
        : ``
    }
    
    `;
  }
  // App이 생성된 후 불러올 컴포넌트
  mounted() {
    if (window.location.pathname === "/web/") {
      const $ProductListPage = document.querySelector(".ProductListPage");
      new ProductListPage(
        $ProductListPage,
        // props
        {
          items: this.$state.items,
          toDetail: async (productId) => {
            window.history.pushState(
              { data: "some data" },
              "",
              `/web/product/${productId}`
            );
            const data = await api(productId);
            this.$state.item = data;
            this.render();
          },
        }
      );
    }

    if (window.location.pathname.includes("product")) {
      const $ProductDetailPage = document.querySelector(".ProductDetailPage");
      new ProductDetailPage($ProductDetailPage, {
        item: this.$state.item,
        toCart: async () => {
          window.history.pushState({ data: "some data" }, "", `/web/cart`);
          this.render();
        },
      });
    }

    if (window.location.pathname === "/web/cart") {
      const $CartPage = document.querySelector(".CartPage");
      new CartPage($CartPage, {
        toHome: () => {
          window.history.pushState({ data: "some data" }, "", `/web/`);
          this.render();
        },
      });
    }
  }
}
