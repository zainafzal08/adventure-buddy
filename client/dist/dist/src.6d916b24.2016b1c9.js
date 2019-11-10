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
})({"src.6d916b24.js":[function(require,module,exports) {
var define;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

parcelRequire = function (e, r, t, n) {
  var i,
      o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }

    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  };

  for (var c = 0; c < t.length; c++) try {
    f(t[c]);
  } catch (e) {
    i || (i = e);
  }

  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "P1HH": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.isDirective = exports.directive = void 0;

    const e = new WeakMap(),
          t = t => (...s) => {
      const i = t(...s);
      return e.set(i, !0), i;
    };

    exports.directive = t;

    const s = t => "function" == typeof t && e.has(t);

    exports.isDirective = s;
  }, {}],
  "JQ4u": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;
    const e = void 0 !== window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback;
    exports.isCEPolyfill = e;

    const o = (e, o, s = null, l = null) => {
      for (; o !== s;) {
        const s = o.nextSibling;
        e.insertBefore(o, l), o = s;
      }
    };

    exports.reparentNodes = o;

    const s = (e, o, s = null) => {
      for (; o !== s;) {
        const s = o.nextSibling;
        e.removeChild(o), o = s;
      }
    };

    exports.removeNodes = s;
  }, {}],
  "m4zr": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.nothing = exports.noChange = void 0;
    const e = {};
    exports.noChange = e;
    const o = {};
    exports.nothing = o;
  }, {}],
  "kXJ6": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;
    const e = `{{lit-${String(Math.random()).slice(2)}}}`;
    exports.marker = e;
    const t = `\x3c!--${e}--\x3e`;
    exports.nodeMarker = t;
    const r = new RegExp(`${e}|${t}`);
    exports.markerRegex = r;
    const s = "$lit$";
    exports.boundAttributeSuffix = s;

    class o {
      constructor(t, o) {
        this.parts = [], this.element = o;
        const i = [],
              l = [],
              p = document.createTreeWalker(o.content, 133, null, !1);
        let c = 0,
            d = -1,
            u = 0;
        const {
          strings: f,
          values: {
            length: h
          }
        } = t;

        for (; u < h;) {
          const t = p.nextNode();

          if (null !== t) {
            if (d++, 1 === t.nodeType) {
              if (t.hasAttributes()) {
                const e = t.attributes,
                      {
                  length: o
                } = e;
                let i = 0;

                for (let t = 0; t < o; t++) n(e[t].name, s) && i++;

                for (; i-- > 0;) {
                  const e = f[u],
                        o = x.exec(e)[2],
                        n = o.toLowerCase() + s,
                        i = t.getAttribute(n);
                  t.removeAttribute(n);
                  const a = i.split(r);
                  this.parts.push({
                    type: "attribute",
                    index: d,
                    name: o,
                    strings: a
                  }), u += a.length - 1;
                }
              }

              "TEMPLATE" === t.tagName && (l.push(t), p.currentNode = t.content);
            } else if (3 === t.nodeType) {
              const o = t.data;

              if (o.indexOf(e) >= 0) {
                const e = t.parentNode,
                      l = o.split(r),
                      p = l.length - 1;

                for (let r = 0; r < p; r++) {
                  let o,
                      i = l[r];
                  if ("" === i) o = a();else {
                    const e = x.exec(i);
                    null !== e && n(e[2], s) && (i = i.slice(0, e.index) + e[1] + e[2].slice(0, -s.length) + e[3]), o = document.createTextNode(i);
                  }
                  e.insertBefore(o, t), this.parts.push({
                    type: "node",
                    index: ++d
                  });
                }

                "" === l[p] ? (e.insertBefore(a(), t), i.push(t)) : t.data = l[p], u += p;
              }
            } else if (8 === t.nodeType) if (t.data === e) {
              const e = t.parentNode;
              null !== t.previousSibling && d !== c || (d++, e.insertBefore(a(), t)), c = d, this.parts.push({
                type: "node",
                index: d
              }), null === t.nextSibling ? t.data = "" : (i.push(t), d--), u++;
            } else {
              let r = -1;

              for (; -1 !== (r = t.data.indexOf(e, r + 1));) this.parts.push({
                type: "node",
                index: -1
              }), u++;
            }
          } else p.currentNode = l.pop();
        }

        for (const e of i) e.parentNode.removeChild(e);
      }

    }

    exports.Template = o;

    const n = (e, t) => {
      const r = e.length - t.length;
      return r >= 0 && e.slice(r) === t;
    },
          i = e => -1 !== e.index;

    exports.isTemplatePartActive = i;

    const a = () => document.createComment("");

    exports.createMarker = a;
    const x = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
    exports.lastAttributeNameRegex = x;
  }, {}],
  "nn5n": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.TemplateInstance = void 0;

    var e = require("./dom.js"),
        t = require("./template.js");

    class s {
      constructor(e, t, s) {
        this.__parts = [], this.template = e, this.processor = t, this.options = s;
      }

      update(e) {
        let t = 0;

        for (const s of this.__parts) void 0 !== s && s.setValue(e[t]), t++;

        for (const s of this.__parts) void 0 !== s && s.commit();
      }

      _clone() {
        const s = e.isCEPolyfill ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
              o = [],
              r = this.template.parts,
              n = document.createTreeWalker(s, 133, null, !1);
        let i,
            p = 0,
            l = 0,
            a = n.nextNode();

        for (; p < r.length;) if (i = r[p], (0, t.isTemplatePartActive)(i)) {
          for (; l < i.index;) l++, "TEMPLATE" === a.nodeName && (o.push(a), n.currentNode = a.content), null === (a = n.nextNode()) && (n.currentNode = o.pop(), a = n.nextNode());

          if ("node" === i.type) {
            const e = this.processor.handleTextExpression(this.options);
            e.insertAfterNode(a.previousSibling), this.__parts.push(e);
          } else this.__parts.push(...this.processor.handleAttributeExpressions(a, i.name, i.strings, this.options));

          p++;
        } else this.__parts.push(void 0), p++;

        return e.isCEPolyfill && (document.adoptNode(s), customElements.upgrade(s)), s;
      }

    }

    exports.TemplateInstance = s;
  }, {
    "./dom.js": "JQ4u",
    "./template.js": "kXJ6"
  }],
  "SM33": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.SVGTemplateResult = exports.TemplateResult = void 0;

    var e = require("./dom.js"),
        t = require("./template.js");

    const s = ` ${t.marker} `;

    class r {
      constructor(e, t, s, r) {
        this.strings = e, this.values = t, this.type = s, this.processor = r;
      }

      getHTML() {
        const e = this.strings.length - 1;
        let r = "",
            n = !1;

        for (let l = 0; l < e; l++) {
          const e = this.strings[l],
                i = e.lastIndexOf("\x3c!--");
          n = (i > -1 || n) && -1 === e.indexOf("--\x3e", i + 1);
          const o = t.lastAttributeNameRegex.exec(e);
          r += null === o ? e + (n ? s : t.nodeMarker) : e.substr(0, o.index) + o[1] + o[2] + t.boundAttributeSuffix + o[3] + t.marker;
        }

        return r += this.strings[e];
      }

      getTemplateElement() {
        const e = document.createElement("template");
        return e.innerHTML = this.getHTML(), e;
      }

    }

    exports.TemplateResult = r;

    class n extends r {
      getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
      }

      getTemplateElement() {
        const t = super.getTemplateElement(),
              s = t.content,
              r = s.firstChild;
        return s.removeChild(r), (0, e.reparentNodes)(s, r.firstChild), t;
      }

    }

    exports.SVGTemplateResult = n;
  }, {
    "./dom.js": "JQ4u",
    "./template.js": "kXJ6"
  }],
  "PIiJ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

    var t = require("./directive.js"),
        e = require("./dom.js"),
        i = require("./part.js"),
        s = require("./template-instance.js"),
        n = require("./template-result.js"),
        r = require("./template.js");

    const o = t => null === t || !("object" == typeof t || "function" == typeof t);

    exports.isPrimitive = o;

    const a = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);

    exports.isIterable = a;

    class h {
      constructor(t, e, i) {
        this.dirty = !0, this.element = t, this.name = e, this.strings = i, this.parts = [];

        for (let s = 0; s < i.length - 1; s++) this.parts[s] = this._createPart();
      }

      _createPart() {
        return new l(this);
      }

      _getValue() {
        const t = this.strings,
              e = t.length - 1;
        let i = "";

        for (let s = 0; s < e; s++) {
          i += t[s];
          const e = this.parts[s];

          if (void 0 !== e) {
            const t = e.value;
            if (o(t) || !a(t)) i += "string" == typeof t ? t : String(t);else for (const e of t) i += "string" == typeof e ? e : String(e);
          }
        }

        return i += t[e];
      }

      commit() {
        this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
      }

    }

    exports.AttributeCommitter = h;

    class l {
      constructor(t) {
        this.value = void 0, this.committer = t;
      }

      setValue(e) {
        e === i.noChange || o(e) && e === this.value || (this.value = e, (0, t.isDirective)(e) || (this.committer.dirty = !0));
      }

      commit() {
        for (; (0, t.isDirective)(this.value);) {
          const t = this.value;
          this.value = i.noChange, t(this);
        }

        this.value !== i.noChange && this.committer.commit();
      }

    }

    exports.AttributePart = l;

    class u {
      constructor(t) {
        this.value = void 0, this.__pendingValue = void 0, this.options = t;
      }

      appendInto(t) {
        this.startNode = t.appendChild((0, r.createMarker)()), this.endNode = t.appendChild((0, r.createMarker)());
      }

      insertAfterNode(t) {
        this.startNode = t, this.endNode = t.nextSibling;
      }

      appendIntoPart(t) {
        t.__insert(this.startNode = (0, r.createMarker)()), t.__insert(this.endNode = (0, r.createMarker)());
      }

      insertAfterPart(t) {
        t.__insert(this.startNode = (0, r.createMarker)()), this.endNode = t.endNode, t.endNode = this.startNode;
      }

      setValue(t) {
        this.__pendingValue = t;
      }

      commit() {
        for (; (0, t.isDirective)(this.__pendingValue);) {
          const t = this.__pendingValue;
          this.__pendingValue = i.noChange, t(this);
        }

        const e = this.__pendingValue;
        e !== i.noChange && (o(e) ? e !== this.value && this.__commitText(e) : e instanceof n.TemplateResult ? this.__commitTemplateResult(e) : e instanceof Node ? this.__commitNode(e) : a(e) ? this.__commitIterable(e) : e === i.nothing ? (this.value = i.nothing, this.clear()) : this.__commitText(e));
      }

      __insert(t) {
        this.endNode.parentNode.insertBefore(t, this.endNode);
      }

      __commitNode(t) {
        this.value !== t && (this.clear(), this.__insert(t), this.value = t);
      }

      __commitText(t) {
        const e = this.startNode.nextSibling,
              i = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
        e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = i : this.__commitNode(document.createTextNode(i)), this.value = t;
      }

      __commitTemplateResult(t) {
        const e = this.options.templateFactory(t);
        if (this.value instanceof s.TemplateInstance && this.value.template === e) this.value.update(t.values);else {
          const i = new s.TemplateInstance(e, t.processor, this.options),
                n = i._clone();

          i.update(t.values), this.__commitNode(n), this.value = i;
        }
      }

      __commitIterable(t) {
        Array.isArray(this.value) || (this.value = [], this.clear());
        const e = this.value;
        let i,
            s = 0;

        for (const n of t) void 0 === (i = e[s]) && (i = new u(this.options), e.push(i), 0 === s ? i.appendIntoPart(this) : i.insertAfterPart(e[s - 1])), i.setValue(n), i.commit(), s++;

        s < e.length && (e.length = s, this.clear(i && i.endNode));
      }

      clear(t = this.startNode) {
        (0, e.removeNodes)(this.startNode.parentNode, t.nextSibling, this.endNode);
      }

    }

    exports.NodePart = u;

    class d {
      constructor(t, e, i) {
        if (this.value = void 0, this.__pendingValue = void 0, 2 !== i.length || "" !== i[0] || "" !== i[1]) throw new Error("Boolean attributes can only contain a single expression");
        this.element = t, this.name = e, this.strings = i;
      }

      setValue(t) {
        this.__pendingValue = t;
      }

      commit() {
        for (; (0, t.isDirective)(this.__pendingValue);) {
          const t = this.__pendingValue;
          this.__pendingValue = i.noChange, t(this);
        }

        if (this.__pendingValue === i.noChange) return;
        const e = !!this.__pendingValue;
        this.value !== e && (e ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = e), this.__pendingValue = i.noChange;
      }

    }

    exports.BooleanAttributePart = d;

    class c extends h {
      constructor(t, e, i) {
        super(t, e, i), this.single = 2 === i.length && "" === i[0] && "" === i[1];
      }

      _createPart() {
        return new p(this);
      }

      _getValue() {
        return this.single ? this.parts[0].value : super._getValue();
      }

      commit() {
        this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
      }

    }

    exports.PropertyCommitter = c;

    class p extends l {}

    exports.PropertyPart = p;

    let _ = !1;

    try {
      const t = {
        get capture() {
          return _ = !0, !1;
        }

      };
      window.addEventListener("test", t, t), window.removeEventListener("test", t, t);
    } catch (g) {}

    class m {
      constructor(t, e, i) {
        this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = i, this.__boundHandleEvent = t => this.handleEvent(t);
      }

      setValue(t) {
        this.__pendingValue = t;
      }

      commit() {
        for (; (0, t.isDirective)(this.__pendingValue);) {
          const t = this.__pendingValue;
          this.__pendingValue = i.noChange, t(this);
        }

        if (this.__pendingValue === i.noChange) return;
        const e = this.__pendingValue,
              s = this.value,
              n = null == e || null != s && (e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive),
              r = null != e && (null == s || n);
        n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), r && (this.__options = v(e), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = e, this.__pendingValue = i.noChange;
      }

      handleEvent(t) {
        "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t);
      }

    }

    exports.EventPart = m;

    const v = t => t && (_ ? {
      capture: t.capture,
      passive: t.passive,
      once: t.once
    } : t.capture);
  }, {
    "./directive.js": "P1HH",
    "./dom.js": "JQ4u",
    "./part.js": "m4zr",
    "./template-instance.js": "nn5n",
    "./template-result.js": "SM33",
    "./template.js": "kXJ6"
  }],
  "mAZn": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

    var e = require("./parts.js");

    class t {
      handleAttributeExpressions(t, r, s, o) {
        const a = r[0];

        if ("." === a) {
          return new e.PropertyCommitter(t, r.slice(1), s).parts;
        }

        return "@" === a ? [new e.EventPart(t, r.slice(1), o.eventContext)] : "?" === a ? [new e.BooleanAttributePart(t, r.slice(1), s)] : new e.AttributeCommitter(t, r, s).parts;
      }

      handleTextExpression(t) {
        return new e.NodePart(t);
      }

    }

    exports.DefaultTemplateProcessor = t;
    const r = new t();
    exports.defaultTemplateProcessor = r;
  }, {
    "./parts.js": "PIiJ"
  }],
  "K8aL": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.templateFactory = t, exports.templateCaches = void 0;

    var e = require("./template.js");

    function t(t) {
      let s = r.get(t.type);
      void 0 === s && (s = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      }, r.set(t.type, s));
      let n = s.stringsArray.get(t.strings);
      if (void 0 !== n) return n;
      const a = t.strings.join(e.marker);
      return void 0 === (n = s.keyString.get(a)) && (n = new e.Template(t, t.getTemplateElement()), s.keyString.set(a, n)), s.stringsArray.set(t.strings, n), n;
    }

    const r = new Map();
    exports.templateCaches = r;
  }, {
    "./template.js": "kXJ6"
  }],
  "dvwX": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.render = exports.parts = void 0;

    var e = require("./dom.js"),
        t = require("./parts.js"),
        r = require("./template-factory.js");

    const s = new WeakMap();
    exports.parts = s;

    const o = (o, a, p) => {
      let d = s.get(a);
      void 0 === d && ((0, e.removeNodes)(a, a.firstChild), s.set(a, d = new t.NodePart(Object.assign({
        templateFactory: r.templateFactory
      }, p))), d.appendInto(a)), d.setValue(o), d.commit();
    };

    exports.render = o;
  }, {
    "./dom.js": "JQ4u",
    "./parts.js": "PIiJ",
    "./template-factory.js": "K8aL"
  }],
  "KMqM": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "DefaultTemplateProcessor", {
      enumerable: !0,
      get: function () {
        return e.DefaultTemplateProcessor;
      }
    }), Object.defineProperty(exports, "defaultTemplateProcessor", {
      enumerable: !0,
      get: function () {
        return e.defaultTemplateProcessor;
      }
    }), Object.defineProperty(exports, "SVGTemplateResult", {
      enumerable: !0,
      get: function () {
        return t.SVGTemplateResult;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function () {
        return t.TemplateResult;
      }
    }), Object.defineProperty(exports, "directive", {
      enumerable: !0,
      get: function () {
        return r.directive;
      }
    }), Object.defineProperty(exports, "isDirective", {
      enumerable: !0,
      get: function () {
        return r.isDirective;
      }
    }), Object.defineProperty(exports, "removeNodes", {
      enumerable: !0,
      get: function () {
        return n.removeNodes;
      }
    }), Object.defineProperty(exports, "reparentNodes", {
      enumerable: !0,
      get: function () {
        return n.reparentNodes;
      }
    }), Object.defineProperty(exports, "noChange", {
      enumerable: !0,
      get: function () {
        return o.noChange;
      }
    }), Object.defineProperty(exports, "nothing", {
      enumerable: !0,
      get: function () {
        return o.nothing;
      }
    }), Object.defineProperty(exports, "AttributeCommitter", {
      enumerable: !0,
      get: function () {
        return i.AttributeCommitter;
      }
    }), Object.defineProperty(exports, "AttributePart", {
      enumerable: !0,
      get: function () {
        return i.AttributePart;
      }
    }), Object.defineProperty(exports, "BooleanAttributePart", {
      enumerable: !0,
      get: function () {
        return i.BooleanAttributePart;
      }
    }), Object.defineProperty(exports, "EventPart", {
      enumerable: !0,
      get: function () {
        return i.EventPart;
      }
    }), Object.defineProperty(exports, "isIterable", {
      enumerable: !0,
      get: function () {
        return i.isIterable;
      }
    }), Object.defineProperty(exports, "isPrimitive", {
      enumerable: !0,
      get: function () {
        return i.isPrimitive;
      }
    }), Object.defineProperty(exports, "NodePart", {
      enumerable: !0,
      get: function () {
        return i.NodePart;
      }
    }), Object.defineProperty(exports, "PropertyCommitter", {
      enumerable: !0,
      get: function () {
        return i.PropertyCommitter;
      }
    }), Object.defineProperty(exports, "PropertyPart", {
      enumerable: !0,
      get: function () {
        return i.PropertyPart;
      }
    }), Object.defineProperty(exports, "parts", {
      enumerable: !0,
      get: function () {
        return u.parts;
      }
    }), Object.defineProperty(exports, "render", {
      enumerable: !0,
      get: function () {
        return u.render;
      }
    }), Object.defineProperty(exports, "templateCaches", {
      enumerable: !0,
      get: function () {
        return a.templateCaches;
      }
    }), Object.defineProperty(exports, "templateFactory", {
      enumerable: !0,
      get: function () {
        return a.templateFactory;
      }
    }), Object.defineProperty(exports, "TemplateInstance", {
      enumerable: !0,
      get: function () {
        return p.TemplateInstance;
      }
    }), Object.defineProperty(exports, "createMarker", {
      enumerable: !0,
      get: function () {
        return s.createMarker;
      }
    }), Object.defineProperty(exports, "isTemplatePartActive", {
      enumerable: !0,
      get: function () {
        return s.isTemplatePartActive;
      }
    }), Object.defineProperty(exports, "Template", {
      enumerable: !0,
      get: function () {
        return s.Template;
      }
    }), exports.svg = exports.html = void 0;

    var e = require("./lib/default-template-processor.js"),
        t = require("./lib/template-result.js"),
        r = require("./lib/directive.js"),
        n = require("./lib/dom.js"),
        o = require("./lib/part.js"),
        i = require("./lib/parts.js"),
        u = require("./lib/render.js"),
        a = require("./lib/template-factory.js"),
        p = require("./lib/template-instance.js"),
        s = require("./lib/template.js");

    (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.1.2");

    const l = (r, ...n) => new t.TemplateResult(r, n, "html", e.defaultTemplateProcessor);

    exports.html = l;

    const c = (r, ...n) => new t.SVGTemplateResult(r, n, "svg", e.defaultTemplateProcessor);

    exports.svg = c;
  }, {
    "./lib/default-template-processor.js": "mAZn",
    "./lib/template-result.js": "SM33",
    "./lib/directive.js": "P1HH",
    "./lib/dom.js": "JQ4u",
    "./lib/part.js": "m4zr",
    "./lib/parts.js": "PIiJ",
    "./lib/render.js": "dvwX",
    "./lib/template-factory.js": "K8aL",
    "./lib/template-instance.js": "nn5n",
    "./lib/template.js": "kXJ6"
  }],
  "TOsx": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.removeNodesFromTemplate = n, exports.insertNodeIntoTemplate = l;

    var e = require("./template.js");

    const t = 133;

    function n(e, n) {
      const {
        element: {
          content: r
        },
        parts: l
      } = e,
            u = document.createTreeWalker(r, t, null, !1);
      let c = o(l),
          d = l[c],
          s = -1,
          i = 0;
      const a = [];
      let p = null;

      for (; u.nextNode();) {
        s++;
        const e = u.currentNode;

        for (e.previousSibling === p && (p = null), n.has(e) && (a.push(e), null === p && (p = e)), null !== p && i++; void 0 !== d && d.index === s;) d.index = null !== p ? -1 : d.index - i, d = l[c = o(l, c)];
      }

      a.forEach(e => e.parentNode.removeChild(e));
    }

    const r = e => {
      let n = 11 === e.nodeType ? 0 : 1;
      const r = document.createTreeWalker(e, t, null, !1);

      for (; r.nextNode();) n++;

      return n;
    },
          o = (t, n = -1) => {
      for (let r = n + 1; r < t.length; r++) {
        const n = t[r];
        if ((0, e.isTemplatePartActive)(n)) return r;
      }

      return -1;
    };

    function l(e, n, l = null) {
      const {
        element: {
          content: u
        },
        parts: c
      } = e;
      if (null == l) return void u.appendChild(n);
      const d = document.createTreeWalker(u, t, null, !1);
      let s = o(c),
          i = 0,
          a = -1;

      for (; d.nextNode();) {
        for (a++, d.currentNode === l && (i = r(n), l.parentNode.insertBefore(n, l)); -1 !== s && c[s].index === a;) {
          if (i > 0) {
            for (; -1 !== s;) c[s].index += i, s = o(c, s);

            return;
          }

          s = o(c, s);
        }
      }
    }
  }, {
    "./template.js": "kXJ6"
  }],
  "cxO7": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "html", {
      enumerable: !0,
      get: function () {
        return a.html;
      }
    }), Object.defineProperty(exports, "svg", {
      enumerable: !0,
      get: function () {
        return a.svg;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function () {
        return a.TemplateResult;
      }
    }), exports.render = void 0;

    var e = require("./dom.js"),
        t = require("./modify-template.js"),
        r = require("./render.js"),
        n = require("./template-factory.js"),
        o = require("./template-instance.js"),
        s = require("./template.js"),
        a = require("../lit-html.js");

    const l = (e, t) => `${e}--${t}`;

    let i = !0;
    void 0 === window.ShadyCSS ? i = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), i = !1);

    const d = e => t => {
      const r = l(t.type, e);
      let o = n.templateCaches.get(r);
      void 0 === o && (o = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      }, n.templateCaches.set(r, o));
      let a = o.stringsArray.get(t.strings);
      if (void 0 !== a) return a;
      const d = t.strings.join(s.marker);

      if (void 0 === (a = o.keyString.get(d))) {
        const r = t.getTemplateElement();
        i && window.ShadyCSS.prepareTemplateDom(r, e), a = new s.Template(t, r), o.keyString.set(d, a);
      }

      return o.stringsArray.set(t.strings, a), a;
    },
          p = ["html", "svg"],
          c = e => {
      p.forEach(r => {
        const o = n.templateCaches.get(l(r, e));
        void 0 !== o && o.keyString.forEach(e => {
          const {
            element: {
              content: r
            }
          } = e,
                n = new Set();
          Array.from(r.querySelectorAll("style")).forEach(e => {
            n.add(e);
          }), (0, t.removeNodesFromTemplate)(e, n);
        });
      });
    },
          m = new Set(),
          y = (e, r, n) => {
      m.add(e);
      const o = n ? n.element : document.createElement("template"),
            s = r.querySelectorAll("style"),
            {
        length: a
      } = s;
      if (0 === a) return void window.ShadyCSS.prepareTemplateStyles(o, e);
      const l = document.createElement("style");

      for (let t = 0; t < a; t++) {
        const e = s[t];
        e.parentNode.removeChild(e), l.textContent += e.textContent;
      }

      c(e);
      const i = o.content;
      n ? (0, t.insertNodeIntoTemplate)(n, l, i.firstChild) : i.insertBefore(l, i.firstChild), window.ShadyCSS.prepareTemplateStyles(o, e);
      const d = i.querySelector("style");
      if (window.ShadyCSS.nativeShadow && null !== d) r.insertBefore(d.cloneNode(!0), r.firstChild);else if (n) {
        i.insertBefore(l, i.firstChild);
        const e = new Set();
        e.add(l), (0, t.removeNodesFromTemplate)(n, e);
      }
    },
          S = (t, n, s) => {
      if (!s || "object" != typeof s || !s.scopeName) throw new Error("The `scopeName` option is required.");
      const a = s.scopeName,
            l = r.parts.has(n),
            p = i && 11 === n.nodeType && !!n.host,
            c = p && !m.has(a),
            S = c ? document.createDocumentFragment() : n;

      if ((0, r.render)(t, S, Object.assign({
        templateFactory: d(a)
      }, s)), c) {
        const t = r.parts.get(S);
        r.parts.delete(S);
        const s = t.value instanceof o.TemplateInstance ? t.value.template : void 0;
        y(a, S, s), (0, e.removeNodes)(n, n.firstChild), n.appendChild(S), r.parts.set(n, t);
      }

      !l && p && window.ShadyCSS.styleElement(n.host);
    };

    exports.render = S;
  }, {
    "./dom.js": "JQ4u",
    "./modify-template.js": "TOsx",
    "./render.js": "dvwX",
    "./template-factory.js": "K8aL",
    "./template-instance.js": "nn5n",
    "./template.js": "kXJ6",
    "../lit-html.js": "KMqM"
  }],
  "XaFz": [function (require, module, exports) {
    "use strict";

    var t;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0, window.JSCompiler_renameProperty = (t, e) => t;
    const e = {
      toAttribute(t, e) {
        switch (e) {
          case Boolean:
            return t ? "" : null;

          case Object:
          case Array:
            return null == t ? t : JSON.stringify(t);
        }

        return t;
      },

      fromAttribute(t, e) {
        switch (e) {
          case Boolean:
            return null !== t;

          case Number:
            return null === t ? null : Number(t);

          case Object:
          case Array:
            return JSON.parse(t);
        }

        return t;
      }

    };
    exports.defaultConverter = e;

    const r = (t, e) => e !== t && (e == e || t == t);

    exports.notEqual = r;
    const s = {
      attribute: !0,
      type: String,
      converter: e,
      reflect: !1,
      hasChanged: r
    },
          i = Promise.resolve(!0),
          a = 1,
          o = 4,
          n = 8,
          p = 16,
          h = 32,
          c = "finalized";

    class u extends HTMLElement {
      constructor() {
        super(), this._updateState = 0, this._instanceProperties = void 0, this._updatePromise = i, this._hasConnectedResolver = void 0, this._changedProperties = new Map(), this._reflectingProperties = void 0, this.initialize();
      }

      static get observedAttributes() {
        this.finalize();
        const t = [];
        return this._classProperties.forEach((e, r) => {
          const s = this._attributeNameForProperty(r, e);

          void 0 !== s && (this._attributeToPropertyMap.set(s, r), t.push(s));
        }), t;
      }

      static _ensureClassProperties() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
          this._classProperties = new Map();

          const t = Object.getPrototypeOf(this)._classProperties;

          void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
        }
      }

      static createProperty(t, e = s) {
        if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;
        const r = "symbol" == typeof t ? Symbol() : `__${t}`;
        Object.defineProperty(this.prototype, t, {
          get() {
            return this[r];
          },

          set(e) {
            const s = this[t];
            this[r] = e, this._requestUpdate(t, s);
          },

          configurable: !0,
          enumerable: !0
        });
      }

      static finalize() {
        const t = Object.getPrototypeOf(this);

        if (t.hasOwnProperty(c) || t.finalize(), this[c] = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
          const t = this.properties,
                e = [...Object.getOwnPropertyNames(t), ...("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [])];

          for (const r of e) this.createProperty(r, t[r]);
        }
      }

      static _attributeNameForProperty(t, e) {
        const r = e.attribute;
        return !1 === r ? void 0 : "string" == typeof r ? r : "string" == typeof t ? t.toLowerCase() : void 0;
      }

      static _valueHasChanged(t, e, s = r) {
        return s(t, e);
      }

      static _propertyValueFromAttribute(t, r) {
        const s = r.type,
              i = r.converter || e,
              a = "function" == typeof i ? i : i.fromAttribute;
        return a ? a(t, s) : t;
      }

      static _propertyValueToAttribute(t, r) {
        if (void 0 === r.reflect) return;
        const s = r.type,
              i = r.converter;
        return (i && i.toAttribute || e.toAttribute)(t, s);
      }

      initialize() {
        this._saveInstanceProperties(), this._requestUpdate();
      }

      _saveInstanceProperties() {
        this.constructor._classProperties.forEach((t, e) => {
          if (this.hasOwnProperty(e)) {
            const t = this[e];
            delete this[e], this._instanceProperties || (this._instanceProperties = new Map()), this._instanceProperties.set(e, t);
          }
        });
      }

      _applyInstanceProperties() {
        this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0;
      }

      connectedCallback() {
        this._updateState = this._updateState | h, this._hasConnectedResolver && (this._hasConnectedResolver(), this._hasConnectedResolver = void 0);
      }

      disconnectedCallback() {}

      attributeChangedCallback(t, e, r) {
        e !== r && this._attributeToProperty(t, r);
      }

      _propertyToAttribute(t, e, r = s) {
        const i = this.constructor,
              a = i._attributeNameForProperty(t, r);

        if (void 0 !== a) {
          const t = i._propertyValueToAttribute(e, r);

          if (void 0 === t) return;
          this._updateState = this._updateState | n, null == t ? this.removeAttribute(a) : this.setAttribute(a, t), this._updateState = this._updateState & ~n;
        }
      }

      _attributeToProperty(t, e) {
        if (this._updateState & n) return;

        const r = this.constructor,
              i = r._attributeToPropertyMap.get(t);

        if (void 0 !== i) {
          const t = r._classProperties.get(i) || s;
          this._updateState = this._updateState | p, this[i] = r._propertyValueFromAttribute(e, t), this._updateState = this._updateState & ~p;
        }
      }

      _requestUpdate(t, e) {
        let r = !0;

        if (void 0 !== t) {
          const i = this.constructor,
                a = i._classProperties.get(t) || s;
          i._valueHasChanged(this[t], e, a.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== a.reflect || this._updateState & p || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(t, a))) : r = !1;
        }

        !this._hasRequestedUpdate && r && this._enqueueUpdate();
      }

      requestUpdate(t, e) {
        return this._requestUpdate(t, e), this.updateComplete;
      }

      _enqueueUpdate() {
        var _this = this;

        return _asyncToGenerator(function* () {
          let t, e;
          _this._updateState = _this._updateState | o;
          const r = _this._updatePromise;
          _this._updatePromise = new Promise((r, s) => {
            t = r, e = s;
          });

          try {
            yield r;
          } catch (s) {}

          _this._hasConnected || (yield new Promise(t => _this._hasConnectedResolver = t));

          try {
            const t = _this.performUpdate();

            null != t && (yield t);
          } catch (s) {
            e(s);
          }

          t(!_this._hasRequestedUpdate);
        })();
      }

      get _hasConnected() {
        return this._updateState & h;
      }

      get _hasRequestedUpdate() {
        return this._updateState & o;
      }

      get hasUpdated() {
        return this._updateState & a;
      }

      performUpdate() {
        this._instanceProperties && this._applyInstanceProperties();
        let t = !1;
        const e = this._changedProperties;

        try {
          (t = this.shouldUpdate(e)) && this.update(e);
        } catch (r) {
          throw t = !1, r;
        } finally {
          this._markUpdated();
        }

        t && (this._updateState & a || (this._updateState = this._updateState | a, this.firstUpdated(e)), this.updated(e));
      }

      _markUpdated() {
        this._changedProperties = new Map(), this._updateState = this._updateState & ~o;
      }

      get updateComplete() {
        return this._getUpdateComplete();
      }

      _getUpdateComplete() {
        return this._updatePromise;
      }

      shouldUpdate(t) {
        return !0;
      }

      update(t) {
        void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0);
      }

      updated(t) {}

      firstUpdated(t) {}

    }

    exports.UpdatingElement = u, u[t = c] = !0;
  }, {}],
  "qkP2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.property = i, exports.query = s, exports.queryAll = c, exports.eventOptions = exports.customElement = void 0;

    const e = (e, t) => (window.customElements.define(e, t), t),
          t = (e, t) => {
      const {
        kind: r,
        elements: n
      } = t;
      return {
        kind: r,
        elements: n,

        finisher(t) {
          window.customElements.define(e, t);
        }

      };
    },
          r = r => n => "function" == typeof n ? e(r, n) : t(r, n);

    exports.customElement = r;

    const n = (e, t) => "method" !== t.kind || !t.descriptor || "value" in t.descriptor ? {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},

      initializer() {
        "function" == typeof t.initializer && (this[t.key] = t.initializer.call(this));
      },

      finisher(r) {
        r.createProperty(t.key, e);
      }

    } : Object.assign({}, t, {
      finisher(r) {
        r.createProperty(t.key, e);
      }

    }),
          o = (e, t, r) => {
      t.constructor.createProperty(r, e);
    };

    function i(e) {
      return (t, r) => void 0 !== r ? o(e, t, r) : n(e, t);
    }

    function s(e) {
      return (t, r) => {
        const n = {
          get() {
            return this.renderRoot.querySelector(e);
          },

          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? u(n, t, r) : p(n, t);
      };
    }

    function c(e) {
      return (t, r) => {
        const n = {
          get() {
            return this.renderRoot.querySelectorAll(e);
          },

          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? u(n, t, r) : p(n, t);
      };
    }

    const u = (e, t, r) => {
      Object.defineProperty(t, r, e);
    },
          p = (e, t) => ({
      kind: "method",
      placement: "prototype",
      key: t.key,
      descriptor: e
    }),
          l = (e, t) => Object.assign({}, t, {
      finisher(r) {
        Object.assign(r.prototype[t.key], e);
      }

    }),
          d = (e, t, r) => {
      Object.assign(t[r], e);
    },
          y = e => (t, r) => void 0 !== r ? d(e, t, r) : l(e, t);

    exports.eventOptions = y;
  }, {}],
  "ahrP": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.css = exports.unsafeCSS = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;
    const e = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    exports.supportsAdoptingStyleSheets = e;
    const t = Symbol();

    class s {
      constructor(e, s) {
        if (s !== t) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = e;
      }

      get styleSheet() {
        return void 0 === this._styleSheet && (e ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
      }

      toString() {
        return this.cssText;
      }

    }

    exports.CSSResult = s;

    const r = e => new s(String(e), t);

    exports.unsafeCSS = r;

    const o = e => {
      if (e instanceof s) return e.cssText;
      if ("number" == typeof e) return e;
      throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`);
    },
          n = (e, ...r) => {
      const n = r.reduce((t, s, r) => t + o(s) + e[r + 1], e[0]);
      return new s(n, t);
    };

    exports.css = n;
  }, {}],
  "xPSq": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var e = {
      LitElement: !0,
      html: !0,
      svg: !0,
      TemplateResult: !0,
      SVGTemplateResult: !0
    };
    Object.defineProperty(exports, "html", {
      enumerable: !0,
      get: function () {
        return o.html;
      }
    }), Object.defineProperty(exports, "svg", {
      enumerable: !0,
      get: function () {
        return o.svg;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function () {
        return o.TemplateResult;
      }
    }), Object.defineProperty(exports, "SVGTemplateResult", {
      enumerable: !0,
      get: function () {
        return o.SVGTemplateResult;
      }
    }), exports.LitElement = void 0;

    var t = require("lit-html"),
        r = require("lit-html/lib/shady-render.js"),
        s = require("./lib/updating-element.js");

    Object.keys(s).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function () {
          return s[t];
        }
      }));
    });

    var n = require("./lib/decorators.js");

    Object.keys(n).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function () {
          return n[t];
        }
      }));
    });

    var o = require("lit-html/lit-html.js"),
        i = require("./lib/css-tag.js");

    function l(e, t = []) {
      for (let r = 0, s = e.length; r < s; r++) {
        const s = e[r];
        Array.isArray(s) ? l(s, t) : t.push(s);
      }

      return t;
    }

    Object.keys(i).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function () {
          return i[t];
        }
      }));
    }), (window.litElementVersions || (window.litElementVersions = [])).push("2.2.1");

    const a = e => e.flat ? e.flat(1 / 0) : l(e);

    class d extends s.UpdatingElement {
      static finalize() {
        super.finalize.call(this), this._styles = this.hasOwnProperty(JSCompiler_renameProperty("styles", this)) ? this._getUniqueStyles() : this._styles || [];
      }

      static _getUniqueStyles() {
        const e = this.styles,
              t = [];

        if (Array.isArray(e)) {
          a(e).reduceRight((e, t) => (e.add(t), e), new Set()).forEach(e => t.unshift(e));
        } else e && t.push(e);

        return t;
      }

      initialize() {
        super.initialize(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
      }

      createRenderRoot() {
        return this.attachShadow({
          mode: "open"
        });
      }

      adoptStyles() {
        const e = this.constructor._styles;
        0 !== e.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? i.supportsAdoptingStyleSheets ? this.renderRoot.adoptedStyleSheets = e.map(e => e.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e => e.cssText), this.localName));
      }

      connectedCallback() {
        super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
      }

      update(e) {
        super.update(e);
        const r = this.render();
        r instanceof t.TemplateResult && this.constructor.render(r, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(e => {
          const t = document.createElement("style");
          t.textContent = e.cssText, this.renderRoot.appendChild(t);
        }));
      }

      render() {}

    }

    exports.LitElement = d, d.finalized = !0, d.render = r.render;
  }, {
    "lit-html": "KMqM",
    "lit-html/lib/shady-render.js": "cxO7",
    "./lib/updating-element.js": "XaFz",
    "./lib/decorators.js": "qkP2",
    "lit-html/lit-html.js": "KMqM",
    "./lib/css-tag.js": "ahrP"
  }],
  "V8e9": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.SectionTitle = void 0;

    var e = require("lit-element");

    function t() {
      var e = r(["\n          :host {\n            --img-size: 72px;\n            --img-pad: 32px;\n            --name-hpad: 16px;\n            --name-font-size: 1.8rem;\n            --descriptor-hpad: 0px;\n            --descriptor-font-size: .8rem;\n            width: 100%;\n            height: 250px;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-direction: column;\n          }\n          .img-wrapper {\n            width: calc(var(--img-size) + 2*var(--img-pad));\n            height: calc(var(--img-size) + 2*var(--img-pad));\n            background: var(--theme-gradient);\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n          }\n          .img-wrapper img {\n            width: var(--img-size);\n            height: var(--img-size);\n            filter: invert();\n            opacity: 0.45;\n          }\n          h1 {\n            width: 100%;\n            text-align: center;\n            color: #444;\n            font-weight: 100;\n            font-family: 'Montserrat', sans-serif;\n            margin: var(--name-hpad) 0px;\n            font-size: var(--name-font-size);\n          }\n          p {\n            width: 100%;\n            text-align: center;\n            color: #999;\n            font-family: 'Montserrat', sans-serif;\n            margin: var(--descriptor-hpad) 0px;\n            font-size: var(--descriptor-font-size);\n          }\n      "]);
      return t = function () {
        return e;
      }, e;
    }

    function n() {
      var e = r(['\n      <div class="img-wrapper">\n          <img src="', '"/>\n      </div>\n      <h1>', "</h1>\n      <p>", "</p>\n    "]);
      return n = function () {
        return e;
      }, e;
    }

    function r(e, t) {
      return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(t)
        }
      }));
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function c(e, t, n) {
      return t && o(e.prototype, t), n && o(e, n), e;
    }

    function p(e, t) {
      return !t || "object" !== l(t) && "function" != typeof t ? a(e) : t;
    }

    function a(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function f(e) {
      return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function u(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && s(e, t);
    }

    function s(e, t) {
      return (s = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function l(e) {
      return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    var y = function (e, t, n, r) {
      var i,
          o = arguments.length,
          c = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : l(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, r);else for (var p = e.length - 1; p >= 0; p--) (i = e[p]) && (c = (o < 3 ? i(c) : o > 3 ? i(t, n, c) : i(t, n)) || c);
      return o > 3 && c && Object.defineProperty(t, n, c), c;
    },
        d = function (r) {
      function o() {
        var e;
        return i(this, o), (e = p(this, f(o).apply(this, arguments))).title = "", e.subtitle = "", e.icon = "", e;
      }

      return u(o, e.LitElement), c(o, [{
        key: "render",
        value: function () {
          return (0, e.html)(n(), this.icon, this.title, this.subtitle);
        }
      }], [{
        key: "styles",
        get: function () {
          return (0, e.css)(t());
        }
      }]), o;
    }();

    exports.SectionTitle = d, y([(0, e.property)({
      type: String
    })], d.prototype, "title", void 0), y([(0, e.property)({
      type: String
    })], d.prototype, "subtitle", void 0), y([(0, e.property)({
      type: String
    })], d.prototype, "icon", void 0), exports.SectionTitle = d = y([(0, e.customElement)("section-title")], d);
  }, {
    "lit-element": "xPSq"
  }],
  "hldf": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.CharacterSheet = void 0, require("../ui/section-title/section-title");

    var e = require("lit-element");

    function t() {
      var e = n(["\n          :host {\n            --page-vpad: 16px;\n            --page-hpad: 48px;\n          }\n          .page {\n            width: calc(100% - 2 * var(--page-hpad));\n            padding: var(--page-vpad) var(--page-hpad);\n            height: calc(100vh - var(--page-hpad));\n            background: #FAFAFA;\n          }\n\n          /* lower then 800 px */\n          @media (max-width: 500px) {\n            :host {\n              --page-vpad: 16px;\n              --page-hpad: 32px;\n              --header-img-size: 80px;\n              --header-img-hpad: 8px;\n              --header-img-pad: 20px;\n              --character-name-hpad: 0px;\n              --character-name-font-size: 1.5rem;\n            }\n          }\n      "]);
      return t = function () {
        return e;
      }, e;
    }

    function r() {
      var e = n(['\n      <div class="page">\n        <section-title\n            title=', "\n            subtitle=", "\n            icon=", "\n          ></section-title>\n          <character-quick-stats></character-quick-stats>\n      </div>\n    "]);
      return r = function () {
        return e;
      }, e;
    }

    function n(e, t) {
      return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(t)
        }
      }));
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function a(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function c(e, t, r) {
      return t && a(e.prototype, t), r && a(e, r), e;
    }

    function i(e, t) {
      return !t || "object" !== s(t) && "function" != typeof t ? p(e) : t;
    }

    function p(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function u(e) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function f(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && l(e, t);
    }

    function l(e, t) {
      return (l = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    var h = function (e, t, r, n) {
      var o,
          a = arguments.length,
          c = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, n);else for (var i = e.length - 1; i >= 0; i--) (o = e[i]) && (c = (a < 3 ? o(c) : a > 3 ? o(t, r, c) : o(t, r)) || c);
      return a > 3 && c && Object.defineProperty(t, r, c), c;
    },
        d = function (n) {
      function a() {
        var e;
        return o(this, a), (e = i(this, u(a).apply(this, arguments))).theme = "peach", e.data = {
          class: "fighter",
          name: "Blathenor Stegfire",
          race: "Wood Elf",
          level: 7
        }, e;
      }

      return f(a, e.LitElement), c(a, [{
        key: "getDescriptor",
        value: function () {
          var e = this.data;
          return "Level ".concat(e.level, " ").concat(e.race, " ").concat(e.class);
        }
      }, {
        key: "getIcon",
        value: function () {
          return "icons/".concat(this.data.class, ".svg");
        }
      }, {
        key: "render",
        value: function () {
          return (0, e.html)(r(), this.data.name, this.getDescriptor(), this.getIcon());
        }
      }], [{
        key: "styles",
        get: function () {
          return (0, e.css)(t());
        }
      }]), a;
    }();

    exports.CharacterSheet = d, h([(0, e.property)({
      type: String
    })], d.prototype, "theme", void 0), h([(0, e.property)({
      type: Object
    })], d.prototype, "data", void 0), h([(0, e.query)(".header .img-wrapper")], d.prototype, "imgWrapper", void 0), h([(0, e.query)("#character-img")], d.prototype, "characterImg", void 0), h([(0, e.query)(".character-name")], d.prototype, "characterName", void 0), exports.CharacterSheet = d = h([(0, e.customElement)("character-sheet")], d);
  }, {
    "../ui/section-title/section-title": "V8e9",
    "lit-element": "xPSq"
  }],
  "NHFQ": [function (require, module, exports) {
    "use strict";

    function e(e, n) {
      if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function n(e, n) {
      for (var t = 0; t < n.length; t++) {
        var r = n[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function t(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.Database = void 0;

    var r = function () {
      function n() {
        e(this, n);
      }

      return t(n, [{
        key: "search",
        value: function (e, n) {
          return [];
        }
      }, {
        key: "dump",
        value: function () {
          return [];
        }
      }]), n;
    }();

    exports.Database = r;
  }, {}],
  "D6fT": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.DmHandbook = void 0;

    var n = require("lit-element"),
        e = require("../database");

    function t() {
      var n = m(["\n      :host {\n        --page-vpad: 16px;\n        --page-hpad: 48px;\n      }\n      .page {\n        width: calc(100% - 2 * var(--page-hpad));\n        padding: var(--page-vpad) var(--page-hpad);\n        height: calc(100vh - var(--page-hpad));\n        background: #fafafa;\n        display: flex;\n        justify-content: flex-start;\n        align-items: center;\n        flex-direction: column;\n      }\n      h1 {\n        width: 100%;\n        margin: 0;\n        text-align: center;\n        color: #444;\n        font-weight: 100;\n        font-family: 'Montserrat', sans-serif;\n      }\n      p {\n        width: 100%;\n        margin: 0;\n        margin-top: 1rem;\n        text-align: center;\n        color: #777;\n        font-weight: 100;\n        font-family: 'Montserrat', sans-serif;\n      }\n      .search {\n        margin-top: 2rem;\n        width: calc(700px - 1.5rem);\n        padding: 0 1rem 0 0.5rem;\n        height: 2rem;\n        background: #ebebeb;\n        border-radius: 1rem;\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n      }\n      .search img {\n        opacity: 0.5;\n      }\n      .search input {\n        flex-grow: 1;\n        padding: 0 0.5rem;\n        font-size: 1.3rem;\n        background: none;\n        border: none;\n        color: #555;\n      }\n      .search input:focus {\n        outline: none;\n      }\n      .results {\n        margin-top: 4rem;\n        width: 1000px;\n        display: flex;\n        justify-content: center;\n      }\n      .no-results{\n        width: 60%;\n        text-align: center;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: #bbb;\n        font-family: 'Montserrat', sans-serif;\n      }\n      .help > p {\n        font-size: .8rem;\n        color: #BBB;\n      }\n      .help > p > span {\n        color: var(--theme-primary);\n      }\n    "]);
      return t = function () {
        return n;
      }, n;
    }

    function r() {
      var n = m(["\n      <div class='page'>\n        <section-title\n          title='Dungeon Master Handbook'\n          subtitle='A quick way to search up rules,\n        spells and equipment'\n          icon='icons/book.svg'\n        ></section-title>\n        <div class='search'>\n          <img src='icons/search.svg' />\n          <input />\n        </div>\n        <div class='help'>\n          ", "\n        </div>\n        <div class='results'>\n          \n        </div>\n      </div>\n    "]);
      return r = function () {
        return n;
      }, n;
    }

    function o() {
      var n = m([""]);
      return o = function () {
        return n;
      }, n;
    }

    function a() {
      var n = m(["\n      <p>\n        Searching for '", "' over <span>", "<span>\n      </p>\n    "]);
      return a = function () {
        return n;
      }, n;
    }

    function i(n, e) {
      if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function c(n, e) {
      for (var t = 0; t < e.length; t++) {
        var r = e[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
      }
    }

    function l(n, e, t) {
      return e && c(n.prototype, e), t && c(n, t), n;
    }

    function s(n, e) {
      return !e || "object" !== b(e) && "function" != typeof e ? u(n) : e;
    }

    function u(n) {
      if (void 0 === n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return n;
    }

    function p(n, e, t) {
      return (p = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (n, e, t) {
        var r = f(n, e);

        if (r) {
          var o = Object.getOwnPropertyDescriptor(r, e);
          return o.get ? o.get.call(t) : o.value;
        }
      })(n, e, t || n);
    }

    function f(n, e) {
      for (; !Object.prototype.hasOwnProperty.call(n, e) && null !== (n = h(n)););

      return n;
    }

    function h(n) {
      return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function (n) {
        return n.__proto__ || Object.getPrototypeOf(n);
      })(n);
    }

    function d(n, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      n.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: n,
          writable: !0,
          configurable: !0
        }
      }), e && g(n, e);
    }

    function g(n, e) {
      return (g = Object.setPrototypeOf || function (n, e) {
        return n.__proto__ = e, n;
      })(n, e);
    }

    function y() {
      var n = m(["\n  <p>\n    Search for anything! You can use hashtags like\n    <span> #spell #item #effect </span>\n    to help narrow the results.\n  </p>\n"]);
      return y = function () {
        return n;
      }, n;
    }

    function m(n, e) {
      return e || (e = n.slice(0)), Object.freeze(Object.defineProperties(n, {
        raw: {
          value: Object.freeze(e)
        }
      }));
    }

    function b(n) {
      return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
        return typeof n;
      } : function (n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
      })(n);
    }

    var v = function (n, e, t, r) {
      var o,
          a = arguments.length,
          i = a < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, t) : r;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : b(Reflect)) && "function" == typeof Reflect.decorate) i = Reflect.decorate(n, e, t, r);else for (var c = n.length - 1; c >= 0; c--) (o = n[c]) && (i = (a < 3 ? o(i) : a > 3 ? o(e, t, i) : o(e, t)) || i);
      return a > 3 && i && Object.defineProperty(e, t, i), i;
    },
        w = (0, n.html)(y()),
        x = function (c) {
      function u() {
        var n;
        return i(this, u), (n = s(this, h(u).apply(this, arguments))).searchHelp = w, n.database = new e.Database(), n.tags = new Map([["spells", {
          pattern: /(#spells?)|(#magic)/g
        }], ["equipment", {
          pattern: /(#equip(ment)?)|(#items?)/g
        }], ["combat", {
          pattern: /(#combat)|(#fight(ing)?)/g
        }], ["magic", {
          pattern: /(#magic)|(#fight(ing)?)/g
        }], ["features", {
          pattern: /(#feature?)|(#abilitys?)|(#skills?)/g
        }], ["movement", {
          pattern: /#mov(e|(ing)|(ement))/g
        }], ["resting", {
          pattern: /#rest(ing)?/g
        }], ["enviornment", {
          pattern: /#(world)|(enviorn(ment)?)/g
        }], ["death", {
          pattern: /#death/g
        }], ["effects", {
          pattern: /#(effects?)|(condition)/g
        }]]), n;
      }

      return d(u, n.LitElement), l(u, [{
        key: "connectedCallback",
        value: function () {
          var n = this;
          p(h(u.prototype), "connectedCallback", this).call(this), this.searchInput.addEventListener("input", function () {
            n.updateSearch(n.searchInput.value);
          });
        }
      }, {
        key: "updateSearch",
        value: function (e) {
          if ("" !== e) {
            var t = [],
                r = !0,
                o = !1,
                i = void 0;

            try {
              for (var c, l = this.tags[Symbol.iterator](); !(r = (c = l.next()).done); r = !0) {
                var s = c.value;
                s[1].pattern.exec(e) && (e = e.replace(s[1].pattern, ""), t.push(s[0]));
              }
            } catch (h) {
              o = !0, i = h;
            } finally {
              try {
                r || null == l.return || l.return();
              } finally {
                if (o) throw i;
              }
            }

            var u = "all topics";
            if (1 === t.length) u = "the ".concat(t[0], " topic");else if (t.length > 1) {
              var p = t.pop(),
                  f = t.join(", ");
              u = "the ".concat(f, " and ").concat(p, " topics");
            }
            return (0, n.html)(a(), e, u);
          }

          this.searchHelp = w;
        }
      }, {
        key: "renderTable",
        value: function (e) {
          return (0, n.html)(o());
        }
      }, {
        key: "render",
        value: function () {
          return (0, n.html)(r(), this.searchHelp);
        }
      }], [{
        key: "styles",
        get: function () {
          return (0, n.css)(t());
        }
      }]), u;
    }();

    exports.DmHandbook = x, v([(0, n.query)("input")], x.prototype, "searchInput", void 0), v([(0, n.property)()], x.prototype, "searchHelp", void 0), exports.DmHandbook = x = v([(0, n.customElement)("dm-handbook")], x);
  }, {
    "lit-element": "xPSq",
    "../database": "NHFQ"
  }],
  "EiNR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.AppLink = void 0;

    var e = require("lit-element");

    function t() {
      var e = r(["\n      :host {\n        cursor: pointer;\n      }\n    "]);
      return t = function () {
        return e;
      }, e;
    }

    function n() {
      var e = r(["\n      <a @click=", ">\n        <slot></slot>\n      </a>\n    "]);
      return n = function () {
        return e;
      }, e;
    }

    function r(e, t) {
      return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(t)
        }
      }));
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function u(e, t, n) {
      return t && i(e.prototype, t), n && i(e, n), e;
    }

    function c(e, t) {
      return !t || "object" !== s(t) && "function" != typeof t ? f(e) : t;
    }

    function f(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function p(e) {
      return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && l(e, t);
    }

    function l(e, t) {
      return (l = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    var y = function (e, t, n, r) {
      var o,
          i = arguments.length,
          u = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(e, t, n, r);else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (u = (i < 3 ? o(u) : i > 3 ? o(t, n, u) : o(t, n)) || u);
      return i > 3 && u && Object.defineProperty(t, n, u), u;
    },
        b = function (r) {
      function i() {
        var e;
        return o(this, i), (e = c(this, p(i).apply(this, arguments))).target = "/", e;
      }

      return a(i, e.LitElement), u(i, [{
        key: "navigate",
        value: function () {
          var e = new CustomEvent("navigate", {
            bubbles: !0,
            composed: !0,
            detail: {
              target: this.target
            }
          });
          this.dispatchEvent(e);
        }
      }, {
        key: "render",
        value: function () {
          return (0, e.html)(n(), this.navigate);
        }
      }], [{
        key: "styles",
        get: function () {
          return (0, e.css)(t());
        }
      }]), i;
    }();

    exports.AppLink = b, y([(0, e.property)({
      type: String
    })], b.prototype, "target", void 0), exports.AppLink = b = y([(0, e.customElement)("app-link")], b);
  }, {
    "lit-element": "xPSq"
  }],
  "b86T": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.ErrorPage = void 0, require("../ui/app-link/app-link");

    var e = require("lit-element");

    function n() {
      var e = r(["\n        .cover {\n          width: 100%;\n          height: calc(100vh - var(--navbar-height));\n          background: #FAFAFA;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          flex-direction: column;\n        }\n        p {\n          font-family: 'Montserrat', sans-serif;\n          font-size: 3rem;\n          color: var(--theme-primary);\n          padding: 0;\n          margin: 2rem;\n          text-align: center;\n        }\n        button {\n          padding: .5rem 1rem;\n          background: white;\n          border-radius: 5px;\n          color: var(--theme-primary);\n          font-family: 'Montserrat', sans-serif;\n          font-size: 1rem;\n          border: 2px solid var(--theme-primary);\n          cursor: pointer;\n        }\n        button:hover {\n          color: white;\n          background: var(--theme-primary);\n        }\n        button:focus {\n          outline: none;\n        }\n      "]);
      return n = function () {
        return e;
      }, e;
    }

    function t() {
      var e = r(['\n      <div class="cover">\n        <p> ', " </p>\n        <app-link target='/'>\n          <button>Go Home</button>\n        </app-link>\n      </div>\n    "]);
      return t = function () {
        return e;
      }, e;
    }

    function r(e, n) {
      return n || (n = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(n)
        }
      }));
    }

    function o(e, n) {
      if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, n) {
      for (var t = 0; t < n.length; t++) {
        var r = n[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function u(e, n, t) {
      return n && i(e.prototype, n), t && i(e, t), e;
    }

    function c(e, n) {
      return !n || "object" !== s(n) && "function" != typeof n ? a(e) : n;
    }

    function a(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function f(e) {
      return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function p(e, n) {
      if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(n && n.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), n && l(e, n);
    }

    function l(e, n) {
      return (l = Object.setPrototypeOf || function (e, n) {
        return e.__proto__ = n, e;
      })(e, n);
    }

    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    var y = function (e, n, t, r) {
      var o,
          i = arguments.length,
          u = i < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, t) : r;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(e, n, t, r);else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (u = (i < 3 ? o(u) : i > 3 ? o(n, t, u) : o(n, t)) || u);
      return i > 3 && u && Object.defineProperty(n, t, u), u;
    },
        b = function (r) {
      function i() {
        var e;
        return o(this, i), (e = c(this, f(i).apply(this, arguments))).message = "Uh oh! Something went wrong", e;
      }

      return p(i, e.LitElement), u(i, [{
        key: "render",
        value: function () {
          return (0, e.html)(t(), this.message);
        }
      }], [{
        key: "styles",
        get: function () {
          return (0, e.css)(n());
        }
      }]), i;
    }();

    exports.ErrorPage = b, y([(0, e.property)({
      type: String
    })], b.prototype, "message", void 0), exports.ErrorPage = b = y([(0, e.customElement)("error-page")], b);
  }, {
    "../ui/app-link/app-link": "EiNR",
    "lit-element": "xPSq"
  }],
  "qzea": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.UserProfile = void 0;

    var e = require("lit-element");

    function t() {
      var e = n(["\n\n      "]);
      return t = function () {
        return e;
      }, e;
    }

    function r() {
      var e = n(["\n      <p> hello sir i am a user profile page :3 </p>\n    "]);
      return r = function () {
        return e;
      }, e;
    }

    function n(e, t) {
      return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(t)
        }
      }));
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function u(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    function i(e, t, r) {
      return t && u(e.prototype, t), r && u(e, r), e;
    }

    function f(e, t) {
      return !t || "object" !== a(t) && "function" != typeof t ? c(e) : t;
    }

    function c(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function l(e) {
      return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function p(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && s(e, t);
    }

    function s(e, t) {
      return (s = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function a(e) {
      return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    var y = function (e, t, r, n) {
      var o,
          u = arguments.length,
          i = u < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : a(Reflect)) && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);else for (var f = e.length - 1; f >= 0; f--) (o = e[f]) && (i = (u < 3 ? o(i) : u > 3 ? o(t, r, i) : o(t, r)) || i);
      return u > 3 && i && Object.defineProperty(t, r, i), i;
    },
        b = function (n) {
      function u() {
        return o(this, u), f(this, l(u).apply(this, arguments));
      }

      return p(u, e.LitElement), i(u, [{
        key: "render",
        value: function () {
          return (0, e.html)(r());
        }
      }], [{
        key: "styles",
        get: function () {
          return (0, e.css)(t());
        }
      }]), u;
    }();

    exports.UserProfile = b, exports.UserProfile = b = y([(0, e.customElement)("user-profile")], b);
  }, {
    "lit-element": "xPSq"
  }],
  "cvtC": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.AppNav = void 0;

    var e = require("lit-element");

    function n() {
      var e = r(["\n          :host {\n            width: calc(100% - 30px);\n            padding: 0 15px;\n            height: var(--navbar-height);\n            border-bottom: 2px solid #EBEBEB;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            background: white;\n          }\n          .left {\n            height: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: flex-start;\n          }\n          .right {\n            height: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: flex-end;\n          }\n          .profile {\n            width: 30px;\n            height: 30px;\n            background: var(--theme-primary);\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n          }\n          .profile img {\n            height: 20px;\n            filter: invert();\n            opacity: .65;\n            margin-bottom: 2px;\n          }\n          app-link {\n            font-family: 'Montserrat', sans-serif;\n            font-weight: bold;\n            color: var(--theme-primary);\n            margin: 0 .5rem;\n          }\n      "]);
      return n = function () {
        return e;
      }, e;
    }

    function t() {
      var e = r(['\n      <div class="left">\n        <app-link target=\'/\'>Home</app-link>\n        <app-link target=\'/handbook\'>Handbook</app-link>\n      </div>\n      <div class="right">\n        <app-link target=\'/profile\'>\n          <div class="profile">\n            <img src="icons/account.svg"/>\n          </div>\n        </app-link>\n      </div>\n    ']);
      return t = function () {
        return e;
      }, e;
    }

    function r(e, n) {
      return n || (n = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(n)
        }
      }));
    }

    function o(e, n) {
      if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, n) {
      for (var t = 0; t < n.length; t++) {
        var r = n[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function c(e, n, t) {
      return n && i(e.prototype, n), t && i(e, t), e;
    }

    function a(e, n) {
      return !n || "object" !== s(n) && "function" != typeof n ? f(e) : n;
    }

    function f(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function l(e) {
      return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function p(e, n) {
      if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(n && n.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), n && u(e, n);
    }

    function u(e, n) {
      return (u = Object.setPrototypeOf || function (e, n) {
        return e.__proto__ = n, e;
      })(e, n);
    }

    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    var y = function (e, n, t, r) {
      var o,
          i = arguments.length,
          c = i < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, t) : r;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, t, r);else for (var a = e.length - 1; a >= 0; a--) (o = e[a]) && (c = (i < 3 ? o(c) : i > 3 ? o(n, t, c) : o(n, t)) || c);
      return i > 3 && c && Object.defineProperty(n, t, c), c;
    },
        b = function (r) {
      function i() {
        return o(this, i), a(this, l(i).apply(this, arguments));
      }

      return p(i, e.LitElement), c(i, [{
        key: "render",
        value: function () {
          return (0, e.html)(t());
        }
      }], [{
        key: "styles",
        get: function () {
          return (0, e.css)(n());
        }
      }]), i;
    }();

    exports.AppNav = b, exports.AppNav = b = y([(0, e.customElement)("app-nav")], b);
  }, {
    "lit-element": "xPSq"
  }],
  "LhRC": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.cache = void 0;

    var e = require("../lib/template-instance.js"),
        t = require("../lit-html.js");

    const n = new WeakMap(),
          a = (0, t.directive)(a => o => {
      if (!(o instanceof t.NodePart)) throw new Error("cache can only be used in text bindings");
      let s = n.get(o);
      void 0 === s && (s = new WeakMap(), n.set(o, s));
      const i = o.value;

      if (i instanceof e.TemplateInstance) {
        if (a instanceof t.TemplateResult && i.template === o.options.templateFactory(a)) return void o.setValue(a);
        {
          let e = s.get(i.template);
          void 0 === e && (e = {
            instance: i,
            nodes: document.createDocumentFragment()
          }, s.set(i.template, e)), (0, t.reparentNodes)(e.nodes, o.startNode.nextSibling, o.endNode);
        }
      }

      if (a instanceof t.TemplateResult) {
        const e = o.options.templateFactory(a),
              t = s.get(e);
        void 0 !== t && (o.setValue(t.nodes), o.commit(), o.value = t.instance);
      }

      o.setValue(a);
    });
    exports.cache = a;
  }, {
    "../lib/template-instance.js": "nn5n",
    "../lit-html.js": "KMqM"
  }],
  "bBOM": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.UNKNOWN_ROUTE_MSG = void 0;
    var e = "Sorry! There isn't anything at this URL";
    exports.UNKNOWN_ROUTE_MSG = e;
  }, {}],
  "XcwD": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.AppView = void 0, require("./character-sheet/character-sheet"), require("./dm-handbook/dm-handbook"), require("./error-page/error-page"), require("./user-profile/user-profile"), require("./ui/app-nav/app-nav");

    var e = require("lit-element"),
        t = require("lit-html/directives/cache"),
        n = require("./ui/messages");

    function r() {
      var e = f(["\n      :host {\n        --peach-theme-gradient: linear-gradient(110deg, #f2709c, #ff9472);\n        --peach-theme-primary: #f2709c;\n        --fresh-theme-gradient: linear-gradient(110deg, #67b26f, #4ca2cd);\n        --fresh-theme-primary: #67b26f;\n        --navbar-height: 50px;\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n      }\n    "]);
      return r = function () {
        return e;
      }, e;
    }

    function o() {
      var e = f(["<user-profile></user-profile>"]);
      return o = function () {
        return e;
      }, e;
    }

    function i() {
      var e = f(["<dm-handbook></dm-handbook>"]);
      return i = function () {
        return e;
      }, e;
    }

    function u() {
      var e = f(["<character-sheet></character-sheet>"]);
      return u = function () {
        return e;
      }, e;
    }

    function a() {
      var e = f(["<error-page message=", "></error-page>"]);
      return a = function () {
        return e;
      }, e;
    }

    function c() {
      var e = f(["\n      <style>\n        :host {\n          --theme-gradient: var(--", "-theme-gradient);\n          --theme-primary: var(--", "-theme-primary);\n        }\n      </style>\n      <app-nav></app-nav>\n      ", "\n    "]);
      return c = function () {
        return e;
      }, e;
    }

    function f(e, t) {
      return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(t)
        }
      }));
    }

    function l(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function p(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function h(e, t, n) {
      return t && p(e.prototype, t), n && p(e, n), e;
    }

    function s(e, t) {
      return !t || "object" !== w(t) && "function" != typeof t ? y(e) : t;
    }

    function y(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function d(e, t, n) {
      return (d = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, n) {
        var r = v(e, t);

        if (r) {
          var o = Object.getOwnPropertyDescriptor(r, t);
          return o.get ? o.get.call(n) : o.value;
        }
      })(e, t, n || e);
    }

    function v(e, t) {
      for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = m(e)););

      return e;
    }

    function m(e) {
      return (m = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function b(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && g(e, t);
    }

    function g(e, t) {
      return (g = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function w(e) {
      return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    var O,
        R = function (e, t, n, r) {
      var o,
          i = arguments.length,
          u = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : w(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(e, t, n, r);else for (var a = e.length - 1; a >= 0; a--) (o = e[a]) && (u = (i < 3 ? o(u) : i > 3 ? o(t, n, u) : o(t, n)) || u);
      return i > 3 && u && Object.defineProperty(t, n, u), u;
    },
        j = O = function (f) {
      function p() {
        var e;
        return l(this, p), (e = s(this, m(p).apply(this, arguments))).theme = "peach", e;
      }

      return b(p, e.LitElement), h(p, [{
        key: "connectedCallback",
        value: function () {
          var e = this;
          d(m(p.prototype), "connectedCallback", this).call(this), this.addEventListener("navigate", function (t) {
            document.location.pathname = t.detail.target, e.changeRoute(t.detail.target);
          }), this.changeRoute(document.location.pathname);
        }
      }, {
        key: "changeRoute",
        value: function (e) {
          var t = !0,
              n = !1,
              r = void 0;

          try {
            for (var o, i = O.routes[Symbol.iterator](); !(t = (o = i.next()).done); t = !0) {
              var u = o.value;
              if (u.pattern.exec(e)) return void (this.shownView = u.view);
            }
          } catch (a) {
            n = !0, r = a;
          } finally {
            try {
              t || null == i.return || i.return();
            } finally {
              if (n) throw r;
            }
          }

          this.shownView = O.unknownRouteView;
        }
      }, {
        key: "render",
        value: function () {
          return (0, e.html)(c(), this.theme, this.theme, (0, t.cache)(this.shownView()));
        }
      }], [{
        key: "unknownRouteView",
        value: function () {
          return (0, e.html)(a(), n.UNKNOWN_ROUTE_MSG);
        }
      }, {
        key: "routes",
        get: function () {
          return [{
            pattern: new RegExp("^/$"),
            view: function () {
              return (0, e.html)(u());
            }
          }, {
            pattern: new RegExp("^/handbook$"),
            view: function () {
              return (0, e.html)(i());
            }
          }, {
            pattern: new RegExp("^/profile$"),
            view: function () {
              return (0, e.html)(o());
            }
          }];
        }
      }, {
        key: "styles",
        get: function () {
          return (0, e.css)(r());
        }
      }]), p;
    }();

    exports.AppView = j, exports.AppView = j = O = R([(0, e.customElement)("app-view")], j);
  }, {
    "./character-sheet/character-sheet": "hldf",
    "./dm-handbook/dm-handbook": "D6fT",
    "./error-page/error-page": "b86T",
    "./user-profile/user-profile": "qzea",
    "./ui/app-nav/app-nav": "cvtC",
    "lit-element": "xPSq",
    "lit-html/directives/cache": "LhRC",
    "./ui/messages": "bBOM"
  }],
  "B6dB": [function (require, module, exports) {
    "use strict";

    require("./app-view.ts");
  }, {
    "./app-view.ts": "XcwD"
  }]
}, {}, ["B6dB"], null);
},{}],"../../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52520" + '/');

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
},{}]},{},["../../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src.6d916b24.js"], null)
//# sourceMappingURL=/src.6d916b24.2016b1c9.js.map