import M from "materialize-css";

const toasts = (msg) => {
    M.toast({ html: msg });
}

export default toasts;