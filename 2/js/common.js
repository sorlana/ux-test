// common.js

// Управление вариантами
const variants = ["variant1", "variant2", "variant3", "variant4"];

// Переменная для отслеживания текущего варианта
let currentVariant = null;

function loadVariant(variantId) {
  if (!variants.includes(variantId)) {
    console.error("Неверный идентификатор варианта:", variantId);
    return;
  }

  // Переключаем CSS перед загрузкой контента
  loadVariantCss(variantId);
  currentVariant = variantId;

  fetch(`variants/${variantId}.php`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      initializeVariant(variantId);

      // ИНИЦИАЛИЗАЦИЯ SELECT2 ПОСЛЕ ЗАГРУЗКИ КОНТЕНТА
      initializeSelect2();
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

// ФУНКЦИЯ ДЛЯ ИНИЦИАЛИЗАЦИИ SELECT2
function initializeSelect2() {
  // Небольшая задержка для гарантированной загрузки DOM
  setTimeout(() => {
    const selects = document.querySelectorAll(".js-example-basic-single");
    console.log(
      `Найдено select элементов для инициализации: ${selects.length}`
    );

    if (selects.length > 0 && typeof $.fn.select2 !== "undefined") {
      $(".js-example-basic-single").select2({
        width: "300px",
        placeholder: "-- Выберите --",
        allowClear: true,
        language: {
          noResults: function () {
            return "Результатов не найдено";
          },
        },
      });
      console.log("✅ Select2 успешно инициализирован");
    } else if (selects.length === 0) {
      console.log("⚠️ Элементы .js-example-basic-single не найдены в DOM");
    } else {
      console.log("❌ Select2 не доступен (библиотека не загружена)");
    }
  }, 100);
}

// ДОПОЛНИТЕЛЬНО: Наблюдатель для динамических изменений внутри content
function initContentObserver() {
  const contentElement = document.getElementById("content");

  if (!contentElement) {
    console.error("Элемент #content не найден");
    return;
  }

  const observer = new MutationObserver(function (mutations) {
    let shouldInitialize = false;

    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        for (let node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            // Проверяем, добавился ли элемент с нашим классом
            if (
              node.classList &&
              node.classList.contains("js-example-basic-single")
            ) {
              shouldInitialize = true;
              break;
            }
            // Или проверяем внутри добавленного элемента
            if (
              node.querySelector &&
              node.querySelector(".js-example-basic-single")
            ) {
              shouldInitialize = true;
              break;
            }
          }
        }
      }
    });

    if (shouldInitialize) {
      console.log(
        "Обнаружены новые элементы select, инициализируем Select2..."
      );
      initializeSelect2();
    }
  });

  observer.observe(contentElement, {
    childList: true,
    subtree: true,
  });

  console.log("Наблюдатель за изменениями content активирован");
}

// Предзагружаем все CSS файлы при старте
function preloadVariantCss() {
  console.log("Предзагрузка CSS файлов вариантов...");

  variants.forEach((variant) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `css/${variant}.css`;
    link.disabled = true; // Отключаем все кроме активного
    link.id = `css-${variant}`;
    document.head.appendChild(link);
    console.log(`✅ Предзагружен CSS: ${variant}.css`);
  });
}

function loadVariantCss(variantId) {
  console.log(`Активация CSS для варианта: ${variantId}`);

  // Отключаем все CSS вариантов
  variants.forEach((variant) => {
    const link = document.getElementById(`css-${variant}`);
    if (link) {
      link.disabled = true;
    }
  });

  // Включаем нужный CSS
  const activeLink = document.getElementById(`css-${variantId}`);
  if (activeLink) {
    activeLink.disabled = false;
    console.log(`✅ Активирован CSS: ${variantId}.css`);
  } else {
    console.error(`❌ CSS файл для варианта ${variantId} не найден`);
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const initialVariant = urlParams.get("variant") || "variant1";

  // ПРЕДЗАГРУЖАЕМ CSS ПЕРВЫМ ДЕЛОМ
  preloadVariantCss();

  // Запускаем наблюдатель за изменениями
  initContentObserver();

  // Загружаем и инициализируем начальный вариант
  loadVariant(initialVariant);
});

// Дополнительная инициализация при полной загрузке окна
window.addEventListener("load", function () {
  // Инициализируем Select2 еще раз на случай, если элементы появились позже
  setTimeout(initializeSelect2, 500);
});
