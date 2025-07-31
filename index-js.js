// let intervalId;
// const sliderGoBar = document.querySelectorAll('.sliderBox .progressbar .bar .goBar');

// function startTimer() {
//   sliderGoBar.forEach(goBar => {
//     goBar.classList.add('go')
//   });

//   intervalId = setInterval(() => {
//     if (flagSlid) {
//       flagSlid = false;
//       currentIndex += 1;


//       barIndex += 1;
//       barIndexPred = barIndex - 1;


//       if (barIndex == 8) {
//         barIndex = 0;
//       }
//       if (barIndexPred == 8) {
//         barIndexPred = 0;
//       }
//       progressBars[barIndexPred].classList.remove('open')

//       progressBars[barIndex].classList.add('open')




//       sliderPart.forEach(part => {
//         if (part.offsetLeft <= 0) {
//           part.style.opacity = 0;
//           part.style.left = 3150 + 'px';

//           setTimeout(() => { part.style.opacity = 1 }, 1000)
//         }
//         else {
//           part.style.left = part.offsetLeft - parteWidth + 'px'
//         }
//       });

//       if (currentIndex == 5) {
//         currentIndex = 0;
//       }


//       setTimeout(() => { flagSlid = true }, 1000)
//     }
//   }, 3000);
// }

// function stopTimer() {
//   clearInterval(intervalId);

//   sliderGoBar.forEach(goBar => {
//     goBar.classList.remove('go')
//   });
// }

// window.addEventListener('focus', startTimer);
// window.addEventListener('blur', stopTimer);

// // Запускаем при загрузке, если окно в фокусе
// if (document.hasFocus()) {
//   startTimer();
// }







//x1.25
const body = document.querySelector('body')
const main = document.querySelector('main')
// const onPage = document.querySelector('#onPage');
const goOnTop = document.querySelector('.goOnTop');


function pageHidden() {
  body.style.overflow = 'hidden';
  pageFirst.style.visibility = 'hidden';
  pageMain.style.visibility = 'hidden';
  pageFirst.style.opacity = '0';
  pageMain.style.opacity = '0';
  goOnTop.style.opacity = '0';
}

function pageVisibility() {
  body.style.overflow = 'auto';
  pageFirst.style.visibility = 'visible';
  pageMain.style.visibility = 'visible';
  pageFirst.style.opacity = '1';
  pageMain.style.opacity = '1';
  goOnTop.style.opacity = '1';
}



// setTimeout(() => {
//       body.classList.remove('notShow');
// }, 1500)

// onPage.style.display = 'block'
// body.style.opacity = '0';
// setTimeout(() => {
// onPage.style.display = 'none'
// }, 3000)

const pageFirst = document.querySelector('#pageFerst')
const pageMain = document.querySelector('#pageMain')

const preloader = document.querySelector('.preLoader');
const splineBox = document.querySelector('.splineBox');
const splineViewer = document.querySelector('spline-viewer');


pageHidden();
// splineBox.style.visibility = 'hidden';
// splineBox.style.opacity = '0';

// onPage.style.display = 'block';
preloader.style.opacity = '1';
preloader.style.display = 'block';

// onPage.style.display = 'block'
// setTimeout(() => {
//     onPage.style.display = 'none'
// }, 500)
let preloaderHide = false;


