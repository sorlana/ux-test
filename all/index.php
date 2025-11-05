<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Pro Sidebar template</title>
    <link rel="icon" href="./fav2.ico" id="favicon">
    <script>
        // Определяем среду выполнения
        if (window.location.hostname === 'localhost' || 
            window.location.hostname.includes('local')) {
            // Локальная среда
            document.getElementById('favicon').href = '../fav2-local.ico';
        } else {
            // Продакшен среда
            document.getElementById('favicon').href = '../fav2.ico';
        }
    </script>
    <link rel='stylesheet' href='./css/menu/style3.css'>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="  https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel='stylesheet' href='./css/menu/style.css'>
    <link rel='stylesheet' href='../components/header/header.css'>
    <link rel='stylesheet' href='./css/styles.css'>
    <link rel='stylesheet' href='./css/controls.css'>
  </head>
  <body>

<?php include 'controls.php'; ?>
  <div class="layout has-sidebar fixed-sidebar fixed-header">
      <aside id="sidebar" class="sidebar break-point-sm has-bg-image">
        <a id="btn-collapse" class="sidebar-collapser"></a>
        <div class="sidebar-layout">
          <div class="sidebar-header">
            <div class="pro-sidebar-logo">
              <div>
<svg width="35" height="28" viewBox="0 0 35 28" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* Добавляем курсор-указатель для всего SVG */
    svg {
      cursor: pointer;
    }

    /* Определяем начальные цвета заливки через CSS и устанавливаем transition */
    /* Целевые path элементы с цветом #99A1B7 получают класс .path-target */
    .path-target {
      fill: #99A1B7 !important; /* Используем !important, чтобы переопределить встроенные стили библиотеки */
      transition: fill 0.3s ease;
    }
    /* Другие path элементы с цветом #343E4D получают класс .path-other */
    .path-other {
      fill: #343E4D !important; /* Используем !important */
      transition: fill 0.3s ease; /* Также добавляем transition для согласованности */
    }

    /* Анимация заливки для целевых элементов при наведении на родительский SVG */
    svg:hover .path-target {
      fill: #6A748E !important; /* Цвет заливки при наведении */
    }
  </style>
  
  <path class="path-target" d="M3.98705 27.9896H0V0H17.2426L3.98705 27.9896Z" />
  <path class="path-target" d="M34.1834 17.84V20.3202H28.4589V20.38L34.1834 21.8144V24.1153L28.4589 25.5198V25.5796H34.1834V27.9403H26.9004V23.8464L30.8866 22.8901V22.8304L26.9004 21.9339V17.84H34.1834Z" />
  <path class="path-target" d="M34.1834 8.60608V11.5346L32.6249 12.0426V14.224L34.1834 14.7021V17.4812L26.9004 14.9412V11.2059L34.1834 8.60608ZM30.8866 12.3414L28.6087 13.0885V13.1184L30.8866 13.8654V12.3414Z" />
  <path class="path-target" d="M34.1834 0V3.22732L31.7257 4.54215V4.57204L34.1834 5.82711V8.84525L30.437 6.27535L26.9004 8.54642V5.34899L29.0583 4.30309V4.27321L26.9004 3.10779V0.179296L30.437 2.59979L34.1834 0Z" />
  <path class="path-other" d="M6.90942 27.9999H24.5924V20.705H10.3561L6.90942 27.9999Z" />
  <path class="path-other" d="M20.1266 0.00561523L16.6799 7.30051H24.5923V0.00561523H20.1266Z" />
  <path class="path-other" d="M11.7947 17.6655H24.5924V10.3402H15.2414L11.7947 17.6655Z" />
</svg>
              </div>
            </div>
          </div>
          <div class="sidebar-content">
            <nav class="menu open-current-submenu">
              <ul>
                <!-- Пункт меню без подменю -->
                <li class="menu-item">
                  <a href="#">
                    <span class="material-icons menu-icon">
                      home
                    </span>
                    <span class="menu-title">Главная</span>
                  </a>
                </li>
                <!-- Пункт меню без подменю -->
                <li class="menu-item">
                  <a href="#">
                    <span class="material-icons menu-icon">
                      star
                    </span>
                    <span class="menu-title">Избранное</span>
                  </a>
                </li>
                <!-- Пункт меню с подменю -->
                <li class="menu-item sub-menu active">
                  <a href="#">
                    <span class="material-symbols-outlined menu-icon">
                      calculate
                    </span>
                    <span class="menu-title">Коммерческий блок</span>
                    <span class="menu-suffix wrap-badge">
                      <span class="badge primary">NEW</span>
                    </span>
                  </a>
                  <div class="sub-menu-list">
                    <ul>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2 active-submenu">Заявки клиентов</span>
                        </a>
                      </li>
                      <li class="menu-item sub-menu">
                        <a href="#">
                          <span class="menu-title menu-level-2">Настройки</span>
                        </a>
                        <div class="sub-menu-list">
                          <ul>
                            <li class="menu-item">
                              <a href="#">
                                <span class="menu-title menu-level-3">Услуги</span>
                              </a>
                            </li>
                            <li class="menu-item">
                              <a href="#">
                                <span class="menu-title menu-level-3">Типы заявок клиентов</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="menu-item sub-menu">
                  <a href="#">
                    <span class="material-symbols-outlined menu-icon">
                      calendar_view_week
                    </span>
                    <span class="menu-title">Контейнерный блок</span>
                  </a>
                  <div class="sub-menu-list">
                    <ul>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Журнал ввода-вывода</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Журнал обеспечения</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Контейнеры на терминалах</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Заявки поставщикам</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Контейнеры в пользовании</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="menu-item sub-menu">
                  <a href="#">
                    <span class="material-symbols-outlined menu-icon">
                      dns
                    </span>
                    <span class="menu-title">Справочники</span>
                  </a>
                  <div class="sub-menu-list">
                    <ul>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Локации</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Маршруты</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Заводы-производители КТК</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="menu-item sub-menu">
                  <a href="#">
                    <span class="material-symbols-outlined menu-icon">
                      admin_panel_settings
                    </span>
                    <span class="menu-title">Администрирование</span>
                  </a>
                  <div class="sub-menu-list">
                    <ul>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Пользователи</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Роли</span>
                        </a>
                      </li>
                      <li class="menu-item">
                        <a href="#">
                          <span class="menu-title menu-level-2">Управление шаблонами</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
      <div id="overlay" class="overlay"></div>

      <div class="layout">
      <?php include '../components/header/header.php'; ?>
        <main class="content">
          <div>
            <a id="btn-toggle" href="#" class="sidebar-toggler break-point-sm">
              
            </a>
            <div id="content">
            <!-- Содержимое будет загружаться сюда -->
            </div>
          </div>
        </main>
        <div class="overlay"></div>
      </div>
    </div>
    <script src='https://unpkg.com/@popperjs/core@2  '></script>
    <script  src="./js/menu/script.js"></script>
    <script  src="./js/common.js"></script>
  </body>
</html>