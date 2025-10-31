// common.js

// Управление вариантами
const variants = ["variant1", "variant2", "variant3", "variant4"];

function loadVariant(variantId) {
  if (!variants.includes(variantId)) {
    console.error("Неверный идентификатор варианта:", variantId);
    return;
  }
  fetch(`variants/${variantId}.php`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      initializeVariant(variantId);
    })
    .catch((err) => console.error("Ошибка загрузки варианта:", err));
}

function initializeVariant(variantId) {
  // Сбрасываем активные стили кнопок
  document.querySelectorAll(".controls button").forEach((btn) => {
    btn.classList.remove("active");
  });
  // Устанавливаем активный стиль для текущей кнопки
  document.getElementById(`btn-${variantId}`).classList.add("active");

  // Вызываем соответствующую функцию инициализации
  switch (variantId) {
    case "variant1":
      if (typeof initVariant1 === "function") {
        initVariant1();
      } else {
        console.error("initVariant1 не определена!");
      }
      break;
    case "variant2":
      if (typeof initVariant2 === "function") {
        initVariant2();
      } else {
        console.error("initVariant2 не определена!");
      }
      break;
    case "variant3":
      if (typeof initVariant3 === "function") {
        initVariant3();
      } else {
        console.error("initVariant3 не определена!");
      }
      break;
    case "variant4":
      if (typeof initVariant4 === "function") {
        initVariant4();
      } else {
        console.error("initVariant4 не определена!");
      }
      break;
    default:
      console.warn(`Нет обработчика инициализации для ${variantId}`);
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const initialVariant = urlParams.get("variant") || "variant1";
  // Загружаем и инициализируем начальный вариант
  loadVariant(initialVariant);
});