document.addEventListener('DOMContentLoaded', () => {

  // 1. Функция скрытия прелоадера
  const hidePreloader = () => {
    if (preloaderHide === false) {
      preloaderHide = true;
      pageVisibility();

      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      // }, 1100);
      }, 1);
    }

  };
  // 2. Проверка загрузки Spline
  const checkSplineLoad = () => {
    return new Promise((resolve) => {
      // Вариант 1: Через событие progress
      const progressHandler = (e) => {
        if (e.detail.progress === 1) {
          splineViewer.removeEventListener('progress', progressHandler);
          resolve();
        }
      };
      splineViewer.addEventListener('progress', progressHandler);

      // Вариант 2: Резервная проверка canvas
      const backupCheck = setInterval(() => {
        const canvas = splineViewer.shadowRoot?.querySelector('canvas');
        if (canvas && canvas.width > 0) {
          clearInterval(backupCheck);
          resolve();
        }
      // }, 2300);
      }, 10);

      // Фолбек
      setTimeout(() => {
        splineViewer.removeEventListener('progress', progressHandler);
        clearInterval(backupCheck);
        resolve();
      }, 3000);
    });
  };

  // 3. Проверка загрузки всех ресурсов сайта
  const checkPageLoad = () => {
    return new Promise((resolve) => {
      // Проверяем загруженные изображения
      const images = Array.from(document.images);
      const loadedImages = images.filter(img => img.complete);

      if (loadedImages.length === images.length) {
        resolve();
      } else {
        let loadedCount = loadedImages.length;
        images.forEach(img => {
          img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === images.length) resolve();
          });
        });
      }

      // Дополнительная проверка через window.onload
      window.addEventListener('load', resolve);

      // Фолбек
      setTimeout(resolve, 2000);
    });
  };

  // 4. Запускаем проверки
  customElements.whenDefined('spline-viewer').then(async () => {
    await Promise.all([
      checkSplineLoad(),
      checkPageLoad(),
      checkFonts()
    ]);
    hidePreloader();
  });

  // Абсолютный фолбек на 5 секунд
  setTimeout(hidePreloader, 5000);
});


const checkFonts = () => {
  return document.fonts?.ready || Promise.resolve();
};









// document.addEventListener('DOMContentLoaded', () => {

//   // 1. Функция для скрытия прелоадера
//   const hidePreloader = () => {
//     preloader.style.opacity = '0';
//     setTimeout(() => {
//       preloader.style.display = 'none';
//     }, 1000);
//   };

//   // 2. Основная проверка загрузки Spline
//   const checkSplineLoad = () => {
//     // Вариант 1: Проверка через событие 'progress' (самый надежный)
//     splineViewer.addEventListener('progress', (e) => {
//       if (e.detail.progress === 1) { // 100% загрузка
//         hidePreloader();
//       }
//     });

//     // Вариант 2: Резервная проверка canvas (на случай если событие не сработает)
//     const backupCheck = setInterval(() => {
//       const canvas = splineViewer.shadowRoot?.querySelector('canvas');
//       if (canvas && canvas.width > 0) {
//         clearInterval(backupCheck);
//         hidePreloader();
//       }
//     }, 100);

//     setTimeout(() => {
//       clearInterval(backupCheck);
//       hidePreloader();
//     }, 3000);
//   };

//   // 3. Запускаем проверку после инициализации компонента
//   customElements.whenDefined('spline-viewer').then(checkSplineLoad);

//   // 4. На всякий случай, если компонент не загрузится
//   setTimeout(hidePreloader, 3000);
// });










// const loader = document.querySelector('.loader');
// const preLoaderFast = document.querySelector('.preLoaderFast');
// // const preLoaderNormal = document.querySelector('.preLoaderNormal');
// // const preLoaderLong = document.querySelector('.preLoaderLong');

// const preLoaderNormal = document.querySelector('.preLoaderFast');


// pageFerst.style.visibility = 'hidden';
// pageMain.style.visibility = 'hidden';
// pageFerst.style.opacity = '0';
// pageMain.style.opacity = '0';
// preLoaderNormal.style.opacity = '1';
// preLoaderNormal.style.display = 'block';

// // window.scrollTo({
// //   top: 0,
// //   behavior: 'smooth'
// // })
// body.style.overflow = 'hidden';


// // 1. Проверяем наличие класса Spline каждые 100ms
// function checkSplineLoaded() {
//   return new Promise((resolve) => {
//     const checkInterval = setInterval(() => {
//       // Ищем любой элемент с классом Spline (подставьте реальный класс)
//       if (document.querySelector('.spline-element') ||
//         document.querySelector('.spline-wrapper')) {
//         clearInterval(checkInterval);
//         resolve();
//       }
//     }, 100);

//     // На всякий случай таймаут 5 секунд
//     setTimeout(() => {
//       clearInterval(checkInterval);
//       resolve();
//     }, 7000);
//   });
// }

// // 2. Запускаем проверку
// async function init() {

//   // Ждем либо загрузку Spline, либо полную загрузку страницы
//   await Promise.race([
//     checkSplineLoaded(),
//     new Promise(resolve => window.addEventListener('load', resolve))
//   ]);

