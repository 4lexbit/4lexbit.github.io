// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/darken/dist/darken.umd.js":[function(require,module,exports) {
var define;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.darken=t()}(this,function(){var e=function(e,t){var r=this;"function"==typeof e&&(t=e,e={}),e=Object.assign({container:null,default:"light",toggle:null,remember:"darken-mode",usePrefersColorScheme:!0,class:"darken",stylesheets:{},timestamps:{},variables:{}},e),this.dark=!1;var a=new Date;e.remember?localStorage.getItem(e.remember)?e.default=localStorage.getItem(e.remember):e.usePrefersColorScheme?e.default=this.__checkMatchMedia()||e.default:Object.keys(e.timestamps).length>0&&e.timestamps.dark&&e.timestamps.light&&(e.default=this.__checkTimestamps(e,a)):e.usePrefersColorScheme?(e.default=this.__checkMatchMedia()||e.default,window.matchMedia("(prefers-color-scheme: dark)").addListener(function(e){e.matches&&r.on()}),window.matchMedia("(prefers-color-scheme: light)").addListener(function(e){e.matches&&r.off()})):Object.keys(e.timestamps).length>0&&e.timestamps.dark&&e.timestamps.light&&(e.default=this.__checkTimestamps(e,a)),e.toggle&&document.querySelector(e.toggle).addEventListener("click",this.__handleClick.bind(this)),document.addEventListener("darken-dark",this.__handleDarkenEvent(e,t,"add"),!1),document.addEventListener("darken-light",this.__handleDarkenEvent(e,t,"remove"),!1),"light"===e.default?this.off():"dark"===e.default&&this.on()};return e.prototype.__handleDarkenEvent=function(e,t,r){var a=this;return function(){e.container?document.querySelector(e.container).classList[r](e.class):document.body.classList[r](e.class);for(var n=e.container?document.querySelector(e.container):document.documentElement,s=0,i=Object.entries(e.variables);s<i.length;s+=1){var o=i[s],d=o[0],c=o[1];c&&"object"==typeof c&&(Array.isArray(c)?n.style.setProperty(d,a.dark?c[1]:c[0]):n.style.setProperty(d,c[a.dark?"dark":"light"]))}a.__changeStylesheet(e.stylesheets.id,e.stylesheets[a.dark?"dark":"light"]),e.remember&&localStorage.setItem(e.remember,a.dark?"dark":"light"),"function"==typeof t&&t(a.dark)}},e.prototype.__handleClick=function(e){e.preventDefault(),this.toggle()},e.prototype.__checkMatchMedia=function(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":window.matchMedia("(prefers-color-scheme: light)").matches?"light":void 0},e.prototype.__normalizeTimestamps=function(e){for(var t=0,r=Object.entries(e);t<r.length;t+=1){var a=r[t],n=a[0],s=a[1],i=new Date,o=s.split(":");i.setHours(o[0],o[1],0,0),e[n]=i}},e.prototype.__changeStylesheet=function(e,t){var r=document.head.querySelector("#"+e||"#darken-stylesheet");r?t?r.href=t:document.head.removeChild(r):t&&((r=document.createElement("link")).id=e||"darken-stylesheet",r.rel="stylesheet",r.type="text/css",r.href=t,document.head.appendChild(r))},e.prototype.__checkTimestamps=function(e,t){return this.__normalizeTimestamps(e.timestamps),e.timestamps.dark<t&&t>e.timestamps.light||e.timestamps.dark>t&&t<e.timestamps.light?"dark":"light"},e.prototype.toggle=function(){this.dark=!this.dark,this.dark?document.dispatchEvent(new Event("darken-dark")):document.dispatchEvent(new Event("darken-light"))},e.prototype.on=function(){this.dark=!0,document.dispatchEvent(new Event("darken-dark"))},e.prototype.off=function(){this.dark=!1,document.dispatchEvent(new Event("darken-light"))},e});

},{}],"assets/js/index.js":[function(require,module,exports) {
"use strict";

var _darken = _interopRequireDefault(require("darken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var darkmode = new _darken.default({
  toggle: "#toggle",
  variables: {
    "--primary-color": ["#292929", "#ffffff"],
    "--secondary-color": ["#AC9670", "#AC9670"],
    "--side-primary-color": ["#1c1c1c", "#AC9670"],
    "--side-secondary-color": ["#AC9670", "#ffffff"],
    "--temp-color": ["#292929", "#AC9670"]
  }
});
},{"darken":"../node_modules/darken/dist/darken.umd.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42815" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/index.js"], null)
//# sourceMappingURL=/js.5c615dc2.js.map