import Component from "../core/Component.js";

export default class Nodes extends Component {
  setup() {
    this.$state = {
      modal: false,
      src: "./assets/sample_image.jpg",
    };
  }
  template() {
    const { data, path } = this.$props;
    const { modal } = this.$state;
    if (!data) return ``;
    else
      return `
    ${
      path.length === 1
        ? ``
        : `<div class="Node"><img src="./assets/prev.png" class="prev"></div>`
    }

     ${data
       .map(
         (item, key) => `<div class="Node">
        ${
          (item.type === "DIRECTORY" &&
            `<img src="./assets/directory.png" class="${item.type}" data-id="${item.id}" data-name="${item.name}">`) ||
          (item.type === "FILE" &&
            `<img src="./assets/file.png" class="${item.type}" data-id="${item.id}" data-path="${item.filePath}">`)
        }
        
        <div>${item.name}</div>
     </div>`
       )
       .join("")}

     ${
       modal
         ? `<div class="Modal Loading"><div class="content"><img src=${this.$state.src}></div></div>`
         : ""
     }
     `;
  }
  setEvent() {
    const { folderClick, prevClick } = this.$props;
    this.$target.addEventListener("click", ({ target }) => {
      if (target.classList.contains("DIRECTORY")) {
        folderClick(target.dataset.id, target.dataset.name);
      }
      if (target.classList.contains("FILE")) {
        const url = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`;
        this.setState({ src: url + target.dataset.path, modal: true });
      }
      if (target.classList.contains("prev")) {
        prevClick();
      }
      if (target.classList.contains("Modal")) {
        this.setState({ modal: false });
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.$state.modal)
        this.setState({ modal: false });
    });
  }
}