//   // Плавно скрываем прелоадер
//   setTimeout(() => {
//     preLoaderNormal.style.opacity = '0';
//     pageFerst.style.visibility = 'visible';
//     pageMain.style.visibility = 'visible';
//     pageFerst.style.opacity = '1';
//     pageMain.style.opacity = '1';
//     body.style.overflow = 'auto'

//     setTimeout(() => {
//       preLoaderNormal.style.display = 'none';
//     }, 1000);
//     // }, 2300)
//   }, 1)
// }

// init();








const labelSpans = document.querySelectorAll('.label span');
let indexLabel = 0;

labelSpans.forEach(span => {
  indexLabel += 1;
  span.style.animation = `labelAnimation 2s ease-in-out infinite ${indexLabel * 0.15}s`;
})



const scrolldown = document.querySelector('#pageFerst .scrolldown')
scrolldown.addEventListener('click', function () {
  window.scrollTo({
    top: 500,
    behavior: 'smooth'
  })
})






const cloudBoardSpan = document.querySelector('.cloudBoard .text span')

cloudBoardSpan.addEventListener('mouseenter', function () {
  cloudBoardSpan.innerHTML = 'члены';
})

cloudBoardSpan.addEventListener('mouseleave', function () {
  cloudBoardSpan.innerHTML = 'отчеты';
})




// const slider = document.querySelector('.slider')
const sliderPart = document.querySelectorAll('.slider .part')

const slidLeft = document.querySelector('.sliderBox .slidLeft')
const slidRight = document.querySelector('.sliderBox .slidRight')

const progressBars = document.querySelectorAll('.progressbar .bar')



let currentIndex = 3; // Стартуем с центрального слайда
const parteWidth = sliderPart[0].offsetWidth + 30; // Ширина слайда + gap

let barIndex = 0;
let barIndexPred;

let flagSlid = true



const sliderBox = document.querySelector('.sliderBox');
let intervalId = null;
// let flagSlidInterval = true;

// Функция для запуска/остановки интервала
const toggleInterval = (isActive) => {
  if (isActive) {
    if (!intervalId) {
      intervalId = setInterval(() => {
        // console.log('Интервал работает!');
        slidRightFunc();
      }, 4700);
    }
  } else {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      // console.log('Интервал остановлен!');
    }
  }
};

// Intersection Observer для видимости в DOM
const observer = new IntersectionObserver((entries) => {
  toggleInterval(entries[0].isIntersecting);
}, { threshold: 0.1 });

observer.observe(sliderBox);

// Остановка интервала при сворачивании вкладки
document.addEventListener('visibilitychange', () => {
  toggleInterval(!document.hidden && sliderBox.checkVisibility());
});

// На случай, если вкладка закрывается
window.addEventListener('pagehide', () => {
  toggleInterval(false);
});





slidLeft.addEventListener('click', () => {
  if (flagSlid) {

    // slidLeft.classList.add('tap');
    // setTimeout(() => {
    //   slidLeft.classList.remove('tap');
    // }, 200)
    slidLeft.classList.add('click');
    setTimeout(() => {
      slidLeft.classList.remove('click');
    }, 200);


    flagSlid = false;
    currentIndex -= 1;

    barIndex -= 1;
    barIndexPred = barIndex + 1;


    if (barIndex == -1) {
      barIndex = 7;
    }
    if (barIndexPred == -1) {
      barIndexPred = 7;
    }
    progressBars[barIndexPred].classList.remove('open')
    progressBars[barIndex].classList.add('open')



    sliderPart.forEach(part => {
      if (part.offsetLeft >= 3150) {
        part.style.opacity = 0;
        part.style.left = 0 + 'px';

        setTimeout(() => { part.style.opacity = 1 }, 810)
      }
      else {
        part.style.left = part.offsetLeft + parteWidth + 'px'
      }
    });


    if (currentIndex == 0) {
      currentIndex = 5;
    }

    setTimeout(() => { flagSlid = true }, 810)

  }


});

