const form = document.querySelector("form");
const commentContainer = document.querySelector(".listComment");

let date = document.getElementById("date");
let name = form.querySelector("#name");
let comment = form.querySelector("#comment");

let wrongName = form.querySelector(".name-danger");
let wrongComment = form.querySelector(".comment-danger");

const comments = [];

form.addEventListener("submit", (e) => {
  submit(e);
});

form.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    submit(e);
  }
});

function submit(e) {
  e.preventDefault(); 
  let dateComment = date.value;

  name.addEventListener("input", () => {
    wrongName.classList.remove("danger_active");
  });

  comment.addEventListener("input", () => {
    wrongComment.classList.remove("danger_active");
  });

  if (!name.value) {
    wrongName.classList.add("danger_active");
    return;
  }
  if (!comment.value) {
    wrongComment.classList.add("danger_active");
    return;
  }

  if (dateComment == "") {
    dateComment = new Date().toDateString();
  }

  let newComment = {
    name: name.value.trim(),
    comment: comment.value.trim(),
    date: dateComment,
  };

  createComment(newComment);
  name.value = "";
  comment.value = "";
  date.value = "";
}

function createComment({ name, comment, date }) {
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="comment bg-light bg-gradient border-bottom p-1 m-1 d-flex justify-content-between ">
  <div class="comment__row d-flex ">
      <h2 class="comment__name fs-5 me-4">${name}</h2>
      <p class="comment__text me-4">${comment}</p>
      <p>Время публикации: ${currentDate(date)}</p>
  </div>
  <div class="comment__row"> <img src="./img/like-0.svg" class="like-img">
      <button class="btn btn-danger">Удалить</button>
  </div>
</div>
  `;
  commentContainer.append(div);

  deleteComment();
  like();
}

function like() {
  const likes = document.querySelectorAll(".like-img");
  likes.forEach((l) => {
    l.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("active")) {
        target.src = "./img/like-0.svg";
        target.classList.remove("active");
      } else {
        target.classList.add("active");
        target.src = "./img/like-1.svg";
      }
    });
  });
}

function deleteComment() {
  const deleteBtn = document.querySelectorAll(".btn-danger");

  deleteBtn.forEach((b) => {
    b.addEventListener("click", (e) => {
      e.target.closest(".comment").remove();
    });
  });
}

function currentDate(date) {
  const newDate = new Date();
  const hours = Math.ceil(
    (newDate.getTime() - Date.parse(date)) / 1000 / 60 / 60
  );

  function firstNumber(date) {
    if (date < 10) {
      return "0" + date;
    } else {
      return date;
    }
  }
  if (hours <= 24) {
    return `Сегодня, в ${firstNumber(newDate.getHours())}:${firstNumber(
      newDate.getMinutes()
    )}`;
  } else if (hours > 24 && hours <= 48) {
    return `Вчера, в ${firstNumber(newDate.getHours())}:${firstNumber(
      newDate.getMinutes()
    )}`;
  } else {
    return `${firstNumber(newDate.toDateString())}, в ${firstNumber(
      newDate.getHours()
    )}:${firstNumber(newDate.getMinutes())}`;
  }
}
