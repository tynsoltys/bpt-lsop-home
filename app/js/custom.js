var macrotutorials = [
  {
    date: 00000,
    formats: [
      { type: 'audio', url: 'urlofaudio' },
      { type: 'video', url: 'urlofvideo' },
    ],
  },
  {},
  {},
  {},
  {},
  {},
  {},
];

var data = {
  macromodules: [
    {
      id: 'MAC1_001',
      moduleNo: 1,
      moduleTitle: 'Money & Currency',
      moduleDuration: '55:43',
      moduleType: 'coursemodule',
      programName: 'Macro Masters',
      programCode: 'MAC',
      programVersion: 1,
      videoLink: null,
      audioLink: null,
      modulePageLink: null,
      tutorials: macrotutorials,
    },
  ],
};

console.log(window.data.macromodules[0].tutorials);

//scripts to write

// sticky nav

// smoothscroll

// Vanilla JavaScript Scroll to Anchor
// @ https://perishablepress.com/vanilla-javascript-scroll-anchor/

function animate(elem, style, unit, from, to, time, prop) {
  if (!elem) {
    return;
  }
  var start = new Date().getTime(),
    timer = setInterval(function () {
      var step = Math.min(1, (new Date().getTime() - start) / time);
      if (prop) {
        elem[style] = from + step * (to - from) + unit;
      } else {
        elem.style[style] = from + step * (to - from) + unit;
      }
      if (step === 1) {
        clearInterval(timer);
      }
    }, 25);
  if (prop) {
    elem[style] = from + unit;
  } else {
    elem.style[style] = from + unit;
  }
}

window.onload = function () {
  var target = document.getElementById('div5');
  animate(
    document.scrollingElement || document.documentElement,
    'scrollTop',
    '',
    0,
    target.offsetTop,
    2000,
    true
  );
};

// collapse section

// localstorage for video progress?

// vimeo lazyload

// module accordions