slidRight.addEventListener('click', () => {

  if (flagSlid) {

    slidRight.classList.add('click');
    setTimeout(() => {
      slidRight.classList.remove('click');
    }, 200);

    // slidRight.classList.add('tap');
    // setTimeout(() => {
    //   slidRight.classList.remove('tap');
    // }, 200)


    flagSlid = false;
    currentIndex += 1;


    barIndex += 1;
    barIndexPred = barIndex - 1;


    if (barIndex == 8) {
      barIndex = 0;
    }
    if (barIndexPred == 8) {
      barIndexPred = 0;
    }
    progressBars[barIndexPred].classList.remove('open')
    progressBars[barIndex].classList.add('open')



    sliderPart.forEach(part => {
      if (part.offsetLeft <= 0) {
        part.style.opacity = 0;
        part.style.left = 3150 + 'px';

        setTimeout(() => { part.style.opacity = 1 }, 810)
      }
      else {
        part.style.left = part.offsetLeft - parteWidth + 'px'
      }
    });

    if (currentIndex == 5) {
      currentIndex = 0;
    }


    setTimeout(() => { flagSlid = true }, 810)
  }
});




function slidRightFunc() {
  if (flagSlid) {

    flagSlid = false;
    currentIndex += 1;


    barIndex += 1;
    barIndexPred = barIndex - 1;


    if (barIndex == 8) {
      barIndex = 0;
    }
    if (barIndexPred == 8) {
      barIndexPred = 0;
    }
    progressBars[barIndexPred].classList.remove('open')
    progressBars[barIndex].classList.add('open')



    sliderPart.forEach(part => {
      if (part.offsetLeft <= 0) {
        part.style.opacity = 0;
        part.style.left = 3150 + 'px';

        setTimeout(() => { part.style.opacity = 1 }, 810)
      }
      else {
        part.style.left = part.offsetLeft - parteWidth + 'px'
      }
    });

    if (currentIndex == 5) {
      currentIndex = 0;
    }


    setTimeout(() => { flagSlid = true }, 810)
  }
}





const allBox = document.querySelector('.flyScrollBlock .allBox')
const allBoxDef = document.querySelector('.flyScrollBlock .allBoxDef')
const allBoxParts = document.querySelectorAll('.flyScrollBlock .allBox .part')

// const startScroll = 1700;
// const endScroll = 2700;

const startScroll = 1200;
const endScroll = 2200;
let currentStep = null;

// Оптимизированный обработчик скролла
function handleScroll() {

  const scrollY = window.scrollY;

  if (scrollY >= endScroll - 100) {
    allBoxDef.classList.add('down');
    allBox.classList.add('down');
  }
  else {
    allBoxDef.classList.remove('down');
    allBox.classList.remove('down');
  }

  // Проверяем диапазон
  if (scrollY < startScroll || scrollY > endScroll) {
    if (currentStep !== null) {

      allBoxParts.forEach(part => {
        part.classList.remove(`fly${startScroll + currentStep + 500}`);

      });
      currentStep = null;
    }
    return;
  }

  // Вычисляем текущий шаг (0-10)
  const newStep = Math.floor((scrollY - startScroll) / 100);

  // Если шаг изменился
  if (newStep !== currentStep) {
    // Удаляем предыдущий класс
    if (currentStep !== null) {

      allBoxParts.forEach(part => {
        part.classList.remove(`fly${startScroll + currentStep * 100 + 500}` );
      });
    }

    // Добавляем новый класс


    allBoxParts.forEach(part => {
      part.classList.add(`fly${startScroll + newStep * 100 + 500 }` );
    });
    currentStep = newStep;
  }
}



// Оптимизация вызовов
let isTicking = false;
window.addEventListener('scroll', () => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      isTicking = false;
    });
    isTicking = true;
  }
});

// Инициализация
handleScroll();







// // Для каждого блока храним его исходный translate
// const blockTranslates = new Map();

// allBoxParts.forEach(block => {
//   // Извлекаем translate из текущего transform
//   const style = window.getComputedStyle(block);
//   const transform = style.transform || style.webkitTransform;

//   let translate = 'translate(0, 0)';
//   if (transform !== 'none') {
//     const translateMatch = transform.match(/translate(3d)?\((.+?)\)/);
//     if (translateMatch) {
//       translate = translate(`${translateMatch[2]}`);
//     }
//   }

//   // Сохраняем translate для блока
//   blockTranslates.set(block, translate);
// });

// // Анимация качания (±10°)
// function animateBlock(block, delay) {
//   const translate = blockTranslates.get(block);
//   let currentRotate = getCurrentRotation(block);
//   const swayRange = 10;

