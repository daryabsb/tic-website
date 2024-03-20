import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : globalThis || {};
var TweenLite = function(window2) {
  var _doc = window2.document, _globals2 = window2.GreenSockGlobals = window2.GreenSockGlobals || window2;
  if (_globals2.TweenLite) {
    return _globals2.TweenLite;
  }
  var _namespace = function(ns) {
    var a2 = ns.split("."), p3 = _globals2, i2;
    for (i2 = 0; i2 < a2.length; i2++) {
      p3[a2[i2]] = p3 = p3[a2[i2]] || {};
    }
    return p3;
  }, gs = _namespace("com.greensock"), _tinyNum = 1e-8, _slice = function(a2) {
    var b = [], l = a2.length, i2;
    for (i2 = 0; i2 !== l; b.push(a2[i2++])) {
    }
    return b;
  }, _emptyFunc = function() {
  }, _isArray = function() {
    var toString = Object.prototype.toString, array = toString.call([]);
    return function(obj) {
      return obj != null && (obj instanceof Array || typeof obj === "object" && !!obj.push && toString.call(obj) === array);
    };
  }(), a, i, p2, _ticker, _tickerActive, _defLookup = {}, Definition = function(ns, dependencies, func, global2) {
    this.sc = _defLookup[ns] ? _defLookup[ns].sc : [];
    _defLookup[ns] = this;
    this.gsClass = null;
    this.func = func;
    var _classes = [];
    this.check = function(init) {
      var i2 = dependencies.length, missing = i2, cur, a2, n, cl;
      while (--i2 > -1) {
        if ((cur = _defLookup[dependencies[i2]] || new Definition(dependencies[i2], [])).gsClass) {
          _classes[i2] = cur.gsClass;
          missing--;
        } else if (init) {
          cur.sc.push(this);
        }
      }
      if (missing === 0 && func) {
        a2 = ("com.greensock." + ns).split(".");
        n = a2.pop();
        cl = _namespace(a2.join("."))[n] = this.gsClass = func.apply(func, _classes);
        if (global2) {
          _globals2[n] = cl;
        }
        for (i2 = 0; i2 < this.sc.length; i2++) {
          this.sc[i2].check();
        }
      }
    };
    this.check(true);
  }, _gsDefine = window2._gsDefine = function(ns, dependencies, func, global2) {
    return new Definition(ns, dependencies, func, global2);
  }, _class = gs._class = function(ns, func, global2) {
    func = func || function() {
    };
    _gsDefine(ns, [], function() {
      return func;
    }, global2);
    return func;
  };
  _gsDefine.globals = _globals2;
  var _baseParams = [0, 0, 1, 1], Ease2 = _class("easing.Ease", function(func, extraParams, type, power) {
    this._func = func;
    this._type = type || 0;
    this._power = power || 0;
    this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
  }, true), _easeMap = Ease2.map = {}, _easeReg = Ease2.register = function(ease, names, types, create) {
    var na = names.split(","), i2 = na.length, ta = (types || "easeIn,easeOut,easeInOut").split(","), e, name, j, type;
    while (--i2 > -1) {
      name = na[i2];
      e = create ? _class("easing." + name, null, true) : gs.easing[name] || {};
      j = ta.length;
      while (--j > -1) {
        type = ta[j];
        _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
      }
    }
  };
  p2 = Ease2.prototype;
  p2._calcEnd = false;
  p2.getRatio = function(p3) {
    if (this._func) {
      this._params[0] = p3;
      return this._func.apply(null, this._params);
    }
    var t = this._type, pw = this._power, r = t === 1 ? 1 - p3 : t === 2 ? p3 : p3 < 0.5 ? p3 * 2 : (1 - p3) * 2;
    if (pw === 1) {
      r *= r;
    } else if (pw === 2) {
      r *= r * r;
    } else if (pw === 3) {
      r *= r * r * r;
    } else if (pw === 4) {
      r *= r * r * r * r;
    }
    return t === 1 ? 1 - r : t === 2 ? r : p3 < 0.5 ? r / 2 : 1 - r / 2;
  };
  a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
  i = a.length;
  while (--i > -1) {
    p2 = a[i] + ",Power" + i;
    _easeReg(new Ease2(null, null, 1, i), p2, "easeOut", true);
    _easeReg(new Ease2(null, null, 2, i), p2, "easeIn" + (i === 0 ? ",easeNone" : ""));
    _easeReg(new Ease2(null, null, 3, i), p2, "easeInOut");
  }
  _easeMap.linear = gs.easing.Linear.easeIn;
  _easeMap.swing = gs.easing.Quad.easeInOut;
  var EventDispatcher = _class("events.EventDispatcher", function(target) {
    this._listeners = {};
    this._eventTarget = target || this;
  });
  p2 = EventDispatcher.prototype;
  p2.addEventListener = function(type, callback, scope, useParam, priority) {
    priority = priority || 0;
    var list = this._listeners[type], index2 = 0, listener, i2;
    if (this === _ticker && !_tickerActive) {
      _ticker.wake();
    }
    if (list == null) {
      this._listeners[type] = list = [];
    }
    i2 = list.length;
    while (--i2 > -1) {
      listener = list[i2];
      if (listener.c === callback && listener.s === scope) {
        list.splice(i2, 1);
      } else if (index2 === 0 && listener.pr < priority) {
        index2 = i2 + 1;
      }
    }
    list.splice(index2, 0, { c: callback, s: scope, up: useParam, pr: priority });
  };
  p2.removeEventListener = function(type, callback) {
    var list = this._listeners[type], i2;
    if (list) {
      i2 = list.length;
      while (--i2 > -1) {
        if (list[i2].c === callback) {
          list.splice(i2, 1);
          return;
        }
      }
    }
  };
  p2.dispatchEvent = function(type) {
    var list = this._listeners[type], i2, t, listener;
    if (list) {
      i2 = list.length;
      if (i2 > 1) {
        list = list.slice(0);
      }
      t = this._eventTarget;
      while (--i2 > -1) {
        listener = list[i2];
        if (listener) {
          if (listener.up) {
            listener.c.call(listener.s || t, { type, target: t });
          } else {
            listener.c.call(listener.s || t);
          }
        }
      }
    }
  };
  var _reqAnimFrame = window2.requestAnimationFrame, _cancelAnimFrame = window2.cancelAnimationFrame, _getTime = Date.now || function() {
    return new Date().getTime();
  }, _lastUpdate = _getTime();
  a = ["ms", "moz", "webkit", "o"];
  i = a.length;
  while (--i > -1 && !_reqAnimFrame) {
    _reqAnimFrame = window2[a[i] + "RequestAnimationFrame"];
    _cancelAnimFrame = window2[a[i] + "CancelAnimationFrame"] || window2[a[i] + "CancelRequestAnimationFrame"];
  }
  _class("Ticker", function(fps, useRAF) {
    var _self = this, _startTime = _getTime(), _useRAF = useRAF !== false && _reqAnimFrame ? "auto" : false, _lagThreshold = 500, _adjustedLag = 33, _tickWord = "tick", _fps, _req, _id, _gap, _nextTime, _tick = function(manual) {
      var elapsed = _getTime() - _lastUpdate, overlap, dispatch;
      if (elapsed > _lagThreshold) {
        _startTime += elapsed - _adjustedLag;
      }
      _lastUpdate += elapsed;
      _self.time = (_lastUpdate - _startTime) / 1e3;
      overlap = _self.time - _nextTime;
      if (!_fps || overlap > 0 || manual === true) {
        _self.frame++;
        _nextTime += overlap + (overlap >= _gap ? 4e-3 : _gap - overlap);
        dispatch = true;
      }
      if (manual !== true) {
        _id = _req(_tick);
      }
      if (dispatch) {
        _self.dispatchEvent(_tickWord);
      }
    };
    EventDispatcher.call(_self);
    _self.time = _self.frame = 0;
    _self.tick = function() {
      _tick(true);
    };
    _self.lagSmoothing = function(threshold, adjustedLag) {
      if (!arguments.length) {
        return _lagThreshold < 1 / _tinyNum;
      }
      _lagThreshold = threshold || 1 / _tinyNum;
      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    };
    _self.sleep = function() {
      if (_id == null) {
        return;
      }
      if (!_useRAF || !_cancelAnimFrame) {
        clearTimeout(_id);
      } else {
        _cancelAnimFrame(_id);
      }
      _req = _emptyFunc;
      _id = null;
      if (_self === _ticker) {
        _tickerActive = false;
      }
    };
    _self.wake = function(seamless) {
      if (_id !== null) {
        _self.sleep();
      } else if (seamless) {
        _startTime += -_lastUpdate + (_lastUpdate = _getTime());
      } else if (_self.frame > 10) {
        _lastUpdate = _getTime() - _lagThreshold + 5;
      }
      _req = _fps === 0 ? _emptyFunc : !_useRAF || !_reqAnimFrame ? function(f) {
        return setTimeout(f, (_nextTime - _self.time) * 1e3 + 1 | 0);
      } : _reqAnimFrame;
      if (_self === _ticker) {
        _tickerActive = true;
      }
      _tick(2);
    };
    _self.fps = function(value) {
      if (!arguments.length) {
        return _fps;
      }
      _fps = value;
      _gap = 1 / (_fps || 60);
      _nextTime = this.time + _gap;
      _self.wake();
    };
    _self.useRAF = function(value) {
      if (!arguments.length) {
        return _useRAF;
      }
      _self.sleep();
      _useRAF = value;
      _self.fps(_fps);
    };
    _self.fps(fps);
    setTimeout(function() {
      if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
        _self.useRAF(false);
      }
    }, 1500);
  });
  p2 = gs.Ticker.prototype = new gs.events.EventDispatcher();
  p2.constructor = gs.Ticker;
  var Animation2 = _class("core.Animation", function(duration, vars) {
    this.vars = vars = vars || {};
    this._duration = this._totalDuration = duration || 0;
    this._delay = Number(vars.delay) || 0;
    this._timeScale = 1;
    this._active = !!vars.immediateRender;
    this.data = vars.data;
    this._reversed = !!vars.reversed;
    if (!_rootTimeline) {
      return;
    }
    if (!_tickerActive) {
      _ticker.wake();
    }
    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
    tl.add(this, tl._time);
    if (this.vars.paused) {
      this.paused(true);
    }
  });
  _ticker = Animation2.ticker = new gs.Ticker();
  p2 = Animation2.prototype;
  p2._dirty = p2._gc = p2._initted = p2._paused = false;
  p2._totalTime = p2._time = 0;
  p2._rawPrevTime = -1;
  p2._next = p2._last = p2._onUpdate = p2._timeline = p2.timeline = null;
  p2._paused = false;
  var _checkTimeout = function() {
    if (_tickerActive && _getTime() - _lastUpdate > 2e3 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) {
      _ticker.wake();
    }
    var t = setTimeout(_checkTimeout, 2e3);
    if (t.unref) {
      t.unref();
    }
  };
  _checkTimeout();
  p2.play = function(from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }
    return this.reversed(false).paused(false);
  };
  p2.pause = function(atTime, suppressEvents) {
    if (atTime != null) {
      this.seek(atTime, suppressEvents);
    }
    return this.paused(true);
  };
  p2.resume = function(from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }
    return this.paused(false);
  };
  p2.seek = function(time, suppressEvents) {
    return this.totalTime(Number(time), suppressEvents !== false);
  };
  p2.restart = function(includeDelay, suppressEvents) {
    return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, suppressEvents !== false, true);
  };
  p2.reverse = function(from, suppressEvents) {
    if (from != null) {
      this.seek(from || this.totalDuration(), suppressEvents);
    }
    return this.reversed(true).paused(false);
  };
  p2.render = function(time, suppressEvents, force) {
  };
  p2.invalidate = function() {
    this._time = this._totalTime = 0;
    this._initted = this._gc = false;
    this._rawPrevTime = -1;
    if (this._gc || !this.timeline) {
      this._enabled(true);
    }
    return this;
  };
  p2.isActive = function() {
    var tl = this._timeline, startTime = this._startTime, rawTime;
    return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - _tinyNum;
  };
  p2._enabled = function(enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }
    this._gc = !enabled;
    this._active = this.isActive();
    if (ignoreTimeline !== true) {
      if (enabled && !this.timeline) {
        this._timeline.add(this, this._startTime - this._delay);
      } else if (!enabled && this.timeline) {
        this._timeline._remove(this, true);
      }
    }
    return false;
  };
  p2._kill = function(vars, target) {
    return this._enabled(false, false);
  };
  p2.kill = function(vars, target) {
    this._kill(vars, target);
    return this;
  };
  p2._uncache = function(includeSelf) {
    var tween = includeSelf ? this : this.timeline;
    while (tween) {
      tween._dirty = true;
      tween = tween.timeline;
    }
    return this;
  };
  p2._swapSelfInParams = function(params) {
    var i2 = params.length, copy = params.concat();
    while (--i2 > -1) {
      if (params[i2] === "{self}") {
        copy[i2] = this;
      }
    }
    return copy;
  };
  p2._callback = function(type) {
    var v = this.vars, callback = v[type], params = v[type + "Params"], scope = v[type + "Scope"] || v.callbackScope || this, l = params ? params.length : 0;
    switch (l) {
      case 0:
        callback.call(scope);
        break;
      case 1:
        callback.call(scope, params[0]);
        break;
      case 2:
        callback.call(scope, params[0], params[1]);
        break;
      default:
        callback.apply(scope, params);
    }
  };
  p2.eventCallback = function(type, callback, params, scope) {
    if ((type || "").substr(0, 2) === "on") {
      var v = this.vars;
      if (arguments.length === 1) {
        return v[type];
      }
      if (callback == null) {
        delete v[type];
      } else {
        v[type] = callback;
        v[type + "Params"] = _isArray(params) && params.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(params) : params;
        v[type + "Scope"] = scope;
      }
      if (type === "onUpdate") {
        this._onUpdate = callback;
      }
    }
    return this;
  };
  p2.delay = function(value) {
    if (!arguments.length) {
      return this._delay;
    }
    if (this._timeline.smoothChildTiming) {
      this.startTime(this._startTime + value - this._delay);
    }
    this._delay = value;
    return this;
  };
  p2.duration = function(value) {
    if (!arguments.length) {
      this._dirty = false;
      return this._duration;
    }
    this._duration = this._totalDuration = value;
    this._uncache(true);
    if (this._timeline.smoothChildTiming) {
      if (this._time > 0) {
        if (this._time < this._duration) {
          if (value !== 0) {
            this.totalTime(this._totalTime * (value / this._duration), true);
          }
        }
      }
    }
    return this;
  };
  p2.totalDuration = function(value) {
    this._dirty = false;
    return !arguments.length ? this._totalDuration : this.duration(value);
  };
  p2.time = function(value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }
    if (this._dirty) {
      this.totalDuration();
    }
    return this.totalTime(value > this._duration ? this._duration : value, suppressEvents);
  };
  p2.totalTime = function(time, suppressEvents, uncapped) {
    if (!_tickerActive) {
      _ticker.wake();
    }
    if (!arguments.length) {
      return this._totalTime;
    }
    if (this._timeline) {
      if (time < 0 && !uncapped) {
        time += this.totalDuration();
      }
      if (this._timeline.smoothChildTiming) {
        if (this._dirty) {
          this.totalDuration();
        }
        var totalDuration = this._totalDuration, tl = this._timeline;
        if (time > totalDuration && !uncapped) {
          time = totalDuration;
        }
        this._startTime = (this._paused ? this._pauseTime : tl._time) - (!this._reversed ? time : totalDuration - time) / this._timeScale;
        if (!tl._dirty) {
          this._uncache(false);
        }
        if (tl._timeline) {
          while (tl._timeline) {
            if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
              tl.totalTime(tl._totalTime, true);
            }
            tl = tl._timeline;
          }
        }
      }
      if (this._gc) {
        this._enabled(true, false);
      }
      if (this._totalTime !== time || this._duration === 0) {
        if (_lazyTweens.length) {
          _lazyRender();
        }
        this.render(time, suppressEvents, false);
        if (_lazyTweens.length) {
          _lazyRender();
        }
      }
    }
    return this;
  };
  p2.progress = p2.totalProgress = function(value, suppressEvents) {
    var duration = this.duration();
    return !arguments.length ? duration ? this._time / duration : this.ratio : this.totalTime(duration * value, suppressEvents);
  };
  p2.startTime = function(value) {
    if (!arguments.length) {
      return this._startTime;
    }
    if (value !== this._startTime) {
      this._startTime = value;
      if (this.timeline) {
        if (this.timeline._sortChildren) {
          this.timeline.add(this, value - this._delay);
        }
      }
    }
    return this;
  };
  p2.endTime = function(includeRepeats) {
    return this._startTime + (includeRepeats != false ? this.totalDuration() : this.duration()) / this._timeScale;
  };
  p2.timeScale = function(value) {
    if (!arguments.length) {
      return this._timeScale;
    }
    var pauseTime, t;
    value = value || _tinyNum;
    if (this._timeline && this._timeline.smoothChildTiming) {
      pauseTime = this._pauseTime;
      t = pauseTime || pauseTime === 0 ? pauseTime : this._timeline.totalTime();
      this._startTime = t - (t - this._startTime) * this._timeScale / value;
    }
    this._timeScale = value;
    t = this.timeline;
    while (t && t.timeline) {
      t._dirty = true;
      t.totalDuration();
      t = t.timeline;
    }
    return this;
  };
  p2.reversed = function(value) {
    if (!arguments.length) {
      return this._reversed;
    }
    if (value != this._reversed) {
      this._reversed = value;
      this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, true);
    }
    return this;
  };
  p2.paused = function(value) {
    if (!arguments.length) {
      return this._paused;
    }
    var tl = this._timeline, raw, elapsed;
    if (value != this._paused) {
      if (tl) {
        if (!_tickerActive && !value) {
          _ticker.wake();
        }
        raw = tl.rawTime();
        elapsed = raw - this._pauseTime;
        if (!value && tl.smoothChildTiming) {
          this._startTime += elapsed;
          this._uncache(false);
        }
        this._pauseTime = value ? raw : null;
        this._paused = value;
        this._active = this.isActive();
        if (!value && elapsed !== 0 && this._initted && this.duration()) {
          raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
          this.render(raw, raw === this._totalTime, true);
        }
      }
    }
    if (this._gc && !value) {
      this._enabled(true, false);
    }
    return this;
  };
  var SimpleTimeline2 = _class("core.SimpleTimeline", function(vars) {
    Animation2.call(this, 0, vars);
    this.autoRemoveChildren = this.smoothChildTiming = true;
  });
  p2 = SimpleTimeline2.prototype = new Animation2();
  p2.constructor = SimpleTimeline2;
  p2.kill()._gc = false;
  p2._first = p2._last = p2._recent = null;
  p2._sortChildren = false;
  p2.add = p2.insert = function(child, position, align, stagger) {
    var prevTween, st;
    child._startTime = Number(position || 0) + child._delay;
    if (child._paused) {
      if (this !== child._timeline) {
        child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
      }
    }
    if (child.timeline) {
      child.timeline._remove(child, true);
    }
    child.timeline = child._timeline = this;
    if (child._gc) {
      child._enabled(true, true);
    }
    prevTween = this._last;
    if (this._sortChildren) {
      st = child._startTime;
      while (prevTween && prevTween._startTime > st) {
        prevTween = prevTween._prev;
      }
    }
    if (prevTween) {
      child._next = prevTween._next;
      prevTween._next = child;
    } else {
      child._next = this._first;
      this._first = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      this._last = child;
    }
    child._prev = prevTween;
    this._recent = child;
    if (this._timeline) {
      this._uncache(true);
    }
    return this;
  };
  p2._remove = function(tween, skipDisable) {
    if (tween.timeline === this) {
      if (!skipDisable) {
        tween._enabled(false, true);
      }
      if (tween._prev) {
        tween._prev._next = tween._next;
      } else if (this._first === tween) {
        this._first = tween._next;
      }
      if (tween._next) {
        tween._next._prev = tween._prev;
      } else if (this._last === tween) {
        this._last = tween._prev;
      }
      tween._next = tween._prev = tween.timeline = null;
      if (tween === this._recent) {
        this._recent = this._last;
      }
      if (this._timeline) {
        this._uncache(true);
      }
    }
    return this;
  };
  p2.render = function(time, suppressEvents, force) {
    var tween = this._first, next;
    this._totalTime = this._time = this._rawPrevTime = time;
    while (tween) {
      next = tween._next;
      if (tween._active || time >= tween._startTime && !tween._paused && !tween._gc) {
        if (!tween._reversed) {
          tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
        } else {
          tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
        }
      }
      tween = next;
    }
  };
  p2.rawTime = function() {
    if (!_tickerActive) {
      _ticker.wake();
    }
    return this._totalTime;
  };
  var TweenLite2 = _class("TweenLite", function(target, duration, vars) {
    Animation2.call(this, duration, vars);
    this.render = TweenLite2.prototype.render;
    if (target == null) {
      throw "Cannot tween a null target.";
    }
    this.target = target = typeof target !== "string" ? target : TweenLite2.selector(target) || target;
    var isSelector = target.jquery || target.length && target !== window2 && target[0] && (target[0] === window2 || target[0].nodeType && target[0].style && !target.nodeType), overwrite = this.vars.overwrite, i2, targ, targets;
    this._overwrite = overwrite = overwrite == null ? _overwriteLookup[TweenLite2.defaultOverwrite] : typeof overwrite === "number" ? overwrite >> 0 : _overwriteLookup[overwrite];
    if ((isSelector || target instanceof Array || target.push && _isArray(target)) && typeof target[0] !== "number") {
      this._targets = targets = _slice(target);
      this._propLookup = [];
      this._siblings = [];
      for (i2 = 0; i2 < targets.length; i2++) {
        targ = targets[i2];
        if (!targ) {
          targets.splice(i2--, 1);
          continue;
        } else if (typeof targ === "string") {
          targ = targets[i2--] = TweenLite2.selector(targ);
          if (typeof targ === "string") {
            targets.splice(i2 + 1, 1);
          }
          continue;
        } else if (targ.length && targ !== window2 && targ[0] && (targ[0] === window2 || targ[0].nodeType && targ[0].style && !targ.nodeType)) {
          targets.splice(i2--, 1);
          this._targets = targets = targets.concat(_slice(targ));
          continue;
        }
        this._siblings[i2] = _register(targ, this, false);
        if (overwrite === 1) {
          if (this._siblings[i2].length > 1) {
            _applyOverwrite(targ, this, null, 1, this._siblings[i2]);
          }
        }
      }
    } else {
      this._propLookup = {};
      this._siblings = _register(target, this, false);
      if (overwrite === 1) {
        if (this._siblings.length > 1) {
          _applyOverwrite(target, this, null, 1, this._siblings);
        }
      }
    }
    if (this.vars.immediateRender || duration === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
      this._time = -_tinyNum;
      this.render(Math.min(0, -this._delay));
    }
  }, true), _isSelector = function(v) {
    return v && v.length && v !== window2 && v[0] && (v[0] === window2 || v[0].nodeType && v[0].style && !v.nodeType);
  }, _autoCSS = function(vars, target) {
    var css = {}, p3;
    for (p3 in vars) {
      if (!_reservedProps[p3] && (!(p3 in target) || p3 === "transform" || p3 === "x" || p3 === "y" || p3 === "width" || p3 === "height" || p3 === "className" || p3 === "border") && (!_plugins[p3] || _plugins[p3] && _plugins[p3]._autoCSS)) {
        css[p3] = vars[p3];
        delete vars[p3];
      }
    }
    vars.css = css;
  };
  p2 = TweenLite2.prototype = new Animation2();
  p2.constructor = TweenLite2;
  p2.kill()._gc = false;
  p2.ratio = 0;
  p2._firstPT = p2._targets = p2._overwrittenProps = p2._startAt = null;
  p2._notifyPluginsOfEnabled = p2._lazy = false;
  TweenLite2.version = "2.1.3";
  TweenLite2.defaultEase = p2._ease = new Ease2(null, null, 1, 1);
  TweenLite2.defaultOverwrite = "auto";
  TweenLite2.ticker = _ticker;
  TweenLite2.autoSleep = 120;
  TweenLite2.lagSmoothing = function(threshold, adjustedLag) {
    _ticker.lagSmoothing(threshold, adjustedLag);
  };
  TweenLite2.selector = window2.$ || window2.jQuery || function(e) {
    var selector = window2.$ || window2.jQuery;
    if (selector) {
      TweenLite2.selector = selector;
      return selector(e);
    }
    if (!_doc) {
      _doc = window2.document;
    }
    return !_doc ? e : _doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById(e.charAt(0) === "#" ? e.substr(1) : e);
  };
  var _lazyTweens = [], _lazyLookup = {}, _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig, _relExp = /[\+-]=-?[\.\d]/, _setRatio = function(v) {
    var pt = this._firstPT, min = 1e-6, val;
    while (pt) {
      val = !pt.blob ? pt.c * v + pt.s : v === 1 && this.end != null ? this.end : v ? this.join("") : this.start;
      if (pt.m) {
        val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
      } else if (val < min) {
        if (val > -min && !pt.blob) {
          val = 0;
        }
      }
      if (!pt.f) {
        pt.t[pt.p] = val;
      } else if (pt.fp) {
        pt.t[pt.p](pt.fp, val);
      } else {
        pt.t[pt.p](val);
      }
      pt = pt._next;
    }
  }, _blobRound = function(v) {
    return (v * 1e3 | 0) / 1e3 + "";
  }, _blobDif = function(start, end, filter, pt) {
    var a2 = [], charIndex = 0, s = "", color = 0, startNums, endNums, num, i2, l, nonNumbers, currentNum;
    a2.start = start;
    a2.end = end;
    start = a2[0] = start + "";
    end = a2[1] = end + "";
    if (filter) {
      filter(a2);
      start = a2[0];
      end = a2[1];
    }
    a2.length = 0;
    startNums = start.match(_numbersExp) || [];
    endNums = end.match(_numbersExp) || [];
    if (pt) {
      pt._next = null;
      pt.blob = 1;
      a2._firstPT = a2._applyPT = pt;
    }
    l = endNums.length;
    for (i2 = 0; i2 < l; i2++) {
      currentNum = endNums[i2];
      nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
      s += nonNumbers || !i2 ? nonNumbers : ",";
      charIndex += nonNumbers.length;
      if (color) {
        color = (color + 1) % 5;
      } else if (nonNumbers.substr(-5) === "rgba(") {
        color = 1;
      }
      if (currentNum === startNums[i2] || startNums.length <= i2) {
        s += currentNum;
      } else {
        if (s) {
          a2.push(s);
          s = "";
        }
        num = parseFloat(startNums[i2]);
        a2.push(num);
        a2._firstPT = { _next: a2._firstPT, t: a2, p: a2.length - 1, s: num, c: (currentNum.charAt(1) === "=" ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0, f: 0, m: color && color < 4 ? Math.round : _blobRound };
      }
      charIndex += currentNum.length;
    }
    s += end.substr(charIndex);
    if (s) {
      a2.push(s);
    }
    a2.setRatio = _setRatio;
    if (_relExp.test(end)) {
      a2.end = null;
    }
    return a2;
  }, _addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index2) {
    if (typeof end === "function") {
      end = end(index2 || 0, target);
    }
    var type = typeof target[prop], getterName = type !== "function" ? "" : prop.indexOf("set") || typeof target["get" + prop.substr(3)] !== "function" ? prop : "get" + prop.substr(3), s = start !== "get" ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](), isRelative = typeof end === "string" && end.charAt(1) === "=", pt = { t: target, p: prop, s, f: type === "function", pg: 0, n: overwriteProp || prop, m: !mod ? 0 : typeof mod === "function" ? mod : Math.round, pr: 0, c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0 }, blob;
    if (typeof s !== "number" || typeof end !== "number" && !isRelative) {
      if (funcParam || isNaN(s) || !isRelative && isNaN(end) || typeof s === "boolean" || typeof end === "boolean") {
        pt.fp = funcParam;
        blob = _blobDif(s, isRelative ? parseFloat(pt.s) + pt.c + (pt.s + "").replace(/[0-9\-\.]/g, "") : end, stringFilter || TweenLite2.defaultStringFilter, pt);
        pt = { t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0 };
      } else {
        pt.s = parseFloat(s);
        if (!isRelative) {
          pt.c = parseFloat(end) - pt.s || 0;
        }
      }
    }
    if (pt.c) {
      if (pt._next = this._firstPT) {
        pt._next._prev = pt;
      }
      this._firstPT = pt;
      return pt;
    }
  }, _internals = TweenLite2._internals = { isArray: _isArray, isSelector: _isSelector, lazyTweens: _lazyTweens, blobDif: _blobDif }, _plugins = TweenLite2._plugins = {}, _tweenLookup = _internals.tweenLookup = {}, _tweenLookupNum = 0, _reservedProps = _internals.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1, onOverwrite: 1, callbackScope: 1, stringFilter: 1, id: 1, yoyoEase: 1, stagger: 1 }, _overwriteLookup = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 }, _rootFramesTimeline = Animation2._rootFramesTimeline = new SimpleTimeline2(), _rootTimeline = Animation2._rootTimeline = new SimpleTimeline2(), _nextGCFrame = 30, _lazyRender = _internals.lazyRender = function() {
    var l = _lazyTweens.length, i2, tween;
    _lazyLookup = {};
    for (i2 = 0; i2 < l; i2++) {
      tween = _lazyTweens[i2];
      if (tween && tween._lazy !== false) {
        tween.render(tween._lazy[0], tween._lazy[1], true);
        tween._lazy = false;
      }
    }
    _lazyTweens.length = 0;
  };
  _rootTimeline._startTime = _ticker.time;
  _rootFramesTimeline._startTime = _ticker.frame;
  _rootTimeline._active = _rootFramesTimeline._active = true;
  setTimeout(_lazyRender, 1);
  Animation2._updateRoot = TweenLite2.render = function() {
    var i2, a2, p3;
    if (_lazyTweens.length) {
      _lazyRender();
    }
    _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
    _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
    if (_lazyTweens.length) {
      _lazyRender();
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame = _ticker.frame + (parseInt(TweenLite2.autoSleep, 10) || 120);
      for (p3 in _tweenLookup) {
        a2 = _tweenLookup[p3].tweens;
        i2 = a2.length;
        while (--i2 > -1) {
          if (a2[i2]._gc) {
            a2.splice(i2, 1);
          }
        }
        if (a2.length === 0) {
          delete _tweenLookup[p3];
        }
      }
      p3 = _rootTimeline._first;
      if (!p3 || p3._paused) {
        if (TweenLite2.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
          while (p3 && p3._paused) {
            p3 = p3._next;
          }
          if (!p3) {
            _ticker.sleep();
          }
        }
      }
    }
  };
  _ticker.addEventListener("tick", Animation2._updateRoot);
  var _register = function(target, tween, scrub) {
    var id = target._gsTweenID, a2, i2;
    if (!_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)]) {
      _tweenLookup[id] = { target, tweens: [] };
    }
    if (tween) {
      a2 = _tweenLookup[id].tweens;
      a2[i2 = a2.length] = tween;
      if (scrub) {
        while (--i2 > -1) {
          if (a2[i2] === tween) {
            a2.splice(i2, 1);
          }
        }
      }
    }
    return _tweenLookup[id].tweens;
  }, _onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
    var func = overwrittenTween.vars.onOverwrite, r1, r2;
    if (func) {
      r1 = func(overwrittenTween, overwritingTween, target, killedProps);
    }
    func = TweenLite2.onOverwrite;
    if (func) {
      r2 = func(overwrittenTween, overwritingTween, target, killedProps);
    }
    return r1 !== false && r2 !== false;
  }, _applyOverwrite = function(target, tween, props, mode, siblings) {
    var i2, changed, curTween, l;
    if (mode === 1 || mode >= 4) {
      l = siblings.length;
      for (i2 = 0; i2 < l; i2++) {
        if ((curTween = siblings[i2]) !== tween) {
          if (!curTween._gc) {
            if (curTween._kill(null, target, tween)) {
              changed = true;
            }
          }
        } else if (mode === 5) {
          break;
        }
      }
      return changed;
    }
    var startTime = tween._startTime + _tinyNum, overlaps = [], oCount = 0, zeroDur = tween._duration === 0, globalStart;
    i2 = siblings.length;
    while (--i2 > -1) {
      if ((curTween = siblings[i2]) === tween || curTween._gc || curTween._paused)
        ;
      else if (curTween._timeline !== tween._timeline) {
        globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
        if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
          overlaps[oCount++] = curTween;
        }
      } else if (curTween._startTime <= startTime) {
        if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) {
          if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= _tinyNum * 2)) {
            overlaps[oCount++] = curTween;
          }
        }
      }
    }
    i2 = oCount;
    while (--i2 > -1) {
      curTween = overlaps[i2];
      l = curTween._firstPT;
      if (mode === 2) {
        if (curTween._kill(props, target, tween)) {
          changed = true;
        }
      }
      if (mode !== 2 || !curTween._firstPT && curTween._initted && l) {
        if (mode !== 2 && !_onOverwrite(curTween, tween)) {
          continue;
        }
        if (curTween._enabled(false, false)) {
          changed = true;
        }
      }
    }
    return changed;
  }, _checkOverlap = function(tween, reference, zeroDur) {
    var tl = tween._timeline, ts = tl._timeScale, t = tween._startTime;
    while (tl._timeline) {
      t += tl._startTime;
      ts *= tl._timeScale;
      if (tl._paused) {
        return -100;
      }
      tl = tl._timeline;
    }
    t /= ts;
    return t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2 * _tinyNum ? _tinyNum : (t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum ? 0 : t - reference - _tinyNum;
  };
  p2._init = function() {
    var v = this.vars, op = this._overwrittenProps, dur = this._duration, immediate = !!v.immediateRender, ease = v.ease, startAt = this._startAt, i2, initPlugins, pt, p3, startVars, l;
    if (v.startAt) {
      if (startAt) {
        startAt.render(-1, true);
        startAt.kill();
      }
      startVars = {};
      for (p3 in v.startAt) {
        startVars[p3] = v.startAt[p3];
      }
      startVars.data = "isStart";
      startVars.overwrite = false;
      startVars.immediateRender = true;
      startVars.lazy = immediate && v.lazy !== false;
      startVars.startAt = startVars.delay = null;
      startVars.onUpdate = v.onUpdate;
      startVars.onUpdateParams = v.onUpdateParams;
      startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
      this._startAt = TweenLite2.to(this.target || {}, 0, startVars);
      if (immediate) {
        if (this._time > 0) {
          this._startAt = null;
        } else if (dur !== 0) {
          return;
        }
      }
    } else if (v.runBackwards && dur !== 0) {
      if (startAt) {
        startAt.render(-1, true);
        startAt.kill();
        this._startAt = null;
      } else {
        if (this._time !== 0) {
          immediate = false;
        }
        pt = {};
        for (p3 in v) {
          if (!_reservedProps[p3] || p3 === "autoCSS") {
            pt[p3] = v[p3];
          }
        }
        pt.overwrite = 0;
        pt.data = "isFromStart";
        pt.lazy = immediate && v.lazy !== false;
        pt.immediateRender = immediate;
        this._startAt = TweenLite2.to(this.target, 0, pt);
        if (!immediate) {
          this._startAt._init();
          this._startAt._enabled(false);
          if (this.vars.immediateRender) {
            this._startAt = null;
          }
        } else if (this._time === 0) {
          return;
        }
      }
    }
    this._ease = ease = !ease ? TweenLite2.defaultEase : ease instanceof Ease2 ? ease : typeof ease === "function" ? new Ease2(ease, v.easeParams) : _easeMap[ease] || TweenLite2.defaultEase;
    if (v.easeParams instanceof Array && ease.config) {
      this._ease = ease.config.apply(ease, v.easeParams);
    }
    this._easeType = this._ease._type;
    this._easePower = this._ease._power;
    this._firstPT = null;
    if (this._targets) {
      l = this._targets.length;
      for (i2 = 0; i2 < l; i2++) {
        if (this._initProps(this._targets[i2], this._propLookup[i2] = {}, this._siblings[i2], op ? op[i2] : null, i2)) {
          initPlugins = true;
        }
      }
    } else {
      initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
    }
    if (initPlugins) {
      TweenLite2._onPluginEvent("_onInitAllProps", this);
    }
    if (op) {
      if (!this._firstPT) {
        if (typeof this.target !== "function") {
          this._enabled(false, false);
        }
      }
    }
    if (v.runBackwards) {
      pt = this._firstPT;
      while (pt) {
        pt.s += pt.c;
        pt.c = -pt.c;
        pt = pt._next;
      }
    }
    this._onUpdate = v.onUpdate;
    this._initted = true;
  };
  p2._initProps = function(target, propLookup, siblings, overwrittenProps, index2) {
    var p3, i2, initPlugins, plugin, pt, v;
    if (target == null) {
      return false;
    }
    if (_lazyLookup[target._gsTweenID]) {
      _lazyRender();
    }
    if (!this.vars.css) {
      if (target.style) {
        if (target !== window2 && target.nodeType) {
          if (_plugins.css) {
            if (this.vars.autoCSS !== false) {
              _autoCSS(this.vars, target);
            }
          }
        }
      }
    }
    for (p3 in this.vars) {
      v = this.vars[p3];
      if (_reservedProps[p3]) {
        if (v) {
          if (v instanceof Array || v.push && _isArray(v)) {
            if (v.join("").indexOf("{self}") !== -1) {
              this.vars[p3] = v = this._swapSelfInParams(v, this);
            }
          }
        }
      } else if (_plugins[p3] && (plugin = new _plugins[p3]())._onInitTween(target, this.vars[p3], this, index2)) {
        this._firstPT = pt = { _next: this._firstPT, t: plugin, p: "setRatio", s: 0, c: 1, f: 1, n: p3, pg: 1, pr: plugin._priority, m: 0 };
        i2 = plugin._overwriteProps.length;
        while (--i2 > -1) {
          propLookup[plugin._overwriteProps[i2]] = this._firstPT;
        }
        if (plugin._priority || plugin._onInitAllProps) {
          initPlugins = true;
        }
        if (plugin._onDisable || plugin._onEnable) {
          this._notifyPluginsOfEnabled = true;
        }
        if (pt._next) {
          pt._next._prev = pt;
        }
      } else {
        propLookup[p3] = _addPropTween.call(this, target, p3, "get", v, p3, 0, null, this.vars.stringFilter, index2);
      }
    }
    if (overwrittenProps) {
      if (this._kill(overwrittenProps, target)) {
        return this._initProps(target, propLookup, siblings, overwrittenProps, index2);
      }
    }
    if (this._overwrite > 1) {
      if (this._firstPT) {
        if (siblings.length > 1) {
          if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
            this._kill(propLookup, target);
            return this._initProps(target, propLookup, siblings, overwrittenProps, index2);
          }
        }
      }
    }
    if (this._firstPT) {
      if (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration) {
        _lazyLookup[target._gsTweenID] = true;
      }
    }
    return initPlugins;
  };
  p2.render = function(time, suppressEvents, force) {
    var self = this, prevTime = self._time, duration = self._duration, prevRawPrevTime = self._rawPrevTime, isComplete, callback, pt, rawPrevTime;
    if (time >= duration - _tinyNum && time >= 0) {
      self._totalTime = self._time = duration;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
      if (!self._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || self._timeline.autoRemoveChildren;
      }
      if (duration === 0) {
        if (self._initted || !self.vars.lazy || force) {
          if (self._startTime === self._timeline._duration) {
            time = 0;
          }
          if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && self.data !== "isPause") {
            if (prevRawPrevTime !== time) {
              force = true;
              if (prevRawPrevTime > _tinyNum) {
                callback = "onReverseComplete";
              }
            }
          }
          self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
        }
      }
    } else if (time < _tinyNum) {
      self._totalTime = self._time = 0;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
      if (prevTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }
      if (time > -_tinyNum) {
        time = 0;
      } else if (time < 0) {
        self._active = false;
        if (duration === 0) {
          if (self._initted || !self.vars.lazy || force) {
            if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && self.data === "isPause")) {
              force = true;
            }
            self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
          }
        }
      }
      if (!self._initted || self._startAt && self._startAt.progress()) {
        force = true;
      }
    } else {
      self._totalTime = self._time = time;
      if (self._easeType) {
        var r = time / duration, type = self._easeType, pow = self._easePower;
        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }
        if (type === 3) {
          r *= 2;
        }
        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }
        self.ratio = type === 1 ? 1 - r : type === 2 ? r : time / duration < 0.5 ? r / 2 : 1 - r / 2;
      } else {
        self.ratio = self._ease.getRatio(time / duration);
      }
    }
    if (self._time === prevTime && !force) {
      return;
    } else if (!self._initted) {
      self._init();
      if (!self._initted || self._gc) {
        return;
      } else if (!force && self._firstPT && (self.vars.lazy !== false && self._duration || self.vars.lazy && !self._duration)) {
        self._time = self._totalTime = prevTime;
        self._rawPrevTime = prevRawPrevTime;
        _lazyTweens.push(self);
        self._lazy = [time, suppressEvents];
        return;
      }
      if (self._time && !isComplete) {
        self.ratio = self._ease.getRatio(self._time / duration);
      } else if (isComplete && self._ease._calcEnd) {
        self.ratio = self._ease.getRatio(self._time === 0 ? 0 : 1);
      }
    }
    if (self._lazy !== false) {
      self._lazy = false;
    }
    if (!self._active) {
      if (!self._paused && self._time !== prevTime && time >= 0) {
        self._active = true;
      }
    }
    if (prevTime === 0) {
      if (self._startAt) {
        if (time >= 0) {
          self._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS";
        }
      }
      if (self.vars.onStart) {
        if (self._time !== 0 || duration === 0) {
          if (!suppressEvents) {
            self._callback("onStart");
          }
        }
      }
    }
    pt = self._firstPT;
    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * self.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * self.ratio + pt.s;
      }
      pt = pt._next;
    }
    if (self._onUpdate) {
      if (time < 0) {
        if (self._startAt && time !== -1e-4) {
          self._startAt.render(time, true, force);
        }
      }
      if (!suppressEvents) {
        if (self._time !== prevTime || isComplete || force) {
          self._callback("onUpdate");
        }
      }
    }
    if (callback) {
      if (!self._gc || force) {
        if (time < 0 && self._startAt && !self._onUpdate && time !== -1e-4) {
          self._startAt.render(time, true, force);
        }
        if (isComplete) {
          if (self._timeline.autoRemoveChildren) {
            self._enabled(false, false);
          }
          self._active = false;
        }
        if (!suppressEvents && self.vars[callback]) {
          self._callback(callback);
        }
        if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
          self._rawPrevTime = 0;
        }
      }
    }
  };
  p2._kill = function(vars, target, overwritingTween) {
    if (vars === "all") {
      vars = null;
    }
    if (vars == null) {
      if (target == null || target === this.target) {
        this._lazy = false;
        return this._enabled(false, false);
      }
    }
    target = typeof target !== "string" ? target || this._targets || this.target : TweenLite2.selector(target) || target;
    var simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline, firstPT = this._firstPT, i2, overwrittenProps, p3, pt, propLookup, changed, killProps, record, killed;
    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i2 = target.length;
      while (--i2 > -1) {
        if (this._kill(vars, target[i2], overwritingTween)) {
          changed = true;
        }
      }
    } else {
      if (this._targets) {
        i2 = this._targets.length;
        while (--i2 > -1) {
          if (target === this._targets[i2]) {
            propLookup = this._propLookup[i2] || {};
            this._overwrittenProps = this._overwrittenProps || [];
            overwrittenProps = this._overwrittenProps[i2] = vars ? this._overwrittenProps[i2] || {} : "all";
            break;
          }
        }
      } else if (target !== this.target) {
        return false;
      } else {
        propLookup = this._propLookup;
        overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
      }
      if (propLookup) {
        killProps = vars || propLookup;
        record = vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof vars !== "object" || !vars._tempKill);
        if (overwritingTween && (TweenLite2.onOverwrite || this.vars.onOverwrite)) {
          for (p3 in killProps) {
            if (propLookup[p3]) {
              if (!killed) {
                killed = [];
              }
              killed.push(p3);
            }
          }
          if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) {
            return false;
          }
        }
        for (p3 in killProps) {
          if (pt = propLookup[p3]) {
            if (simultaneousOverwrite) {
              if (pt.f) {
                pt.t[pt.p](pt.s);
              } else {
                pt.t[pt.p] = pt.s;
              }
              changed = true;
            }
            if (pt.pg && pt.t._kill(killProps)) {
              changed = true;
            }
            if (!pt.pg || pt.t._overwriteProps.length === 0) {
              if (pt._prev) {
                pt._prev._next = pt._next;
              } else if (pt === this._firstPT) {
                this._firstPT = pt._next;
              }
              if (pt._next) {
                pt._next._prev = pt._prev;
              }
              pt._next = pt._prev = null;
            }
            delete propLookup[p3];
          }
          if (record) {
            overwrittenProps[p3] = 1;
          }
        }
        if (!this._firstPT && this._initted && firstPT) {
          this._enabled(false, false);
        }
      }
    }
    return changed;
  };
  p2.invalidate = function() {
    if (this._notifyPluginsOfEnabled) {
      TweenLite2._onPluginEvent("_onDisable", this);
    }
    var t = this._time;
    this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
    this._notifyPluginsOfEnabled = this._active = this._lazy = false;
    this._propLookup = this._targets ? {} : [];
    Animation2.prototype.invalidate.call(this);
    if (this.vars.immediateRender) {
      this._time = -_tinyNum;
      this.render(t, false, this.vars.lazy !== false);
    }
    return this;
  };
  p2._enabled = function(enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }
    if (enabled && this._gc) {
      var targets = this._targets, i2;
      if (targets) {
        i2 = targets.length;
        while (--i2 > -1) {
          this._siblings[i2] = _register(targets[i2], this, true);
        }
      } else {
        this._siblings = _register(this.target, this, true);
      }
    }
    Animation2.prototype._enabled.call(this, enabled, ignoreTimeline);
    if (this._notifyPluginsOfEnabled) {
      if (this._firstPT) {
        return TweenLite2._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this);
      }
    }
    return false;
  };
  TweenLite2.to = function(target, duration, vars) {
    return new TweenLite2(target, duration, vars);
  };
  TweenLite2.from = function(target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenLite2(target, duration, vars);
  };
  TweenLite2.fromTo = function(target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenLite2(target, duration, toVars);
  };
  TweenLite2.delayedCall = function(delay, callback, params, scope, useFrames) {
    return new TweenLite2(callback, 0, { delay, onComplete: callback, onCompleteParams: params, callbackScope: scope, onReverseComplete: callback, onReverseCompleteParams: params, immediateRender: false, lazy: false, useFrames, overwrite: 0 });
  };
  TweenLite2.set = function(target, vars) {
    return new TweenLite2(target, 0, vars);
  };
  TweenLite2.getTweensOf = function(target, onlyActive) {
    if (target == null) {
      return [];
    }
    target = typeof target !== "string" ? target : TweenLite2.selector(target) || target;
    var i2, a2, j, t;
    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i2 = target.length;
      a2 = [];
      while (--i2 > -1) {
        a2 = a2.concat(TweenLite2.getTweensOf(target[i2], onlyActive));
      }
      i2 = a2.length;
      while (--i2 > -1) {
        t = a2[i2];
        j = i2;
        while (--j > -1) {
          if (t === a2[j]) {
            a2.splice(i2, 1);
          }
        }
      }
    } else if (target._gsTweenID) {
      a2 = _register(target).concat();
      i2 = a2.length;
      while (--i2 > -1) {
        if (a2[i2]._gc || onlyActive && !a2[i2].isActive()) {
          a2.splice(i2, 1);
        }
      }
    }
    return a2 || [];
  };
  TweenLite2.killTweensOf = TweenLite2.killDelayedCallsTo = function(target, onlyActive, vars) {
    if (typeof onlyActive === "object") {
      vars = onlyActive;
      onlyActive = false;
    }
    var a2 = TweenLite2.getTweensOf(target, onlyActive), i2 = a2.length;
    while (--i2 > -1) {
      a2[i2]._kill(vars, target);
    }
  };
  var TweenPlugin2 = _class("plugins.TweenPlugin", function(props, priority) {
    this._overwriteProps = (props || "").split(",");
    this._propName = this._overwriteProps[0];
    this._priority = priority || 0;
    this._super = TweenPlugin2.prototype;
  }, true);
  p2 = TweenPlugin2.prototype;
  TweenPlugin2.version = "1.19.0";
  TweenPlugin2.API = 2;
  p2._firstPT = null;
  p2._addTween = _addPropTween;
  p2.setRatio = _setRatio;
  p2._kill = function(lookup) {
    var a2 = this._overwriteProps, pt = this._firstPT, i2;
    if (lookup[this._propName] != null) {
      this._overwriteProps = [];
    } else {
      i2 = a2.length;
      while (--i2 > -1) {
        if (lookup[a2[i2]] != null) {
          a2.splice(i2, 1);
        }
      }
    }
    while (pt) {
      if (lookup[pt.n] != null) {
        if (pt._next) {
          pt._next._prev = pt._prev;
        }
        if (pt._prev) {
          pt._prev._next = pt._next;
          pt._prev = null;
        } else if (this._firstPT === pt) {
          this._firstPT = pt._next;
        }
      }
      pt = pt._next;
    }
    return false;
  };
  p2._mod = p2._roundProps = function(lookup) {
    var pt = this._firstPT, val;
    while (pt) {
      val = lookup[this._propName] || pt.n != null && lookup[pt.n.split(this._propName + "_").join("")];
      if (val && typeof val === "function") {
        if (pt.f === 2) {
          pt.t._applyPT.m = val;
        } else {
          pt.m = val;
        }
      }
      pt = pt._next;
    }
  };
  TweenLite2._onPluginEvent = function(type, tween) {
    var pt = tween._firstPT, changed, pt2, first, last, next;
    if (type === "_onInitAllProps") {
      while (pt) {
        next = pt._next;
        pt2 = first;
        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }
        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }
        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }
        pt = next;
      }
      pt = tween._firstPT = first;
    }
    while (pt) {
      if (pt.pg) {
        if (typeof pt.t[type] === "function") {
          if (pt.t[type]()) {
            changed = true;
          }
        }
      }
      pt = pt._next;
    }
    return changed;
  };
  TweenPlugin2.activate = function(plugins) {
    var i2 = plugins.length;
    while (--i2 > -1) {
      if (plugins[i2].API === TweenPlugin2.API) {
        _plugins[new plugins[i2]()._propName] = plugins[i2];
      }
    }
    return true;
  };
  _gsDefine.plugin = function(config) {
    if (!config || !config.propName || !config.init || !config.API) {
      throw "illegal plugin definition.";
    }
    var propName = config.propName, priority = config.priority || 0, overwriteProps = config.overwriteProps, map = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_mod", mod: "_mod", initAll: "_onInitAllProps" }, Plugin = _class(
      "plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
      function() {
        TweenPlugin2.call(this, propName, priority);
        this._overwriteProps = overwriteProps || [];
      },
      config.global === true
    ), p3 = Plugin.prototype = new TweenPlugin2(propName), prop;
    p3.constructor = Plugin;
    Plugin.API = config.API;
    for (prop in map) {
      if (typeof config[prop] === "function") {
        p3[map[prop]] = config[prop];
      }
    }
    Plugin.version = config.version;
    TweenPlugin2.activate([Plugin]);
    return Plugin;
  };
  a = window2._gsQueue;
  if (a) {
    for (i = 0; i < a.length; i++) {
      a[i]();
    }
    for (p2 in _defLookup) {
      if (!_defLookup[p2].func) {
        window2.console.log("GSAP encountered missing dependency: " + p2);
      }
    }
  }
  _tickerActive = false;
  return TweenLite2;
}(_gsScope);
var globals = _gsScope.GreenSockGlobals;
var nonGlobals = globals.com.greensock;
var SimpleTimeline = nonGlobals.core.SimpleTimeline;
var Animation = nonGlobals.core.Animation;
var Ease = globals.Ease;
globals.Linear;
globals.Power1;
globals.Power2;
globals.Power3;
globals.Power4;
var TweenPlugin = globals.TweenPlugin;
nonGlobals.events.EventDispatcher;
/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
_gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function() {
  var TimelineLite2 = function(vars) {
    SimpleTimeline.call(this, vars);
    var self = this, v = self.vars, val, p3;
    self._labels = {};
    self.autoRemoveChildren = !!v.autoRemoveChildren;
    self.smoothChildTiming = !!v.smoothChildTiming;
    self._sortChildren = true;
    self._onUpdate = v.onUpdate;
    for (p3 in v) {
      val = v[p3];
      if (_isArray(val)) {
        if (val.join("").indexOf("{self}") !== -1) {
          v[p3] = self._swapSelfInParams(val);
        }
      }
    }
    if (_isArray(v.tweens)) {
      self.add(v.tweens, 0, v.align, v.stagger);
    }
  }, _tinyNum = 1e-8, TweenLiteInternals = TweenLite._internals, _internals = TimelineLite2._internals = {}, _isSelector = TweenLiteInternals.isSelector, _isArray = TweenLiteInternals.isArray, _lazyTweens = TweenLiteInternals.lazyTweens, _lazyRender = TweenLiteInternals.lazyRender, _globals2 = _gsScope._gsDefine.globals, _copy = function(vars) {
    var copy = {}, p3;
    for (p3 in vars) {
      copy[p3] = vars[p3];
    }
    return copy;
  }, _applyCycle = function(vars, targets, i) {
    var alt = vars.cycle, p3, val;
    for (p3 in alt) {
      val = alt[p3];
      vars[p3] = typeof val === "function" ? val(i, targets[i], targets) : val[i % val.length];
    }
    delete vars.cycle;
  }, _pauseCallback = _internals.pauseCallback = function() {
  }, _slice = function(a) {
    var b = [], l = a.length, i;
    for (i = 0; i !== l; b.push(a[i++]))
      ;
    return b;
  }, _defaultImmediateRender = function(tl, toVars, fromVars, defaultFalse) {
    var ir = "immediateRender";
    if (!(ir in toVars)) {
      toVars[ir] = !(fromVars && fromVars[ir] === false || defaultFalse);
    }
    return toVars;
  }, _distribute = function(v) {
    if (typeof v === "function") {
      return v;
    }
    var vars = typeof v === "object" ? v : { each: v }, ease = vars.ease, from = vars.from || 0, base = vars.base || 0, cache = {}, isFromKeyword = isNaN(from), axis = vars.axis, ratio = { center: 0.5, end: 1 }[from] || 0;
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrap;
      if (!distances) {
        wrap = vars.grid === "auto" ? 0 : (vars.grid || [Infinity])[0];
        if (!wrap) {
          max = -Infinity;
          while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) {
          }
          wrap--;
        }
        distances = cache[l] = [];
        originX = isFromKeyword ? Math.min(wrap, l) * ratio - 0.5 : from % wrap;
        originY = isFromKeyword ? l * ratio / wrap - 0.5 : from / wrap | 0;
        max = 0;
        min = Infinity;
        for (j = 0; j < l; j++) {
          x = j % wrap - originX;
          y = originY - (j / wrap | 0);
          distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          if (d > max) {
            max = d;
          }
          if (d < min) {
            min = d;
          }
        }
        distances.max = max - min;
        distances.min = min;
        distances.v = l = vars.amount || vars.each * (wrap > l ? l - 1 : !axis ? Math.max(wrap, l / wrap) : axis === "y" ? l / wrap : wrap) || 0;
        distances.b = l < 0 ? base - l : base;
      }
      l = (distances[i] - distances.min) / distances.max;
      return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
    };
  }, p2 = TimelineLite2.prototype = new SimpleTimeline();
  TimelineLite2.version = "2.1.3";
  TimelineLite2.distribute = _distribute;
  p2.constructor = TimelineLite2;
  p2.kill()._gc = p2._forcingPlayhead = p2._hasPause = false;
  p2.to = function(target, duration, vars, position) {
    var Engine = vars.repeat && _globals2.TweenMax || TweenLite;
    return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position);
  };
  p2.from = function(target, duration, vars, position) {
    return this.add((vars.repeat && _globals2.TweenMax || TweenLite).from(target, duration, _defaultImmediateRender(this, vars)), position);
  };
  p2.fromTo = function(target, duration, fromVars, toVars, position) {
    var Engine = toVars.repeat && _globals2.TweenMax || TweenLite;
    toVars = _defaultImmediateRender(this, toVars, fromVars);
    return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
  };
  p2.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    var tl = new TimelineLite2({ onComplete: onCompleteAll, onCompleteParams: onCompleteAllParams, callbackScope: onCompleteAllScope, smoothChildTiming: this.smoothChildTiming }), staggerFunc = _distribute(vars.stagger || stagger), startAt = vars.startAt, cycle = vars.cycle, copy, i;
    if (typeof targets === "string") {
      targets = TweenLite.selector(targets) || targets;
    }
    targets = targets || [];
    if (_isSelector(targets)) {
      targets = _slice(targets);
    }
    for (i = 0; i < targets.length; i++) {
      copy = _copy(vars);
      if (startAt) {
        copy.startAt = _copy(startAt);
        if (startAt.cycle) {
          _applyCycle(copy.startAt, targets, i);
        }
      }
      if (cycle) {
        _applyCycle(copy, targets, i);
        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }
      tl.to(targets[i], duration, copy, staggerFunc(i, targets[i], targets));
    }
    return this.add(tl, position);
  };
  p2.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.runBackwards = true;
    return this.staggerTo(targets, duration, _defaultImmediateRender(this, vars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };
  p2.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    return this.staggerTo(targets, duration, _defaultImmediateRender(this, toVars, fromVars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };
  p2.call = function(callback, params, scope, position) {
    return this.add(TweenLite.delayedCall(0, callback, params, scope), position);
  };
  p2.set = function(target, vars, position) {
    return this.add(new TweenLite(target, 0, _defaultImmediateRender(this, vars, null, true)), position);
  };
  TimelineLite2.exportRoot = function(vars, ignoreDelayedCalls) {
    vars = vars || {};
    if (vars.smoothChildTiming == null) {
      vars.smoothChildTiming = true;
    }
    var tl = new TimelineLite2(vars), root = tl._timeline, hasNegativeStart, time, tween, next;
    if (ignoreDelayedCalls == null) {
      ignoreDelayedCalls = true;
    }
    root._remove(tl, true);
    tl._startTime = 0;
    tl._rawPrevTime = tl._time = tl._totalTime = root._time;
    tween = root._first;
    while (tween) {
      next = tween._next;
      if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
        time = tween._startTime - tween._delay;
        if (time < 0) {
          hasNegativeStart = 1;
        }
        tl.add(tween, time);
      }
      tween = next;
    }
    root.add(tl, 0);
    if (hasNegativeStart) {
      tl.totalDuration();
    }
    return tl;
  };
  p2.add = function(value, position, align, stagger) {
    var self = this, curTime, l, i, child, tl, beforeRawTime;
    if (typeof position !== "number") {
      position = self._parseTimeOrLabel(position, 0, true, value);
    }
    if (!(value instanceof Animation)) {
      if (value instanceof Array || value && value.push && _isArray(value)) {
        align = align || "normal";
        stagger = stagger || 0;
        curTime = position;
        l = value.length;
        for (i = 0; i < l; i++) {
          if (_isArray(child = value[i])) {
            child = new TimelineLite2({ tweens: child });
          }
          self.add(child, curTime);
          if (typeof child !== "string" && typeof child !== "function") {
            if (align === "sequence") {
              curTime = child._startTime + child.totalDuration() / child._timeScale;
            } else if (align === "start") {
              child._startTime -= child.delay();
            }
          }
          curTime += stagger;
        }
        return self._uncache(true);
      } else if (typeof value === "string") {
        return self.addLabel(value, position);
      } else if (typeof value === "function") {
        value = TweenLite.delayedCall(0, value);
      } else {
        throw "Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.";
      }
    }
    SimpleTimeline.prototype.add.call(self, value, position);
    if (value._time || !value._duration && value._initted) {
      curTime = (self.rawTime() - value._startTime) * value._timeScale;
      if (!value._duration || Math.abs(Math.max(0, Math.min(value.totalDuration(), curTime))) - value._totalTime > 1e-5) {
        value.render(curTime, false, false);
      }
    }
    if (self._gc || self._time === self._duration) {
      if (!self._paused) {
        if (self._duration < self.duration()) {
          tl = self;
          beforeRawTime = tl.rawTime() > value._startTime;
          while (tl._timeline) {
            if (beforeRawTime && tl._timeline.smoothChildTiming) {
              tl.totalTime(tl._totalTime, true);
            } else if (tl._gc) {
              tl._enabled(true, false);
            }
            tl = tl._timeline;
          }
        }
      }
    }
    return self;
  };
  p2.remove = function(value) {
    if (value instanceof Animation) {
      this._remove(value, false);
      var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline;
      value._startTime = (value._paused ? value._pauseTime : tl._time) - (!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale;
      return this;
    } else if (value instanceof Array || value && value.push && _isArray(value)) {
      var i = value.length;
      while (--i > -1) {
        this.remove(value[i]);
      }
      return this;
    } else if (typeof value === "string") {
      return this.removeLabel(value);
    }
    return this.kill(null, value);
  };
  p2._remove = function(tween, skipDisable) {
    SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
    var last = this._last;
    if (!last) {
      this._time = this._totalTime = this._duration = this._totalDuration = 0;
    } else if (this._time > this.duration()) {
      this._time = this._duration;
      this._totalTime = this._totalDuration;
    }
    return this;
  };
  p2.append = function(value, offsetOrLabel) {
    return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
  };
  p2.insert = p2.insertMultiple = function(value, position, align, stagger) {
    return this.add(value, position || 0, align, stagger);
  };
  p2.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
    return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
  };
  p2.addLabel = function(label, position) {
    this._labels[label] = this._parseTimeOrLabel(position);
    return this;
  };
  p2.addPause = function(position, callback, params, scope) {
    var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
    t.vars.onComplete = t.vars.onReverseComplete = callback;
    t.data = "isPause";
    this._hasPause = true;
    return this.add(t, position);
  };
  p2.removeLabel = function(label) {
    delete this._labels[label];
    return this;
  };
  p2.getLabelTime = function(label) {
    return this._labels[label] != null ? this._labels[label] : -1;
  };
  p2._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
    var clippedDuration, i;
    if (ignore instanceof Animation && ignore.timeline === this) {
      this.remove(ignore);
    } else if (ignore && (ignore instanceof Array || ignore.push && _isArray(ignore))) {
      i = ignore.length;
      while (--i > -1) {
        if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
          this.remove(ignore[i]);
        }
      }
    }
    clippedDuration = typeof timeOrLabel === "number" && !offsetOrLabel ? 0 : this.duration() > 99999999999 ? this.recent().endTime(false) : this._duration;
    if (typeof offsetOrLabel === "string") {
      return this._parseTimeOrLabel(offsetOrLabel, appendIfAbsent && typeof timeOrLabel === "number" && this._labels[offsetOrLabel] == null ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
    }
    offsetOrLabel = offsetOrLabel || 0;
    if (typeof timeOrLabel === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) {
      i = timeOrLabel.indexOf("=");
      if (i === -1) {
        if (this._labels[timeOrLabel] == null) {
          return appendIfAbsent ? this._labels[timeOrLabel] = clippedDuration + offsetOrLabel : offsetOrLabel;
        }
        return this._labels[timeOrLabel] + offsetOrLabel;
      }
      offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1));
      timeOrLabel = i > 1 ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : clippedDuration;
    } else if (timeOrLabel == null) {
      timeOrLabel = clippedDuration;
    }
    return Number(timeOrLabel) + offsetOrLabel;
  };
  p2.seek = function(position, suppressEvents) {
    return this.totalTime(typeof position === "number" ? position : this._parseTimeOrLabel(position), suppressEvents !== false);
  };
  p2.stop = function() {
    return this.paused(true);
  };
  p2.gotoAndPlay = function(position, suppressEvents) {
    return this.play(position, suppressEvents);
  };
  p2.gotoAndStop = function(position, suppressEvents) {
    return this.pause(position, suppressEvents);
  };
  p2.render = function(time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }
    var self = this, prevTime = self._time, totalDur = !self._dirty ? self._totalDuration : self.totalDuration(), prevStart = self._startTime, prevTimeScale = self._timeScale, prevPaused = self._paused, tween, isComplete, next, callback, internalForce, pauseTween, curTime, pauseTime;
    if (prevTime !== self._time) {
      time += self._time - prevTime;
    }
    if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
      if (time > prevTime) {
        tween = self._first;
        while (tween && tween._startTime <= time && !pauseTween) {
          if (!tween._duration) {
            if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && self._rawPrevTime === 0)) {
              pauseTween = tween;
            }
          }
          tween = tween._next;
        }
      } else {
        tween = self._last;
        while (tween && tween._startTime >= time && !pauseTween) {
          if (!tween._duration) {
            if (tween.data === "isPause" && tween._rawPrevTime > 0) {
              pauseTween = tween;
            }
          }
          tween = tween._prev;
        }
      }
      if (pauseTween) {
        self._time = self._totalTime = time = pauseTween._startTime;
        pauseTime = self._startTime + (self._reversed ? self._duration - time : time) / self._timeScale;
      }
    }
    if (time >= totalDur - _tinyNum && time >= 0) {
      self._totalTime = self._time = totalDur;
      if (!self._reversed) {
        if (!self._hasPausedChild()) {
          isComplete = true;
          callback = "onComplete";
          internalForce = !!self._timeline.autoRemoveChildren;
          if (self._duration === 0) {
            if (time <= 0 && time >= -_tinyNum || self._rawPrevTime < 0 || self._rawPrevTime === _tinyNum) {
              if (self._rawPrevTime !== time && self._first) {
                internalForce = true;
                if (self._rawPrevTime > _tinyNum) {
                  callback = "onReverseComplete";
                }
              }
            }
          }
        }
      }
      self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
      time = totalDur + 1e-4;
    } else if (time < _tinyNum) {
      self._totalTime = self._time = 0;
      if (time > -_tinyNum) {
        time = 0;
      }
      if (prevTime !== 0 || self._duration === 0 && self._rawPrevTime !== _tinyNum && (self._rawPrevTime > 0 || time < 0 && self._rawPrevTime >= 0)) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }
      if (time < 0) {
        self._active = false;
        if (self._timeline.autoRemoveChildren && self._reversed) {
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (self._rawPrevTime >= 0 && self._first) {
          internalForce = true;
        }
        self._rawPrevTime = time;
      } else {
        self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
        if (time === 0 && isComplete) {
          tween = self._first;
          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }
            tween = tween._next;
          }
        }
        time = 0;
        if (!self._initted) {
          internalForce = true;
        }
      }
    } else {
      self._totalTime = self._time = self._rawPrevTime = time;
    }
    if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
      return;
    } else if (!self._initted) {
      self._initted = true;
    }
    if (!self._active) {
      if (!self._paused && self._time !== prevTime && time > 0) {
        self._active = true;
      }
    }
    if (prevTime === 0) {
      if (self.vars.onStart) {
        if (self._time !== 0 || !self._duration) {
          if (!suppressEvents) {
            self._callback("onStart");
          }
        }
      }
    }
    curTime = self._time;
    if (curTime >= prevTime) {
      tween = self._first;
      while (tween) {
        next = tween._next;
        if (curTime !== self._time || self._paused && !prevPaused) {
          break;
        } else if (tween._active || tween._startTime <= curTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            self.pause();
            self._pauseTime = pauseTime;
          }
          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }
        tween = next;
      }
    } else {
      tween = self._last;
      while (tween) {
        next = tween._prev;
        if (curTime !== self._time || self._paused && !prevPaused) {
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev;
            while (pauseTween && pauseTween.endTime() > self._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }
            pauseTween = null;
            self.pause();
            self._pauseTime = pauseTime;
          }
          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }
        tween = next;
      }
    }
    if (self._onUpdate) {
      if (!suppressEvents) {
        if (_lazyTweens.length) {
          _lazyRender();
        }
        self._callback("onUpdate");
      }
    }
    if (callback) {
      if (!self._gc) {
        if (prevStart === self._startTime || prevTimeScale !== self._timeScale) {
          if (self._time === 0 || totalDur >= self.totalDuration()) {
            if (isComplete) {
              if (_lazyTweens.length) {
                _lazyRender();
              }
              if (self._timeline.autoRemoveChildren) {
                self._enabled(false, false);
              }
              self._active = false;
            }
            if (!suppressEvents && self.vars[callback]) {
              self._callback(callback);
            }
          }
        }
      }
    }
  };
  p2._hasPausedChild = function() {
    var tween = this._first;
    while (tween) {
      if (tween._paused || tween instanceof TimelineLite2 && tween._hasPausedChild()) {
        return true;
      }
      tween = tween._next;
    }
    return false;
  };
  p2.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || -9999999999;
    var a = [], tween = this._first, cnt = 0;
    while (tween) {
      if (tween._startTime < ignoreBeforeTime)
        ;
      else if (tween instanceof TweenLite) {
        if (tweens !== false) {
          a[cnt++] = tween;
        }
      } else {
        if (timelines !== false) {
          a[cnt++] = tween;
        }
        if (nested !== false) {
          a = a.concat(tween.getChildren(true, tweens, timelines));
          cnt = a.length;
        }
      }
      tween = tween._next;
    }
    return a;
  };
  p2.getTweensOf = function(target, nested) {
    var disabled = this._gc, a = [], cnt = 0, tweens, i;
    if (disabled) {
      this._enabled(true, true);
    }
    tweens = TweenLite.getTweensOf(target);
    i = tweens.length;
    while (--i > -1) {
      if (tweens[i].timeline === this || nested && this._contains(tweens[i])) {
        a[cnt++] = tweens[i];
      }
    }
    if (disabled) {
      this._enabled(false, true);
    }
    return a;
  };
  p2.recent = function() {
    return this._recent;
  };
  p2._contains = function(tween) {
    var tl = tween.timeline;
    while (tl) {
      if (tl === this) {
        return true;
      }
      tl = tl.timeline;
    }
    return false;
  };
  p2.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || 0;
    var tween = this._first, labels = this._labels, p3;
    while (tween) {
      if (tween._startTime >= ignoreBeforeTime) {
        tween._startTime += amount;
      }
      tween = tween._next;
    }
    if (adjustLabels) {
      for (p3 in labels) {
        if (labels[p3] >= ignoreBeforeTime) {
          labels[p3] += amount;
        }
      }
    }
    return this._uncache(true);
  };
  p2._kill = function(vars, target) {
    if (!vars && !target) {
      return this._enabled(false, false);
    }
    var tweens = !target ? this.getChildren(true, true, false) : this.getTweensOf(target), i = tweens.length, changed = false;
    while (--i > -1) {
      if (tweens[i]._kill(vars, target)) {
        changed = true;
      }
    }
    return changed;
  };
  p2.clear = function(labels) {
    var tweens = this.getChildren(false, true, true), i = tweens.length;
    this._time = this._totalTime = 0;
    while (--i > -1) {
      tweens[i]._enabled(false, false);
    }
    if (labels !== false) {
      this._labels = {};
    }
    return this._uncache(true);
  };
  p2.invalidate = function() {
    var tween = this._first;
    while (tween) {
      tween.invalidate();
      tween = tween._next;
    }
    return Animation.prototype.invalidate.call(this);
  };
  p2._enabled = function(enabled, ignoreTimeline) {
    if (enabled === this._gc) {
      var tween = this._first;
      while (tween) {
        tween._enabled(enabled, true);
        tween = tween._next;
      }
    }
    return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
  };
  p2.totalTime = function(time, suppressEvents, uncapped) {
    this._forcingPlayhead = true;
    var val = Animation.prototype.totalTime.apply(this, arguments);
    this._forcingPlayhead = false;
    return val;
  };
  p2.duration = function(value) {
    if (!arguments.length) {
      if (this._dirty) {
        this.totalDuration();
      }
      return this._duration;
    }
    if (this.duration() !== 0 && value !== 0) {
      this.timeScale(this._duration / value);
    }
    return this;
  };
  p2.totalDuration = function(value) {
    if (!arguments.length) {
      if (this._dirty) {
        var max = 0, self = this, tween = self._last, prevStart = 999999999999, prev, end;
        while (tween) {
          prev = tween._prev;
          if (tween._dirty) {
            tween.totalDuration();
          }
          if (tween._startTime > prevStart && self._sortChildren && !tween._paused && !self._calculatingDuration) {
            self._calculatingDuration = 1;
            self.add(tween, tween._startTime - tween._delay);
            self._calculatingDuration = 0;
          } else {
            prevStart = tween._startTime;
          }
          if (tween._startTime < 0 && !tween._paused) {
            max -= tween._startTime;
            if (self._timeline.smoothChildTiming) {
              self._startTime += tween._startTime / self._timeScale;
              self._time -= tween._startTime;
              self._totalTime -= tween._startTime;
              self._rawPrevTime -= tween._startTime;
            }
            self.shiftChildren(-tween._startTime, false, -9999999999);
            prevStart = 0;
          }
          end = tween._startTime + tween._totalDuration / tween._timeScale;
          if (end > max) {
            max = end;
          }
          tween = prev;
        }
        self._duration = self._totalDuration = max;
        self._dirty = false;
      }
      return this._totalDuration;
    }
    return value && this.totalDuration() ? this.timeScale(this._totalDuration / value) : this;
  };
  p2.paused = function(value) {
    if (value === false && this._paused) {
      var tween = this._first;
      while (tween) {
        if (tween._startTime === this._time && tween.data === "isPause") {
          tween._rawPrevTime = 0;
        }
        tween = tween._next;
      }
    }
    return Animation.prototype.paused.apply(this, arguments);
  };
  p2.usesFrames = function() {
    var tl = this._timeline;
    while (tl._timeline) {
      tl = tl._timeline;
    }
    return tl === Animation._rootFramesTimeline;
  };
  p2.rawTime = function(wrapRepeats) {
    return wrapRepeats && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
  };
  return TimelineLite2;
}, true);
var TimelineLite = globals.TimelineLite;
/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
_gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function() {
  var TimelineMax2 = function(vars) {
    TimelineLite.call(this, vars);
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._cycle = 0;
    this._yoyo = !!this.vars.yoyo;
    this._dirty = true;
  }, _tinyNum = 1e-8, TweenLiteInternals = TweenLite._internals, _lazyTweens = TweenLiteInternals.lazyTweens, _lazyRender = TweenLiteInternals.lazyRender, _globals2 = _gsScope._gsDefine.globals, _easeNone = new Ease(null, null, 1, 0), p2 = TimelineMax2.prototype = new TimelineLite();
  p2.constructor = TimelineMax2;
  p2.kill()._gc = false;
  TimelineMax2.version = "2.1.3";
  p2.invalidate = function() {
    this._yoyo = !!this.vars.yoyo;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._uncache(true);
    return TimelineLite.prototype.invalidate.call(this);
  };
  p2.addCallback = function(callback, position, params, scope) {
    return this.add(TweenLite.delayedCall(0, callback, params, scope), position);
  };
  p2.removeCallback = function(callback, position) {
    if (callback) {
      if (position == null) {
        this._kill(null, callback);
      } else {
        var a = this.getTweensOf(callback, false), i = a.length, time = this._parseTimeOrLabel(position);
        while (--i > -1) {
          if (a[i]._startTime === time) {
            a[i]._enabled(false, false);
          }
        }
      }
    }
    return this;
  };
  p2.removePause = function(position) {
    return this.removeCallback(TimelineLite._internals.pauseCallback, position);
  };
  p2.tweenTo = function(position, vars) {
    vars = vars || {};
    var copy = { ease: _easeNone, useFrames: this.usesFrames(), immediateRender: false, lazy: false }, Engine = vars.repeat && _globals2.TweenMax || TweenLite, duration, p3, t;
    for (p3 in vars) {
      copy[p3] = vars[p3];
    }
    copy.time = this._parseTimeOrLabel(position);
    duration = Math.abs(Number(copy.time) - this._time) / this._timeScale || 1e-3;
    t = new Engine(this, duration, copy);
    copy.onStart = function() {
      t.target.paused(true);
      if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) {
        t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale).render(t.time(), true, true);
      }
      if (vars.onStart) {
        vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []);
      }
    };
    return t;
  };
  p2.tweenFromTo = function(fromPosition, toPosition, vars) {
    vars = vars || {};
    fromPosition = this._parseTimeOrLabel(fromPosition);
    vars.startAt = { onComplete: this.seek, onCompleteParams: [fromPosition], callbackScope: this };
    vars.immediateRender = vars.immediateRender !== false;
    var t = this.tweenTo(toPosition, vars);
    t.isFromTo = 1;
    return t.duration(Math.abs(t.vars.time - fromPosition) / this._timeScale || 1e-3);
  };
  p2.render = function(time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }
    var self = this, prevTime = self._time, totalDur = !self._dirty ? self._totalDuration : self.totalDuration(), dur = self._duration, prevTotalTime = self._totalTime, prevStart = self._startTime, prevTimeScale = self._timeScale, prevRawPrevTime = self._rawPrevTime, prevPaused = self._paused, prevCycle = self._cycle, tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime, pauseTime;
    if (prevTime !== self._time) {
      time += self._time - prevTime;
    }
    if (time >= totalDur - _tinyNum && time >= 0) {
      if (!self._locked) {
        self._totalTime = totalDur;
        self._cycle = self._repeat;
      }
      if (!self._reversed) {
        if (!self._hasPausedChild()) {
          isComplete = true;
          callback = "onComplete";
          internalForce = !!self._timeline.autoRemoveChildren;
          if (self._duration === 0) {
            if (time <= 0 && time >= -_tinyNum || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) {
              if (prevRawPrevTime !== time && self._first) {
                internalForce = true;
                if (prevRawPrevTime > _tinyNum) {
                  callback = "onReverseComplete";
                }
              }
            }
          }
        }
      }
      self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
      if (self._yoyo && self._cycle & 1) {
        self._time = time = 0;
      } else {
        self._time = dur;
        time = dur + 1e-4;
      }
    } else if (time < _tinyNum) {
      if (!self._locked) {
        self._totalTime = self._cycle = 0;
      }
      self._time = 0;
      if (time > -_tinyNum) {
        time = 0;
      }
      if (prevTime !== 0 || dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || time < 0 && prevRawPrevTime >= 0) && !self._locked) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }
      if (time < 0) {
        self._active = false;
        if (self._timeline.autoRemoveChildren && self._reversed) {
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (prevRawPrevTime >= 0 && self._first) {
          internalForce = true;
        }
        self._rawPrevTime = time;
      } else {
        self._rawPrevTime = dur || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
        if (time === 0 && isComplete) {
          tween = self._first;
          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }
            tween = tween._next;
          }
        }
        time = 0;
        if (!self._initted) {
          internalForce = true;
        }
      }
    } else {
      if (dur === 0 && prevRawPrevTime < 0) {
        internalForce = true;
      }
      self._time = self._rawPrevTime = time;
      if (!self._locked) {
        self._totalTime = time;
        if (self._repeat !== 0) {
          cycleDuration = dur + self._repeatDelay;
          self._cycle = self._totalTime / cycleDuration >> 0;
          if (self._cycle) {
            if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) {
              self._cycle--;
            }
          }
          self._time = self._totalTime - self._cycle * cycleDuration;
          if (self._yoyo) {
            if (self._cycle & 1) {
              self._time = dur - self._time;
            }
          }
          if (self._time > dur) {
            self._time = dur;
            time = dur + 1e-4;
          } else if (self._time < 0) {
            self._time = time = 0;
          } else {
            time = self._time;
          }
        }
      }
    }
    if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
      time = self._time;
      if (time > prevTime || self._repeat && prevCycle !== self._cycle) {
        tween = self._first;
        while (tween && tween._startTime <= time && !pauseTween) {
          if (!tween._duration) {
            if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && self._rawPrevTime === 0)) {
              pauseTween = tween;
            }
          }
          tween = tween._next;
        }
      } else {
        tween = self._last;
        while (tween && tween._startTime >= time && !pauseTween) {
          if (!tween._duration) {
            if (tween.data === "isPause" && tween._rawPrevTime > 0) {
              pauseTween = tween;
            }
          }
          tween = tween._prev;
        }
      }
      if (pauseTween) {
        pauseTime = self._startTime + (self._reversed ? self._duration - pauseTween._startTime : pauseTween._startTime) / self._timeScale;
        if (pauseTween._startTime < dur) {
          self._time = self._rawPrevTime = time = pauseTween._startTime;
          self._totalTime = time + self._cycle * (self._totalDuration + self._repeatDelay);
        }
      }
    }
    if (self._cycle !== prevCycle) {
      if (!self._locked) {
        var backwards = self._yoyo && (prevCycle & 1) !== 0, wrap = backwards === (self._yoyo && (self._cycle & 1) !== 0), recTotalTime = self._totalTime, recCycle = self._cycle, recRawPrevTime = self._rawPrevTime, recTime = self._time;
        self._totalTime = prevCycle * dur;
        if (self._cycle < prevCycle) {
          backwards = !backwards;
        } else {
          self._totalTime += dur;
        }
        self._time = prevTime;
        self._rawPrevTime = dur === 0 ? prevRawPrevTime - 1e-4 : prevRawPrevTime;
        self._cycle = prevCycle;
        self._locked = true;
        prevTime = backwards ? 0 : dur;
        self.render(prevTime, suppressEvents, dur === 0);
        if (!suppressEvents) {
          if (!self._gc) {
            if (self.vars.onRepeat) {
              self._cycle = recCycle;
              self._locked = false;
              self._callback("onRepeat");
            }
          }
        }
        if (prevTime !== self._time) {
          return;
        }
        if (wrap) {
          self._cycle = prevCycle;
          self._locked = true;
          prevTime = backwards ? dur + 1e-4 : -1e-4;
          self.render(prevTime, true, false);
        }
        self._locked = false;
        if (self._paused && !prevPaused) {
          return;
        }
        self._time = recTime;
        self._totalTime = recTotalTime;
        self._cycle = recCycle;
        self._rawPrevTime = recRawPrevTime;
      }
    }
    if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
      if (prevTotalTime !== self._totalTime) {
        if (self._onUpdate) {
          if (!suppressEvents) {
            self._callback("onUpdate");
          }
        }
      }
      return;
    } else if (!self._initted) {
      self._initted = true;
    }
    if (!self._active) {
      if (!self._paused && self._totalTime !== prevTotalTime && time > 0) {
        self._active = true;
      }
    }
    if (prevTotalTime === 0) {
      if (self.vars.onStart) {
        if (self._totalTime !== 0 || !self._totalDuration) {
          if (!suppressEvents) {
            self._callback("onStart");
          }
        }
      }
    }
    curTime = self._time;
    if (curTime >= prevTime) {
      tween = self._first;
      while (tween) {
        next = tween._next;
        if (curTime !== self._time || self._paused && !prevPaused) {
          break;
        } else if (tween._active || tween._startTime <= self._time && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            self.pause();
            self._pauseTime = pauseTime;
          }
          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }
        tween = next;
      }
    } else {
      tween = self._last;
      while (tween) {
        next = tween._prev;
        if (curTime !== self._time || self._paused && !prevPaused) {
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev;
            while (pauseTween && pauseTween.endTime() > self._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }
            pauseTween = null;
            self.pause();
            self._pauseTime = pauseTime;
          }
          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }
        tween = next;
      }
    }
    if (self._onUpdate) {
      if (!suppressEvents) {
        if (_lazyTweens.length) {
          _lazyRender();
        }
        self._callback("onUpdate");
      }
    }
    if (callback) {
      if (!self._locked) {
        if (!self._gc) {
          if (prevStart === self._startTime || prevTimeScale !== self._timeScale) {
            if (self._time === 0 || totalDur >= self.totalDuration()) {
              if (isComplete) {
                if (_lazyTweens.length) {
                  _lazyRender();
                }
                if (self._timeline.autoRemoveChildren) {
                  self._enabled(false, false);
                }
                self._active = false;
              }
              if (!suppressEvents && self.vars[callback]) {
                self._callback(callback);
              }
            }
          }
        }
      }
    }
  };
  p2.getActive = function(nested, tweens, timelines) {
    var a = [], all = this.getChildren(nested || nested == null, tweens || nested == null, !!timelines), cnt = 0, l = all.length, i, tween;
    for (i = 0; i < l; i++) {
      tween = all[i];
      if (tween.isActive()) {
        a[cnt++] = tween;
      }
    }
    return a;
  };
  p2.getLabelAfter = function(time) {
    if (!time) {
      if (time !== 0) {
        time = this._time;
      }
    }
    var labels = this.getLabelsArray(), l = labels.length, i;
    for (i = 0; i < l; i++) {
      if (labels[i].time > time) {
        return labels[i].name;
      }
    }
    return null;
  };
  p2.getLabelBefore = function(time) {
    if (time == null) {
      time = this._time;
    }
    var labels = this.getLabelsArray(), i = labels.length;
    while (--i > -1) {
      if (labels[i].time < time) {
        return labels[i].name;
      }
    }
    return null;
  };
  p2.getLabelsArray = function() {
    var a = [], cnt = 0, p3;
    for (p3 in this._labels) {
      a[cnt++] = { time: this._labels[p3], name: p3 };
    }
    a.sort(function(a2, b) {
      return a2.time - b.time;
    });
    return a;
  };
  p2.invalidate = function() {
    this._locked = false;
    return TimelineLite.prototype.invalidate.call(this);
  };
  p2.progress = function(value, suppressEvents) {
    return !arguments.length ? this._time / this.duration() || 0 : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };
  p2.totalProgress = function(value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() || 0 : this.totalTime(this.totalDuration() * value, suppressEvents);
  };
  p2.totalDuration = function(value) {
    if (!arguments.length) {
      if (this._dirty) {
        TimelineLite.prototype.totalDuration.call(this);
        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
      }
      return this._totalDuration;
    }
    return this._repeat === -1 || !value ? this : this.timeScale(this.totalDuration() / value);
  };
  p2.time = function(value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }
    if (this._dirty) {
      this.totalDuration();
    }
    var duration = this._duration, cycle = this._cycle, cycleDur = cycle * (duration + this._repeatDelay);
    if (value > duration) {
      value = duration;
    }
    return this.totalTime(this._yoyo && cycle & 1 ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
  };
  p2.repeat = function(value) {
    if (!arguments.length) {
      return this._repeat;
    }
    this._repeat = value;
    return this._uncache(true);
  };
  p2.repeatDelay = function(value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }
    this._repeatDelay = value;
    return this._uncache(true);
  };
  p2.yoyo = function(value) {
    if (!arguments.length) {
      return this._yoyo;
    }
    this._yoyo = value;
    return this;
  };
  p2.currentLabel = function(value) {
    if (!arguments.length) {
      return this.getLabelBefore(this._time + _tinyNum);
    }
    return this.seek(value, true);
  };
  return TimelineMax2;
}, true);
var TimelineMax = globals.TimelineMax;
/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function() {
  var _slice = function(a) {
    var b = [], l = a.length, i;
    for (i = 0; i !== l; b.push(a[i++]))
      ;
    return b;
  }, _applyCycle = function(vars, targets, i) {
    var alt = vars.cycle, p3, val;
    for (p3 in alt) {
      val = alt[p3];
      vars[p3] = typeof val === "function" ? val(i, targets[i], targets) : val[i % val.length];
    }
    delete vars.cycle;
  }, _distribute = function(v) {
    if (typeof v === "function") {
      return v;
    }
    var vars = typeof v === "object" ? v : { each: v }, ease = vars.ease, from = vars.from || 0, base = vars.base || 0, cache = {}, isFromKeyword = isNaN(from), axis = vars.axis, ratio = { center: 0.5, end: 1 }[from] || 0;
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrap;
      if (!distances) {
        wrap = vars.grid === "auto" ? 0 : (vars.grid || [Infinity])[0];
        if (!wrap) {
          max = -Infinity;
          while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) {
          }
          wrap--;
        }
        distances = cache[l] = [];
        originX = isFromKeyword ? Math.min(wrap, l) * ratio - 0.5 : from % wrap;
        originY = isFromKeyword ? l * ratio / wrap - 0.5 : from / wrap | 0;
        max = 0;
        min = Infinity;
        for (j = 0; j < l; j++) {
          x = j % wrap - originX;
          y = originY - (j / wrap | 0);
          distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          if (d > max) {
            max = d;
          }
          if (d < min) {
            min = d;
          }
        }
        distances.max = max - min;
        distances.min = min;
        distances.v = l = vars.amount || vars.each * (wrap > l ? l - 1 : !axis ? Math.max(wrap, l / wrap) : axis === "y" ? l / wrap : wrap) || 0;
        distances.b = l < 0 ? base - l : base;
      }
      l = (distances[i] - distances.min) / distances.max;
      return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
    };
  }, TweenMax2 = function(target, duration, vars) {
    TweenLite.call(this, target, duration, vars);
    this._cycle = 0;
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    if (this._repeat) {
      this._uncache(true);
    }
    this.render = TweenMax2.prototype.render;
  }, _tinyNum = 1e-8, TweenLiteInternals = TweenLite._internals, _isSelector = TweenLiteInternals.isSelector, _isArray = TweenLiteInternals.isArray, p2 = TweenMax2.prototype = TweenLite.to({}, 0.1, {}), _blankArray = [];
  TweenMax2.version = "2.1.3";
  p2.constructor = TweenMax2;
  p2.kill()._gc = false;
  TweenMax2.killTweensOf = TweenMax2.killDelayedCallsTo = TweenLite.killTweensOf;
  TweenMax2.getTweensOf = TweenLite.getTweensOf;
  TweenMax2.lagSmoothing = TweenLite.lagSmoothing;
  TweenMax2.ticker = TweenLite.ticker;
  TweenMax2.render = TweenLite.render;
  TweenMax2.distribute = _distribute;
  p2.invalidate = function() {
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._yoyoEase = null;
    this._uncache(true);
    return TweenLite.prototype.invalidate.call(this);
  };
  p2.updateTo = function(vars, resetDuration) {
    var self = this, curRatio = self.ratio, immediate = self.vars.immediateRender || vars.immediateRender, p3;
    if (resetDuration && self._startTime < self._timeline._time) {
      self._startTime = self._timeline._time;
      self._uncache(false);
      if (self._gc) {
        self._enabled(true, false);
      } else {
        self._timeline.insert(self, self._startTime - self._delay);
      }
    }
    for (p3 in vars) {
      self.vars[p3] = vars[p3];
    }
    if (self._initted || immediate) {
      if (resetDuration) {
        self._initted = false;
        if (immediate) {
          self.render(0, true, true);
        }
      } else {
        if (self._gc) {
          self._enabled(true, false);
        }
        if (self._notifyPluginsOfEnabled && self._firstPT) {
          TweenLite._onPluginEvent("_onDisable", self);
        }
        if (self._time / self._duration > 0.998) {
          var prevTime = self._totalTime;
          self.render(0, true, false);
          self._initted = false;
          self.render(prevTime, true, false);
        } else {
          self._initted = false;
          self._init();
          if (self._time > 0 || immediate) {
            var inv = 1 / (1 - curRatio), pt = self._firstPT, endValue;
            while (pt) {
              endValue = pt.s + pt.c;
              pt.c *= inv;
              pt.s = endValue - pt.c;
              pt = pt._next;
            }
          }
        }
      }
    }
    return self;
  };
  p2.render = function(time, suppressEvents, force) {
    if (!this._initted) {
      if (this._duration === 0 && this.vars.repeat) {
        this.invalidate();
      }
    }
    var self = this, totalDur = !self._dirty ? self._totalDuration : self.totalDuration(), prevTime = self._time, prevTotalTime = self._totalTime, prevCycle = self._cycle, duration = self._duration, prevRawPrevTime = self._rawPrevTime, isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime, yoyoEase;
    if (time >= totalDur - _tinyNum && time >= 0) {
      self._totalTime = totalDur;
      self._cycle = self._repeat;
      if (self._yoyo && (self._cycle & 1) !== 0) {
        self._time = 0;
        self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
      } else {
        self._time = duration;
        self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
      }
      if (!self._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || self._timeline.autoRemoveChildren;
      }
      if (duration === 0) {
        if (self._initted || !self.vars.lazy || force) {
          if (self._startTime === self._timeline._duration) {
            time = 0;
          }
          if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && self.data !== "isPause") {
            if (prevRawPrevTime !== time) {
              force = true;
              if (prevRawPrevTime > _tinyNum) {
                callback = "onReverseComplete";
              }
            }
          }
          self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
        }
      }
    } else if (time < _tinyNum) {
      self._totalTime = self._time = self._cycle = 0;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
      if (prevTotalTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }
      if (time > -_tinyNum) {
        time = 0;
      } else if (time < 0) {
        self._active = false;
        if (duration === 0) {
          if (self._initted || !self.vars.lazy || force) {
            if (prevRawPrevTime >= 0) {
              force = true;
            }
            self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
          }
        }
      }
      if (!self._initted) {
        force = true;
      }
    } else {
      self._totalTime = self._time = time;
      if (self._repeat !== 0) {
        cycleDuration = duration + self._repeatDelay;
        self._cycle = self._totalTime / cycleDuration >> 0;
        if (self._cycle !== 0) {
          if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) {
            self._cycle--;
          }
        }
        self._time = self._totalTime - self._cycle * cycleDuration;
        if (self._yoyo) {
          if ((self._cycle & 1) !== 0) {
            self._time = duration - self._time;
            yoyoEase = self._yoyoEase || self.vars.yoyoEase;
            if (yoyoEase) {
              if (!self._yoyoEase) {
                if (yoyoEase === true && !self._initted) {
                  yoyoEase = self.vars.ease;
                  self._yoyoEase = yoyoEase = !yoyoEase ? TweenLite.defaultEase : yoyoEase instanceof Ease ? yoyoEase : typeof yoyoEase === "function" ? new Ease(yoyoEase, self.vars.easeParams) : Ease.map[yoyoEase] || TweenLite.defaultEase;
                } else {
                  self._yoyoEase = yoyoEase = yoyoEase === true ? self._ease : yoyoEase instanceof Ease ? yoyoEase : Ease.map[yoyoEase];
                }
              }
              self.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - self._time) / duration) : 0;
            }
          }
        }
        if (self._time > duration) {
          self._time = duration;
        } else if (self._time < 0) {
          self._time = 0;
        }
      }
      if (self._easeType && !yoyoEase) {
        r = self._time / duration;
        type = self._easeType;
        pow = self._easePower;
        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }
        if (type === 3) {
          r *= 2;
        }
        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }
        self.ratio = type === 1 ? 1 - r : type === 2 ? r : self._time / duration < 0.5 ? r / 2 : 1 - r / 2;
      } else if (!yoyoEase) {
        self.ratio = self._ease.getRatio(self._time / duration);
      }
    }
    if (prevTime === self._time && !force && prevCycle === self._cycle) {
      if (prevTotalTime !== self._totalTime) {
        if (self._onUpdate) {
          if (!suppressEvents) {
            self._callback("onUpdate");
          }
        }
      }
      return;
    } else if (!self._initted) {
      self._init();
      if (!self._initted || self._gc) {
        return;
      } else if (!force && self._firstPT && (self.vars.lazy !== false && self._duration || self.vars.lazy && !self._duration)) {
        self._time = prevTime;
        self._totalTime = prevTotalTime;
        self._rawPrevTime = prevRawPrevTime;
        self._cycle = prevCycle;
        TweenLiteInternals.lazyTweens.push(self);
        self._lazy = [time, suppressEvents];
        return;
      }
      if (self._time && !isComplete && !yoyoEase) {
        self.ratio = self._ease.getRatio(self._time / duration);
      } else if (isComplete && this._ease._calcEnd && !yoyoEase) {
        self.ratio = self._ease.getRatio(self._time === 0 ? 0 : 1);
      }
    }
    if (self._lazy !== false) {
      self._lazy = false;
    }
    if (!self._active) {
      if (!self._paused && self._time !== prevTime && time >= 0) {
        self._active = true;
      }
    }
    if (prevTotalTime === 0) {
      if (self._initted === 2 && time > 0) {
        self._init();
      }
      if (self._startAt) {
        if (time >= 0) {
          self._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS";
        }
      }
      if (self.vars.onStart) {
        if (self._totalTime !== 0 || duration === 0) {
          if (!suppressEvents) {
            self._callback("onStart");
          }
        }
      }
    }
    pt = self._firstPT;
    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * self.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * self.ratio + pt.s;
      }
      pt = pt._next;
    }
    if (self._onUpdate) {
      if (time < 0) {
        if (self._startAt && self._startTime) {
          self._startAt.render(time, true, force);
        }
      }
      if (!suppressEvents) {
        if (self._totalTime !== prevTotalTime || callback) {
          self._callback("onUpdate");
        }
      }
    }
    if (self._cycle !== prevCycle) {
      if (!suppressEvents) {
        if (!self._gc) {
          if (self.vars.onRepeat) {
            self._callback("onRepeat");
          }
        }
      }
    }
    if (callback) {
      if (!self._gc || force) {
        if (time < 0 && self._startAt && !self._onUpdate && self._startTime) {
          self._startAt.render(time, true, force);
        }
        if (isComplete) {
          if (self._timeline.autoRemoveChildren) {
            self._enabled(false, false);
          }
          self._active = false;
        }
        if (!suppressEvents && self.vars[callback]) {
          self._callback(callback);
        }
        if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
          self._rawPrevTime = 0;
        }
      }
    }
  };
  TweenMax2.to = function(target, duration, vars) {
    return new TweenMax2(target, duration, vars);
  };
  TweenMax2.from = function(target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenMax2(target, duration, vars);
  };
  TweenMax2.fromTo = function(target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenMax2(target, duration, toVars);
  };
  TweenMax2.staggerTo = TweenMax2.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    var a = [], staggerFunc = _distribute(vars.stagger || stagger), cycle = vars.cycle, fromCycle = (vars.startAt || _blankArray).cycle, l, copy, i, p3;
    if (!_isArray(targets)) {
      if (typeof targets === "string") {
        targets = TweenLite.selector(targets) || targets;
      }
      if (_isSelector(targets)) {
        targets = _slice(targets);
      }
    }
    targets = targets || [];
    l = targets.length - 1;
    for (i = 0; i <= l; i++) {
      copy = {};
      for (p3 in vars) {
        copy[p3] = vars[p3];
      }
      if (cycle) {
        _applyCycle(copy, targets, i);
        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }
      if (fromCycle) {
        fromCycle = copy.startAt = {};
        for (p3 in vars.startAt) {
          fromCycle[p3] = vars.startAt[p3];
        }
        _applyCycle(copy.startAt, targets, i);
      }
      copy.delay = staggerFunc(i, targets[i], targets) + (copy.delay || 0);
      if (i === l && onCompleteAll) {
        copy.onComplete = function() {
          if (vars.onComplete) {
            vars.onComplete.apply(vars.onCompleteScope || this, arguments);
          }
          onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
        };
      }
      a[i] = new TweenMax2(targets[i], duration, copy);
    }
    return a;
  };
  TweenMax2.staggerFrom = TweenMax2.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return TweenMax2.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };
  TweenMax2.staggerFromTo = TweenMax2.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return TweenMax2.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };
  TweenMax2.delayedCall = function(delay, callback, params, scope, useFrames) {
    return new TweenMax2(callback, 0, { delay, onComplete: callback, onCompleteParams: params, callbackScope: scope, onReverseComplete: callback, onReverseCompleteParams: params, immediateRender: false, useFrames, overwrite: 0 });
  };
  TweenMax2.set = function(target, vars) {
    return new TweenMax2(target, 0, vars);
  };
  TweenMax2.isTweening = function(target) {
    return TweenLite.getTweensOf(target, true).length > 0;
  };
  var _getChildrenOf = function(timeline, includeTimelines) {
    var a = [], cnt = 0, tween = timeline._first;
    while (tween) {
      if (tween instanceof TweenLite) {
        a[cnt++] = tween;
      } else {
        if (includeTimelines) {
          a[cnt++] = tween;
        }
        a = a.concat(_getChildrenOf(tween, includeTimelines));
        cnt = a.length;
      }
      tween = tween._next;
    }
    return a;
  }, getAllTweens = TweenMax2.getAllTweens = function(includeTimelines) {
    return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat(_getChildrenOf(Animation._rootFramesTimeline, includeTimelines));
  };
  TweenMax2.killAll = function(complete, tweens, delayedCalls, timelines) {
    if (tweens == null) {
      tweens = true;
    }
    if (delayedCalls == null) {
      delayedCalls = true;
    }
    var a = getAllTweens(timelines != false), l = a.length, allTrue = tweens && delayedCalls && timelines, isDC, tween, i;
    for (i = 0; i < l; i++) {
      tween = a[i];
      if (allTrue || tween instanceof SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        if (complete) {
          tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
        } else {
          tween._enabled(false, false);
        }
      }
    }
  };
  TweenMax2.killChildTweensOf = function(parent, complete) {
    if (parent == null) {
      return;
    }
    var tl = TweenLiteInternals.tweenLookup, a, curParent, p3, i, l;
    if (typeof parent === "string") {
      parent = TweenLite.selector(parent) || parent;
    }
    if (_isSelector(parent)) {
      parent = _slice(parent);
    }
    if (_isArray(parent)) {
      i = parent.length;
      while (--i > -1) {
        TweenMax2.killChildTweensOf(parent[i], complete);
      }
      return;
    }
    a = [];
    for (p3 in tl) {
      curParent = tl[p3].target.parentNode;
      while (curParent) {
        if (curParent === parent) {
          a = a.concat(tl[p3].tweens);
        }
        curParent = curParent.parentNode;
      }
    }
    l = a.length;
    for (i = 0; i < l; i++) {
      if (complete) {
        a[i].totalTime(a[i].totalDuration());
      }
      a[i]._enabled(false, false);
    }
  };
  var _changePause = function(pause, tweens, delayedCalls, timelines) {
    tweens = tweens !== false;
    delayedCalls = delayedCalls !== false;
    timelines = timelines !== false;
    var a = getAllTweens(timelines), allTrue = tweens && delayedCalls && timelines, i = a.length, isDC, tween;
    while (--i > -1) {
      tween = a[i];
      if (allTrue || tween instanceof SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        tween.paused(pause);
      }
    }
  };
  TweenMax2.pauseAll = function(tweens, delayedCalls, timelines) {
    _changePause(true, tweens, delayedCalls, timelines);
  };
  TweenMax2.resumeAll = function(tweens, delayedCalls, timelines) {
    _changePause(false, tweens, delayedCalls, timelines);
  };
  TweenMax2.globalTimeScale = function(value) {
    var tl = Animation._rootTimeline, t = TweenLite.ticker.time;
    if (!arguments.length) {
      return tl._timeScale;
    }
    value = value || _tinyNum;
    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl = Animation._rootFramesTimeline;
    t = TweenLite.ticker.frame;
    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl._timeScale = Animation._rootTimeline._timeScale = value;
    return value;
  };
  p2.progress = function(value, suppressEvents) {
    return !arguments.length ? this.duration() ? this._time / this._duration : this.ratio : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };
  p2.totalProgress = function(value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, suppressEvents);
  };
  p2.time = function(value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }
    if (this._dirty) {
      this.totalDuration();
    }
    var duration = this._duration, cycle = this._cycle, cycleDur = cycle * (duration + this._repeatDelay);
    if (value > duration) {
      value = duration;
    }
    return this.totalTime(this._yoyo && cycle & 1 ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
  };
  p2.duration = function(value) {
    if (!arguments.length) {
      return this._duration;
    }
    return Animation.prototype.duration.call(this, value);
  };
  p2.totalDuration = function(value) {
    if (!arguments.length) {
      if (this._dirty) {
        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
        this._dirty = false;
      }
      return this._totalDuration;
    }
    return this._repeat === -1 ? this : this.duration((value - this._repeat * this._repeatDelay) / (this._repeat + 1));
  };
  p2.repeat = function(value) {
    if (!arguments.length) {
      return this._repeat;
    }
    this._repeat = value;
    return this._uncache(true);
  };
  p2.repeatDelay = function(value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }
    this._repeatDelay = value;
    return this._uncache(true);
  };
  p2.yoyo = function(value) {
    if (!arguments.length) {
      return this._yoyo;
    }
    this._yoyo = value;
    return this;
  };
  return TweenMax2;
}, true);
var TweenMax$1 = globals.TweenMax;
/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function() {
  var CSSPlugin2 = function() {
    TweenPlugin.call(this, "css");
    this._overwriteProps.length = 0;
    this.setRatio = CSSPlugin2.prototype.setRatio;
  }, _globals2 = _gsScope._gsDefine.globals, _hasPriority, _suffixMap, _cs, _overwriteProps, _specialProps = {}, p2 = CSSPlugin2.prototype = new TweenPlugin("css");
  p2.constructor = CSSPlugin2;
  CSSPlugin2.version = "2.1.3";
  CSSPlugin2.API = 2;
  CSSPlugin2.defaultTransformPerspective = 0;
  CSSPlugin2.defaultSkewType = "compensated";
  CSSPlugin2.defaultSmoothOrigin = true;
  p2 = "px";
  CSSPlugin2.suffixMap = { top: p2, right: p2, bottom: p2, left: p2, width: p2, height: p2, fontSize: p2, padding: p2, margin: p2, perspective: p2, lineHeight: "" };
  var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g, _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, _valuesExpWithCommas = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi, _NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g, _opacityExp = /opacity *= *([^)]*)/i, _opacityValExp = /opacity:([^;]*)/i, _alphaFilterExp = /alpha\(opacity *=.+?\)/i, _rgbhslExp = /^(rgb|hsl)/, _capsExp = /([A-Z])/g, _camelExp = /-([a-z])/gi, _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, _camelFunc = function(s, g) {
    return g.toUpperCase();
  }, _horizExp = /(?:Left|Right|Width)/i, _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, _complexExp = /[\s,\(]/i, _DEG2RAD = Math.PI / 180, _RAD2DEG2 = 180 / Math.PI, _forcePT = {}, _dummyElement = { style: {} }, _doc = _gsScope.document || { createElement: function() {
    return _dummyElement;
  } }, _createElement = function(type, ns) {
    var e = _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
    return e.style ? e : _doc.createElement(type);
  }, _tempDiv = _createElement("div"), _tempImg = _createElement("img"), _internals = CSSPlugin2._internals = { _specialProps }, _agent = (_gsScope.navigator || {}).userAgent || "", _autoRound, _reqSafariFix, _isSafari, _isFirefox, _isSafariLT6, _ieVers, _supportsOpacity = function() {
    var i2 = _agent.indexOf("Android"), a = _createElement("a");
    _isSafari = _agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i2 === -1 || parseFloat(_agent.substr(i2 + 8, 2)) > 3);
    _isSafariLT6 = _isSafari && parseFloat(_agent.substr(_agent.indexOf("Version/") + 8, 2)) < 6;
    _isFirefox = _agent.indexOf("Firefox") !== -1;
    if (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_agent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_agent)) {
      _ieVers = parseFloat(RegExp.$1);
    }
    if (!a) {
      return false;
    }
    a.style.cssText = "top:1px;opacity:.55;";
    return /^0.55/.test(a.style.opacity);
  }(), _getIEOpacity = function(v) {
    return _opacityExp.test(typeof v === "string" ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
  }, _log = function(s) {
    if (_gsScope.console) {
      console.log(s);
    }
  }, _target, _index, _prefixCSS = "", _prefix = "", _checkPropPrefix = function(p3, e) {
    e = e || _tempDiv;
    var s = e.style, a, i2;
    if (s[p3] !== void 0) {
      return p3;
    }
    p3 = p3.charAt(0).toUpperCase() + p3.substr(1);
    a = ["O", "Moz", "ms", "Ms", "Webkit"];
    i2 = 5;
    while (--i2 > -1 && s[a[i2] + p3] === void 0) {
    }
    if (i2 >= 0) {
      _prefix = i2 === 3 ? "ms" : a[i2];
      _prefixCSS = "-" + _prefix.toLowerCase() + "-";
      return _prefix + p3;
    }
    return null;
  }, _computedStyleScope = _doc.defaultView || { getComputedStyle: function() {
  } }, _getComputedStyle = function(e) {
    return _computedStyleScope.getComputedStyle(e);
  }, _getStyle = CSSPlugin2.getStyle = function(t, p3, cs, calc, dflt) {
    var rv;
    if (!_supportsOpacity) {
      if (p3 === "opacity") {
        return _getIEOpacity(t);
      }
    }
    if (!calc && t.style[p3]) {
      rv = t.style[p3];
    } else if (cs = cs || _getComputedStyle(t)) {
      rv = cs[p3] || cs.getPropertyValue(p3) || cs.getPropertyValue(p3.replace(_capsExp, "-$1").toLowerCase());
    } else if (t.currentStyle) {
      rv = t.currentStyle[p3];
    }
    return dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto") ? dflt : rv;
  }, _convertToPixels = _internals.convertToPixels = function(t, p3, v, sfx, recurse) {
    if (sfx === "px" || !sfx && p3 !== "lineHeight") {
      return v;
    }
    if (sfx === "auto" || !v) {
      return 0;
    }
    var horiz = _horizExp.test(p3), node = t, style = _tempDiv.style, neg = v < 0, precise = v === 1, pix, cache, time;
    if (neg) {
      v = -v;
    }
    if (precise) {
      v *= 100;
    }
    if (p3 === "lineHeight" && !sfx) {
      cache = _getComputedStyle(t).lineHeight;
      t.style.lineHeight = v;
      pix = parseFloat(_getComputedStyle(t).lineHeight);
      t.style.lineHeight = cache;
    } else if (sfx === "%" && p3.indexOf("border") !== -1) {
      pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight);
    } else {
      style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
      if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
        node = t.parentNode || _doc.body;
        if (_getStyle(node, "display").indexOf("flex") !== -1) {
          style.position = "absolute";
        }
        cache = node._gsCache;
        time = TweenLite.ticker.frame;
        if (cache && horiz && cache.time === time) {
          return cache.width * v / 100;
        }
        style[horiz ? "width" : "height"] = v + sfx;
      } else {
        style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
      }
      node.appendChild(_tempDiv);
      pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]);
      node.removeChild(_tempDiv);
      if (horiz && sfx === "%" && CSSPlugin2.cacheWidths !== false) {
        cache = node._gsCache = node._gsCache || {};
        cache.time = time;
        cache.width = pix / v * 100;
      }
      if (pix === 0 && !recurse) {
        pix = _convertToPixels(t, p3, v, sfx, true);
      }
    }
    if (precise) {
      pix /= 100;
    }
    return neg ? -pix : pix;
  }, _calculateOffset = _internals.calculateOffset = function(t, p3, cs) {
    if (_getStyle(t, "position", cs) !== "absolute") {
      return 0;
    }
    var dim = p3 === "left" ? "Left" : "Top", v = _getStyle(t, "margin" + dim, cs);
    return t["offset" + dim] - (_convertToPixels(t, p3, parseFloat(v), v.replace(_suffixExp, "")) || 0);
  }, _getAllStyles = function(t, cs) {
    var s = {}, i2, tr, p3;
    if (cs = cs || _getComputedStyle(t)) {
      if (i2 = cs.length) {
        while (--i2 > -1) {
          p3 = cs[i2];
          if (p3.indexOf("-transform") === -1 || _transformPropCSS === p3) {
            s[p3.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p3);
          }
        }
      } else {
        for (i2 in cs) {
          if (i2.indexOf("Transform") === -1 || _transformProp === i2) {
            s[i2] = cs[i2];
          }
        }
      }
    } else if (cs = t.currentStyle || t.style) {
      for (i2 in cs) {
        if (typeof i2 === "string" && s[i2] === void 0) {
          s[i2.replace(_camelExp, _camelFunc)] = cs[i2];
        }
      }
    }
    if (!_supportsOpacity) {
      s.opacity = _getIEOpacity(t);
    }
    tr = _getTransform(t, cs, false);
    s.rotation = tr.rotation;
    s.skewX = tr.skewX;
    s.scaleX = tr.scaleX;
    s.scaleY = tr.scaleY;
    s.x = tr.x;
    s.y = tr.y;
    if (_supports3D) {
      s.z = tr.z;
      s.rotationX = tr.rotationX;
      s.rotationY = tr.rotationY;
      s.scaleZ = tr.scaleZ;
    }
    if (s.filters) {
      delete s.filters;
    }
    return s;
  }, _cssDif = function(t, s1, s2, vars, forceLookup) {
    var difs = {}, style = t.style, val, p3, mpt;
    for (p3 in s2) {
      if (p3 !== "cssText") {
        if (p3 !== "length") {
          if (isNaN(p3)) {
            if (s1[p3] !== (val = s2[p3]) || forceLookup && forceLookup[p3]) {
              if (p3.indexOf("Origin") === -1) {
                if (typeof val === "number" || typeof val === "string") {
                  difs[p3] = val === "auto" && (p3 === "left" || p3 === "top") ? _calculateOffset(t, p3) : (val === "" || val === "auto" || val === "none") && typeof s1[p3] === "string" && s1[p3].replace(_NaNExp, "") !== "" ? 0 : val;
                  if (style[p3] !== void 0) {
                    mpt = new MiniPropTween(style, p3, style[p3], mpt);
                  }
                }
              }
            }
          }
        }
      }
    }
    if (vars) {
      for (p3 in vars) {
        if (p3 !== "className") {
          difs[p3] = vars[p3];
        }
      }
    }
    return { difs, firstMPT: mpt };
  }, _dimensions = { width: ["Left", "Right"], height: ["Top", "Bottom"] }, _margins = ["marginLeft", "marginRight", "marginTop", "marginBottom"], _getDimension = function(t, p3, cs) {
    if ((t.nodeName + "").toLowerCase() === "svg") {
      return (cs || _getComputedStyle(t))[p3] || 0;
    } else if (t.getCTM && _isSVG(t)) {
      return t.getBBox()[p3] || 0;
    }
    var v = parseFloat(p3 === "width" ? t.offsetWidth : t.offsetHeight), a = _dimensions[p3], i2 = a.length;
    cs = cs || _getComputedStyle(t);
    while (--i2 > -1) {
      v -= parseFloat(_getStyle(t, "padding" + a[i2], cs, true)) || 0;
      v -= parseFloat(_getStyle(t, "border" + a[i2] + "Width", cs, true)) || 0;
    }
    return v;
  }, _parsePosition = function(v, recObj) {
    if (v === "contain" || v === "auto" || v === "auto auto") {
      return v + " ";
    }
    if (v == null || v === "") {
      v = "0 0";
    }
    var a = v.split(" "), x = v.indexOf("left") !== -1 ? "0%" : v.indexOf("right") !== -1 ? "100%" : a[0], y = v.indexOf("top") !== -1 ? "0%" : v.indexOf("bottom") !== -1 ? "100%" : a[1], i2;
    if (a.length > 3 && !recObj) {
      a = v.split(", ").join(",").split(",");
      v = [];
      for (i2 = 0; i2 < a.length; i2++) {
        v.push(_parsePosition(a[i2]));
      }
      return v.join(",");
    }
    if (y == null) {
      y = x === "center" ? "50%" : "0";
    } else if (y === "center") {
      y = "50%";
    }
    if (x === "center" || isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1) {
      x = "50%";
    }
    v = x + " " + y + (a.length > 2 ? " " + a[2] : "");
    if (recObj) {
      recObj.oxp = x.indexOf("%") !== -1;
      recObj.oyp = y.indexOf("%") !== -1;
      recObj.oxr = x.charAt(1) === "=";
      recObj.oyr = y.charAt(1) === "=";
      recObj.ox = parseFloat(x.replace(_NaNExp, ""));
      recObj.oy = parseFloat(y.replace(_NaNExp, ""));
      recObj.v = v;
    }
    return recObj || v;
  }, _parseChange = function(e, b) {
    if (typeof e === "function") {
      e = e(_index, _target);
    }
    return typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b) || 0;
  }, _parseVal = function(v, d) {
    if (typeof v === "function") {
      v = v(_index, _target);
    }
    var isRelative = typeof v === "string" && v.charAt(1) === "=";
    if (typeof v === "string" && v.charAt(v.length - 2) === "v") {
      v = (isRelative ? v.substr(0, 2) : 0) + window["inner" + (v.substr(-2) === "vh" ? "Height" : "Width")] * (parseFloat(isRelative ? v.substr(2) : v) / 100);
    }
    return v == null ? d : isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
  }, _parseAngle = function(v, d, p3, directionalEnd) {
    var min = 1e-6, cap, split, dif, result, isRelative;
    if (typeof v === "function") {
      v = v(_index, _target);
    }
    if (v == null) {
      result = d;
    } else if (typeof v === "number") {
      result = v;
    } else {
      cap = 360;
      split = v.split("_");
      isRelative = v.charAt(1) === "=";
      dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * (v.indexOf("rad") === -1 ? 1 : _RAD2DEG2) - (isRelative ? 0 : d);
      if (split.length) {
        if (directionalEnd) {
          directionalEnd[p3] = d + dif;
        }
        if (v.indexOf("short") !== -1) {
          dif = dif % cap;
          if (dif !== dif % (cap / 2)) {
            dif = dif < 0 ? dif + cap : dif - cap;
          }
        }
        if (v.indexOf("_cw") !== -1 && dif < 0) {
          dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
        } else if (v.indexOf("ccw") !== -1 && dif > 0) {
          dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
        }
      }
      result = d + dif;
    }
    if (result < min && result > -min) {
      result = 0;
    }
    return result;
  }, _colorLookup = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    fuchsia: [255, 0, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
  }, _hue = function(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255 + 0.5 | 0;
  }, _parseColor = CSSPlugin2.parseColor = function(v, toHSL) {
    var a, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!v) {
      a = _colorLookup.black;
    } else if (typeof v === "number") {
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else {
      if (v.charAt(v.length - 1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length === 4) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b;
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & 255, v & 255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_numExp);
        if (!toHSL) {
          h = Number(a[0]) % 360 / 360;
          s = Number(a[1]) / 100;
          l = Number(a[2]) / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          if (a.length > 3) {
            a[3] = Number(a[3]);
          }
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (v.indexOf("=") !== -1) {
          return v.match(_relNumExp);
        }
      } else {
        a = v.match(_numExp) || _colorLookup.transparent;
      }
      a[0] = Number(a[0]);
      a[1] = Number(a[1]);
      a[2] = Number(a[2]);
      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
    }
    if (toHSL && !wasHSL) {
      r = a[0] / 255;
      g = a[1] / 255;
      b = a[2] / 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = h + 0.5 | 0;
      a[1] = s * 100 + 0.5 | 0;
      a[2] = l * 100 + 0.5 | 0;
    }
    return a;
  }, _formatColors = function(s, toHSL) {
    var colors = s.match(_colorExp) || [], charIndex = 0, parsed = "", i2, color, temp;
    if (!colors.length) {
      return s;
    }
    for (i2 = 0; i2 < colors.length; i2++) {
      color = colors[i2];
      temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
      charIndex += temp.length + color.length;
      color = _parseColor(color, toHSL);
      if (color.length === 3) {
        color.push(1);
      }
      parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
    }
    return parsed + s.substr(charIndex);
  }, _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
  for (p2 in _colorLookup) {
    _colorExp += "|" + p2 + "\\b";
  }
  _colorExp = new RegExp(_colorExp + ")", "gi");
  CSSPlugin2.colorStringFilter = function(a) {
    var combined = a[0] + " " + a[1], toHSL;
    if (_colorExp.test(combined)) {
      toHSL = combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1;
      a[0] = _formatColors(a[0], toHSL);
      a[1] = _formatColors(a[1], toHSL);
    }
    _colorExp.lastIndex = 0;
  };
  if (!TweenLite.defaultStringFilter) {
    TweenLite.defaultStringFilter = CSSPlugin2.colorStringFilter;
  }
  var _getFormatter = function(dflt, clr, collapsible, multi) {
    if (dflt == null) {
      return function(v) {
        return v;
      };
    }
    var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "", dVals = dflt.split(dColor).join("").match(_valuesExp) || [], pfx = dflt.substr(0, dflt.indexOf(dVals[0])), sfx = dflt.charAt(dflt.length - 1) === ")" ? ")" : "", delim = dflt.indexOf(" ") !== -1 ? " " : ",", numVals = dVals.length, dSfx = numVals > 0 ? dVals[0].replace(_numExp, "") : "", formatter;
    if (!numVals) {
      return function(v) {
        return v;
      };
    }
    if (clr) {
      formatter = function(v) {
        var color, vals, i2, a;
        if (typeof v === "number") {
          v += dSfx;
        } else if (multi && _commasOutsideParenExp.test(v)) {
          a = v.replace(_commasOutsideParenExp, "|").split("|");
          for (i2 = 0; i2 < a.length; i2++) {
            a[i2] = formatter(a[i2]);
          }
          return a.join(",");
        }
        color = (v.match(_colorExp) || [dColor])[0];
        vals = v.split(color).join("").match(_valuesExp) || [];
        i2 = vals.length;
        if (numVals > i2--) {
          while (++i2 < numVals) {
            vals[i2] = collapsible ? vals[(i2 - 1) / 2 | 0] : dVals[i2];
          }
        }
        return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
      };
      return formatter;
    }
    formatter = function(v) {
      var vals, a, i2;
      if (typeof v === "number") {
        v += dSfx;
      } else if (multi && _commasOutsideParenExp.test(v)) {
        a = v.replace(_commasOutsideParenExp, "|").split("|");
        for (i2 = 0; i2 < a.length; i2++) {
          a[i2] = formatter(a[i2]);
        }
        return a.join(",");
      }
      vals = v.match(delim === "," ? _valuesExp : _valuesExpWithCommas) || [];
      i2 = vals.length;
      if (numVals > i2--) {
        while (++i2 < numVals) {
          vals[i2] = collapsible ? vals[(i2 - 1) / 2 | 0] : dVals[i2];
        }
      }
      return (pfx && v !== "none" ? v.substr(0, v.indexOf(vals[0])) || pfx : pfx) + vals.join(delim) + sfx;
    };
    return formatter;
  }, _getEdgeParser = function(props) {
    props = props.split(",");
    return function(t, e, p3, cssp, pt, plugin, vars) {
      var a = (e + "").split(" "), i2;
      vars = {};
      for (i2 = 0; i2 < 4; i2++) {
        vars[props[i2]] = a[i2] = a[i2] || a[(i2 - 1) / 2 >> 0];
      }
      return cssp.parse(t, vars, pt, plugin);
    };
  };
  _internals._setPluginRatio = function(v) {
    this.plugin.setRatio(v);
    var d = this.data, proxy = d.proxy, mpt = d.firstMPT, min = 1e-6, val, pt, i2, str, p3;
    while (mpt) {
      val = proxy[mpt.v];
      if (mpt.r) {
        val = mpt.r(val);
      } else if (val < min && val > -min) {
        val = 0;
      }
      mpt.t[mpt.p] = val;
      mpt = mpt._next;
    }
    if (d.autoRotate) {
      d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation;
    }
    if (v === 1 || v === 0) {
      mpt = d.firstMPT;
      p3 = v === 1 ? "e" : "b";
      while (mpt) {
        pt = mpt.t;
        if (!pt.type) {
          pt[p3] = pt.s + pt.xs0;
        } else if (pt.type === 1) {
          str = pt.xs0 + pt.s + pt.xs1;
          for (i2 = 1; i2 < pt.l; i2++) {
            str += pt["xn" + i2] + pt["xs" + (i2 + 1)];
          }
          pt[p3] = str;
        }
        mpt = mpt._next;
      }
    }
  };
  var MiniPropTween = function(t, p3, v, next, r) {
    this.t = t;
    this.p = p3;
    this.v = v;
    this.r = r;
    if (next) {
      next._prev = this;
      this._next = next;
    }
  };
  _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
    var bpt = pt, start = {}, end = {}, transform = cssp._transform, oldForce = _forcePT, i2, p3, xp, mpt, firstPT;
    cssp._transform = null;
    _forcePT = vars;
    pt = firstPT = cssp.parse(t, vars, pt, plugin);
    _forcePT = oldForce;
    if (shallow) {
      cssp._transform = transform;
      if (bpt) {
        bpt._prev = null;
        if (bpt._prev) {
          bpt._prev._next = null;
        }
      }
    }
    while (pt && pt !== bpt) {
      if (pt.type <= 1) {
        p3 = pt.p;
        end[p3] = pt.s + pt.c;
        start[p3] = pt.s;
        if (!shallow) {
          mpt = new MiniPropTween(pt, "s", p3, mpt, pt.r);
          pt.c = 0;
        }
        if (pt.type === 1) {
          i2 = pt.l;
          while (--i2 > 0) {
            xp = "xn" + i2;
            p3 = pt.p + "_" + xp;
            end[p3] = pt.data[xp];
            start[p3] = pt[xp];
            if (!shallow) {
              mpt = new MiniPropTween(pt, xp, p3, mpt, pt.rxp[xp]);
            }
          }
        }
      }
      pt = pt._next;
    }
    return { proxy: start, end, firstMPT: mpt, pt: firstPT };
  };
  var CSSPropTween = _internals.CSSPropTween = function(t, p3, s, c, next, type, n, r, pr, b, e) {
    this.t = t;
    this.p = p3;
    this.s = s;
    this.c = c;
    this.n = n || p3;
    if (!(t instanceof CSSPropTween)) {
      _overwriteProps.push(this.n);
    }
    this.r = !r ? r : typeof r === "function" ? r : Math.round;
    this.type = type || 0;
    if (pr) {
      this.pr = pr;
      _hasPriority = true;
    }
    this.b = b === void 0 ? s : b;
    this.e = e === void 0 ? s + c : e;
    if (next) {
      this._next = next;
      next._prev = this;
    }
  }, _addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) {
    var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
    pt.b = start;
    pt.e = pt.xs0 = end;
    return pt;
  }, _parseComplex = CSSPlugin2.parseComplex = function(t, p3, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
    b = b || dflt || "";
    if (typeof e === "function") {
      e = e(_index, _target);
    }
    pt = new CSSPropTween(t, p3, 0, 0, pt, setRatio ? 2 : 1, null, false, pr, b, e);
    e += "";
    if (clrs && _colorExp.test(e + b)) {
      e = [b, e];
      CSSPlugin2.colorStringFilter(e);
      b = e[0];
      e = e[1];
    }
    var ba = b.split(", ").join(",").split(" "), ea = e.split(", ").join(",").split(" "), l = ba.length, autoRound = _autoRound !== false, i2, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
    if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
      if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) {
        ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
        ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
      } else {
        ba = ba.join(" ").split(",").join(", ").split(" ");
        ea = ea.join(" ").split(",").join(", ").split(" ");
      }
      l = ba.length;
    }
    if (l !== ea.length) {
      ba = (dflt || "").split(" ");
      l = ba.length;
    }
    pt.plugin = plugin;
    pt.setRatio = setRatio;
    _colorExp.lastIndex = 0;
    for (i2 = 0; i2 < l; i2++) {
      bv = ba[i2];
      ev = ea[i2] + "";
      bn = parseFloat(bv);
      if (bn || bn === 0) {
        pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), autoRound && ev.indexOf("px") !== -1 ? Math.round : false, true);
      } else if (clrs && _colorExp.test(bv)) {
        str = ev.indexOf(")") + 1;
        str = ")" + (str ? ev.substr(str) : "");
        useHSL = ev.indexOf("hsl") !== -1 && _supportsOpacity;
        temp = ev;
        bv = _parseColor(bv, useHSL);
        ev = _parseColor(ev, useHSL);
        hasAlpha = bv.length + ev.length > 6;
        if (hasAlpha && !_supportsOpacity && ev[3] === 0) {
          pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
          pt.e = pt.e.split(ea[i2]).join("transparent");
        } else {
          if (!_supportsOpacity) {
            hasAlpha = false;
          }
          if (useHSL) {
            pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true).appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false).appendXtra("", bv[2], _parseChange(ev[2], bv[2]), hasAlpha ? "%," : "%" + str, false);
          } else {
            pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true).appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round).appendXtra("", bv[2], ev[2] - bv[2], hasAlpha ? "," : str, Math.round);
          }
          if (hasAlpha) {
            bv = bv.length < 4 ? 1 : bv[3];
            pt.appendXtra("", bv, (ev.length < 4 ? 1 : ev[3]) - bv, str, false);
          }
        }
        _colorExp.lastIndex = 0;
      } else {
        bnums = bv.match(_numExp);
        if (!bnums) {
          pt["xs" + pt.l] += pt.l || pt["xs" + pt.l] ? " " + ev : ev;
        } else {
          enums = ev.match(_relNumExp);
          if (!enums || enums.length !== bnums.length) {
            return pt;
          }
          ni = 0;
          for (xi = 0; xi < bnums.length; xi++) {
            cv = bnums[xi];
            temp = bv.indexOf(cv, ni);
            pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", autoRound && bv.substr(temp + cv.length, 2) === "px" ? Math.round : false, xi === 0);
            ni = temp + cv.length;
          }
          pt["xs" + pt.l] += bv.substr(ni);
        }
      }
    }
    if (e.indexOf("=") !== -1) {
      if (pt.data) {
        str = pt.xs0 + pt.data.s;
        for (i2 = 1; i2 < pt.l; i2++) {
          str += pt["xs" + i2] + pt.data["xn" + i2];
        }
        pt.e = str + pt["xs" + i2];
      }
    }
    if (!pt.l) {
      pt.type = -1;
      pt.xs0 = pt.e;
    }
    return pt.xfirst || pt;
  }, i = 9;
  p2 = CSSPropTween.prototype;
  p2.l = p2.pr = 0;
  while (--i > 0) {
    p2["xn" + i] = 0;
    p2["xs" + i] = "";
  }
  p2.xs0 = "";
  p2._next = p2._prev = p2.xfirst = p2.data = p2.plugin = p2.setRatio = p2.rxp = null;
  p2.appendXtra = function(pfx, s, c, sfx, r, pad) {
    var pt = this, l = pt.l;
    pt["xs" + l] += pad && (l || pt["xs" + l]) ? " " + pfx : pfx || "";
    if (!c) {
      if (l !== 0 && !pt.plugin) {
        pt["xs" + l] += s + (sfx || "");
        return pt;
      }
    }
    pt.l++;
    pt.type = pt.setRatio ? 2 : 1;
    pt["xs" + pt.l] = sfx || "";
    if (l > 0) {
      pt.data["xn" + l] = s + c;
      pt.rxp["xn" + l] = r;
      pt["xn" + l] = s;
      if (!pt.plugin) {
        pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
        pt.xfirst.xs0 = 0;
      }
      return pt;
    }
    pt.data = { s: s + c };
    pt.rxp = {};
    pt.s = s;
    pt.c = c;
    pt.r = r;
    return pt;
  };
  var SpecialProp = function(p3, options) {
    options = options || {};
    this.p = options.prefix ? _checkPropPrefix(p3) || p3 : p3;
    _specialProps[p3] = _specialProps[this.p] = this;
    this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
    if (options.parser) {
      this.parse = options.parser;
    }
    this.clrs = options.color;
    this.multi = options.multi;
    this.keyword = options.keyword;
    this.dflt = options.defaultValue;
    this.allowFunc = options.allowFunc;
    this.pr = options.priority || 0;
  }, _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p3, options, defaults) {
    if (typeof options !== "object") {
      options = { parser: defaults };
    }
    var a = p3.split(","), d = options.defaultValue, i2;
    defaults = defaults || [d];
    for (i2 = 0; i2 < a.length; i2++) {
      options.prefix = i2 === 0 && options.prefix;
      options.defaultValue = defaults[i2] || d;
      new SpecialProp(a[i2], options);
    }
  }, _registerPluginProp = _internals._registerPluginProp = function(p3) {
    if (!_specialProps[p3]) {
      var pluginName = p3.charAt(0).toUpperCase() + p3.substr(1) + "Plugin";
      _registerComplexSpecialProp(p3, { parser: function(t, e, p4, cssp, pt, plugin, vars) {
        var pluginClass = _globals2.com.greensock.plugins[pluginName];
        if (!pluginClass) {
          _log("Error: " + pluginName + " js file not loaded.");
          return pt;
        }
        pluginClass._cssRegister();
        return _specialProps[p4].parse(t, e, p4, cssp, pt, plugin, vars);
      } });
    }
  };
  p2 = SpecialProp.prototype;
  p2.parseComplex = function(t, b, e, pt, plugin, setRatio) {
    var kwd = this.keyword, i2, ba, ea, l, bi, ei;
    if (this.multi) {
      if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
        ba = b.replace(_commasOutsideParenExp, "|").split("|");
        ea = e.replace(_commasOutsideParenExp, "|").split("|");
      } else if (kwd) {
        ba = [b];
        ea = [e];
      }
    }
    if (ea) {
      l = ea.length > ba.length ? ea.length : ba.length;
      for (i2 = 0; i2 < l; i2++) {
        b = ba[i2] = ba[i2] || this.dflt;
        e = ea[i2] = ea[i2] || this.dflt;
        if (kwd) {
          bi = b.indexOf(kwd);
          ei = e.indexOf(kwd);
          if (bi !== ei) {
            if (ei === -1) {
              ba[i2] = ba[i2].split(kwd).join("");
            } else if (bi === -1) {
              ba[i2] += " " + kwd;
            }
          }
        }
      }
      b = ba.join(", ");
      e = ea.join(", ");
    }
    return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
  };
  p2.parse = function(t, e, p3, cssp, pt, plugin, vars) {
    return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
  };
  CSSPlugin2.registerSpecialProp = function(name, onInitTween, priority) {
    _registerComplexSpecialProp(name, { parser: function(t, e, p3, cssp, pt, plugin, vars) {
      var rv = new CSSPropTween(t, p3, 0, 0, pt, 2, p3, false, priority);
      rv.plugin = plugin;
      rv.setRatio = onInitTween(t, e, cssp._tween, p3);
      return rv;
    }, priority });
  };
  CSSPlugin2.useSVGTransformAttr = true;
  var _transformProps = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), _transformProp = _checkPropPrefix("transform"), _transformPropCSS = _prefixCSS + "transform", _transformOriginProp = _checkPropPrefix("transformOrigin"), _supports3D = _checkPropPrefix("perspective") !== null, Transform = _internals.Transform = function() {
    this.perspective = parseFloat(CSSPlugin2.defaultTransformPerspective) || 0;
    this.force3D = CSSPlugin2.defaultForce3D === false || !_supports3D ? false : CSSPlugin2.defaultForce3D || "auto";
  }, _SVGElement = _gsScope.SVGElement, _useSVGTransformAttr, _createSVG = function(type, container, attributes) {
    var element = _doc.createElementNS("http://www.w3.org/2000/svg", type), reg = /([a-z])([A-Z])/g, p3;
    for (p3 in attributes) {
      element.setAttributeNS(null, p3.replace(reg, "$1-$2").toLowerCase(), attributes[p3]);
    }
    container.appendChild(element);
    return element;
  }, _docElement = _doc.documentElement || {}, _forceSVGTransformAttr = function() {
    var force = _ieVers || /Android/i.test(_agent) && !_gsScope.chrome, svg, rect, width;
    if (_doc.createElementNS && _docElement.appendChild && !force) {
      svg = _createSVG("svg", _docElement);
      rect = _createSVG("rect", svg, { width: 100, height: 50, x: 100 });
      width = rect.getBoundingClientRect().width;
      rect.style[_transformOriginProp] = "50% 50%";
      rect.style[_transformProp] = "scaleX(0.5)";
      force = width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D);
      _docElement.removeChild(svg);
    }
    return force;
  }(), _parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
    var tm = e._gsTransform, m = _getMatrix(e, true), v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
    if (tm) {
      xOriginOld = tm.xOrigin;
      yOriginOld = tm.yOrigin;
    }
    if (!absolute || (v = absolute.split(" ")).length < 2) {
      b = e.getBBox();
      if (b.x === 0 && b.y === 0 && b.width + b.height === 0) {
        b = { x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0, y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0, width: 0, height: 0 };
      }
      local = _parsePosition(local).split(" ");
      v = [
        (local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
        (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y
      ];
    }
    decoratee.xOrigin = xOrigin = parseFloat(v[0]);
    decoratee.yOrigin = yOrigin = parseFloat(v[1]);
    if (absolute && m !== _identity2DMatrix) {
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      determinant = a * d - b * c;
      if (determinant) {
        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
        xOrigin = decoratee.xOrigin = v[0] = x;
        yOrigin = decoratee.yOrigin = v[1] = y;
      }
    }
    if (tm) {
      if (skipRecord) {
        decoratee.xOffset = tm.xOffset;
        decoratee.yOffset = tm.yOffset;
        tm = decoratee;
      }
      if (smoothOrigin || smoothOrigin !== false && CSSPlugin2.defaultSmoothOrigin !== false) {
        x = xOrigin - xOriginOld;
        y = yOrigin - yOriginOld;
        tm.xOffset += x * m[0] + y * m[2] - x;
        tm.yOffset += x * m[1] + y * m[3] - y;
      } else {
        tm.xOffset = tm.yOffset = 0;
      }
    }
    if (!skipRecord) {
      e.setAttribute("data-svg-origin", v.join(" "));
    }
  }, _getBBoxHack = function(swapIfPossible) {
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
    _docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._originalGetBBox = this.getBBox;
        this.getBBox = _getBBoxHack;
      } catch (e) {
      }
    } else if (this._originalGetBBox) {
      bbox = this._originalGetBBox();
    }
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
    _docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
  }, _getBBox = function(e) {
    try {
      return e.getBBox();
    } catch (error) {
      return _getBBoxHack.call(e, true);
    }
  }, _isSVG = function(e) {
    return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  }, _identity2DMatrix = [1, 0, 0, 1, 0, 0], _getMatrix = function(e, force2D) {
    var tm = e._gsTransform || new Transform(), rnd = 1e5, style = e.style, isDefault, s, m, n, dec, nextSibling, parent;
    if (_transformProp) {
      s = _getStyle(e, _transformPropCSS, null, true);
    } else if (e.currentStyle) {
      s = e.currentStyle.filter.match(_ieGetMatrixExp);
      s = s && s.length === 4 ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), tm.x || 0, tm.y || 0].join(",") : "";
    }
    isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";
    if (_transformProp && isDefault && !e.offsetParent && e !== _docElement) {
      n = style.display;
      style.display = "block";
      parent = e.parentNode;
      if (!parent || !e.offsetParent) {
        dec = 1;
        nextSibling = e.nextSibling;
        _docElement.appendChild(e);
      }
      s = _getStyle(e, _transformPropCSS, null, true);
      isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";
      if (n) {
        style.display = n;
      } else {
        _removeProp(style, "display");
      }
      if (dec) {
        if (nextSibling) {
          parent.insertBefore(e, nextSibling);
        } else if (parent) {
          parent.appendChild(e);
        } else {
          _docElement.removeChild(e);
        }
      }
    }
    if (tm.svg || e.getCTM && _isSVG(e)) {
      if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) {
        s = style[_transformProp];
        isDefault = 0;
      }
      m = e.getAttribute("transform");
      if (isDefault && m) {
        m = e.transform.baseVal.consolidate().matrix;
        s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
        isDefault = 0;
      }
    }
    if (isDefault) {
      return _identity2DMatrix;
    }
    m = (s || "").match(_numExp) || [];
    i = m.length;
    while (--i > -1) {
      n = Number(m[i]);
      m[i] = (dec = n - (n |= 0)) ? (dec * rnd + (dec < 0 ? -0.5 : 0.5) | 0) / rnd + n : n;
    }
    return force2D && m.length > 6 ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
  }, _getTransform = _internals.getTransform = function(t, cs, rec, parse) {
    if (t._gsTransform && rec && !parse) {
      return t._gsTransform;
    }
    var tm = rec ? t._gsTransform || new Transform() : new Transform(), invX = tm.scaleX < 0, min = 2e-5, rnd = 1e5, zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin || 0 : 0, defaultTransformPerspective = parseFloat(CSSPlugin2.defaultTransformPerspective) || 0, m, i2, scaleX, scaleY, rotation, skewX;
    tm.svg = !!(t.getCTM && _isSVG(t));
    if (tm.svg) {
      _parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
      _useSVGTransformAttr = CSSPlugin2.useSVGTransformAttr || _forceSVGTransformAttr;
    }
    m = _getMatrix(t);
    if (m !== _identity2DMatrix) {
      if (m.length === 16) {
        var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3], a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7], a13 = m[8], a23 = m[9], a33 = m[10], a14 = m[12], a24 = m[13], a34 = m[14], a43 = m[11], angle = Math.atan2(a32, a33), t1, t2, t3, cos, sin;
        if (tm.zOrigin) {
          a34 = -tm.zOrigin;
          a14 = a13 * a34 - m[12];
          a24 = a23 * a34 - m[13];
          a34 = a33 * a34 + tm.zOrigin - m[14];
        }
        tm.rotationX = angle * _RAD2DEG2;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = Math.atan2(-a31, a33);
        tm.rotationY = angle * _RAD2DEG2;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a11 * cos - a13 * sin;
          t2 = a21 * cos - a23 * sin;
          t3 = a31 * cos - a33 * sin;
          a23 = a21 * sin + a23 * cos;
          a33 = a31 * sin + a33 * cos;
          a43 = a41 * sin + a43 * cos;
          a11 = t1;
          a21 = t2;
          a31 = t3;
        }
        angle = Math.atan2(a21, a11);
        tm.rotation = angle * _RAD2DEG2;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a11 * cos + a21 * sin;
          t2 = a12 * cos + a22 * sin;
          t3 = a13 * cos + a23 * sin;
          a21 = a21 * cos - a11 * sin;
          a22 = a22 * cos - a12 * sin;
          a23 = a23 * cos - a13 * sin;
          a11 = t1;
          a12 = t2;
          a13 = t3;
        }
        if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) {
          tm.rotationX = tm.rotation = 0;
          tm.rotationY = 180 - tm.rotationY;
        }
        angle = Math.atan2(a12, a22);
        tm.scaleX = (Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5 | 0) / rnd;
        tm.scaleY = (Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5 | 0) / rnd;
        tm.scaleZ = (Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5 | 0) / rnd;
        a11 /= tm.scaleX;
        a12 /= tm.scaleY;
        a21 /= tm.scaleX;
        a22 /= tm.scaleY;
        if (Math.abs(angle) > min) {
          tm.skewX = angle * _RAD2DEG2;
          a12 = 0;
          if (tm.skewType !== "simple") {
            tm.scaleY *= 1 / Math.cos(angle);
          }
        } else {
          tm.skewX = 0;
        }
        tm.perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
        tm.x = a14;
        tm.y = a24;
        tm.z = a34;
        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
          tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
        }
      } else if (!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || !tm.rotationX && !tm.rotationY) {
        var k = m.length >= 6, a = k ? m[0] : 1, b = m[1] || 0, c = m[2] || 0, d = k ? m[3] : 1;
        tm.x = m[4] || 0;
        tm.y = m[5] || 0;
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? Math.atan2(b, a) * _RAD2DEG2 : tm.rotation || 0;
        skewX = c || d ? Math.atan2(c, d) * _RAD2DEG2 + rotation : tm.skewX || 0;
        tm.scaleX = scaleX;
        tm.scaleY = scaleY;
        tm.rotation = rotation;
        tm.skewX = skewX;
        if (_supports3D) {
          tm.rotationX = tm.rotationY = tm.z = 0;
          tm.perspective = defaultTransformPerspective;
          tm.scaleZ = 1;
        }
        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
          tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
        }
      }
      if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
        if (invX) {
          tm.scaleX *= -1;
          tm.skewX += tm.rotation <= 0 ? 180 : -180;
          tm.rotation += tm.rotation <= 0 ? 180 : -180;
        } else {
          tm.scaleY *= -1;
          tm.skewX += tm.skewX <= 0 ? 180 : -180;
        }
      }
      tm.zOrigin = zOrigin;
      for (i2 in tm) {
        if (tm[i2] < min) {
          if (tm[i2] > -min) {
            tm[i2] = 0;
          }
        }
      }
    }
    if (rec) {
      t._gsTransform = tm;
      if (tm.svg) {
        if (_useSVGTransformAttr && t.style[_transformProp]) {
          TweenLite.delayedCall(1e-3, function() {
            _removeProp(t.style, _transformProp);
          });
        } else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
          TweenLite.delayedCall(1e-3, function() {
            t.removeAttribute("transform");
          });
        }
      }
    }
    return tm;
  }, _setIETransformRatio = function(v) {
    var t = this.data, ang = -t.rotation * _DEG2RAD, skew = ang + t.skewX * _DEG2RAD, rnd = 1e5, a = (Math.cos(ang) * t.scaleX * rnd | 0) / rnd, b = (Math.sin(ang) * t.scaleX * rnd | 0) / rnd, c = (Math.sin(skew) * -t.scaleY * rnd | 0) / rnd, d = (Math.cos(skew) * t.scaleY * rnd | 0) / rnd, style = this.t.style, cs = this.t.currentStyle, filters, val;
    if (!cs) {
      return;
    }
    val = b;
    b = -c;
    c = -val;
    filters = cs.filter;
    style.filter = "";
    var w = this.t.offsetWidth, h = this.t.offsetHeight, clip = cs.position !== "absolute", m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d, ox = t.x + w * t.xPercent / 100, oy = t.y + h * t.yPercent / 100, dx, dy;
    if (t.ox != null) {
      dx = (t.oxp ? w * t.ox * 0.01 : t.ox) - w / 2;
      dy = (t.oyp ? h * t.oy * 0.01 : t.oy) - h / 2;
      ox += dx - (dx * a + dy * b);
      oy += dy - (dx * c + dy * d);
    }
    if (!clip) {
      m += ", sizingMethod='auto expand')";
    } else {
      dx = w / 2;
      dy = h / 2;
      m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
    }
    if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
      style.filter = filters.replace(_ieSetMatrixExp, m);
    } else {
      style.filter = m + " " + filters;
    }
    if (v === 0 || v === 1) {
      if (a === 1) {
        if (b === 0) {
          if (c === 0) {
            if (d === 1) {
              if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) {
                if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) {
                  if (filters.indexOf(filters.indexOf("Alpha")) === -1) {
                    style.removeAttribute("filter");
                  }
                }
              }
            }
          }
        }
      }
    }
    if (!clip) {
      var mult = _ieVers < 8 ? 1 : -1, marg, prop, dif;
      dx = t.ieOffsetX || 0;
      dy = t.ieOffsetY || 0;
      t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
      t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
      for (i = 0; i < 4; i++) {
        prop = _margins[i];
        marg = cs[prop];
        val = marg.indexOf("px") !== -1 ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
        if (val !== t[prop]) {
          dif = i < 2 ? -t.ieOffsetX : -t.ieOffsetY;
        } else {
          dif = i < 2 ? dx - t.ieOffsetX : dy - t.ieOffsetY;
        }
        style[prop] = (t[prop] = Math.round(val - dif * (i === 0 || i === 2 ? 1 : mult))) + "px";
      }
    }
  }, _setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
    var t = this.data, style = this.t.style, angle = t.rotation, rotationX = t.rotationX, rotationY = t.rotationY, sx = t.scaleX, sy = t.scaleY, sz = t.scaleZ, x = t.x, y = t.y, z = t.z, isSVG = t.svg, perspective = t.perspective, force3D = t.force3D, skewY = t.skewY, skewX = t.skewX, t1, a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43, zOrigin, min, cos, sin, t2, transform, comma, zero, skew, rnd;
    if (skewY) {
      skewX += skewY;
      angle += skewY;
    }
    if (((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1 || _useSVGTransformAttr && isSVG || !_supports3D) {
      if (angle || skewX || isSVG) {
        angle *= _DEG2RAD;
        skew = skewX * _DEG2RAD;
        rnd = 1e5;
        a11 = Math.cos(angle) * sx;
        a21 = Math.sin(angle) * sx;
        a12 = Math.sin(angle - skew) * -sy;
        a22 = Math.cos(angle - skew) * sy;
        if (skew && t.skewType === "simple") {
          t1 = Math.tan(skew - skewY * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          a12 *= t1;
          a22 *= t1;
          if (skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }
        if (isSVG) {
          x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
          y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
          if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) {
            min = this.t.getBBox();
            x += t.xPercent * 0.01 * min.width;
            y += t.yPercent * 0.01 * min.height;
          }
          min = 1e-6;
          if (x < min) {
            if (x > -min) {
              x = 0;
            }
          }
          if (y < min) {
            if (y > -min) {
              y = 0;
            }
          }
        }
        transform = (a11 * rnd | 0) / rnd + "," + (a21 * rnd | 0) / rnd + "," + (a12 * rnd | 0) / rnd + "," + (a22 * rnd | 0) / rnd + "," + x + "," + y + ")";
        if (isSVG && _useSVGTransformAttr) {
          this.t.setAttribute("transform", "matrix(" + transform);
        } else {
          style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
        }
      } else {
        style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
      }
      return;
    }
    if (_isFirefox) {
      min = 1e-4;
      if (sx < min && sx > -min) {
        sx = sz = 2e-5;
      }
      if (sy < min && sy > -min) {
        sy = sz = 2e-5;
      }
      if (perspective && !t.z && !t.rotationX && !t.rotationY) {
        perspective = 0;
      }
    }
    if (angle || skewX) {
      angle *= _DEG2RAD;
      cos = a11 = Math.cos(angle);
      sin = a21 = Math.sin(angle);
      if (skewX) {
        angle -= skewX * _DEG2RAD;
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        if (t.skewType === "simple") {
          t1 = Math.tan((skewX - skewY) * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          cos *= t1;
          sin *= t1;
          if (t.skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }
      }
      a12 = -sin;
      a22 = cos;
    } else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) {
      style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z + "px)" + (sx !== 1 || sy !== 1 ? " scale(" + sx + "," + sy + ")" : "");
      return;
    } else {
      a11 = a22 = 1;
      a12 = a21 = 0;
    }
    a33 = 1;
    a13 = a23 = a31 = a32 = a41 = a42 = 0;
    a43 = perspective ? -1 / perspective : 0;
    zOrigin = t.zOrigin;
    min = 1e-6;
    comma = ",";
    zero = "0";
    angle = rotationY * _DEG2RAD;
    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      a31 = -sin;
      a41 = a43 * -sin;
      a13 = a11 * sin;
      a23 = a21 * sin;
      a33 = cos;
      a43 *= cos;
      a11 *= cos;
      a21 *= cos;
    }
    angle = rotationX * _DEG2RAD;
    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      t1 = a12 * cos + a13 * sin;
      t2 = a22 * cos + a23 * sin;
      a32 = a33 * sin;
      a42 = a43 * sin;
      a13 = a12 * -sin + a13 * cos;
      a23 = a22 * -sin + a23 * cos;
      a33 = a33 * cos;
      a43 = a43 * cos;
      a12 = t1;
      a22 = t2;
    }
    if (sz !== 1) {
      a13 *= sz;
      a23 *= sz;
      a33 *= sz;
      a43 *= sz;
    }
    if (sy !== 1) {
      a12 *= sy;
      a22 *= sy;
      a32 *= sy;
      a42 *= sy;
    }
    if (sx !== 1) {
      a11 *= sx;
      a21 *= sx;
      a31 *= sx;
      a41 *= sx;
    }
    if (zOrigin || isSVG) {
      if (zOrigin) {
        x += a13 * -zOrigin;
        y += a23 * -zOrigin;
        z += a33 * -zOrigin + zOrigin;
      }
      if (isSVG) {
        x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
        y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
      }
      if (x < min && x > -min) {
        x = zero;
      }
      if (y < min && y > -min) {
        y = zero;
      }
      if (z < min && z > -min) {
        z = 0;
      }
    }
    transform = t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(";
    transform += (a11 < min && a11 > -min ? zero : a11) + comma + (a21 < min && a21 > -min ? zero : a21) + comma + (a31 < min && a31 > -min ? zero : a31);
    transform += comma + (a41 < min && a41 > -min ? zero : a41) + comma + (a12 < min && a12 > -min ? zero : a12) + comma + (a22 < min && a22 > -min ? zero : a22);
    if (rotationX || rotationY || sz !== 1) {
      transform += comma + (a32 < min && a32 > -min ? zero : a32) + comma + (a42 < min && a42 > -min ? zero : a42) + comma + (a13 < min && a13 > -min ? zero : a13);
      transform += comma + (a23 < min && a23 > -min ? zero : a23) + comma + (a33 < min && a33 > -min ? zero : a33) + comma + (a43 < min && a43 > -min ? zero : a43) + comma;
    } else {
      transform += ",0,0,0,0,1,0,";
    }
    transform += x + comma + y + comma + z + comma + (perspective ? 1 + -z / perspective : 1) + ")";
    style[_transformProp] = transform;
  };
  p2 = Transform.prototype;
  p2.x = p2.y = p2.z = p2.skewX = p2.skewY = p2.rotation = p2.rotationX = p2.rotationY = p2.zOrigin = p2.xPercent = p2.yPercent = p2.xOffset = p2.yOffset = 0;
  p2.scaleX = p2.scaleY = p2.scaleZ = 1;
  _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", { parser: function(t, e, parsingProp, cssp, pt, plugin, vars) {
    if (cssp._lastParsedTransform === vars) {
      return pt;
    }
    cssp._lastParsedTransform = vars;
    var scaleFunc = vars.scale && typeof vars.scale === "function" ? vars.scale : 0;
    if (scaleFunc) {
      vars.scale = scaleFunc(_index, t);
    }
    var originalGSTransform = t._gsTransform, style = t.style, min = 1e-6, i2 = _transformProps.length, v = vars, endRotations = {}, transformOriginString = "transformOrigin", m1 = _getTransform(t, _cs, true, v.parseTransform), orig = v.transform && (typeof v.transform === "function" ? v.transform(_index, _target) : v.transform), m2, copy, has3D, hasChange, dr, x, y, matrix, p3;
    m1.skewType = v.skewType || m1.skewType || CSSPlugin2.defaultSkewType;
    cssp._transform = m1;
    if ("rotationZ" in v) {
      v.rotation = v.rotationZ;
    }
    if (orig && typeof orig === "string" && _transformProp) {
      copy = _tempDiv.style;
      copy[_transformProp] = orig;
      copy.display = "block";
      copy.position = "absolute";
      if (orig.indexOf("%") !== -1) {
        copy.width = _getStyle(t, "width");
        copy.height = _getStyle(t, "height");
      }
      _doc.body.appendChild(_tempDiv);
      m2 = _getTransform(_tempDiv, null, false);
      if (m1.skewType === "simple") {
        m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
      }
      if (m1.svg) {
        x = m1.xOrigin;
        y = m1.yOrigin;
        m2.x -= m1.xOffset;
        m2.y -= m1.yOffset;
        if (v.transformOrigin || v.svgOrigin) {
          orig = {};
          _parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
          x = orig.xOrigin;
          y = orig.yOrigin;
          m2.x -= orig.xOffset - m1.xOffset;
          m2.y -= orig.yOffset - m1.yOffset;
        }
        if (x || y) {
          matrix = _getMatrix(_tempDiv, true);
          m2.x -= x - (x * matrix[0] + y * matrix[2]);
          m2.y -= y - (x * matrix[1] + y * matrix[3]);
        }
      }
      _doc.body.removeChild(_tempDiv);
      if (!m2.perspective) {
        m2.perspective = m1.perspective;
      }
      if (v.xPercent != null) {
        m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
      }
      if (v.yPercent != null) {
        m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
      }
    } else if (typeof v === "object") {
      m2 = {
        scaleX: _parseVal(v.scaleX != null ? v.scaleX : v.scale, m1.scaleX),
        scaleY: _parseVal(v.scaleY != null ? v.scaleY : v.scale, m1.scaleY),
        scaleZ: _parseVal(v.scaleZ, m1.scaleZ),
        x: _parseVal(v.x, m1.x),
        y: _parseVal(v.y, m1.y),
        z: _parseVal(v.z, m1.z),
        xPercent: _parseVal(v.xPercent, m1.xPercent),
        yPercent: _parseVal(v.yPercent, m1.yPercent),
        perspective: _parseVal(v.transformPerspective, m1.perspective)
      };
      dr = v.directionalRotation;
      if (dr != null) {
        if (typeof dr === "object") {
          for (copy in dr) {
            v[copy] = dr[copy];
          }
        } else {
          v.rotation = dr;
        }
      }
      if (typeof v.x === "string" && v.x.indexOf("%") !== -1) {
        m2.x = 0;
        m2.xPercent = _parseVal(v.x, m1.xPercent);
      }
      if (typeof v.y === "string" && v.y.indexOf("%") !== -1) {
        m2.y = 0;
        m2.yPercent = _parseVal(v.y, m1.yPercent);
      }
      m2.rotation = _parseAngle("rotation" in v ? v.rotation : "shortRotation" in v ? v.shortRotation + "_short" : m1.rotation, m1.rotation, "rotation", endRotations);
      if (_supports3D) {
        m2.rotationX = _parseAngle("rotationX" in v ? v.rotationX : "shortRotationX" in v ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
        m2.rotationY = _parseAngle("rotationY" in v ? v.rotationY : "shortRotationY" in v ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
      }
      m2.skewX = _parseAngle(v.skewX, m1.skewX);
      m2.skewY = _parseAngle(v.skewY, m1.skewY);
    }
    if (_supports3D && v.force3D != null) {
      m1.force3D = v.force3D;
      hasChange = true;
    }
    has3D = m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective;
    if (!has3D && v.scale != null) {
      m2.scaleZ = 1;
    }
    while (--i2 > -1) {
      p3 = _transformProps[i2];
      orig = m2[p3] - m1[p3];
      if (orig > min || orig < -min || v[p3] != null || _forcePT[p3] != null) {
        hasChange = true;
        pt = new CSSPropTween(m1, p3, m1[p3], orig, pt);
        if (p3 in endRotations) {
          pt.e = endRotations[p3];
        }
        pt.xs0 = 0;
        pt.plugin = plugin;
        cssp._overwriteProps.push(pt.n);
      }
    }
    orig = typeof v.transformOrigin === "function" ? v.transformOrigin(_index, _target) : v.transformOrigin;
    if (m1.svg && (orig || v.svgOrigin)) {
      x = m1.xOffset;
      y = m1.yOffset;
      _parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
      pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString);
      pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
      if (x !== m1.xOffset || y !== m1.yOffset) {
        pt = _addNonTweeningNumericPT(m1, "xOffset", originalGSTransform ? x : m1.xOffset, m1.xOffset, pt, transformOriginString);
        pt = _addNonTweeningNumericPT(m1, "yOffset", originalGSTransform ? y : m1.yOffset, m1.yOffset, pt, transformOriginString);
      }
      orig = "0px 0px";
    }
    if (orig || _supports3D && has3D && m1.zOrigin) {
      if (_transformProp) {
        hasChange = true;
        p3 = _transformOriginProp;
        if (!orig) {
          orig = (_getStyle(t, p3, _cs, false, "50% 50%") + "").split(" ");
          orig = orig[0] + " " + orig[1] + " " + m1.zOrigin + "px";
        }
        orig += "";
        pt = new CSSPropTween(style, p3, 0, 0, pt, -1, transformOriginString);
        pt.b = style[p3];
        pt.plugin = plugin;
        if (_supports3D) {
          copy = m1.zOrigin;
          orig = orig.split(" ");
          m1.zOrigin = (orig.length > 2 ? parseFloat(orig[2]) : copy) || 0;
          pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px";
          pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n);
          pt.b = copy;
          pt.xs0 = pt.e = m1.zOrigin;
        } else {
          pt.xs0 = pt.e = orig;
        }
      } else {
        _parsePosition(orig + "", m1);
      }
    }
    if (hasChange) {
      cssp._transformType = !(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3) ? 3 : 2;
    }
    if (scaleFunc) {
      vars.scale = scaleFunc;
    }
    return pt;
  }, allowFunc: true, prefix: true });
  _registerComplexSpecialProp("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: true, color: true, multi: true, keyword: "inset" });
  _registerComplexSpecialProp("clipPath", { defaultValue: "inset(0%)", prefix: true, multi: true, formatter: _getFormatter("inset(0% 0% 0% 0%)", false, true) });
  _registerComplexSpecialProp("borderRadius", { defaultValue: "0px", parser: function(t, e, p3, cssp, pt, plugin) {
    e = this.format(e);
    var props = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], style = t.style, ea1, i2, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
    w = parseFloat(t.offsetWidth);
    h = parseFloat(t.offsetHeight);
    ea1 = e.split(" ");
    for (i2 = 0; i2 < props.length; i2++) {
      if (this.p.indexOf("border")) {
        props[i2] = _checkPropPrefix(props[i2]);
      }
      bs = bs2 = _getStyle(t, props[i2], _cs, false, "0px");
      if (bs.indexOf(" ") !== -1) {
        bs2 = bs.split(" ");
        bs = bs2[0];
        bs2 = bs2[1];
      }
      es = es2 = ea1[i2];
      bn = parseFloat(bs);
      bsfx = bs.substr((bn + "").length);
      rel = es.charAt(1) === "=";
      if (rel) {
        en = parseInt(es.charAt(0) + "1", 10);
        es = es.substr(2);
        en *= parseFloat(es);
        esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
      } else {
        en = parseFloat(es);
        esfx = es.substr((en + "").length);
      }
      if (esfx === "") {
        esfx = _suffixMap[p3] || bsfx;
      }
      if (esfx !== bsfx) {
        hn = _convertToPixels(t, "borderLeft", bn, bsfx);
        vn = _convertToPixels(t, "borderTop", bn, bsfx);
        if (esfx === "%") {
          bs = hn / w * 100 + "%";
          bs2 = vn / h * 100 + "%";
        } else if (esfx === "em") {
          em = _convertToPixels(t, "borderLeft", 1, "em");
          bs = hn / em + "em";
          bs2 = vn / em + "em";
        } else {
          bs = hn + "px";
          bs2 = vn + "px";
        }
        if (rel) {
          es = parseFloat(bs) + en + esfx;
          es2 = parseFloat(bs2) + en + esfx;
        }
      }
      pt = _parseComplex(style, props[i2], bs + " " + bs2, es + " " + es2, false, "0px", pt);
    }
    return pt;
  }, prefix: true, formatter: _getFormatter("0px 0px 0px 0px", false, true) });
  _registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", { defaultValue: "0px", parser: function(t, e, p3, cssp, pt, plugin) {
    return _parseComplex(t.style, p3, this.format(_getStyle(t, p3, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
  }, prefix: true, formatter: _getFormatter("0px 0px", false, true) });
  _registerComplexSpecialProp("backgroundPosition", { defaultValue: "0 0", parser: function(t, e, p3, cssp, pt, plugin) {
    var bp = "background-position", cs = _cs || _getComputedStyle(t), bs = this.format((cs ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), es = this.format(e), ba, ea, i2, pct, overlap, src;
    if (bs.indexOf("%") !== -1 !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
      src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
      if (src && src !== "none") {
        ba = bs.split(" ");
        ea = es.split(" ");
        _tempImg.setAttribute("src", src);
        i2 = 2;
        while (--i2 > -1) {
          bs = ba[i2];
          pct = bs.indexOf("%") !== -1;
          if (pct !== (ea[i2].indexOf("%") !== -1)) {
            overlap = i2 === 0 ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
            ba[i2] = pct ? parseFloat(bs) / 100 * overlap + "px" : parseFloat(bs) / overlap * 100 + "%";
          }
        }
        bs = ba.join(" ");
      }
    }
    return this.parseComplex(t.style, bs, es, pt, plugin);
  }, formatter: _parsePosition });
  _registerComplexSpecialProp("backgroundSize", { defaultValue: "0 0", formatter: function(v) {
    v += "";
    return v.substr(0, 2) === "co" ? v : _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v);
  } });
  _registerComplexSpecialProp("perspective", { defaultValue: "0px", prefix: true });
  _registerComplexSpecialProp("perspectiveOrigin", { defaultValue: "50% 50%", prefix: true });
  _registerComplexSpecialProp("transformStyle", { prefix: true });
  _registerComplexSpecialProp("backfaceVisibility", { prefix: true });
  _registerComplexSpecialProp("userSelect", { prefix: true });
  _registerComplexSpecialProp("margin", { parser: _getEdgeParser("marginTop,marginRight,marginBottom,marginLeft") });
  _registerComplexSpecialProp("padding", { parser: _getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft") });
  _registerComplexSpecialProp("clip", { defaultValue: "rect(0px,0px,0px,0px)", parser: function(t, e, p3, cssp, pt, plugin) {
    var b, cs, delim;
    if (_ieVers < 9) {
      cs = t.currentStyle;
      delim = _ieVers < 8 ? " " : ",";
      b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
      e = this.format(e).split(",").join(delim);
    } else {
      b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
      e = this.format(e);
    }
    return this.parseComplex(t.style, b, e, pt, plugin);
  } });
  _registerComplexSpecialProp("textShadow", { defaultValue: "0px 0px 0px #999", color: true, multi: true });
  _registerComplexSpecialProp("autoRound,strictUnits", { parser: function(t, e, p3, cssp, pt) {
    return pt;
  } });
  _registerComplexSpecialProp("border", { defaultValue: "0px solid #000", parser: function(t, e, p3, cssp, pt, plugin) {
    var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"), end = this.format(e).split(" "), esfx = end[0].replace(_suffixExp, "");
    if (esfx !== "px") {
      bw = parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx) + esfx;
    }
    return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
  }, color: true, formatter: function(v) {
    var a = v.split(" ");
    return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
  } });
  _registerComplexSpecialProp("borderWidth", { parser: _getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth") });
  _registerComplexSpecialProp("float,cssFloat,styleFloat", { parser: function(t, e, p3, cssp, pt, plugin) {
    var s = t.style, prop = "cssFloat" in s ? "cssFloat" : "styleFloat";
    return new CSSPropTween(s, prop, 0, 0, pt, -1, p3, false, 0, s[prop], e);
  } });
  var _setIEOpacityRatio = function(v) {
    var t = this.t, filters = t.filter || _getStyle(this.data, "filter") || "", val = this.s + this.c * v | 0, skip;
    if (val === 100) {
      if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
        t.removeAttribute("filter");
        skip = !_getStyle(this.data, "filter");
      } else {
        t.filter = filters.replace(_alphaFilterExp, "");
        skip = true;
      }
    }
    if (!skip) {
      if (this.xn1) {
        t.filter = filters = filters || "alpha(opacity=" + val + ")";
      }
      if (filters.indexOf("pacity") === -1) {
        if (val !== 0 || !this.xn1) {
          t.filter = filters + " alpha(opacity=" + val + ")";
        }
      } else {
        t.filter = filters.replace(_opacityExp, "opacity=" + val);
      }
    }
  };
  _registerComplexSpecialProp("opacity,alpha,autoAlpha", { defaultValue: "1", parser: function(t, e, p3, cssp, pt, plugin) {
    var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")), style = t.style, isAutoAlpha = p3 === "autoAlpha";
    if (typeof e === "string" && e.charAt(1) === "=") {
      e = (e.charAt(0) === "-" ? -1 : 1) * parseFloat(e.substr(2)) + b;
    }
    if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) {
      b = 0;
    }
    if (_supportsOpacity) {
      pt = new CSSPropTween(style, "opacity", b, e - b, pt);
    } else {
      pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
      pt.xn1 = isAutoAlpha ? 1 : 0;
      style.zoom = 1;
      pt.type = 2;
      pt.b = "alpha(opacity=" + pt.s + ")";
      pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
      pt.data = t;
      pt.plugin = plugin;
      pt.setRatio = _setIEOpacityRatio;
    }
    if (isAutoAlpha) {
      pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, b !== 0 ? "inherit" : "hidden", e === 0 ? "hidden" : "inherit");
      pt.xs0 = "inherit";
      cssp._overwriteProps.push(pt.n);
      cssp._overwriteProps.push(p3);
    }
    return pt;
  } });
  var _removeProp = function(s, p3) {
    if (p3) {
      if (s.removeProperty) {
        if (p3.substr(0, 2) === "ms" || p3.substr(0, 6) === "webkit") {
          p3 = "-" + p3;
        }
        s.removeProperty(p3.replace(_capsExp, "-$1").toLowerCase());
      } else {
        s.removeAttribute(p3);
      }
    }
  }, _setClassNameRatio = function(v) {
    this.t._gsClassPT = this;
    if (v === 1 || v === 0) {
      this.t.setAttribute("class", v === 0 ? this.b : this.e);
      var mpt = this.data, s = this.t.style;
      while (mpt) {
        if (!mpt.v) {
          _removeProp(s, mpt.p);
        } else {
          s[mpt.p] = mpt.v;
        }
        mpt = mpt._next;
      }
      if (v === 1 && this.t._gsClassPT === this) {
        this.t._gsClassPT = null;
      }
    } else if (this.t.getAttribute("class") !== this.e) {
      this.t.setAttribute("class", this.e);
    }
  };
  _registerComplexSpecialProp("className", { parser: function(t, e, p3, cssp, pt, plugin, vars) {
    var b = t.getAttribute("class") || "", cssText = t.style.cssText, difData, bs, cnpt, cnptLookup, mpt;
    pt = cssp._classNamePT = new CSSPropTween(t, p3, 0, 0, pt, 2);
    pt.setRatio = _setClassNameRatio;
    pt.pr = -11;
    _hasPriority = true;
    pt.b = b;
    bs = _getAllStyles(t, _cs);
    cnpt = t._gsClassPT;
    if (cnpt) {
      cnptLookup = {};
      mpt = cnpt.data;
      while (mpt) {
        cnptLookup[mpt.p] = 1;
        mpt = mpt._next;
      }
      cnpt.setRatio(1);
    }
    t._gsClassPT = pt;
    pt.e = e.charAt(1) !== "=" ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + (e.charAt(0) === "+" ? " " + e.substr(2) : "");
    t.setAttribute("class", pt.e);
    difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
    t.setAttribute("class", b);
    pt.data = difData.firstMPT;
    if (t.style.cssText !== cssText) {
      t.style.cssText = cssText;
    }
    pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin);
    return pt;
  } });
  var _setClearPropsRatio = function(v) {
    if (v === 1 || v === 0) {
      if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") {
        var s = this.t.style, transformParse = _specialProps.transform.parse, a, p3, i2, clearTransform, transform;
        if (this.e === "all") {
          s.cssText = "";
          clearTransform = true;
        } else {
          a = this.e.split(" ").join("").split(",");
          i2 = a.length;
          while (--i2 > -1) {
            p3 = a[i2];
            if (_specialProps[p3]) {
              if (_specialProps[p3].parse === transformParse) {
                clearTransform = true;
              } else {
                p3 = p3 === "transformOrigin" ? _transformOriginProp : _specialProps[p3].p;
              }
            }
            _removeProp(s, p3);
          }
        }
        if (clearTransform) {
          _removeProp(s, _transformProp);
          transform = this.t._gsTransform;
          if (transform) {
            if (transform.svg) {
              this.t.removeAttribute("data-svg-origin");
              this.t.removeAttribute("transform");
            }
            delete this.t._gsTransform;
          }
        }
      }
    }
  };
  _registerComplexSpecialProp("clearProps", { parser: function(t, e, p3, cssp, pt) {
    pt = new CSSPropTween(t, p3, 0, 0, pt, 2);
    pt.setRatio = _setClearPropsRatio;
    pt.e = e;
    pt.pr = -10;
    pt.data = cssp._tween;
    _hasPriority = true;
    return pt;
  } });
  p2 = "bezier,throwProps,physicsProps,physics2D".split(",");
  i = p2.length;
  while (i--) {
    _registerPluginProp(p2[i]);
  }
  p2 = CSSPlugin2.prototype;
  p2._firstPT = p2._lastParsedTransform = p2._transform = null;
  p2._onInitTween = function(target, vars, tween, index2) {
    if (!target.nodeType) {
      return false;
    }
    this._target = _target = target;
    this._tween = tween;
    this._vars = vars;
    _index = index2;
    _autoRound = vars.autoRound;
    _hasPriority = false;
    _suffixMap = vars.suffixMap || CSSPlugin2.suffixMap;
    _cs = _getComputedStyle(target);
    _overwriteProps = this._overwriteProps;
    var style = target.style, v, pt, pt2, first, last, next, zIndex, tpt, threeD;
    if (_reqSafariFix) {
      if (style.zIndex === "") {
        v = _getStyle(target, "zIndex", _cs);
        if (v === "auto" || v === "") {
          this._addLazySet(style, "zIndex", 0);
        }
      }
    }
    if (typeof vars === "string") {
      first = style.cssText;
      v = _getAllStyles(target, _cs);
      style.cssText = first + ";" + vars;
      v = _cssDif(target, v, _getAllStyles(target)).difs;
      if (!_supportsOpacity && _opacityValExp.test(vars)) {
        v.opacity = parseFloat(RegExp.$1);
      }
      vars = v;
      style.cssText = first;
    }
    if (vars.className) {
      this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
    } else {
      this._firstPT = pt = this.parse(target, vars, null);
    }
    if (this._transformType) {
      threeD = this._transformType === 3;
      if (!_transformProp) {
        style.zoom = 1;
      } else if (_isSafari) {
        _reqSafariFix = true;
        if (style.zIndex === "") {
          zIndex = _getStyle(target, "zIndex", _cs);
          if (zIndex === "auto" || zIndex === "") {
            this._addLazySet(style, "zIndex", 0);
          }
        }
        if (_isSafariLT6) {
          this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
        }
      }
      pt2 = pt;
      while (pt2 && pt2._next) {
        pt2 = pt2._next;
      }
      tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
      this._linkCSSP(tpt, null, pt2);
      tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
      tpt.data = this._transform || _getTransform(target, _cs, true);
      tpt.tween = tween;
      tpt.pr = -1;
      _overwriteProps.pop();
    }
    if (_hasPriority) {
      while (pt) {
        next = pt._next;
        pt2 = first;
        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }
        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }
        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }
        pt = next;
      }
      this._firstPT = first;
    }
    return true;
  };
  p2.parse = function(target, vars, pt, plugin) {
    var style = target.style, p3, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
    for (p3 in vars) {
      es = vars[p3];
      sp = _specialProps[p3];
      if (typeof es === "function" && !(sp && sp.allowFunc)) {
        es = es(_index, _target);
      }
      if (sp) {
        pt = sp.parse(target, es, p3, this, pt, plugin, vars);
      } else if (p3.substr(0, 2) === "--") {
        this._tween._propLookup[p3] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p3) + "", es + "", p3, false, p3);
        continue;
      } else {
        bs = _getStyle(target, p3, _cs) + "";
        isStr = typeof es === "string";
        if (p3 === "color" || p3 === "fill" || p3 === "stroke" || p3.indexOf("Color") !== -1 || isStr && _rgbhslExp.test(es)) {
          if (!isStr) {
            es = _parseColor(es);
            es = (es.length > 3 ? "rgba(" : "rgb(") + es.join(",") + ")";
          }
          pt = _parseComplex(style, p3, bs, es, true, "transparent", pt, 0, plugin);
        } else if (isStr && _complexExp.test(es)) {
          pt = _parseComplex(style, p3, bs, es, true, null, pt, 0, plugin);
        } else {
          bn = parseFloat(bs);
          bsfx = bn || bn === 0 ? bs.substr((bn + "").length) : "";
          if (bs === "" || bs === "auto") {
            if (p3 === "width" || p3 === "height") {
              bn = _getDimension(target, p3, _cs);
              bsfx = "px";
            } else if (p3 === "left" || p3 === "top") {
              bn = _calculateOffset(target, p3, _cs);
              bsfx = "px";
            } else {
              bn = p3 !== "opacity" ? 0 : 1;
              bsfx = "";
            }
          }
          rel = isStr && es.charAt(1) === "=";
          if (rel) {
            en = parseInt(es.charAt(0) + "1", 10);
            es = es.substr(2);
            en *= parseFloat(es);
            esfx = es.replace(_suffixExp, "");
          } else {
            en = parseFloat(es);
            esfx = isStr ? es.replace(_suffixExp, "") : "";
          }
          if (esfx === "") {
            esfx = p3 in _suffixMap ? _suffixMap[p3] : bsfx;
          }
          es = en || en === 0 ? (rel ? en + bn : en) + esfx : vars[p3];
          if (bsfx !== esfx) {
            if (esfx !== "" || p3 === "lineHeight") {
              if (en || en === 0) {
                if (bn) {
                  bn = _convertToPixels(target, p3, bn, bsfx);
                  if (esfx === "%") {
                    bn /= _convertToPixels(target, p3, 100, "%") / 100;
                    if (vars.strictUnits !== true) {
                      bs = bn + "%";
                    }
                  } else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
                    bn /= _convertToPixels(target, p3, 1, esfx);
                  } else if (esfx !== "px") {
                    en = _convertToPixels(target, p3, en, esfx);
                    esfx = "px";
                  }
                  if (rel) {
                    if (en || en === 0) {
                      es = en + bn + esfx;
                    }
                  }
                }
              }
            }
          }
          if (rel) {
            en += bn;
          }
          if ((bn || bn === 0) && (en || en === 0)) {
            pt = new CSSPropTween(style, p3, bn, en - bn, pt, 0, p3, _autoRound !== false && (esfx === "px" || p3 === "zIndex"), 0, bs, es);
            pt.xs0 = esfx;
          } else if (style[p3] === void 0 || !es && (es + "" === "NaN" || es == null)) {
            _log("invalid " + p3 + " tween value: " + vars[p3]);
          } else {
            pt = new CSSPropTween(style, p3, en || bn || 0, 0, pt, -1, p3, false, 0, bs, es);
            pt.xs0 = es === "none" && (p3 === "display" || p3.indexOf("Style") !== -1) ? bs : es;
          }
        }
      }
      if (plugin) {
        if (pt && !pt.plugin) {
          pt.plugin = plugin;
        }
      }
    }
    return pt;
  };
  p2.setRatio = function(v) {
    var pt = this._firstPT, min = 1e-6, val, str, i2;
    if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
      while (pt) {
        if (pt.type !== 2) {
          if (pt.r && pt.type !== -1) {
            val = pt.r(pt.s + pt.c);
            if (!pt.type) {
              pt.t[pt.p] = val + pt.xs0;
            } else if (pt.type === 1) {
              i2 = pt.l;
              str = pt.xs0 + val + pt.xs1;
              for (i2 = 1; i2 < pt.l; i2++) {
                str += pt["xn" + i2] + pt["xs" + (i2 + 1)];
              }
              pt.t[pt.p] = str;
            }
          } else {
            pt.t[pt.p] = pt.e;
          }
        } else {
          pt.setRatio(v);
        }
        pt = pt._next;
      }
    } else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -1e-6) {
      while (pt) {
        val = pt.c * v + pt.s;
        if (pt.r) {
          val = pt.r(val);
        } else if (val < min) {
          if (val > -min) {
            val = 0;
          }
        }
        if (!pt.type) {
          pt.t[pt.p] = val + pt.xs0;
        } else if (pt.type === 1) {
          i2 = pt.l;
          if (i2 === 2) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
          } else if (i2 === 3) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
          } else if (i2 === 4) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
          } else if (i2 === 5) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
          } else {
            str = pt.xs0 + val + pt.xs1;
            for (i2 = 1; i2 < pt.l; i2++) {
              str += pt["xn" + i2] + pt["xs" + (i2 + 1)];
            }
            pt.t[pt.p] = str;
          }
        } else if (pt.type === -1) {
          pt.t[pt.p] = pt.xs0;
        } else if (pt.setRatio) {
          pt.setRatio(v);
        }
        pt = pt._next;
      }
    } else {
      while (pt) {
        if (pt.type !== 2) {
          pt.t[pt.p] = pt.b;
        } else {
          pt.setRatio(v);
        }
        pt = pt._next;
      }
    }
  };
  p2._enableTransforms = function(threeD) {
    this._transform = this._transform || _getTransform(this._target, _cs, true);
    this._transformType = !(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3) ? 3 : 2;
  };
  var lazySet = function(v) {
    this.t[this.p] = this.e;
    this.data._linkCSSP(this, this._next, null, true);
  };
  p2._addLazySet = function(t, p3, v) {
    var pt = this._firstPT = new CSSPropTween(t, p3, 0, 0, this._firstPT, 2);
    pt.e = v;
    pt.setRatio = lazySet;
    pt.data = this;
  };
  p2._linkCSSP = function(pt, next, prev, remove) {
    if (pt) {
      if (next) {
        next._prev = pt;
      }
      if (pt._next) {
        pt._next._prev = pt._prev;
      }
      if (pt._prev) {
        pt._prev._next = pt._next;
      } else if (this._firstPT === pt) {
        this._firstPT = pt._next;
        remove = true;
      }
      if (prev) {
        prev._next = pt;
      } else if (!remove && this._firstPT === null) {
        this._firstPT = pt;
      }
      pt._next = next;
      pt._prev = prev;
    }
    return pt;
  };
  p2._mod = function(lookup) {
    var pt = this._firstPT;
    while (pt) {
      if (typeof lookup[pt.p] === "function") {
        pt.r = lookup[pt.p];
      }
      pt = pt._next;
    }
  };
  p2._kill = function(lookup) {
    var copy = lookup, pt, p3, xfirst;
    if (lookup.autoAlpha || lookup.alpha) {
      copy = {};
      for (p3 in lookup) {
        copy[p3] = lookup[p3];
      }
      copy.opacity = 1;
      if (copy.autoAlpha) {
        copy.visibility = 1;
      }
    }
    if (lookup.className && (pt = this._classNamePT)) {
      xfirst = pt.xfirst;
      if (xfirst && xfirst._prev) {
        this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev);
      } else if (xfirst === this._firstPT) {
        this._firstPT = pt._next;
      }
      if (pt._next) {
        this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
      }
      this._classNamePT = null;
    }
    pt = this._firstPT;
    while (pt) {
      if (pt.plugin && pt.plugin !== p3 && pt.plugin._kill) {
        pt.plugin._kill(lookup);
        p3 = pt.plugin;
      }
      pt = pt._next;
    }
    return TweenPlugin.prototype._kill.call(this, copy);
  };
  var _getChildStyles = function(e, props, targets) {
    var children, i2, child, type;
    if (e.slice) {
      i2 = e.length;
      while (--i2 > -1) {
        _getChildStyles(e[i2], props, targets);
      }
      return;
    }
    children = e.childNodes;
    i2 = children.length;
    while (--i2 > -1) {
      child = children[i2];
      type = child.type;
      if (child.style) {
        props.push(_getAllStyles(child));
        if (targets) {
          targets.push(child);
        }
      }
      if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
        _getChildStyles(child, props, targets);
      }
    }
  };
  CSSPlugin2.cascadeTo = function(target, duration, vars) {
    var tween = TweenLite.to(target, duration, vars), results = [tween], b = [], e = [], targets = [], _reservedProps = TweenLite._internals.reservedProps, i2, difs, p3, from;
    target = tween._targets || tween.target;
    _getChildStyles(target, b, targets);
    tween.render(duration, true, true);
    _getChildStyles(target, e);
    tween.render(0, true, true);
    tween._enabled(true);
    i2 = targets.length;
    while (--i2 > -1) {
      difs = _cssDif(targets[i2], b[i2], e[i2]);
      if (difs.firstMPT) {
        difs = difs.difs;
        for (p3 in vars) {
          if (_reservedProps[p3]) {
            difs[p3] = vars[p3];
          }
        }
        from = {};
        for (p3 in difs) {
          from[p3] = b[i2][p3];
        }
        results.push(TweenLite.fromTo(targets[i2], duration, from, difs));
      }
    }
    return results;
  };
  TweenPlugin.activate([CSSPlugin2]);
  return CSSPlugin2;
}, true);
var CSSPlugin = globals.CSSPlugin;
/*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var AttrPlugin = _gsScope._gsDefine.plugin({
  propName: "attr",
  API: 2,
  version: "0.6.1",
  init: function(target, value, tween, index2) {
    var p2, end;
    if (typeof target.setAttribute !== "function") {
      return false;
    }
    for (p2 in value) {
      end = value[p2];
      if (typeof end === "function") {
        end = end(index2, target);
      }
      this._addTween(target, "setAttribute", target.getAttribute(p2) + "", end + "", p2, false, p2);
      this._overwriteProps.push(p2);
    }
    return true;
  }
});
/*!
 * VERSION: 1.6.0
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var RoundPropsPlugin = _gsScope._gsDefine.plugin({
  propName: "roundProps",
  version: "1.7.0",
  priority: -1,
  API: 2,
  init: function(target, value, tween) {
    this._tween = tween;
    return true;
  }
}), _getRoundFunc = function(v) {
  var p2 = v < 1 ? Math.pow(10, (v + "").length - 2) : 1;
  return function(n) {
    return (Math.round(n / v) * v * p2 | 0) / p2;
  };
}, _roundLinkedList = function(node, mod) {
  while (node) {
    if (!node.f && !node.blob) {
      node.m = mod || Math.round;
    }
    node = node._next;
  }
}, p$1 = RoundPropsPlugin.prototype;
p$1._onInitAllProps = function() {
  var tween = this._tween, rp = tween.vars.roundProps, lookup = {}, rpt = tween._propLookup.roundProps, pt, next, i, p2;
  if (typeof rp === "object" && !rp.push) {
    for (p2 in rp) {
      lookup[p2] = _getRoundFunc(rp[p2]);
    }
  } else {
    if (typeof rp === "string") {
      rp = rp.split(",");
    }
    i = rp.length;
    while (--i > -1) {
      lookup[rp[i]] = Math.round;
    }
  }
  for (p2 in lookup) {
    pt = tween._firstPT;
    while (pt) {
      next = pt._next;
      if (pt.pg) {
        pt.t._mod(lookup);
      } else if (pt.n === p2) {
        if (pt.f === 2 && pt.t) {
          _roundLinkedList(pt.t._firstPT, lookup[p2]);
        } else {
          this._add(pt.t, p2, pt.s, pt.c, lookup[p2]);
          if (next) {
            next._prev = pt._prev;
          }
          if (pt._prev) {
            pt._prev._next = next;
          } else if (tween._firstPT === pt) {
            tween._firstPT = next;
          }
          pt._next = pt._prev = null;
          tween._propLookup[p2] = rpt;
        }
      }
      pt = next;
    }
  }
  return false;
};
p$1._add = function(target, p2, s, c, mod) {
  this._addTween(target, p2, s, s + c, p2, mod || Math.round);
  this._overwriteProps.push(p2);
};
/*!
 * VERSION: 0.3.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var DirectionalRotationPlugin = _gsScope._gsDefine.plugin({
  propName: "directionalRotation",
  version: "0.3.1",
  API: 2,
  init: function(target, value, tween, index2) {
    if (typeof value !== "object") {
      value = { rotation: value };
    }
    this.finals = {};
    var cap = value.useRadians === true ? Math.PI * 2 : 360, min = 1e-6, p2, v, start, end, dif, split;
    for (p2 in value) {
      if (p2 !== "useRadians") {
        end = value[p2];
        if (typeof end === "function") {
          end = end(index2, target);
        }
        split = (end + "").split("_");
        v = split[0];
        start = parseFloat(typeof target[p2] !== "function" ? target[p2] : target[p2.indexOf("set") || typeof target["get" + p2.substr(3)] !== "function" ? p2 : "get" + p2.substr(3)]());
        end = this.finals[p2] = typeof v === "string" && v.charAt(1) === "=" ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
        dif = end - start;
        if (split.length) {
          v = split.join("_");
          if (v.indexOf("short") !== -1) {
            dif = dif % cap;
            if (dif !== dif % (cap / 2)) {
              dif = dif < 0 ? dif + cap : dif - cap;
            }
          }
          if (v.indexOf("_cw") !== -1 && dif < 0) {
            dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
          } else if (v.indexOf("ccw") !== -1 && dif > 0) {
            dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
          }
        }
        if (dif > min || dif < -min) {
          this._addTween(target, p2, start, start + dif, p2);
          this._overwriteProps.push(p2);
        }
      }
    }
    return true;
  },
  set: function(ratio) {
    var pt;
    if (ratio !== 1) {
      this._super.setRatio.call(this, ratio);
    } else {
      pt = this._firstPT;
      while (pt) {
        if (pt.f) {
          pt.t[pt.p](this.finals[pt.p]);
        } else {
          pt.t[pt.p] = this.finals[pt.p];
        }
        pt = pt._next;
      }
    }
  }
});
DirectionalRotationPlugin._autoCSS = true;
/*!
 * VERSION: 1.3.9
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _RAD2DEG = 180 / Math.PI, _r1 = [], _r2 = [], _r3 = [], _corProps = {}, _globals = _gsScope._gsDefine.globals, Segment = function(a, b, c, d) {
  if (c === d) {
    c = d - (d - b) / 1e6;
  }
  if (a === b) {
    b = a + (c - a) / 1e6;
  }
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.da = d - a;
  this.ca = c - a;
  this.ba = b - a;
}, _correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", cubicToQuadratic = function(a, b, c, d) {
  var q1 = { a }, q2 = {}, q3 = {}, q4 = { c: d }, mab = (a + b) / 2, mbc = (b + c) / 2, mcd = (c + d) / 2, mabc = (mab + mbc) / 2, mbcd = (mbc + mcd) / 2, m8 = (mbcd - mabc) / 8;
  q1.b = mab + (a - mab) / 4;
  q2.b = mabc + m8;
  q1.c = q2.a = (q1.b + q2.b) / 2;
  q2.c = q3.a = (mabc + mbcd) / 2;
  q3.b = mbcd - m8;
  q4.b = mcd + (d - mcd) / 4;
  q3.c = q4.a = (q3.b + q4.b) / 2;
  return [q1, q2, q3, q4];
}, _calculateControlPoints = function(a, curviness, quad, basic, correlate) {
  var l = a.length - 1, ii = 0, cp1 = a[0].a, i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
  for (i = 0; i < l; i++) {
    seg = a[ii];
    p1 = seg.a;
    p2 = seg.d;
    p3 = a[ii + 1].d;
    if (correlate) {
      r1 = _r1[i];
      r2 = _r2[i];
      tl = (r2 + r1) * curviness * 0.25 / (basic ? 0.5 : _r3[i] || 0.5);
      m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : r1 !== 0 ? tl / r1 : 0);
      m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : r2 !== 0 ? tl / r2 : 0);
      mm = p2 - (m1 + ((m2 - m1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
    } else {
      m1 = p2 - (p2 - p1) * curviness * 0.5;
      m2 = p2 + (p3 - p2) * curviness * 0.5;
      mm = p2 - (m1 + m2) / 2;
    }
    m1 += mm;
    m2 += mm;
    seg.c = cp2 = m1;
    if (i !== 0) {
      seg.b = cp1;
    } else {
      seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6;
    }
    seg.da = p2 - p1;
    seg.ca = cp2 - p1;
    seg.ba = cp1 - p1;
    if (quad) {
      qb = cubicToQuadratic(p1, cp1, cp2, p2);
      a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
      ii += 4;
    } else {
      ii++;
    }
    cp1 = m2;
  }
  seg = a[ii];
  seg.b = cp1;
  seg.c = cp1 + (seg.d - cp1) * 0.4;
  seg.da = seg.d - seg.a;
  seg.ca = seg.c - seg.a;
  seg.ba = cp1 - seg.a;
  if (quad) {
    qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
    a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
  }
}, _parseAnchors = function(values, p2, correlate, prepend) {
  var a = [], l, i, p1, p22, p3, tmp;
  if (prepend) {
    values = [prepend].concat(values);
    i = values.length;
    while (--i > -1) {
      if (typeof (tmp = values[i][p2]) === "string") {
        if (tmp.charAt(1) === "=") {
          values[i][p2] = prepend[p2] + Number(tmp.charAt(0) + tmp.substr(2));
        }
      }
    }
  }
  l = values.length - 2;
  if (l < 0) {
    a[0] = new Segment(values[0][p2], 0, 0, values[0][p2]);
    return a;
  }
  for (i = 0; i < l; i++) {
    p1 = values[i][p2];
    p22 = values[i + 1][p2];
    a[i] = new Segment(p1, 0, 0, p22);
    if (correlate) {
      p3 = values[i + 2][p2];
      _r1[i] = (_r1[i] || 0) + (p22 - p1) * (p22 - p1);
      _r2[i] = (_r2[i] || 0) + (p3 - p22) * (p3 - p22);
    }
  }
  a[i] = new Segment(values[i][p2], 0, 0, values[i + 1][p2]);
  return a;
}, bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
  var obj = {}, props = [], first = prepend || values[0], i, p2, a, j, r, l, seamless, last;
  correlate = typeof correlate === "string" ? "," + correlate + "," : _correlate;
  if (curviness == null) {
    curviness = 1;
  }
  for (p2 in values[0]) {
    props.push(p2);
  }
  if (values.length > 1) {
    last = values[values.length - 1];
    seamless = true;
    i = props.length;
    while (--i > -1) {
      p2 = props[i];
      if (Math.abs(first[p2] - last[p2]) > 0.05) {
        seamless = false;
        break;
      }
    }
    if (seamless) {
      values = values.concat();
      if (prepend) {
        values.unshift(prepend);
      }
      values.push(values[1]);
      prepend = values[values.length - 3];
    }
  }
  _r1.length = _r2.length = _r3.length = 0;
  i = props.length;
  while (--i > -1) {
    p2 = props[i];
    _corProps[p2] = correlate.indexOf("," + p2 + ",") !== -1;
    obj[p2] = _parseAnchors(values, p2, _corProps[p2], prepend);
  }
  i = _r1.length;
  while (--i > -1) {
    _r1[i] = Math.sqrt(_r1[i]);
    _r2[i] = Math.sqrt(_r2[i]);
  }
  if (!basic) {
    i = props.length;
    while (--i > -1) {
      if (_corProps[p2]) {
        a = obj[props[i]];
        l = a.length - 1;
        for (j = 0; j < l; j++) {
          r = a[j + 1].da / _r2[j] + a[j].da / _r1[j] || 0;
          _r3[j] = (_r3[j] || 0) + r * r;
        }
      }
    }
    i = _r3.length;
    while (--i > -1) {
      _r3[i] = Math.sqrt(_r3[i]);
    }
  }
  i = props.length;
  j = quadratic ? 4 : 1;
  while (--i > -1) {
    p2 = props[i];
    a = obj[p2];
    _calculateControlPoints(a, curviness, quadratic, basic, _corProps[p2]);
    if (seamless) {
      a.splice(0, j);
      a.splice(a.length - j, j);
    }
  }
  return obj;
}, _parseBezierData = function(values, type, prepend) {
  type = type || "soft";
  var obj = {}, inc = type === "cubic" ? 3 : 2, soft = type === "soft", props = [], a, b, c, d, cur, i, j, l, p2, cnt, tmp;
  if (soft && prepend) {
    values = [prepend].concat(values);
  }
  if (values == null || values.length < inc + 1) {
    throw "invalid Bezier data";
  }
  for (p2 in values[0]) {
    props.push(p2);
  }
  i = props.length;
  while (--i > -1) {
    p2 = props[i];
    obj[p2] = cur = [];
    cnt = 0;
    l = values.length;
    for (j = 0; j < l; j++) {
      a = prepend == null ? values[j][p2] : typeof (tmp = values[j][p2]) === "string" && tmp.charAt(1) === "=" ? prepend[p2] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
      if (soft) {
        if (j > 1) {
          if (j < l - 1) {
            cur[cnt++] = (a + cur[cnt - 2]) / 2;
          }
        }
      }
      cur[cnt++] = a;
    }
    l = cnt - inc + 1;
    cnt = 0;
    for (j = 0; j < l; j += inc) {
      a = cur[j];
      b = cur[j + 1];
      c = cur[j + 2];
      d = inc === 2 ? 0 : cur[j + 3];
      cur[cnt++] = tmp = inc === 3 ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
    }
    cur.length = cnt;
  }
  return obj;
}, _addCubicLengths = function(a, steps, resolution) {
  var inc = 1 / resolution, j = a.length, d, d1, s, da, ca, ba, p2, i, inv, bez, index2;
  while (--j > -1) {
    bez = a[j];
    s = bez.a;
    da = bez.d - s;
    ca = bez.c - s;
    ba = bez.b - s;
    d = d1 = 0;
    for (i = 1; i <= resolution; i++) {
      p2 = inc * i;
      inv = 1 - p2;
      d = d1 - (d1 = (p2 * p2 * da + 3 * inv * (p2 * ca + inv * ba)) * p2);
      index2 = j * resolution + i - 1;
      steps[index2] = (steps[index2] || 0) + d * d;
    }
  }
}, _parseLengthData = function(obj, resolution) {
  resolution = resolution >> 0 || 6;
  var a = [], lengths = [], d = 0, total = 0, threshold = resolution - 1, segments = [], curLS = [], p2, i, l, index2;
  for (p2 in obj) {
    _addCubicLengths(obj[p2], a, resolution);
  }
  l = a.length;
  for (i = 0; i < l; i++) {
    d += Math.sqrt(a[i]);
    index2 = i % resolution;
    curLS[index2] = d;
    if (index2 === threshold) {
      total += d;
      index2 = i / resolution >> 0;
      segments[index2] = curLS;
      lengths[index2] = total;
      d = 0;
      curLS = [];
    }
  }
  return { length: total, lengths, segments };
}, BezierPlugin = _gsScope._gsDefine.plugin({
  propName: "bezier",
  priority: -1,
  version: "1.3.9",
  API: 2,
  global: true,
  init: function(target, vars, tween) {
    this._target = target;
    if (vars instanceof Array) {
      vars = { values: vars };
    }
    this._func = {};
    this._mod = {};
    this._props = [];
    this._timeRes = vars.timeResolution == null ? 6 : parseInt(vars.timeResolution, 10);
    var values = vars.values || [], first = {}, second = values[0], autoRotate = vars.autoRotate || tween.vars.orientToBezier, p2, isFunc, i, j, prepend;
    this._autoRotate = autoRotate ? autoRotate instanceof Array ? autoRotate : [["x", "y", "rotation", autoRotate === true ? 0 : Number(autoRotate) || 0]] : null;
    for (p2 in second) {
      this._props.push(p2);
    }
    i = this._props.length;
    while (--i > -1) {
      p2 = this._props[i];
      this._overwriteProps.push(p2);
      isFunc = this._func[p2] = typeof target[p2] === "function";
      first[p2] = !isFunc ? parseFloat(target[p2]) : target[p2.indexOf("set") || typeof target["get" + p2.substr(3)] !== "function" ? p2 : "get" + p2.substr(3)]();
      if (!prepend) {
        if (first[p2] !== values[0][p2]) {
          prepend = first;
        }
      }
    }
    this._beziers = vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft" ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, vars.type === "thruBasic", vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
    this._segCount = this._beziers[p2].length;
    if (this._timeRes) {
      var ld = _parseLengthData(this._beziers, this._timeRes);
      this._length = ld.length;
      this._lengths = ld.lengths;
      this._segments = ld.segments;
      this._l1 = this._li = this._s1 = this._si = 0;
      this._l2 = this._lengths[0];
      this._curSeg = this._segments[0];
      this._s2 = this._curSeg[0];
      this._prec = 1 / this._curSeg.length;
    }
    if (autoRotate = this._autoRotate) {
      this._initialRotations = [];
      if (!(autoRotate[0] instanceof Array)) {
        this._autoRotate = autoRotate = [autoRotate];
      }
      i = autoRotate.length;
      while (--i > -1) {
        for (j = 0; j < 3; j++) {
          p2 = autoRotate[i][j];
          this._func[p2] = typeof target[p2] === "function" ? target[p2.indexOf("set") || typeof target["get" + p2.substr(3)] !== "function" ? p2 : "get" + p2.substr(3)] : false;
        }
        p2 = autoRotate[i][2];
        this._initialRotations[i] = (this._func[p2] ? this._func[p2].call(this._target) : this._target[p2]) || 0;
        this._overwriteProps.push(p2);
      }
    }
    this._startRatio = tween.vars.runBackwards ? 1 : 0;
    return true;
  },
  set: function(v) {
    var segments = this._segCount, func = this._func, target = this._target, notStart = v !== this._startRatio, curIndex, inv, i, p2, b, t, val, l, lengths, curSeg, v1;
    if (!this._timeRes) {
      curIndex = v < 0 ? 0 : v >= 1 ? segments - 1 : segments * v >> 0;
      t = (v - curIndex * (1 / segments)) * segments;
    } else {
      lengths = this._lengths;
      curSeg = this._curSeg;
      v1 = v * this._length;
      i = this._li;
      if (v1 > this._l2 && i < segments - 1) {
        l = segments - 1;
        while (i < l && (this._l2 = lengths[++i]) <= v1) {
        }
        this._l1 = lengths[i - 1];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s2 = curSeg[this._s1 = this._si = 0];
      } else if (v1 < this._l1 && i > 0) {
        while (i > 0 && (this._l1 = lengths[--i]) >= v1) {
        }
        if (i === 0 && v1 < this._l1) {
          this._l1 = 0;
        } else {
          i++;
        }
        this._l2 = lengths[i];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
        this._s2 = curSeg[this._si];
      }
      curIndex = i;
      v1 -= this._l1;
      i = this._si;
      if (v1 > this._s2 && i < curSeg.length - 1) {
        l = curSeg.length - 1;
        while (i < l && (this._s2 = curSeg[++i]) <= v1) {
        }
        this._s1 = curSeg[i - 1];
        this._si = i;
      } else if (v1 < this._s1 && i > 0) {
        while (i > 0 && (this._s1 = curSeg[--i]) >= v1) {
        }
        if (i === 0 && v1 < this._s1) {
          this._s1 = 0;
        } else {
          i++;
        }
        this._s2 = curSeg[i];
        this._si = i;
      }
      t = v === 1 ? 1 : (i + (v1 - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
    }
    inv = 1 - t;
    i = this._props.length;
    while (--i > -1) {
      p2 = this._props[i];
      b = this._beziers[p2][curIndex];
      val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
      if (this._mod[p2]) {
        val = this._mod[p2](val, target);
      }
      if (func[p2]) {
        target[p2](val);
      } else {
        target[p2] = val;
      }
    }
    if (this._autoRotate) {
      var ar = this._autoRotate, b2, x1, y1, x2, y2, add, conv;
      i = ar.length;
      while (--i > -1) {
        p2 = ar[i][2];
        add = ar[i][3] || 0;
        conv = ar[i][4] === true ? 1 : _RAD2DEG;
        b = this._beziers[ar[i][0]];
        b2 = this._beziers[ar[i][1]];
        if (b && b2) {
          b = b[curIndex];
          b2 = b2[curIndex];
          x1 = b.a + (b.b - b.a) * t;
          x2 = b.b + (b.c - b.b) * t;
          x1 += (x2 - x1) * t;
          x2 += (b.c + (b.d - b.c) * t - x2) * t;
          y1 = b2.a + (b2.b - b2.a) * t;
          y2 = b2.b + (b2.c - b2.b) * t;
          y1 += (y2 - y1) * t;
          y2 += (b2.c + (b2.d - b2.c) * t - y2) * t;
          val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];
          if (this._mod[p2]) {
            val = this._mod[p2](val, target);
          }
          if (func[p2]) {
            target[p2](val);
          } else {
            target[p2] = val;
          }
        }
      }
    }
  }
}), p = BezierPlugin.prototype;
BezierPlugin.bezierThrough = bezierThrough;
BezierPlugin.cubicToQuadratic = cubicToQuadratic;
BezierPlugin._autoCSS = true;
BezierPlugin.quadraticToCubic = function(a, b, c) {
  return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
};
BezierPlugin._cssRegister = function() {
  var CSSPlugin2 = _globals.CSSPlugin;
  if (!CSSPlugin2) {
    return;
  }
  var _internals = CSSPlugin2._internals, _parseToProxy = _internals._parseToProxy, _setPluginRatio = _internals._setPluginRatio, CSSPropTween = _internals.CSSPropTween;
  _internals._registerComplexSpecialProp("bezier", { parser: function(t, e, prop, cssp, pt, plugin) {
    if (e instanceof Array) {
      e = { values: e };
    }
    plugin = new BezierPlugin();
    var values = e.values, l = values.length - 1, pluginValues = [], v = {}, i, p2, data;
    if (l < 0) {
      return pt;
    }
    for (i = 0; i <= l; i++) {
      data = _parseToProxy(t, values[i], cssp, pt, plugin, l !== i);
      pluginValues[i] = data.end;
    }
    for (p2 in e) {
      v[p2] = e[p2];
    }
    v.values = pluginValues;
    pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
    pt.data = data;
    pt.plugin = plugin;
    pt.setRatio = _setPluginRatio;
    if (v.autoRotate === 0) {
      v.autoRotate = true;
    }
    if (v.autoRotate && !(v.autoRotate instanceof Array)) {
      i = v.autoRotate === true ? 0 : Number(v.autoRotate);
      v.autoRotate = data.end.left != null ? [["left", "top", "rotation", i, false]] : data.end.x != null ? [["x", "y", "rotation", i, false]] : false;
    }
    if (v.autoRotate) {
      if (!cssp._transform) {
        cssp._enableTransforms(false);
      }
      data.autoRotate = cssp._target._gsTransform;
      data.proxy.rotation = data.autoRotate.rotation || 0;
      cssp._overwriteProps.push("rotation");
    }
    plugin._onInitTween(data.proxy, v, cssp._tween);
    return pt;
  } });
};
p._mod = function(lookup) {
  var op = this._overwriteProps, i = op.length, val;
  while (--i > -1) {
    val = lookup[op[i]];
    if (val && typeof val === "function") {
      this._mod[op[i]] = val;
    }
  }
};
p._kill = function(lookup) {
  var a = this._props, p2, i;
  for (p2 in this._beziers) {
    if (p2 in lookup) {
      delete this._beziers[p2];
      delete this._func[p2];
      i = a.length;
      while (--i > -1) {
        if (a[i] === p2) {
          a.splice(i, 1);
        }
      }
    }
  }
  a = this._autoRotate;
  if (a) {
    i = a.length;
    while (--i > -1) {
      if (lookup[a[i][2]]) {
        a.splice(i, 1);
      }
    }
  }
  return this._super._kill.call(this, lookup);
};
/*!
 * VERSION: 1.16.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
_gsScope._gsDefine("easing.Back", ["easing.Ease"], function() {
  var w = _gsScope.GreenSockGlobals || _gsScope, gs = w.com.greensock, _2PI = Math.PI * 2, _HALF_PI = Math.PI / 2, _class = gs._class, _create = function(n, f) {
    var C = _class("easing." + n, function() {
    }, true), p3 = C.prototype = new Ease();
    p3.constructor = C;
    p3.getRatio = f;
    return C;
  }, _easeReg = Ease.register || function() {
  }, _wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
    var C = _class("easing." + name, {
      easeOut: new EaseOut(),
      easeIn: new EaseIn(),
      easeInOut: new EaseInOut()
    }, true);
    _easeReg(C, name);
    return C;
  }, EasePoint = function(time, value, next) {
    this.t = time;
    this.v = value;
    if (next) {
      this.next = next;
      next.prev = this;
      this.c = next.v - value;
      this.gap = next.t - time;
    }
  }, _createBack = function(n, f) {
    var C = _class("easing." + n, function(overshoot) {
      this._p1 = overshoot || overshoot === 0 ? overshoot : 1.70158;
      this._p2 = this._p1 * 1.525;
    }, true), p3 = C.prototype = new Ease();
    p3.constructor = C;
    p3.getRatio = f;
    p3.config = function(overshoot) {
      return new C(overshoot);
    };
    return C;
  }, Back2 = _wrap(
    "Back",
    _createBack("BackOut", function(p3) {
      return (p3 = p3 - 1) * p3 * ((this._p1 + 1) * p3 + this._p1) + 1;
    }),
    _createBack("BackIn", function(p3) {
      return p3 * p3 * ((this._p1 + 1) * p3 - this._p1);
    }),
    _createBack("BackInOut", function(p3) {
      return (p3 *= 2) < 1 ? 0.5 * p3 * p3 * ((this._p2 + 1) * p3 - this._p2) : 0.5 * ((p3 -= 2) * p3 * ((this._p2 + 1) * p3 + this._p2) + 2);
    })
  ), SlowMo2 = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
    power = power || power === 0 ? power : 0.7;
    if (linearRatio == null) {
      linearRatio = 0.7;
    } else if (linearRatio > 1) {
      linearRatio = 1;
    }
    this._p = linearRatio !== 1 ? power : 0;
    this._p1 = (1 - linearRatio) / 2;
    this._p2 = linearRatio;
    this._p3 = this._p1 + this._p2;
    this._calcEnd = yoyoMode === true;
  }, true), p2 = SlowMo2.prototype = new Ease(), SteppedEase2, ExpoScaleEase2, RoughEase2, _createElastic;
  p2.constructor = SlowMo2;
  p2.getRatio = function(p3) {
    var r = p3 + (0.5 - p3) * this._p;
    if (p3 < this._p1) {
      return this._calcEnd ? 1 - (p3 = 1 - p3 / this._p1) * p3 : r - (p3 = 1 - p3 / this._p1) * p3 * p3 * p3 * r;
    } else if (p3 > this._p3) {
      return this._calcEnd ? p3 === 1 ? 0 : 1 - (p3 = (p3 - this._p3) / this._p1) * p3 : r + (p3 - r) * (p3 = (p3 - this._p3) / this._p1) * p3 * p3 * p3;
    }
    return this._calcEnd ? 1 : r;
  };
  SlowMo2.ease = new SlowMo2(0.7, 0.7);
  p2.config = SlowMo2.config = function(linearRatio, power, yoyoMode) {
    return new SlowMo2(linearRatio, power, yoyoMode);
  };
  SteppedEase2 = _class("easing.SteppedEase", function(steps, immediateStart) {
    steps = steps || 1;
    this._p1 = 1 / steps;
    this._p2 = steps + (immediateStart ? 0 : 1);
    this._p3 = immediateStart ? 1 : 0;
  }, true);
  p2 = SteppedEase2.prototype = new Ease();
  p2.constructor = SteppedEase2;
  p2.getRatio = function(p3) {
    if (p3 < 0) {
      p3 = 0;
    } else if (p3 >= 1) {
      p3 = 0.999999999;
    }
    return ((this._p2 * p3 | 0) + this._p3) * this._p1;
  };
  p2.config = SteppedEase2.config = function(steps, immediateStart) {
    return new SteppedEase2(steps, immediateStart);
  };
  ExpoScaleEase2 = _class("easing.ExpoScaleEase", function(start, end, ease) {
    this._p1 = Math.log(end / start);
    this._p2 = end - start;
    this._p3 = start;
    this._ease = ease;
  }, true);
  p2 = ExpoScaleEase2.prototype = new Ease();
  p2.constructor = ExpoScaleEase2;
  p2.getRatio = function(p3) {
    if (this._ease) {
      p3 = this._ease.getRatio(p3);
    }
    return (this._p3 * Math.exp(this._p1 * p3) - this._p3) / this._p2;
  };
  p2.config = ExpoScaleEase2.config = function(start, end, ease) {
    return new ExpoScaleEase2(start, end, ease);
  };
  RoughEase2 = _class("easing.RoughEase", function(vars) {
    vars = vars || {};
    var taper = vars.taper || "none", a = [], cnt = 0, points = (vars.points || 20) | 0, i = points, randomize = vars.randomize !== false, clamp = vars.clamp === true, template = vars.template instanceof Ease ? vars.template : null, strength = typeof vars.strength === "number" ? vars.strength * 0.4 : 0.4, x, y, bump, invX, obj, pnt;
    while (--i > -1) {
      x = randomize ? Math.random() : 1 / points * i;
      y = template ? template.getRatio(x) : x;
      if (taper === "none") {
        bump = strength;
      } else if (taper === "out") {
        invX = 1 - x;
        bump = invX * invX * strength;
      } else if (taper === "in") {
        bump = x * x * strength;
      } else if (x < 0.5) {
        invX = x * 2;
        bump = invX * invX * 0.5 * strength;
      } else {
        invX = (1 - x) * 2;
        bump = invX * invX * 0.5 * strength;
      }
      if (randomize) {
        y += Math.random() * bump - bump * 0.5;
      } else if (i % 2) {
        y += bump * 0.5;
      } else {
        y -= bump * 0.5;
      }
      if (clamp) {
        if (y > 1) {
          y = 1;
        } else if (y < 0) {
          y = 0;
        }
      }
      a[cnt++] = { x, y };
    }
    a.sort(function(a2, b) {
      return a2.x - b.x;
    });
    pnt = new EasePoint(1, 1, null);
    i = points;
    while (--i > -1) {
      obj = a[i];
      pnt = new EasePoint(obj.x, obj.y, pnt);
    }
    this._prev = new EasePoint(0, 0, pnt.t !== 0 ? pnt : pnt.next);
  }, true);
  p2 = RoughEase2.prototype = new Ease();
  p2.constructor = RoughEase2;
  p2.getRatio = function(p3) {
    var pnt = this._prev;
    if (p3 > pnt.t) {
      while (pnt.next && p3 >= pnt.t) {
        pnt = pnt.next;
      }
      pnt = pnt.prev;
    } else {
      while (pnt.prev && p3 <= pnt.t) {
        pnt = pnt.prev;
      }
    }
    this._prev = pnt;
    return pnt.v + (p3 - pnt.t) / pnt.gap * pnt.c;
  };
  p2.config = function(vars) {
    return new RoughEase2(vars);
  };
  RoughEase2.ease = new RoughEase2();
  _wrap(
    "Bounce",
    _create("BounceOut", function(p3) {
      if (p3 < 1 / 2.75) {
        return 7.5625 * p3 * p3;
      } else if (p3 < 2 / 2.75) {
        return 7.5625 * (p3 -= 1.5 / 2.75) * p3 + 0.75;
      } else if (p3 < 2.5 / 2.75) {
        return 7.5625 * (p3 -= 2.25 / 2.75) * p3 + 0.9375;
      }
      return 7.5625 * (p3 -= 2.625 / 2.75) * p3 + 0.984375;
    }),
    _create("BounceIn", function(p3) {
      if ((p3 = 1 - p3) < 1 / 2.75) {
        return 1 - 7.5625 * p3 * p3;
      } else if (p3 < 2 / 2.75) {
        return 1 - (7.5625 * (p3 -= 1.5 / 2.75) * p3 + 0.75);
      } else if (p3 < 2.5 / 2.75) {
        return 1 - (7.5625 * (p3 -= 2.25 / 2.75) * p3 + 0.9375);
      }
      return 1 - (7.5625 * (p3 -= 2.625 / 2.75) * p3 + 0.984375);
    }),
    _create("BounceInOut", function(p3) {
      var invert = p3 < 0.5;
      if (invert) {
        p3 = 1 - p3 * 2;
      } else {
        p3 = p3 * 2 - 1;
      }
      if (p3 < 1 / 2.75) {
        p3 = 7.5625 * p3 * p3;
      } else if (p3 < 2 / 2.75) {
        p3 = 7.5625 * (p3 -= 1.5 / 2.75) * p3 + 0.75;
      } else if (p3 < 2.5 / 2.75) {
        p3 = 7.5625 * (p3 -= 2.25 / 2.75) * p3 + 0.9375;
      } else {
        p3 = 7.5625 * (p3 -= 2.625 / 2.75) * p3 + 0.984375;
      }
      return invert ? (1 - p3) * 0.5 : p3 * 0.5 + 0.5;
    })
  );
  _wrap(
    "Circ",
    _create("CircOut", function(p3) {
      return Math.sqrt(1 - (p3 = p3 - 1) * p3);
    }),
    _create("CircIn", function(p3) {
      return -(Math.sqrt(1 - p3 * p3) - 1);
    }),
    _create("CircInOut", function(p3) {
      return (p3 *= 2) < 1 ? -0.5 * (Math.sqrt(1 - p3 * p3) - 1) : 0.5 * (Math.sqrt(1 - (p3 -= 2) * p3) + 1);
    })
  );
  _createElastic = function(n, f, def) {
    var C = _class("easing." + n, function(amplitude, period) {
      this._p1 = amplitude >= 1 ? amplitude : 1;
      this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
      this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
      this._p2 = _2PI / this._p2;
    }, true), p3 = C.prototype = new Ease();
    p3.constructor = C;
    p3.getRatio = f;
    p3.config = function(amplitude, period) {
      return new C(amplitude, period);
    };
    return C;
  };
  _wrap(
    "Elastic",
    _createElastic("ElasticOut", function(p3) {
      return this._p1 * Math.pow(2, -10 * p3) * Math.sin((p3 - this._p3) * this._p2) + 1;
    }, 0.3),
    _createElastic("ElasticIn", function(p3) {
      return -(this._p1 * Math.pow(2, 10 * (p3 -= 1)) * Math.sin((p3 - this._p3) * this._p2));
    }, 0.3),
    _createElastic("ElasticInOut", function(p3) {
      return (p3 *= 2) < 1 ? -0.5 * (this._p1 * Math.pow(2, 10 * (p3 -= 1)) * Math.sin((p3 - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (p3 -= 1)) * Math.sin((p3 - this._p3) * this._p2) * 0.5 + 1;
    }, 0.45)
  );
  _wrap(
    "Expo",
    _create("ExpoOut", function(p3) {
      return 1 - Math.pow(2, -10 * p3);
    }),
    _create("ExpoIn", function(p3) {
      return Math.pow(2, 10 * (p3 - 1)) - 1e-3;
    }),
    _create("ExpoInOut", function(p3) {
      return (p3 *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (p3 - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p3 - 1)));
    })
  );
  _wrap(
    "Sine",
    _create("SineOut", function(p3) {
      return Math.sin(p3 * _HALF_PI);
    }),
    _create("SineIn", function(p3) {
      return -Math.cos(p3 * _HALF_PI) + 1;
    }),
    _create("SineInOut", function(p3) {
      return -0.5 * (Math.cos(Math.PI * p3) - 1);
    })
  );
  _class("easing.EaseLookup", {
    find: function(s) {
      return Ease.map[s];
    }
  }, true);
  _easeReg(w.SlowMo, "SlowMo", "ease,");
  _easeReg(RoughEase2, "RoughEase", "ease,");
  _easeReg(SteppedEase2, "SteppedEase", "ease,");
  return Back2;
}, true);
var Back = globals.Back;
var Elastic = globals.Elastic;
var Bounce = globals.Bounce;
var RoughEase = globals.RoughEase;
var SlowMo = globals.SlowMo;
var SteppedEase = globals.SteppedEase;
var Circ = globals.Circ;
var Expo = globals.Expo;
var Sine = globals.Sine;
var ExpoScaleEase = globals.ExpoScaleEase;
/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var TweenMax = TweenMax$1;
TweenMax._autoActivated = [TimelineLite, TimelineMax, CSSPlugin, AttrPlugin, BezierPlugin, RoundPropsPlugin, DirectionalRotationPlugin, Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase];
var slideshowDuration = ref(4e3);
function indexInParent(node) {
  var children = node.parentNode.childNodes;
  var num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node)
      return num;
    if (children[i].nodeType == 1)
      num++;
  }
  return -1;
}
function slideshowPrev(manual, auto) {
  let prevSlide = activeSlide.value - 1;
  if (prevSlide < 0) {
    prevSlide = slides.value.length - 1;
  }
  slideshowSwitch(prevSlide, auto);
}
function slideshowNext(slideshow, previous, auto) {
  var slide = slideshow.value.querySelectorAll(".slide");
  var activeSlide2 = slideshow.value.querySelector(".is-active");
  var newSlide = null;
  if (previous) {
    newSlide = activeSlide2.previousElementSibling;
    if (newSlide.length === 0) {
      newSlide = slide.last();
    }
  } else {
    newSlide = activeSlide2.nextElementSibling;
    if (!activeSlide2.nextElementSibling)
      newSlide = slide[0];
  }
  slideshowSwitch(slideshow, indexInParent(newSlide), auto);
}
function slideshowSwitch(slideshow, index2, auto) {
  var slide = slideshow.value.querySelectorAll(".slide");
  var activeSlide2 = slideshow.value.querySelector(".is-active");
  var activeSlideImage = activeSlide2.querySelector(".image-container");
  var newSlide = slide[index2];
  const newSlideImage = newSlide.querySelector(".image-container");
  const newSlideContent = newSlide.querySelector(".slide-content");
  const newSlideElements = newSlide.querySelectorAll(".caption > *");
  if (activeSlide2 == newSlide)
    return;
  newSlide.classList.add("is-new");
  var timeout = slideshow.value.dataset.timeout;
  clearTimeout(timeout);
  var transition = slideshow.value.dataset.transition;
  if (transition == "fade") {
    newSlide.style.display = "block";
    newSlide.style.zIndex = 20;
    newSlideImage.style.opacity = 0;
    TweenMax.to(newSlideImage, 1, {
      alpha: 1,
      onComplete: function() {
        newSlide.classList.add("is-active");
        newSlide.classList.remove("is-new");
        activeSlide2.classList.remove("is-active");
        newSlide.style.cssText = "display: ''; zIndex: ''";
        newSlideImage.style.cssText = "opacity: ''";
        slideshow.value.dataset.wait = false;
        if (auto) {
          var timeout2 = setTimeout(function() {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration.value);
          slideshow.value.dataset.timeout = timeout2;
        }
      }
    });
  } else {
    if (index2 > indexInParent(activeSlide2)) {
      var newSlideRight = 0;
      var newSlideLeft = "auto";
      var newSlideImageRight = -slideshow.value.offsetWidth / 8;
      var newSlideImageLeft = "auto";
      var newSlideImageToRight = 0;
      var newSlideImageToLeft = "auto";
      var newSlideContentLeft = "auto";
      var newSlideContentRight = 0;
      var activeSlideImageLeft = -slideshow.value.offsetWidth / 4;
    } else {
      var newSlideRight = "";
      var newSlideLeft = 0;
      var newSlideImageRight = "auto";
      var newSlideImageLeft = -slideshow.value.offsetWidth / 8;
      var newSlideImageToRight = "";
      var newSlideImageToLeft = 0;
      var newSlideContentLeft = 0;
      var newSlideContentRight = "auto";
      var activeSlideImageLeft = slideshow.value.offsetWidth / 4;
    }
    newSlide.style.display = "block";
    newSlide.style.width = 0;
    newSlide.style.right = newSlideRight;
    newSlide.style.left = newSlideLeft;
    newSlide.style.zIndex = 2;
    newSlideImage.style.display = "block";
    newSlideImage.style.width = slideshow.value.offsetWidth;
    newSlideImage.style.right = newSlideImageRight;
    newSlideImage.style.left = newSlideImageLeft;
    newSlideImage.style.zIndex = 2;
    newSlideContent.style.width = slideshow.value.offsetWidth;
    newSlideContent.style.right = newSlideContentRight;
    newSlideContent.style.left = newSlideContentLeft;
    newSlideContent.style.zIndex = 200;
    activeSlideImage.style.left = 0;
    TweenMax.set(newSlideElements, { y: 20, force3D: true });
    TweenMax.to(activeSlideImage, 1, {
      left: activeSlideImageLeft,
      ease: Power3.easeInOut
    });
    TweenMax.to(newSlide, 1, {
      width: slideshow.value.offsetWidth,
      ease: Power3.easeInOut
    });
    TweenMax.to(newSlideImage, 1, {
      right: newSlideImageToRight,
      left: newSlideImageToLeft,
      ease: Power3.easeInOut
    });
    TweenMax.staggerFromTo(
      newSlideElements,
      0.8,
      { alpha: 0, y: 60 },
      { alpha: 1, y: 0, ease: Power3.easeOut, force3D: true, delay: 0.6 },
      0.1,
      function() {
        newSlide.classList.add("is-active");
        newSlide.classList.remove("is-new");
        activeSlide2.classList.remove("is-active");
        newSlide.style.display = "";
        newSlide.style.width = "";
        newSlide.style.left = "";
        newSlide.style.zIndex = "";
        newSlideImage.style.width = "";
        newSlideImage.style.right = "";
        newSlideImage.style.left = "";
        newSlideContent.style.width = "";
        newSlideContent.style.left = "";
        newSlideElements.forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
        activeSlideImage.style.left = "";
        slideshow.value.dataset.wait = false;
        if (auto) {
          timeout = setTimeout(() => {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration.value);
          slideshow.value.dataset.timeout = timeout;
        }
      }
    );
  }
}
function homeSlideshowParallax() {
  var scrollTop = window.pageYOffset;
  if (scrollTop > window.innerHeight)
    return;
  var inner = document.querySelector(".slideshow-inner");
  var newHeight = window.innerHeight - scrollTop / 2;
  var newTop = scrollTop * 0.8;
  inner.style.transform = "translateY(" + newTop + "px)";
  inner.style.height = newHeight + "px";
}
const script = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  slideshowPrev,
  slideshowNext,
  slideshowSwitch,
  homeSlideshowParallax
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    slideData: { type: Object, required: true },
    options: {
      type: Object,
      default: {
        duration: 4e3,
        transition: "other"
      }
    }
  },
  setup(__props) {
    ref(4e3);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main-content pb-6" }, _attrs))}><section${ssrRenderAttr("data-transition", __props.options.transition)} class="slideshow"><div class="slideshow-inner"><div class="slides"><!--[-->`);
      ssrRenderList(__props.slideData, (slide, index2) => {
        _push(`<div class="slide"><div class="slide-content"><div class="caption"><div class="max-w-4xl"><h1 class="content-title text-4xl leading-1 tracking-tight sm:text-center sm:text-6xl">${ssrInterpolate(slide.title)}</h1><p class="mt-6 text-md leading-5 xl:text-lg xl:leading-8 sm:text-center">${ssrInterpolate(slide.description)}</p><div class="mt-8 flex gap-x-4 justify-center"><a${ssrRenderAttr("href", slide.href)} class="btn"><span class="btn-inner">Learn More</span></a></div></div></div></div><div class="image-container"><img${ssrRenderAttr("src", slide.img)} alt="" class="image"></div></div>`);
      });
      _push(`<!--]--></div><div class="pagination"><!--[-->`);
      ssrRenderList(__props.slideData, (slide, index2) => {
        _push(`<div class="item"><span class="icon"></span></div>`);
      });
      _push(`<!--]--></div><div class="arrows"><div class="arrow prev"><span class="svg svg-arrow-left"><svg version="1.1" id="svg4-Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="26px" viewBox="0 0 14 26" enable-background="new 0 0 14 26" xml:space="preserve"><path d="M13,26c-0.256,0-0.512-0.098-0.707-0.293l-12-12c-0.391-0.391-0.391-1.023,0-1.414l12-12c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L2.414,13l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414C13.512,25.902,13.256,26,13,26z"></path></svg><span class="alt sr-only"></span></span></div><div class="arrow next"><span class="svg svg-arrow-right"><svg version="1.1" id="svg5-Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="26px" viewBox="0 0 14 26" enable-background="new 0 0 14 26" xml:space="preserve"><path d="M1,0c0.256,0,0.512,0.098,0.707,0.293l12,12c0.391,0.391,0.391,1.023,0,1.414l-12,12c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L11.586,13L0.293,1.707c-0.391-0.391-0.391-1.023,0-1.414C0.488,0.098,0.744,0,1,0z"></path></svg><span class="alt sr-only"></span></span></div></div></div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tweenmax/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { index as i, script as s };
//# sourceMappingURL=index.12b79e49.mjs.map
