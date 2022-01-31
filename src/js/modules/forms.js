import changeNumInput from "./changeNumInput";

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    input = document.querySelectorAll("input");

  changeNumInput('input[name="user_phone"]');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с Вами свяжемся",
    fialure: "Что-то пошло не так...",
  };

  const postDate = async (url, date) => {
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: date,
    });

    return await res.text();
  };

  const clearInputs = () => {
    input.forEach((item) => {
      item.value = "";
    });
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.appendChild(statusMessage);

      const formDate = new FormData(item);
      if (item.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formDate.append(key, state[key]);
        }
      }

      postDate("server.php", formDate)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.fialure))
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