//   const applyAnimation = () => {
//     // 1. Качаем вправо (+10°)
//     currentRotate += swayRange;
//     block.style.transform = `${translate} rotate(${currentRotate}deg)`;

//     // 2. Качаем влево (-10°)
//     setTimeout(() => {
//       currentRotate -= swayRange * 2;
//       block.style.transform = `${translate} rotate(${currentRotate}deg)`;
//     }, 1000);

//     // 3. Возвращаемся к исходному углу
//     setTimeout(() => {
//       currentRotate += swayRange;
//       block.style.transform = `${translate} rotate(${currentRotate}deg)`;
//     }, 2000);

//     // Зацикливаем
//     setTimeout(applyAnimation, 3000);
//   };

//   // Старт с задержкой
//   setTimeout(applyAnimation, delay);
// }

// // Запускаем анимацию для всех блоков
// allBoxParts.forEach((block, index) => {
//   animateBlock(block, index * 300);
// });

// // Функция для получения текущего rotate
// function getCurrentRotation(element) {
//   const style = window.getComputedStyle(element);
//   const transform = style.transform || style.webkitTransform;

//   if (transform === 'none') return 0;

//   const rotateMatch = transform.match(/rotate\((.+?)deg\)/);
//   return rotateMatch ? parseFloat(rotateMatch[1]) : 0;
// }




















//парящий эффект
// let goFunkcFly = false
// function createProgflake() {

//   const progflake = document.createElement('div');
//   progflake.className = 'flyDownElements';
//   // прекращаем работу функции
//   if (!goFunkcFly) {
//     clearInterval();
//     return;
//   }
//   progflake.style.color = '#4f4f4f';
//   // progflake.style.zIndex = 55;


//   progflake.textContent = 'l'

//   // let iconockkaP = Math.floor(Math.random() * (7 - 1) + 1); // округление до целого Рандомный iconochka
//   // switch (iconockkaP) {
//   //   case 1: {
//   //     progflake.textContent = 'C++';
//   //     break;
//   //   }
//   //   case 2: {
//   //     progflake.textContent = 'C#';
//   //     break;
//   //   }
//   //   case 3: {
//   //     progflake.textContent = 'Python';
//   //     break;
//   //   }
//   //   case 4: {
//   //     progflake.textContent = 'Css';
//   //     break;
//   //   }
//   //   case 5: {
//   //     progflake.textContent = 'HTML';
//   //     break;
//   //   }
//   //   case 6: {
//   //     progflake.textContent = 'JS';
//   //     break;
//   //   }
//   //   default:
//   //     break;
//   // }

//   progflake.style.left = Math.random() * window.innerWidth + 'px';//рандомное пололжение относительно окна
//   progflake.style.fontSize = Math.random() * (40 - 20) + 20 + 'px'; // Рандомный размер
//   progflake.style.animationDuration = Math.random() * (0.3 - 0.2) + 0.2 + 's'; // Рандомная скорость взлета
//   document.body.append(progflake);

//   setTimeout(() => {
//     progflake.remove();
//   }, parseFloat(progflake.style.animationDuration) * 1000);//продолжительность полета
// }
// //вызов функции с определенной частотой появления слов 
// setInterval(createProgflake, 10);


















const sponsors = document.querySelector('.sponsors');
const cubesActive = document.querySelectorAll('.cubeActive');

const infoCube = document.querySelector('.infoCube');
const sponsLeftBox = document.querySelector('.sponsors .leftBox');

const infoCubeTitle = document.querySelector('.infoCube .title');
const infoCubeText = document.querySelector('.infoCube .text');


function blockButtonClicks(e) {
  e.preventDefault();
  e.stopPropagation();
}

cubesActive.forEach(btn => {
  btn.addEventListener('click', blockButtonClicks, { capture: true });
});




cubesActive.forEach(cube => {
  let infoCubeClone;

  cube.addEventListener('mouseenter', function () {
    if (preloaderHide) {
      setTimeout(() => {
        cubesActive.forEach(btn => {
          btn.removeEventListener('click', blockButtonClicks, { capture: true });
        });
      }, 1110);
    }

    // добавить  курицу с тапом по активацию по ентеру и управлением стрелочкаим

    let text = cube.textContent;
    const arr = text.split(/\s+/)

    infoCubeTitle.innerHTML = arr[1];
    infoCubeText.innerHTML = text.replace(arr[1], '', 1);

    infoCubeClone = infoCube.cloneNode(true);
    sponsLeftBox.appendChild(infoCubeClone);
    // sponsors.appendChild(infoCubeClone);


    infoCubeClone.style.animation = 'openInfoCube 1s ease ';
    infoCubeClone.classList.add('infoCubeOpen');


    // if (cube.classList.contains('cubeInRight')) {
    //   infoCubeClone.style.animation = 'openInfoCubeRight 1s ease ';
    //   infoCubeClone.classList.add('infoCubeOpenRight');
    // }
    // if (cube.classList.contains('cubeInLeft')) {
    //   infoCubeClone.style.animation = 'openInfoCubeLeft 1s ease ';
    //   infoCubeClone.classList.add('infoCubeOpenLeft');
    // }
  })

  cube.addEventListener('mouseleave', function () {


    infoCubeClone.classList.remove('infoCubeOpen');
    infoCubeClone.classList.add('infoCubeClose');
    uwu(infoCubeClone);


    // if (cube.classList.contains('cubeInRight')) {
    //   infoCubeClone.classList.remove('infoCubeOpenRight');
    //   infoCubeClone.classList.add('infoCubeCloseRight');
    //   uwu(infoCubeClone);
    // }
    // if (cube.classList.contains('cubeInLeft')) {
    //   infoCubeClone.classList.remove('infoCubeOpenLeft');
    //   infoCubeClone.classList.add('infoCubeCloseLeft');
    //   uwu(infoCubeClone);
    // }
  })

  function uwu(infoCubeClone) {
    setTimeout(() => { infoCubeClone.remove() }, 1000)
  }

})







//проверка на ошибки при перенаправлении на внешний ресурс
// const nextPageGood = document.querySelector('#nextPageGood');
const nextPage404 = document.querySelector('#nextPage404');

const blocking = document.querySelector('#blocking');

const fallbackUrl = 'error.html'; // Ваша страница 404

cubesActive.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    link.classList.add('selected');
    // blocking.style.display = 'block';
    // body.style.overflow = 'hidden';
    pageHidden();

    const url = this.dataset.url;
    preloader.style.display = 'block';
    preloader.style.opacity = '1';

    // Создаём скрытый iframe для проверки
    const testFrame = document.createElement('iframe');
    testFrame.style.display = 'none';
    testFrame.src = url;
    document.body.appendChild(testFrame);


    let isWorking = false; // Флаг "рабочий ли сайт"
    const timeout = 4500; // 4 секунды на проверку

    // Если iframe загрузился успешно
    testFrame.onload = () => {
      // setTimeout(() => {
      // nextPageGood.style.display = 'block';
      // }, 1800)



      setTimeout(() => {
        isWorking = true;
        cleanup();

        // nextPageGood.style.display = 'none';
        setTimeout(() => {

          pageVisibility();
          preloader.style.display = 'none';
          link.classList.remove('selected');
        }, 50)

        window.open(url, '_blank'); // Открываем сайт
      }, 2300) // для более красивой загрузки сайта
    };

    // Если iframe не загрузился (ошибка или блокировка)
    testFrame.onerror = () => {
      cleanup();
      // Проверяем, был ли iframe заблокирован (например, Сбербанк)
      setTimeout(() => {
        try {
          // Пытаемся получить доступ к iframe (если заблокирован — будет ошибка)
          // const frameDoc = testFrame.contentDocument || testFrame.contentWindow.document;
          // Если дошли сюда — iframe загружен, но контент невидим (например, 404 внутри iframe)
          if (!isWorking) {
            setTimeout(() => {

              pageVisibility();
              preloader.style.display = 'none';
              link.classList.remove('selected');

            }, 50)

            // preloader.style.display = 'none';
            // link.classList.remove('selected');
            // blocking.style.display = 'none';

            window.location.href = fallbackUrl;
            // window.open(fallbackUrl, '_blank'); // Открываем сайт

          }
        } catch (e) {
          // preloader.style.display = 'none';
          // link.classList.remove('selected');
          // blocking.style.display = 'none';

          setTimeout(() => {

            pageVisibility();
            preloader.style.display = 'none';
            link.classList.remove('selected');

          }, 50)


          // Если iframe заблокирован (Сбербанк и т.д.) — считаем, что сайт рабочий
          window.open(url, '_blank');
        }
      }, 100);
    };

    // Таймер на случай, если iframe вообще не ответил

    setTimeout(() => {

      if (!isWorking) {
        // nextPageGood.style.display = 'block';

        setTimeout(() => {
          cleanup();
          // preloader.style.display = 'none';
          // link.classList.remove('selected');
          // blocking.style.display = 'none';
          // nextPageGood.style.display = 'none';
          setTimeout(() => {

            pageVisibility();
            preloader.style.display = 'none';
            link.classList.remove('selected');


            // blocking.style.display = 'none';
            // body.style.overflow = 'auto';

          }, 50)

          window.location.href = fallbackUrl;
          // window.open(fallbackUrl, '_blank'); // Открываем сайт

        }, 500)
      }
    }, 4000);

    // Удаляем iframe после проверки
    function cleanup() {
      document.body.removeChild(testFrame);
    }
  });
});










// document.addEventListener('DOMContentLoaded', function () {

//   const fallbackUrl = 'error.html'; // Ваша страница 404

//   cubesActive.forEach(link => {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();
//       link.classList.add('selected');
//       blocking.style.display = 'block';
//       body.style.overflow = 'hidden';


//       const url = this.dataset.url;
//       preloader.style.display = 'block';
//       preloader.style.opacity = '1';

//       // Создаём скрытый iframe для проверки
//       const testFrame = document.createElement('iframe');
//       testFrame.style.display = 'none';
//       testFrame.src = url;
//       document.body.appendChild(testFrame);

//       let isWorking = false; // Флаг "рабочий ли сайт"
//       const timeout = 4500; // 4 секунды на проверку

//       // Если iframe загрузился успешно
//       testFrame.onload = () => {
//         setTimeout(() => {
//           nextPageGood.style.display = 'block';
//         }, 1800)



//         setTimeout(() => {
//           isWorking = true;
//           cleanup();
//           preloader.style.display = 'none';
//           // preLoader.style.display = 'none';
//           link.classList.remove('selected');
//           blocking.style.display = 'none';
//           body.style.overflow = 'auto';
//           nextPageGood.style.display = 'none';

//           window.open(url, '_blank'); // Открываем сайт
//         }, 2300) // для более красивой загрузки сайта
//       };

//       // Если iframe не загрузился (ошибка или блокировка)
//       testFrame.onerror = () => {
//         cleanup();
//         // Проверяем, был ли iframe заблокирован (например, Сбербанк)
//         setTimeout(() => {
//           try {
//             // Пытаемся получить доступ к iframe (если заблокирован — будет ошибка)
//             const frameDoc = testFrame.contentDocument || testFrame.contentWindow.document;
//             // Если дошли сюда — iframe загружен, но контент невидим (например, 404 внутри iframe)
//             if (!isWorking) {
//               preloader.style.display = 'none';
//               link.classList.remove('selected');
//               blocking.style.display = 'none';

//               window.location.href = fallbackUrl;
//             }
//           } catch (e) {
//             preloader.style.display = 'none';
//             link.classList.remove('selected');
//             blocking.style.display = 'none';

//             // Если iframe заблокирован (Сбербанк и т.д.) — считаем, что сайт рабочий
//             window.open(url, '_blank');
//           }
//         }, 100);
//       };

//       // Таймер на случай, если iframe вообще не ответил

//       setTimeout(() => {

//         if (!isWorking) {
//           nextPageGood.style.display = 'block';

//           setTimeout(() => {
//             cleanup();
//             preloader.style.display = 'none';
//             link.classList.remove('selected');
//             blocking.style.display = 'none';
//             nextPageGood.style.display = 'none';

//             window.location.href = fallbackUrl;
//           }, 500)
//         }
//       }, 4000);

//       // Удаляем iframe после проверки
//       function cleanup() {
//         document.body.removeChild(testFrame);
//       }
//     });
//   });
// });












// function fNextPageOn() {
//   setTimeout(() => {
//     nextPageOn.style.display = 'none';
//   }, 500)
// }

// fNextPageOn();
// Инициализация







const butRegistration = document.querySelector('.splineBox .butRegistration');

butRegistration.addEventListener('click', (e) => {
  e.preventDefault();
  pageHidden();

  setTimeout(() => {

    window.location.href = butRegistration.dataset.href;
    setTimeout(() => {
      // pageVisibility();
    }, 1000)

  }, 1100)
})








// const observerVis = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('visibleOne');

//       // Добавляем задержку для последовательного появления
//       const index = Array.from(items).indexOf(entry.target);
//       entry.target.style.transitionDelay = `${index * 0.1} s`;
//     }
//   });
// }, {
//   threshold: 0.1,
//   rootMargin: '0px 0px -50px 0px'
// });

// const items = document.querySelectorAll('#pageMain .grid > div');

// items.forEach((item) => {
//   item.classList.add('viss');
// })

// items.forEach((item, index) => {
//   //   progflake.className = 'flyDownElements';

//   item.style.transitionDelay = `${index * 0.1} s`;
//   observerVis.observe(item);
// });



// document.querySelectorAll('#pageMain .grid > div').forEach(item => {
//   // 1. Получаем текущий transform
//   const computedStyle = window.getComputedStyle(item);
//   const originalTransform = computedStyle.transform;

//   // 2. Проверяем, есть ли реальный transform (не матрица по умолчанию)
//   const hasCustomTransform = 
//     originalTransform !== 'none' && 
//     originalTransform !== 'matrix(1, 0, 0, 1, 0, 0)';

//   // 3. Добавляем анимацию появления
//   item.style.transform = 
//     `${hasCustomTransform ? originalTransform + ' ' : ''}translateY(30px);`
//   item.style.opacity = '0';
//   item.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

//   // 4. Наблюдаем за появлением
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.style.transform = hasCustomTransform ? originalTransform : 'none';
//         entry.target.style.opacity = '1';
//       }
//     });
//   }, { threshold: 0.1 });

//   observer.observe(item);
// });











// const goOnTop = document.querySelector('.goOnTop');
// const fillGo = document.querySelector('.goOnTop .fillGo');
const topPersent = document.querySelector('.goOnTop .percent');
const goOnTopSvg = document.querySelector('.goOnTop .svgIcon');

window.addEventListener('scroll', function () {
  const scrollHeight = document.documentElement.scrollHeight;
  // console.log(window.scrollY)
  const clientHeight = document.documentElement.clientHeight;
  const scrollableHeight = scrollHeight - clientHeight;
  const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;

  if (Math.round(scrolledPercentage) >= 30) {
    goOnTop.classList.remove('notShow');
  }
  else {
    goOnTop.classList.add('notShow');
  }
  // console.log(`Проскроллено ${Math.round(scrolledPercentage)}% страницы`);
  // fillGo.style.height = 58 / 100 * Math.round(scrolledPercentage) + 'px';
  topPersent.textContent = Math.round(scrolledPercentage);

  if (Math.round(scrolledPercentage) == 100) {
    topPersent.classList.add('none')
    goOnTopSvg.classList.add('up')
    goOnTop.classList.add('up')
  }
  else {
    topPersent.classList.remove('none')
    goOnTopSvg.classList.remove('up')
    goOnTop.classList.remove('up')
  }
});

let flagScrollTop = true
goOnTop.addEventListener('click', function () {
  if (flagScrollTop) {
    flagScrollTop = false
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    goOnTopSvg.classList.add('go')

    setTimeout(() => {
      flagScrollTop = true
      goOnTopSvg.classList.remove('go')
    }, 1100)
  }
})











document.querySelectorAll('#pageMain .grid > div').forEach(item => {
  const originalTransform = window.getComputedStyle(item).transform;
  if (originalTransform === 'none') {
    item.style.transform = 'translateY(30px)';
  }

  // Начальное состояние (появление снизу)
  item.style.transform = `${originalTransform} translateY(30px)`;
  if (!item.classList.contains('kubeBlock')) {
    item.style.opacity = '0';
  }
  item.style.transition = 'transform 0.7s ease, opacity 0.7s ease, box-shadow 0.7s ease';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Возвращаем только исходный transform (без translateY)
        entry.target.style.transform = originalTransform;
        entry.target.style.opacity = '1';
      }
    }, { threshold: 0.1 });
  });

  observer.observe(item);
});