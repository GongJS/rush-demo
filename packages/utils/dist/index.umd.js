(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('util'), require('events'), require('stream'), require('buffer'), require('os'), require('assert')) :
	typeof define === 'function' && define.amd ? define(['exports', 'util', 'events', 'stream', 'buffer', 'os', 'assert'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}, global.require$$0$1, global.require$$0, global.require$$0$2, global.require$$0$3, global.require$$0$4, global.require$$0$5));
})(this, (function (exports, require$$0$1, require$$0, require$$0$2, require$$0$3, require$$0$4, require$$0$5) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
	var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
	var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
	var require$$0__default$5 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var log$1 = {exports: {}};

	var lib$1 = {};

	var trackerGroup = {exports: {}};

	var trackerBase = {exports: {}};

	var EventEmitter = require$$0__default["default"].EventEmitter;
	var util$5 = require$$0__default$1["default"];

	var trackerId = 0;
	var TrackerBase$2 = trackerBase.exports = function (name) {
	  EventEmitter.call(this);
	  this.id = ++trackerId;
	  this.name = name;
	};
	util$5.inherits(TrackerBase$2, EventEmitter);

	var tracker = {exports: {}};

	var util$4 = require$$0__default$1["default"];
	var TrackerBase$1 = trackerBase.exports;

	var Tracker$2 = tracker.exports = function (name, todo) {
	  TrackerBase$1.call(this, name);
	  this.workDone = 0;
	  this.workTodo = todo || 0;
	};
	util$4.inherits(Tracker$2, TrackerBase$1);

	Tracker$2.prototype.completed = function () {
	  return this.workTodo === 0 ? 0 : this.workDone / this.workTodo
	};

	Tracker$2.prototype.addWork = function (work) {
	  this.workTodo += work;
	  this.emit('change', this.name, this.completed(), this);
	};

	Tracker$2.prototype.completeWork = function (work) {
	  this.workDone += work;
	  if (this.workDone > this.workTodo) {
	    this.workDone = this.workTodo;
	  }
	  this.emit('change', this.name, this.completed(), this);
	};

	Tracker$2.prototype.finish = function () {
	  this.workTodo = this.workDone = 1;
	  this.emit('change', this.name, 1, this);
	};

	var trackerStream = {exports: {}};

	var readable = {exports: {}};

	var stream$1 = require$$0__default$2["default"];

	function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	var _require$2 = require$$0__default$3["default"],
	    Buffer$3 = _require$2.Buffer;

	var _require2 = require$$0__default$1["default"],
	    inspect = _require2.inspect;

	var custom = inspect && inspect.custom || 'inspect';

	function copyBuffer(src, target, offset) {
	  Buffer$3.prototype.copy.call(src, target, offset);
	}

	var buffer_list =
	/*#__PURE__*/
	function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }

	  _createClass(BufferList, [{
	    key: "push",
	    value: function push(v) {
	      var entry = {
	        data: v,
	        next: null
	      };
	      if (this.length > 0) this.tail.next = entry;else this.head = entry;
	      this.tail = entry;
	      ++this.length;
	    }
	  }, {
	    key: "unshift",
	    value: function unshift(v) {
	      var entry = {
	        data: v,
	        next: this.head
	      };
	      if (this.length === 0) this.tail = entry;
	      this.head = entry;
	      ++this.length;
	    }
	  }, {
	    key: "shift",
	    value: function shift() {
	      if (this.length === 0) return;
	      var ret = this.head.data;
	      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	      --this.length;
	      return ret;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.head = this.tail = null;
	      this.length = 0;
	    }
	  }, {
	    key: "join",
	    value: function join(s) {
	      if (this.length === 0) return '';
	      var p = this.head;
	      var ret = '' + p.data;

	      while (p = p.next) {
	        ret += s + p.data;
	      }

	      return ret;
	    }
	  }, {
	    key: "concat",
	    value: function concat(n) {
	      if (this.length === 0) return Buffer$3.alloc(0);
	      var ret = Buffer$3.allocUnsafe(n >>> 0);
	      var p = this.head;
	      var i = 0;

	      while (p) {
	        copyBuffer(p.data, ret, i);
	        i += p.data.length;
	        p = p.next;
	      }

	      return ret;
	    } // Consumes a specified amount of bytes or characters from the buffered data.

	  }, {
	    key: "consume",
	    value: function consume(n, hasStrings) {
	      var ret;

	      if (n < this.head.data.length) {
	        // `slice` is the same for buffers and strings.
	        ret = this.head.data.slice(0, n);
	        this.head.data = this.head.data.slice(n);
	      } else if (n === this.head.data.length) {
	        // First chunk is a perfect match.
	        ret = this.shift();
	      } else {
	        // Result spans more than one buffer.
	        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
	      }

	      return ret;
	    }
	  }, {
	    key: "first",
	    value: function first() {
	      return this.head.data;
	    } // Consumes a specified amount of characters from the buffered data.

	  }, {
	    key: "_getString",
	    value: function _getString(n) {
	      var p = this.head;
	      var c = 1;
	      var ret = p.data;
	      n -= ret.length;

	      while (p = p.next) {
	        var str = p.data;
	        var nb = n > str.length ? str.length : n;
	        if (nb === str.length) ret += str;else ret += str.slice(0, n);
	        n -= nb;

	        if (n === 0) {
	          if (nb === str.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = str.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Consumes a specified amount of bytes from the buffered data.

	  }, {
	    key: "_getBuffer",
	    value: function _getBuffer(n) {
	      var ret = Buffer$3.allocUnsafe(n);
	      var p = this.head;
	      var c = 1;
	      p.data.copy(ret);
	      n -= p.data.length;

	      while (p = p.next) {
	        var buf = p.data;
	        var nb = n > buf.length ? buf.length : n;
	        buf.copy(ret, ret.length - n, 0, nb);
	        n -= nb;

	        if (n === 0) {
	          if (nb === buf.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = buf.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Make sure the linked list only shows the minimal necessary information.

	  }, {
	    key: custom,
	    value: function value(_, options) {
	      return inspect(this, _objectSpread$1({}, options, {
	        // Only inspect one level.
	        depth: 0,
	        // It should not recurse.
	        customInspect: false
	      }));
	    }
	  }]);

	  return BufferList;
	}();

	function destroy(err, cb) {
	  var _this = this;

	  var readableDestroyed = this._readableState && this._readableState.destroyed;
	  var writableDestroyed = this._writableState && this._writableState.destroyed;

	  if (readableDestroyed || writableDestroyed) {
	    if (cb) {
	      cb(err);
	    } else if (err) {
	      if (!this._writableState) {
	        process.nextTick(emitErrorNT, this, err);
	      } else if (!this._writableState.errorEmitted) {
	        this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorNT, this, err);
	      }
	    }

	    return this;
	  } // we set destroyed to true before firing error callbacks in order
	  // to make it re-entrance safe in case destroy() is called within callbacks


	  if (this._readableState) {
	    this._readableState.destroyed = true;
	  } // if this is a duplex stream mark the writable part as destroyed as well


	  if (this._writableState) {
	    this._writableState.destroyed = true;
	  }

	  this._destroy(err || null, function (err) {
	    if (!cb && err) {
	      if (!_this._writableState) {
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else if (!_this._writableState.errorEmitted) {
	        _this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else {
	        process.nextTick(emitCloseNT, _this);
	      }
	    } else if (cb) {
	      process.nextTick(emitCloseNT, _this);
	      cb(err);
	    } else {
	      process.nextTick(emitCloseNT, _this);
	    }
	  });

	  return this;
	}

	function emitErrorAndCloseNT(self, err) {
	  emitErrorNT(self, err);
	  emitCloseNT(self);
	}

	function emitCloseNT(self) {
	  if (self._writableState && !self._writableState.emitClose) return;
	  if (self._readableState && !self._readableState.emitClose) return;
	  self.emit('close');
	}

	function undestroy() {
	  if (this._readableState) {
	    this._readableState.destroyed = false;
	    this._readableState.reading = false;
	    this._readableState.ended = false;
	    this._readableState.endEmitted = false;
	  }

	  if (this._writableState) {
	    this._writableState.destroyed = false;
	    this._writableState.ended = false;
	    this._writableState.ending = false;
	    this._writableState.finalCalled = false;
	    this._writableState.prefinished = false;
	    this._writableState.finished = false;
	    this._writableState.errorEmitted = false;
	  }
	}

	function emitErrorNT(self, err) {
	  self.emit('error', err);
	}

	function errorOrDestroy$2(stream, err) {
	  // We have tests that rely on errors being emitted
	  // in the same tick, so changing this is semver major.
	  // For now when you opt-in to autoDestroy we allow
	  // the error to be emitted nextTick. In a future
	  // semver major update we should change the default to this.
	  var rState = stream._readableState;
	  var wState = stream._writableState;
	  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
	}

	var destroy_1 = {
	  destroy: destroy,
	  undestroy: undestroy,
	  errorOrDestroy: errorOrDestroy$2
	};

	var errors = {};

	const codes = {};

	function createErrorType(code, message, Base) {
	  if (!Base) {
	    Base = Error;
	  }

	  function getMessage (arg1, arg2, arg3) {
	    if (typeof message === 'string') {
	      return message
	    } else {
	      return message(arg1, arg2, arg3)
	    }
	  }

	  class NodeError extends Base {
	    constructor (arg1, arg2, arg3) {
	      super(getMessage(arg1, arg2, arg3));
	    }
	  }

	  NodeError.prototype.name = Base.name;
	  NodeError.prototype.code = code;

	  codes[code] = NodeError;
	}

	// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
	function oneOf(expected, thing) {
	  if (Array.isArray(expected)) {
	    const len = expected.length;
	    expected = expected.map((i) => String(i));
	    if (len > 2) {
	      return `one of ${thing} ${expected.slice(0, len - 1).join(', ')}, or ` +
	             expected[len - 1];
	    } else if (len === 2) {
	      return `one of ${thing} ${expected[0]} or ${expected[1]}`;
	    } else {
	      return `of ${thing} ${expected[0]}`;
	    }
	  } else {
	    return `of ${thing} ${String(expected)}`;
	  }
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
	function startsWith(str, search, pos) {
		return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
	function endsWith(str, search, this_len) {
		if (this_len === undefined || this_len > str.length) {
			this_len = str.length;
		}
		return str.substring(this_len - search.length, this_len) === search;
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
	function includes(str, search, start) {
	  if (typeof start !== 'number') {
	    start = 0;
	  }

	  if (start + search.length > str.length) {
	    return false;
	  } else {
	    return str.indexOf(search, start) !== -1;
	  }
	}

	createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
	  return 'The value "' + value + '" is invalid for option "' + name + '"'
	}, TypeError);
	createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
	  // determiner: 'must be' or 'must not be'
	  let determiner;
	  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
	    determiner = 'must not be';
	    expected = expected.replace(/^not /, '');
	  } else {
	    determiner = 'must be';
	  }

	  let msg;
	  if (endsWith(name, ' argument')) {
	    // For cases like 'first argument'
	    msg = `The ${name} ${determiner} ${oneOf(expected, 'type')}`;
	  } else {
	    const type = includes(name, '.') ? 'property' : 'argument';
	    msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, 'type')}`;
	  }

	  msg += `. Received type ${typeof actual}`;
	  return msg;
	}, TypeError);
	createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
	createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
	  return 'The ' + name + ' method is not implemented'
	});
	createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
	createErrorType('ERR_STREAM_DESTROYED', function (name) {
	  return 'Cannot call ' + name + ' after a stream was destroyed';
	});
	createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
	createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
	createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
	createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
	createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
	  return 'Unknown encoding: ' + arg
	}, TypeError);
	createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');

	errors.codes = codes;

	var ERR_INVALID_OPT_VALUE = errors.codes.ERR_INVALID_OPT_VALUE;

	function highWaterMarkFrom(options, isDuplex, duplexKey) {
	  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
	}

	function getHighWaterMark$2(state, options, duplexKey, isDuplex) {
	  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

	  if (hwm != null) {
	    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
	      var name = isDuplex ? duplexKey : 'highWaterMark';
	      throw new ERR_INVALID_OPT_VALUE(name, hwm);
	    }

	    return Math.floor(hwm);
	  } // Default value


	  return state.objectMode ? 16 : 16 * 1024;
	}

	var state = {
	  getHighWaterMark: getHighWaterMark$2
	};

	var inherits = {exports: {}};

	var inherits_browser = {exports: {}};

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}

	try {
	  var util$3 = require('util');
	  /* istanbul ignore next */
	  if (typeof util$3.inherits !== 'function') throw '';
	  inherits.exports = util$3.inherits;
	} catch (e) {
	  /* istanbul ignore next */
	  inherits.exports = inherits_browser.exports;
	}

	/**
	 * For Node.js, simply re-export the core `util.deprecate` function.
	 */

	var node = require$$0__default$1["default"].deprecate;

	var _stream_writable = Writable$1;
	// there will be only 2 of these for each stream


	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */

	/*<replacement>*/


	var Duplex$3;
	/*</replacement>*/

	Writable$1.WritableState = WritableState;
	/*<replacement>*/

	var internalUtil = {
	  deprecate: node
	};
	/*</replacement>*/

	/*<replacement>*/

	var Stream$1 = stream$1;
	/*</replacement>*/


	var Buffer$2 = require$$0__default$3["default"].Buffer;

	var OurUint8Array$1 = commonjsGlobal.Uint8Array || function () {};

	function _uint8ArrayToBuffer$1(chunk) {
	  return Buffer$2.from(chunk);
	}

	function _isUint8Array$1(obj) {
	  return Buffer$2.isBuffer(obj) || obj instanceof OurUint8Array$1;
	}

	var destroyImpl$1 = destroy_1;

	var _require$1 = state,
	    getHighWaterMark$1 = _require$1.getHighWaterMark;

	var _require$codes$3 = errors.codes,
	    ERR_INVALID_ARG_TYPE$2 = _require$codes$3.ERR_INVALID_ARG_TYPE,
	    ERR_METHOD_NOT_IMPLEMENTED$2 = _require$codes$3.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_MULTIPLE_CALLBACK$1 = _require$codes$3.ERR_MULTIPLE_CALLBACK,
	    ERR_STREAM_CANNOT_PIPE = _require$codes$3.ERR_STREAM_CANNOT_PIPE,
	    ERR_STREAM_DESTROYED$1 = _require$codes$3.ERR_STREAM_DESTROYED,
	    ERR_STREAM_NULL_VALUES = _require$codes$3.ERR_STREAM_NULL_VALUES,
	    ERR_STREAM_WRITE_AFTER_END = _require$codes$3.ERR_STREAM_WRITE_AFTER_END,
	    ERR_UNKNOWN_ENCODING = _require$codes$3.ERR_UNKNOWN_ENCODING;

	var errorOrDestroy$1 = destroyImpl$1.errorOrDestroy;

	inherits.exports(Writable$1, Stream$1);

	function nop() {}

	function WritableState(options, stream, isDuplex) {
	  Duplex$3 = Duplex$3 || _stream_duplex;
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream,
	  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$3; // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()

	  this.highWaterMark = getHighWaterMark$1(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

	  this.finalCalled = false; // drain event flag.

	  this.needDrain = false; // at the start of calling end()

	  this.ending = false; // when end() has been called, and returned

	  this.ended = false; // when 'finish' is emitted

	  this.finished = false; // has it been destroyed

	  this.destroyed = false; // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.

	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.

	  this.length = 0; // a flag to see when we're in the middle of a write.

	  this.writing = false; // when true all writes will be buffered until .uncork() call

	  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.

	  this.sync = true; // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.

	  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  }; // the callback that the user supplies to write(chunk,encoding,cb)


	  this.writecb = null; // the amount that is being written when _write is called.

	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted

	  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams

	  this.prefinished = false; // True if the error was already emitted and should not be thrown again

	  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

	  this.autoDestroy = !!options.autoDestroy; // count buffered requests

	  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two

	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];

	  while (current) {
	    out.push(current);
	    current = current.next;
	  }

	  return out;
	};

	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function writableStateBufferGetter() {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})(); // Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.


	var realHasInstance;

	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable$1, Symbol.hasInstance, {
	    value: function value(object) {
	      if (realHasInstance.call(this, object)) return true;
	      if (this !== Writable$1) return false;
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function realHasInstance(object) {
	    return object instanceof this;
	  };
	}

	function Writable$1(options) {
	  Duplex$3 = Duplex$3 || _stream_duplex; // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the WritableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex$3;
	  if (!isDuplex && !realHasInstance.call(Writable$1, this)) return new Writable$1(options);
	  this._writableState = new WritableState(options, this, isDuplex); // legacy.

	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	    if (typeof options.final === 'function') this._final = options.final;
	  }

	  Stream$1.call(this);
	} // Otherwise people can pipe Writable streams, which is just wrong.


	Writable$1.prototype.pipe = function () {
	  errorOrDestroy$1(this, new ERR_STREAM_CANNOT_PIPE());
	};

	function writeAfterEnd(stream, cb) {
	  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

	  errorOrDestroy$1(stream, er);
	  process.nextTick(cb, er);
	} // Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.


	function validChunk(stream, state, chunk, cb) {
	  var er;

	  if (chunk === null) {
	    er = new ERR_STREAM_NULL_VALUES();
	  } else if (typeof chunk !== 'string' && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE$2('chunk', ['string', 'Buffer'], chunk);
	  }

	  if (er) {
	    errorOrDestroy$1(stream, er);
	    process.nextTick(cb, er);
	    return false;
	  }

	  return true;
	}

	Writable$1.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  var isBuf = !state.objectMode && _isUint8Array$1(chunk);

	  if (isBuf && !Buffer$2.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer$1(chunk);
	  }

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	  return ret;
	};

	Writable$1.prototype.cork = function () {
	  this._writableState.corked++;
	};

	Writable$1.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable$1.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	Object.defineProperty(Writable$1.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer$2.from(chunk, encoding);
	  }

	  return chunk;
	}

	Object.defineProperty(Writable$1.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	}); // if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.

	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);

	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }

	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };

	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }

	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED$1('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;

	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    process.nextTick(cb, er); // this can emit finish, and it will always happen
	    // after error

	    process.nextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy$1(stream, er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy$1(stream, er); // this can emit finish, but finish must
	    // always follow error

	    finishMaybe(stream, state);
	  }
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK$1();
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state) || stream.destroyed;

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(afterWrite, stream, state, finished, cb);
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	} // Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.


	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	} // if there's something in the buffer waiting, then process it


	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;
	    var allBuffers = true;

	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }

	    buffer.allBuffers = allBuffers;
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite

	    state.pendingcb++;
	    state.lastBufferedRequest = null;

	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }

	    state.bufferedRequestCount = 0;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.

	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable$1.prototype._write = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED$2('_write()'));
	};

	Writable$1.prototype._writev = null;

	Writable$1.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  } // ignore unnecessary end() calls.


	  if (!state.ending) endWritable(this, state, cb);
	  return this;
	};

	Object.defineProperty(Writable$1.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;

	    if (err) {
	      errorOrDestroy$1(stream, err);
	    }

	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}

	function prefinish$1(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function' && !state.destroyed) {
	      state.pendingcb++;
	      state.finalCalled = true;
	      process.nextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);

	  if (need) {
	    prefinish$1(stream, state);

	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');

	      if (state.autoDestroy) {
	        // In case of duplex streams we need a way to detect
	        // if the readable side is ready for autoDestroy as well
	        var rState = stream._readableState;

	        if (!rState || rState.autoDestroy && rState.endEmitted) {
	          stream.destroy();
	        }
	      }
	    }
	  }

	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);

	  if (cb) {
	    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
	  }

	  state.ended = true;
	  stream.writable = false;
	}

	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;

	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  } // reuse the free corkReq.


	  state.corkedRequestsFree.next = corkReq;
	}

	Object.defineProperty(Writable$1.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._writableState === undefined) {
	      return false;
	    }

	    return this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._writableState.destroyed = value;
	  }
	});
	Writable$1.prototype.destroy = destroyImpl$1.destroy;
	Writable$1.prototype._undestroy = destroyImpl$1.undestroy;

	Writable$1.prototype._destroy = function (err, cb) {
	  cb(err);
	};

	/*<replacement>*/

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];

	  for (var key in obj) {
	    keys.push(key);
	  }

	  return keys;
	};
	/*</replacement>*/


	var _stream_duplex = Duplex$2;

	var Readable$1 = _stream_readable;

	var Writable = _stream_writable;

	inherits.exports(Duplex$2, Readable$1);

	{
	  // Allow the keys array to be GC'ed.
	  var keys = objectKeys(Writable.prototype);

	  for (var v = 0; v < keys.length; v++) {
	    var method = keys[v];
	    if (!Duplex$2.prototype[method]) Duplex$2.prototype[method] = Writable.prototype[method];
	  }
	}

	function Duplex$2(options) {
	  if (!(this instanceof Duplex$2)) return new Duplex$2(options);
	  Readable$1.call(this, options);
	  Writable.call(this, options);
	  this.allowHalfOpen = true;

	  if (options) {
	    if (options.readable === false) this.readable = false;
	    if (options.writable === false) this.writable = false;

	    if (options.allowHalfOpen === false) {
	      this.allowHalfOpen = false;
	      this.once('end', onend);
	    }
	  }
	}

	Object.defineProperty(Duplex$2.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});
	Object.defineProperty(Duplex$2.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	Object.defineProperty(Duplex$2.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	}); // the no-half-open enforcer

	function onend() {
	  // If the writable side ended, then we're ok.
	  if (this._writableState.ended) return; // no more data can be written.
	  // But allow more writes to happen in this tick.

	  process.nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	Object.defineProperty(Duplex$2.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});

	var string_decoder = {};

	var safeBuffer = {exports: {}};

	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

	(function (module, exports) {
	/* eslint-disable node/no-deprecated-api */
	var buffer = require$$0__default$3["default"];
	var Buffer = buffer.Buffer;

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key];
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer;
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports);
	  exports.Buffer = SafeBuffer;
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.prototype = Object.create(Buffer.prototype);

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer);

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	};

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size);
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	  } else {
	    buf.fill(0);
	  }
	  return buf
	};

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	};

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	};
	}(safeBuffer, safeBuffer.exports));

	/*<replacement>*/

	var Buffer$1 = safeBuffer.exports.Buffer;
	/*</replacement>*/

	var isEncoding = Buffer$1.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	}
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer$1.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	string_decoder.StringDecoder = StringDecoder$1;
	function StringDecoder$1(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer$1.allocUnsafe(nb);
	}

	StringDecoder$1.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder$1.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder$1.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder$1.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return byte >> 6 === 0x02 ? -1 : -2;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd';
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd';
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd';
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd';
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}

	var ERR_STREAM_PREMATURE_CLOSE = errors.codes.ERR_STREAM_PREMATURE_CLOSE;

	function once$1(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    callback.apply(this, args);
	  };
	}

	function noop$1() {}

	function isRequest$1(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}

	function eos$1(stream, opts, callback) {
	  if (typeof opts === 'function') return eos$1(stream, null, opts);
	  if (!opts) opts = {};
	  callback = once$1(callback || noop$1);
	  var readable = opts.readable || opts.readable !== false && stream.readable;
	  var writable = opts.writable || opts.writable !== false && stream.writable;

	  var onlegacyfinish = function onlegacyfinish() {
	    if (!stream.writable) onfinish();
	  };

	  var writableEnded = stream._writableState && stream._writableState.finished;

	  var onfinish = function onfinish() {
	    writable = false;
	    writableEnded = true;
	    if (!readable) callback.call(stream);
	  };

	  var readableEnded = stream._readableState && stream._readableState.endEmitted;

	  var onend = function onend() {
	    readable = false;
	    readableEnded = true;
	    if (!writable) callback.call(stream);
	  };

	  var onerror = function onerror(err) {
	    callback.call(stream, err);
	  };

	  var onclose = function onclose() {
	    var err;

	    if (readable && !readableEnded) {
	      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }

	    if (writable && !writableEnded) {
	      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }
	  };

	  var onrequest = function onrequest() {
	    stream.req.on('finish', onfinish);
	  };

	  if (isRequest$1(stream)) {
	    stream.on('complete', onfinish);
	    stream.on('abort', onclose);
	    if (stream.req) onrequest();else stream.on('request', onrequest);
	  } else if (writable && !stream._writableState) {
	    // legacy streams
	    stream.on('end', onlegacyfinish);
	    stream.on('close', onlegacyfinish);
	  }

	  stream.on('end', onend);
	  stream.on('finish', onfinish);
	  if (opts.error !== false) stream.on('error', onerror);
	  stream.on('close', onclose);
	  return function () {
	    stream.removeListener('complete', onfinish);
	    stream.removeListener('abort', onclose);
	    stream.removeListener('request', onrequest);
	    if (stream.req) stream.req.removeListener('finish', onfinish);
	    stream.removeListener('end', onlegacyfinish);
	    stream.removeListener('close', onlegacyfinish);
	    stream.removeListener('finish', onfinish);
	    stream.removeListener('end', onend);
	    stream.removeListener('error', onerror);
	    stream.removeListener('close', onclose);
	  };
	}

	var endOfStream = eos$1;

	var _Object$setPrototypeO;

	function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var finished = endOfStream;

	var kLastResolve = Symbol('lastResolve');
	var kLastReject = Symbol('lastReject');
	var kError = Symbol('error');
	var kEnded = Symbol('ended');
	var kLastPromise = Symbol('lastPromise');
	var kHandlePromise = Symbol('handlePromise');
	var kStream = Symbol('stream');

	function createIterResult(value, done) {
	  return {
	    value: value,
	    done: done
	  };
	}

	function readAndResolve(iter) {
	  var resolve = iter[kLastResolve];

	  if (resolve !== null) {
	    var data = iter[kStream].read(); // we defer if data is null
	    // we can be expecting either 'end' or
	    // 'error'

	    if (data !== null) {
	      iter[kLastPromise] = null;
	      iter[kLastResolve] = null;
	      iter[kLastReject] = null;
	      resolve(createIterResult(data, false));
	    }
	  }
	}

	function onReadable(iter) {
	  // we wait for the next tick, because it might
	  // emit an error with process.nextTick
	  process.nextTick(readAndResolve, iter);
	}

	function wrapForNext(lastPromise, iter) {
	  return function (resolve, reject) {
	    lastPromise.then(function () {
	      if (iter[kEnded]) {
	        resolve(createIterResult(undefined, true));
	        return;
	      }

	      iter[kHandlePromise](resolve, reject);
	    }, reject);
	  };
	}

	var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
	  get stream() {
	    return this[kStream];
	  },

	  next: function next() {
	    var _this = this;

	    // if we have detected an error in the meanwhile
	    // reject straight away
	    var error = this[kError];

	    if (error !== null) {
	      return Promise.reject(error);
	    }

	    if (this[kEnded]) {
	      return Promise.resolve(createIterResult(undefined, true));
	    }

	    if (this[kStream].destroyed) {
	      // We need to defer via nextTick because if .destroy(err) is
	      // called, the error will be emitted via nextTick, and
	      // we cannot guarantee that there is no error lingering around
	      // waiting to be emitted.
	      return new Promise(function (resolve, reject) {
	        process.nextTick(function () {
	          if (_this[kError]) {
	            reject(_this[kError]);
	          } else {
	            resolve(createIterResult(undefined, true));
	          }
	        });
	      });
	    } // if we have multiple next() calls
	    // we will wait for the previous Promise to finish
	    // this logic is optimized to support for await loops,
	    // where next() is only called once at a time


	    var lastPromise = this[kLastPromise];
	    var promise;

	    if (lastPromise) {
	      promise = new Promise(wrapForNext(lastPromise, this));
	    } else {
	      // fast path needed to support multiple this.push()
	      // without triggering the next() queue
	      var data = this[kStream].read();

	      if (data !== null) {
	        return Promise.resolve(createIterResult(data, false));
	      }

	      promise = new Promise(this[kHandlePromise]);
	    }

	    this[kLastPromise] = promise;
	    return promise;
	  }
	}, _defineProperty$1(_Object$setPrototypeO, Symbol.asyncIterator, function () {
	  return this;
	}), _defineProperty$1(_Object$setPrototypeO, "return", function _return() {
	  var _this2 = this;

	  // destroy(err, cb) is a private API
	  // we can guarantee we have that here, because we control the
	  // Readable class this is attached to
	  return new Promise(function (resolve, reject) {
	    _this2[kStream].destroy(null, function (err) {
	      if (err) {
	        reject(err);
	        return;
	      }

	      resolve(createIterResult(undefined, true));
	    });
	  });
	}), _Object$setPrototypeO), AsyncIteratorPrototype);

	var createReadableStreamAsyncIterator$1 = function createReadableStreamAsyncIterator(stream) {
	  var _Object$create;

	  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty$1(_Object$create, kStream, {
	    value: stream,
	    writable: true
	  }), _defineProperty$1(_Object$create, kLastResolve, {
	    value: null,
	    writable: true
	  }), _defineProperty$1(_Object$create, kLastReject, {
	    value: null,
	    writable: true
	  }), _defineProperty$1(_Object$create, kError, {
	    value: null,
	    writable: true
	  }), _defineProperty$1(_Object$create, kEnded, {
	    value: stream._readableState.endEmitted,
	    writable: true
	  }), _defineProperty$1(_Object$create, kHandlePromise, {
	    value: function value(resolve, reject) {
	      var data = iterator[kStream].read();

	      if (data) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        resolve(createIterResult(data, false));
	      } else {
	        iterator[kLastResolve] = resolve;
	        iterator[kLastReject] = reject;
	      }
	    },
	    writable: true
	  }), _Object$create));
	  iterator[kLastPromise] = null;
	  finished(stream, function (err) {
	    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
	      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
	      // returned by next() and store the error

	      if (reject !== null) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        reject(err);
	      }

	      iterator[kError] = err;
	      return;
	    }

	    var resolve = iterator[kLastResolve];

	    if (resolve !== null) {
	      iterator[kLastPromise] = null;
	      iterator[kLastResolve] = null;
	      iterator[kLastReject] = null;
	      resolve(createIterResult(undefined, true));
	    }

	    iterator[kEnded] = true;
	  });
	  stream.on('readable', onReadable.bind(null, iterator));
	  return iterator;
	};

	var async_iterator = createReadableStreamAsyncIterator$1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var ERR_INVALID_ARG_TYPE$1 = errors.codes.ERR_INVALID_ARG_TYPE;

	function from$1(Readable, iterable, opts) {
	  var iterator;

	  if (iterable && typeof iterable.next === 'function') {
	    iterator = iterable;
	  } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();else throw new ERR_INVALID_ARG_TYPE$1('iterable', ['Iterable'], iterable);

	  var readable = new Readable(_objectSpread({
	    objectMode: true
	  }, opts)); // Reading boolean to protect against _read
	  // being called before last iteration completion.

	  var reading = false;

	  readable._read = function () {
	    if (!reading) {
	      reading = true;
	      next();
	    }
	  };

	  function next() {
	    return _next2.apply(this, arguments);
	  }

	  function _next2() {
	    _next2 = _asyncToGenerator(function* () {
	      try {
	        var _ref = yield iterator.next(),
	            value = _ref.value,
	            done = _ref.done;

	        if (done) {
	          readable.push(null);
	        } else if (readable.push((yield value))) {
	          next();
	        } else {
	          reading = false;
	        }
	      } catch (err) {
	        readable.destroy(err);
	      }
	    });
	    return _next2.apply(this, arguments);
	  }

	  return readable;
	}

	var from_1 = from$1;

	var _stream_readable = Readable;
	/*<replacement>*/

	var Duplex$1;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;
	/*<replacement>*/

	require$$0__default["default"].EventEmitter;

	var EElistenerCount = function EElistenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/


	var Stream = stream$1;
	/*</replacement>*/


	var Buffer = require$$0__default$3["default"].Buffer;

	var OurUint8Array = commonjsGlobal.Uint8Array || function () {};

	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}

	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*<replacement>*/


	var debugUtil = require$$0__default$1["default"];

	var debug;

	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function debug() {};
	}
	/*</replacement>*/


	var BufferList = buffer_list;

	var destroyImpl = destroy_1;

	var _require = state,
	    getHighWaterMark = _require.getHighWaterMark;

	var _require$codes$2 = errors.codes,
	    ERR_INVALID_ARG_TYPE = _require$codes$2.ERR_INVALID_ARG_TYPE,
	    ERR_STREAM_PUSH_AFTER_EOF = _require$codes$2.ERR_STREAM_PUSH_AFTER_EOF,
	    ERR_METHOD_NOT_IMPLEMENTED$1 = _require$codes$2.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes$2.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;

	inherits.exports(Readable, Stream);

	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
	  // userland ones.  NEVER DO THIS. This is here only because this code needs
	  // to continue to work with older versions of Node.js that do not include
	  // the prependListener() method. The goal is to eventually remove this hack.

	  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}

	function ReadableState(options, stream, isDuplex) {
	  Duplex$1 = Duplex$1 || _stream_duplex;
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex$1; // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"

	  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()

	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.

	  this.sync = true; // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.

	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	  this.paused = true; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

	  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

	  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

	  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;

	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = string_decoder.StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  Duplex$1 = Duplex$1 || _stream_duplex;
	  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the ReadableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex$1;
	  this._readableState = new ReadableState(options, this, isDuplex); // legacy

	  this.readable = true;

	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }

	  Stream.call(this);
	}

	Object.defineProperty(Readable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	  }
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;

	Readable.prototype._destroy = function (err, cb) {
	  cb(err);
	}; // Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.


	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;

	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;

	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }

	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }

	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	}; // Unshift should *always* be something directly out of read()


	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};

	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  debug('readableAddChunk', chunk);
	  var state = stream._readableState;

	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

	    if (er) {
	      errorOrDestroy(stream, er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }

	      if (addToFront) {
	        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
	      } else if (state.destroyed) {
	        return false;
	      } else {
	        state.reading = false;

	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	      maybeReadMore(stream, state);
	    }
	  } // We can push more data if we are below the highWaterMark.
	  // Also, if we have no data yet, we can stand some more bytes.
	  // This is to work around cases where hwm=0, such as the repl.


	  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}

	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    state.awaitDrain = 0;
	    stream.emit('data', chunk);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	    if (state.needReadable) emitReadable(stream);
	  }

	  maybeReadMore(stream, state);
	}

	function chunkInvalid(state, chunk) {
	  var er;

	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
	  }

	  return er;
	}

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	}; // backwards compatibility.


	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = string_decoder.StringDecoder;
	  var decoder = new StringDecoder(enc);
	  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

	  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

	  var p = this._readableState.buffer.head;
	  var content = '';

	  while (p !== null) {
	    content += decoder.write(p.data);
	    p = p.next;
	  }

	  this._readableState.buffer.clear();

	  if (content !== '') this._readableState.buffer.push(content);
	  this._readableState.length = content.length;
	  return this;
	}; // Don't raise the hwm > 1GB


	var MAX_HWM = 0x40000000;

	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }

	  return n;
	} // This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;

	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  } // If we're asking for more than the current hwm, then raise the hwm.


	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n; // Don't have enough

	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }

	  return state.length;
	} // you can override either this method, or the async _read(n) below.


	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.

	  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  } // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	  // if we need a readable event, then we need to do some reading.


	  var doRead = state.needReadable;
	  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  } // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.


	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true; // if the length is currently zero, then we *need* a readable event.

	    if (state.length === 0) state.needReadable = true; // call internal read method

	    this._read(state.highWaterMark);

	    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.

	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = state.length <= state.highWaterMark;
	    n = 0;
	  } else {
	    state.length -= n;
	    state.awaitDrain = 0;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};

	function onEofChunk(stream, state) {
	  debug('onEofChunk');
	  if (state.ended) return;

	  if (state.decoder) {
	    var chunk = state.decoder.end();

	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }

	  state.ended = true;

	  if (state.sync) {
	    // if we are sync, wait until next tick to emit the data.
	    // Otherwise we risk emitting data in the flow()
	    // the readable code triggers during a read() call
	    emitReadable(stream);
	  } else {
	    // emit 'readable' now to make sure it gets picked up.
	    state.needReadable = false;

	    if (!state.emittedReadable) {
	      state.emittedReadable = true;
	      emitReadable_(stream);
	    }
	  }
	} // Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.


	function emitReadable(stream) {
	  var state = stream._readableState;
	  debug('emitReadable', state.needReadable, state.emittedReadable);
	  state.needReadable = false;

	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    process.nextTick(emitReadable_, stream);
	  }
	}

	function emitReadable_(stream) {
	  var state = stream._readableState;
	  debug('emitReadable_', state.destroyed, state.length, state.ended);

	  if (!state.destroyed && (state.length || state.ended)) {
	    stream.emit('readable');
	    state.emittedReadable = false;
	  } // The stream needs another readable event if
	  // 1. It is not flowing, as the flow mechanism will take
	  //    care of it.
	  // 2. It is not ended.
	  // 3. It is below the highWaterMark, so we can schedule
	  //    another readable later.


	  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
	  flow(stream);
	} // at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.


	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  // Attempt to read more data if we should.
	  //
	  // The conditions for reading more data are (one of):
	  // - Not enough data buffered (state.length < state.highWaterMark). The loop
	  //   is responsible for filling the buffer with enough data if such data
	  //   is available. If highWaterMark is 0 and we are not in the flowing mode
	  //   we should _not_ attempt to buffer any extra data. We'll get more data
	  //   when the stream consumer calls read() instead.
	  // - No data in the buffer, and the stream is in flowing mode. In this mode
	  //   the loop below is responsible for ensuring read() is called. Failing to
	  //   call read here would abort the flow and there's no other mechanism for
	  //   continuing the flow if the stream consumer has just subscribed to the
	  //   'data' event.
	  //
	  // In addition to the above conditions to keep reading data, the following
	  // conditions prevent the data from being read:
	  // - The stream has ended (state.ended).
	  // - There is already a pending 'read' operation (state.reading). This is a
	  //   case where the the stream has called the implementation defined _read()
	  //   method, but they are processing the call asynchronously and have _not_
	  //   called push() with new data. In this case we skip performing more
	  //   read()s. The execution ends in this method again after the _read() ends
	  //   up calling push() with more data.
	  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
	    var len = state.length;
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length) // didn't get any data, stop spinning.
	      break;
	  }

	  state.readingMore = false;
	} // abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.


	Readable.prototype._read = function (n) {
	  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED$1('_read()'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;

	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;

	    default:
	      state.pipes.push(dest);
	      break;
	  }

	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);

	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');

	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  } // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.


	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;

	  function cleanup() {
	    debug('cleanup'); // cleanup event handlers once the pipe is broken

	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	    cleanedUp = true; // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.

	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  src.on('data', ondata);

	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    debug('dest.write', ret);

	    if (ret === false) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', state.awaitDrain);
	        state.awaitDrain++;
	      }

	      src.pause();
	    }
	  } // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.


	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
	  } // Make sure our error handler is attached before userland ones.


	  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }

	  dest.once('close', onclose);

	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }

	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  } // tell the dest that it's being piped to


	  dest.emit('pipe', src); // start the flow if it hasn't been started already.

	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function pipeOnDrainFunctionResult() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;

	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = {
	    hasUnpiped: false
	  }; // if we're not piping anywhere, then do nothing.

	  if (state.pipesCount === 0) return this; // just one destination.  most common case.

	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes; // got a match.

	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  } // slow case. multiple pipe destinations.


	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this, {
	        hasUnpiped: false
	      });
	    }

	    return this;
	  } // try to find the right one.


	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this, unpipeInfo);
	  return this;
	}; // set up data events if they are asked for
	// Ensure readable listeners eventually get something


	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	  var state = this._readableState;

	  if (ev === 'data') {
	    // update readableListening so that resume() may be a no-op
	    // a few lines down. This is needed to support once('readable').
	    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

	    if (state.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.flowing = false;
	      state.emittedReadable = false;
	      debug('on readable', state.length, state.reading);

	      if (state.length) {
	        emitReadable(this);
	      } else if (!state.reading) {
	        process.nextTick(nReadingNextTick, this);
	      }
	    }
	  }

	  return res;
	};

	Readable.prototype.addListener = Readable.prototype.on;

	Readable.prototype.removeListener = function (ev, fn) {
	  var res = Stream.prototype.removeListener.call(this, ev, fn);

	  if (ev === 'readable') {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	Readable.prototype.removeAllListeners = function (ev) {
	  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

	  if (ev === 'readable' || ev === undefined) {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	function updateReadableListening(self) {
	  var state = self._readableState;
	  state.readableListening = self.listenerCount('readable') > 0;

	  if (state.resumeScheduled && !state.paused) {
	    // flowing needs to be set to true now, otherwise
	    // the upcoming resume will not flow.
	    state.flowing = true; // crude way to check if we should resume
	  } else if (self.listenerCount('data') > 0) {
	    self.resume();
	  }
	}

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	} // pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.


	Readable.prototype.resume = function () {
	  var state = this._readableState;

	  if (!state.flowing) {
	    debug('resume'); // we flow only if there is no one listening
	    // for readable, but we still have to call
	    // resume()

	    state.flowing = !state.readableListening;
	    resume(this, state);
	  }

	  state.paused = false;
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  debug('resume', state.reading);

	  if (!state.reading) {
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);

	  if (this._readableState.flowing !== false) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }

	  this._readableState.paused = true;
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);

	  while (state.flowing && stream.read() !== null) {
	  }
	} // wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.


	Readable.prototype.wrap = function (stream) {
	  var _this = this;

	  var state = this._readableState;
	  var paused = false;
	  stream.on('end', function () {
	    debug('wrapped end');

	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) _this.push(chunk);
	    }

	    _this.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = _this.push(chunk);

	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  }); // proxy all the other methods.
	  // important when wrapping filters and duplexes.

	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function methodWrap(method) {
	        return function methodWrapReturnFunction() {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  } // proxy certain important events.


	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
	  } // when we try to consume some more bytes, simply unpause the
	  // underlying stream.


	  this._read = function (n) {
	    debug('wrapped _read', n);

	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return this;
	};

	if (typeof Symbol === 'function') {
	  Readable.prototype[Symbol.asyncIterator] = function () {
	    if (createReadableStreamAsyncIterator === undefined) {
	      createReadableStreamAsyncIterator = async_iterator;
	    }

	    return createReadableStreamAsyncIterator(this);
	  };
	}

	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.highWaterMark;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState && this._readableState.buffer;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableFlowing', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.flowing;
	  },
	  set: function set(state) {
	    if (this._readableState) {
	      this._readableState.flowing = state;
	    }
	  }
	}); // exposed for testing purposes only.

	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, 'readableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.length;
	  }
	}); // Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.

	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = state.buffer.consume(n, state.decoder);
	  }
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;
	  debug('endReadable', state.endEmitted);

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');

	    if (state.autoDestroy) {
	      // In case of duplex streams we need a way to detect
	      // if the writable side is ready for autoDestroy as well
	      var wState = stream._writableState;

	      if (!wState || wState.autoDestroy && wState.finished) {
	        stream.destroy();
	      }
	    }
	  }
	}

	if (typeof Symbol === 'function') {
	  Readable.from = function (iterable, opts) {
	    if (from === undefined) {
	      from = from_1;
	    }

	    return from(Readable, iterable, opts);
	  };
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }

	  return -1;
	}

	var _stream_transform = Transform$1;

	var _require$codes$1 = errors.codes,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_MULTIPLE_CALLBACK = _require$codes$1.ERR_MULTIPLE_CALLBACK,
	    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$1.ERR_TRANSFORM_ALREADY_TRANSFORMING,
	    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$1.ERR_TRANSFORM_WITH_LENGTH_0;

	var Duplex = _stream_duplex;

	inherits.exports(Transform$1, Duplex);

	function afterTransform(er, data) {
	  var ts = this._transformState;
	  ts.transforming = false;
	  var cb = ts.writecb;

	  if (cb === null) {
	    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
	  }

	  ts.writechunk = null;
	  ts.writecb = null;
	  if (data != null) // single equals check for both `null` and `undefined`
	    this.push(data);
	  cb(er);
	  var rs = this._readableState;
	  rs.reading = false;

	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    this._read(rs.highWaterMark);
	  }
	}

	function Transform$1(options) {
	  if (!(this instanceof Transform$1)) return new Transform$1(options);
	  Duplex.call(this, options);
	  this._transformState = {
	    afterTransform: afterTransform.bind(this),
	    needTransform: false,
	    transforming: false,
	    writecb: null,
	    writechunk: null,
	    writeencoding: null
	  }; // start out asking for a readable event once data is transformed.

	  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.

	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  } // When the writable side finishes, then flush out anything remaining.


	  this.on('prefinish', prefinish);
	}

	function prefinish() {
	  var _this = this;

	  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
	    this._flush(function (er, data) {
	      done(_this, er, data);
	    });
	  } else {
	    done(this, null, null);
	  }
	}

	Transform$1.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	}; // This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.


	Transform$1.prototype._transform = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
	};

	Transform$1.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;

	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	}; // Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.


	Transform$1.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && !ts.transforming) {
	    ts.transforming = true;

	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	Transform$1.prototype._destroy = function (err, cb) {
	  Duplex.prototype._destroy.call(this, err, function (err2) {
	    cb(err2);
	  });
	};

	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	  if (data != null) // single equals check for both `null` and `undefined`
	    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided

	  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
	  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
	  return stream.push(null);
	}

	var _stream_passthrough = PassThrough;

	var Transform = _stream_transform;

	inherits.exports(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

	var eos;

	function once(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;
	    callback.apply(void 0, arguments);
	  };
	}

	var _require$codes = errors.codes,
	    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
	    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

	function noop(err) {
	  // Rethrow the error if it exists to avoid swallowing it
	  if (err) throw err;
	}

	function isRequest(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}

	function destroyer(stream, reading, writing, callback) {
	  callback = once(callback);
	  var closed = false;
	  stream.on('close', function () {
	    closed = true;
	  });
	  if (eos === undefined) eos = endOfStream;
	  eos(stream, {
	    readable: reading,
	    writable: writing
	  }, function (err) {
	    if (err) return callback(err);
	    closed = true;
	    callback();
	  });
	  var destroyed = false;
	  return function (err) {
	    if (closed) return;
	    if (destroyed) return;
	    destroyed = true; // request.destroy just do .end - .abort is what we want

	    if (isRequest(stream)) return stream.abort();
	    if (typeof stream.destroy === 'function') return stream.destroy();
	    callback(err || new ERR_STREAM_DESTROYED('pipe'));
	  };
	}

	function call(fn) {
	  fn();
	}

	function pipe(from, to) {
	  return from.pipe(to);
	}

	function popCallback(streams) {
	  if (!streams.length) return noop;
	  if (typeof streams[streams.length - 1] !== 'function') return noop;
	  return streams.pop();
	}

	function pipeline() {
	  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
	    streams[_key] = arguments[_key];
	  }

	  var callback = popCallback(streams);
	  if (Array.isArray(streams[0])) streams = streams[0];

	  if (streams.length < 2) {
	    throw new ERR_MISSING_ARGS('streams');
	  }

	  var error;
	  var destroys = streams.map(function (stream, i) {
	    var reading = i < streams.length - 1;
	    var writing = i > 0;
	    return destroyer(stream, reading, writing, function (err) {
	      if (!error) error = err;
	      if (err) destroys.forEach(call);
	      if (reading) return;
	      destroys.forEach(call);
	      callback(error);
	    });
	  });
	  return streams.reduce(pipe);
	}

	var pipeline_1 = pipeline;

	(function (module, exports) {
	var Stream = require$$0__default$2["default"];
	if (process.env.READABLE_STREAM === 'disable' && Stream) {
	  module.exports = Stream.Readable;
	  Object.assign(module.exports, Stream);
	  module.exports.Stream = Stream;
	} else {
	  exports = module.exports = _stream_readable;
	  exports.Stream = Stream || exports;
	  exports.Readable = exports;
	  exports.Writable = _stream_writable;
	  exports.Duplex = _stream_duplex;
	  exports.Transform = _stream_transform;
	  exports.PassThrough = _stream_passthrough;
	  exports.finished = endOfStream;
	  exports.pipeline = pipeline_1;
	}
	}(readable, readable.exports));

	/**
	 * Expose `Delegator`.
	 */

	var delegates = Delegator;

	/**
	 * Initialize a delegator.
	 *
	 * @param {Object} proto
	 * @param {String} target
	 * @api public
	 */

	function Delegator(proto, target) {
	  if (!(this instanceof Delegator)) return new Delegator(proto, target);
	  this.proto = proto;
	  this.target = target;
	  this.methods = [];
	  this.getters = [];
	  this.setters = [];
	  this.fluents = [];
	}

	/**
	 * Delegate method `name`.
	 *
	 * @param {String} name
	 * @return {Delegator} self
	 * @api public
	 */

	Delegator.prototype.method = function(name){
	  var proto = this.proto;
	  var target = this.target;
	  this.methods.push(name);

	  proto[name] = function(){
	    return this[target][name].apply(this[target], arguments);
	  };

	  return this;
	};

	/**
	 * Delegator accessor `name`.
	 *
	 * @param {String} name
	 * @return {Delegator} self
	 * @api public
	 */

	Delegator.prototype.access = function(name){
	  return this.getter(name).setter(name);
	};

	/**
	 * Delegator getter `name`.
	 *
	 * @param {String} name
	 * @return {Delegator} self
	 * @api public
	 */

	Delegator.prototype.getter = function(name){
	  var proto = this.proto;
	  var target = this.target;
	  this.getters.push(name);

	  proto.__defineGetter__(name, function(){
	    return this[target][name];
	  });

	  return this;
	};

	/**
	 * Delegator setter `name`.
	 *
	 * @param {String} name
	 * @return {Delegator} self
	 * @api public
	 */

	Delegator.prototype.setter = function(name){
	  var proto = this.proto;
	  var target = this.target;
	  this.setters.push(name);

	  proto.__defineSetter__(name, function(val){
	    return this[target][name] = val;
	  });

	  return this;
	};

	/**
	 * Delegator fluent accessor
	 *
	 * @param {String} name
	 * @return {Delegator} self
	 * @api public
	 */

	Delegator.prototype.fluent = function (name) {
	  var proto = this.proto;
	  var target = this.target;
	  this.fluents.push(name);

	  proto[name] = function(val){
	    if ('undefined' != typeof val) {
	      this[target][name] = val;
	      return this;
	    } else {
	      return this[target][name];
	    }
	  };

	  return this;
	};

	var util$2 = require$$0__default$1["default"];
	var stream = readable.exports;
	var delegate = delegates;
	var Tracker$1 = tracker.exports;

	var TrackerStream$1 = trackerStream.exports = function (name, size, options) {
	  stream.Transform.call(this, options);
	  this.tracker = new Tracker$1(name, size);
	  this.name = name;
	  this.id = this.tracker.id;
	  this.tracker.on('change', delegateChange(this));
	};
	util$2.inherits(TrackerStream$1, stream.Transform);

	function delegateChange (trackerStream) {
	  return function (name, completion, tracker) {
	    trackerStream.emit('change', name, completion, trackerStream);
	  }
	}

	TrackerStream$1.prototype._transform = function (data, encoding, cb) {
	  this.tracker.completeWork(data.length ? data.length : 1);
	  this.push(data);
	  cb();
	};

	TrackerStream$1.prototype._flush = function (cb) {
	  this.tracker.finish();
	  cb();
	};

	delegate(TrackerStream$1.prototype, 'tracker')
	  .method('completed')
	  .method('addWork')
	  .method('finish');

	var util$1 = require$$0__default$1["default"];
	var TrackerBase = trackerBase.exports;
	var Tracker = tracker.exports;
	var TrackerStream = trackerStream.exports;

	var TrackerGroup = trackerGroup.exports = function (name) {
	  TrackerBase.call(this, name);
	  this.parentGroup = null;
	  this.trackers = [];
	  this.completion = {};
	  this.weight = {};
	  this.totalWeight = 0;
	  this.finished = false;
	  this.bubbleChange = bubbleChange(this);
	};
	util$1.inherits(TrackerGroup, TrackerBase);

	function bubbleChange (trackerGroup) {
	  return function (name, completed, tracker) {
	    trackerGroup.completion[tracker.id] = completed;
	    if (trackerGroup.finished) {
	      return
	    }
	    trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup);
	  }
	}

	TrackerGroup.prototype.nameInTree = function () {
	  var names = [];
	  var from = this;
	  while (from) {
	    names.unshift(from.name);
	    from = from.parentGroup;
	  }
	  return names.join('/')
	};

	TrackerGroup.prototype.addUnit = function (unit, weight) {
	  if (unit.addUnit) {
	    var toTest = this;
	    while (toTest) {
	      if (unit === toTest) {
	        throw new Error(
	          'Attempted to add tracker group ' +
	          unit.name + ' to tree that already includes it ' +
	          this.nameInTree(this))
	      }
	      toTest = toTest.parentGroup;
	    }
	    unit.parentGroup = this;
	  }
	  this.weight[unit.id] = weight || 1;
	  this.totalWeight += this.weight[unit.id];
	  this.trackers.push(unit);
	  this.completion[unit.id] = unit.completed();
	  unit.on('change', this.bubbleChange);
	  if (!this.finished) {
	    this.emit('change', unit.name, this.completion[unit.id], unit);
	  }
	  return unit
	};

	TrackerGroup.prototype.completed = function () {
	  if (this.trackers.length === 0) {
	    return 0
	  }
	  var valPerWeight = 1 / this.totalWeight;
	  var completed = 0;
	  for (var ii = 0; ii < this.trackers.length; ii++) {
	    var trackerId = this.trackers[ii].id;
	    completed +=
	      valPerWeight * this.weight[trackerId] * this.completion[trackerId];
	  }
	  return completed
	};

	TrackerGroup.prototype.newGroup = function (name, weight) {
	  return this.addUnit(new TrackerGroup(name), weight)
	};

	TrackerGroup.prototype.newItem = function (name, todo, weight) {
	  return this.addUnit(new Tracker(name, todo), weight)
	};

	TrackerGroup.prototype.newStream = function (name, todo, weight) {
	  return this.addUnit(new TrackerStream(name, todo), weight)
	};

	TrackerGroup.prototype.finish = function () {
	  this.finished = true;
	  if (!this.trackers.length) {
	    this.addUnit(new Tracker(), 1, true);
	  }
	  for (var ii = 0; ii < this.trackers.length; ii++) {
	    var tracker = this.trackers[ii];
	    tracker.finish();
	    tracker.removeListener('change', this.bubbleChange);
	  }
	  this.emit('change', this.name, 1, this);
	};

	var buffer = '                                  ';
	TrackerGroup.prototype.debug = function (depth) {
	  depth = depth || 0;
	  var indent = depth ? buffer.substr(0, depth) : '';
	  var output = indent + (this.name || 'top') + ': ' + this.completed() + '\n';
	  this.trackers.forEach(function (tracker) {
	    if (tracker instanceof TrackerGroup) {
	      output += tracker.debug(depth + 1);
	    } else {
	      output += indent + ' ' + tracker.name + ': ' + tracker.completed() + '\n';
	    }
	  });
	  return output
	};

	lib$1.TrackerGroup = trackerGroup.exports;
	lib$1.Tracker = tracker.exports;
	lib$1.TrackerStream = trackerStream.exports;

	var plumbing = {exports: {}};

	var consoleControlStrings = {};

	// These tables borrowed from `ansi`

	var prefix = '\x1b[';

	consoleControlStrings.up = function up (num) {
	  return prefix + (num || '') + 'A'
	};

	consoleControlStrings.down = function down (num) {
	  return prefix + (num || '') + 'B'
	};

	consoleControlStrings.forward = function forward (num) {
	  return prefix + (num || '') + 'C'
	};

	consoleControlStrings.back = function back (num) {
	  return prefix + (num || '') + 'D'
	};

	consoleControlStrings.nextLine = function nextLine (num) {
	  return prefix + (num || '') + 'E'
	};

	consoleControlStrings.previousLine = function previousLine (num) {
	  return prefix + (num || '') + 'F'
	};

	consoleControlStrings.horizontalAbsolute = function horizontalAbsolute (num) {
	  if (num == null) throw new Error('horizontalAboslute requires a column to position to')
	  return prefix + num + 'G'
	};

	consoleControlStrings.eraseData = function eraseData () {
	  return prefix + 'J'
	};

	consoleControlStrings.eraseLine = function eraseLine () {
	  return prefix + 'K'
	};

	consoleControlStrings.goto = function (x, y) {
	  return prefix + y + ';' + x + 'H'
	};

	consoleControlStrings.gotoSOL = function () {
	  return '\r'
	};

	consoleControlStrings.beep = function () {
	  return '\x07'
	};

	consoleControlStrings.hideCursor = function hideCursor () {
	  return prefix + '?25l'
	};

	consoleControlStrings.showCursor = function showCursor () {
	  return prefix + '?25h'
	};

	var colors = {
	  reset: 0,
	// styles
	  bold: 1,
	  italic: 3,
	  underline: 4,
	  inverse: 7,
	// resets
	  stopBold: 22,
	  stopItalic: 23,
	  stopUnderline: 24,
	  stopInverse: 27,
	// colors
	  white: 37,
	  black: 30,
	  blue: 34,
	  cyan: 36,
	  green: 32,
	  magenta: 35,
	  red: 31,
	  yellow: 33,
	  bgWhite: 47,
	  bgBlack: 40,
	  bgBlue: 44,
	  bgCyan: 46,
	  bgGreen: 42,
	  bgMagenta: 45,
	  bgRed: 41,
	  bgYellow: 43,

	  grey: 90,
	  brightBlack: 90,
	  brightRed: 91,
	  brightGreen: 92,
	  brightYellow: 93,
	  brightBlue: 94,
	  brightMagenta: 95,
	  brightCyan: 96,
	  brightWhite: 97,

	  bgGrey: 100,
	  bgBrightBlack: 100,
	  bgBrightRed: 101,
	  bgBrightGreen: 102,
	  bgBrightYellow: 103,
	  bgBrightBlue: 104,
	  bgBrightMagenta: 105,
	  bgBrightCyan: 106,
	  bgBrightWhite: 107
	};

	consoleControlStrings.color = function color (colorWith) {
	  if (arguments.length !== 1 || !Array.isArray(colorWith)) {
	    colorWith = Array.prototype.slice.call(arguments);
	  }
	  return prefix + colorWith.map(colorNameToCode).join(';') + 'm'
	};

	function colorNameToCode (color) {
	  if (colors[color] != null) return colors[color]
	  throw new Error('Unknown color or style name: ' + color)
	}

	var renderTemplate$3 = {exports: {}};

	var align$1 = {};

	var stringWidth$5 = {exports: {}};

	var ansiRegex$1 = ({onlyFirst = false} = {}) => {
		const pattern = [
			'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
			'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
		].join('|');

		return new RegExp(pattern, onlyFirst ? undefined : 'g');
	};

	const ansiRegex = ansiRegex$1;

	var stripAnsi$2 = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;

	var isFullwidthCodePoint$2 = {exports: {}};

	/* eslint-disable yoda */

	const isFullwidthCodePoint$1 = codePoint => {
		if (Number.isNaN(codePoint)) {
			return false;
		}

		// Code points are derived from:
		// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
		if (
			codePoint >= 0x1100 && (
				codePoint <= 0x115F || // Hangul Jamo
				codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
				codePoint === 0x232A || // RIGHT-POINTING ANGLE BRACKET
				// CJK Radicals Supplement .. Enclosed CJK Letters and Months
				(0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
				// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
				(0x3250 <= codePoint && codePoint <= 0x4DBF) ||
				// CJK Unified Ideographs .. Yi Radicals
				(0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
				// Hangul Jamo Extended-A
				(0xA960 <= codePoint && codePoint <= 0xA97C) ||
				// Hangul Syllables
				(0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
				// CJK Compatibility Ideographs
				(0xF900 <= codePoint && codePoint <= 0xFAFF) ||
				// Vertical Forms
				(0xFE10 <= codePoint && codePoint <= 0xFE19) ||
				// CJK Compatibility Forms .. Small Form Variants
				(0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
				// Halfwidth and Fullwidth Forms
				(0xFF01 <= codePoint && codePoint <= 0xFF60) ||
				(0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
				// Kana Supplement
				(0x1B000 <= codePoint && codePoint <= 0x1B001) ||
				// Enclosed Ideographic Supplement
				(0x1F200 <= codePoint && codePoint <= 0x1F251) ||
				// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
				(0x20000 <= codePoint && codePoint <= 0x3FFFD)
			)
		) {
			return true;
		}

		return false;
	};

	isFullwidthCodePoint$2.exports = isFullwidthCodePoint$1;
	isFullwidthCodePoint$2.exports.default = isFullwidthCodePoint$1;

	var emojiRegex$1 = function () {
	  // https://mths.be/emoji
	  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
	};

	const stripAnsi$1 = stripAnsi$2;
	const isFullwidthCodePoint = isFullwidthCodePoint$2.exports;
	const emojiRegex = emojiRegex$1;

	const stringWidth$4 = string => {
		if (typeof string !== 'string' || string.length === 0) {
			return 0;
		}

		string = stripAnsi$1(string);

		if (string.length === 0) {
			return 0;
		}

		string = string.replace(emojiRegex(), '  ');

		let width = 0;

		for (let i = 0; i < string.length; i++) {
			const code = string.codePointAt(i);

			// Ignore control characters
			if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
				continue;
			}

			// Ignore combining characters
			if (code >= 0x300 && code <= 0x36F) {
				continue;
			}

			// Surrogates
			if (code > 0xFFFF) {
				i++;
			}

			width += isFullwidthCodePoint(code) ? 2 : 1;
		}

		return width;
	};

	stringWidth$5.exports = stringWidth$4;
	// TODO: remove this in the next major version
	stringWidth$5.exports.default = stringWidth$4;

	var stringWidth$3 = stringWidth$5.exports;

	align$1.center = alignCenter;
	align$1.left = alignLeft;
	align$1.right = alignRight;

	// lodash's way of generating pad characters.

	function createPadding (width) {
	  var result = '';
	  var string = ' ';
	  var n = width;
	  do {
	    if (n % 2) {
	      result += string;
	    }
	    n = Math.floor(n / 2);
	    string += string;
	  } while (n);

	  return result;
	}

	function alignLeft (str, width) {
	  var trimmed = str.trimRight();
	  if (trimmed.length === 0 && str.length >= width) return str
	  var padding = '';
	  var strWidth = stringWidth$3(trimmed);

	  if (strWidth < width) {
	    padding = createPadding(width - strWidth);
	  }

	  return trimmed + padding
	}

	function alignRight (str, width) {
	  var trimmed = str.trimLeft();
	  if (trimmed.length === 0 && str.length >= width) return str
	  var padding = '';
	  var strWidth = stringWidth$3(trimmed);

	  if (strWidth < width) {
	    padding = createPadding(width - strWidth);
	  }

	  return padding + trimmed
	}

	function alignCenter (str, width) {
	  var trimmed = str.trim();
	  if (trimmed.length === 0 && str.length >= width) return str
	  var padLeft = '';
	  var padRight = '';
	  var strWidth = stringWidth$3(trimmed);

	  if (strWidth < width) {
	    var padLeftBy = parseInt((width - strWidth) / 2, 10); 
	    padLeft = createPadding(padLeftBy);
	    padRight = createPadding(width - (strWidth + padLeftBy));
	  }

	  return padLeft + trimmed + padRight
	}

	var aproba = validate$3;

	function isArguments (thingy) {
	  return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee')
	}

	const types = {
	  '*': {label: 'any', check: () => true},
	  A: {label: 'array', check: _ => Array.isArray(_) || isArguments(_)},
	  S: {label: 'string', check: _ => typeof _ === 'string'},
	  N: {label: 'number', check: _ => typeof _ === 'number'},
	  F: {label: 'function', check: _ => typeof _ === 'function'},
	  O: {label: 'object', check: _ => typeof _ === 'object' && _ != null && !types.A.check(_) && !types.E.check(_)},
	  B: {label: 'boolean', check: _ => typeof _ === 'boolean'},
	  E: {label: 'error', check: _ => _ instanceof Error},
	  Z: {label: 'null', check: _ => _ == null}
	};

	function addSchema (schema, arity) {
	  const group = arity[schema.length] = arity[schema.length] || [];
	  if (group.indexOf(schema) === -1) group.push(schema);
	}

	function validate$3 (rawSchemas, args) {
	  if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
	  if (!rawSchemas) throw missingRequiredArg(0)
	  if (!args) throw missingRequiredArg(1)
	  if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
	  if (!types.A.check(args)) throw invalidType(1, ['array'], args)
	  const schemas = rawSchemas.split('|');
	  const arity = {};

	  schemas.forEach(schema => {
	    for (let ii = 0; ii < schema.length; ++ii) {
	      const type = schema[ii];
	      if (!types[type]) throw unknownType(ii, type)
	    }
	    if (/E.*E/.test(schema)) throw moreThanOneError(schema)
	    addSchema(schema, arity);
	    if (/E/.test(schema)) {
	      addSchema(schema.replace(/E.*$/, 'E'), arity);
	      addSchema(schema.replace(/E/, 'Z'), arity);
	      if (schema.length === 1) addSchema('', arity);
	    }
	  });
	  let matching = arity[args.length];
	  if (!matching) {
	    throw wrongNumberOfArgs(Object.keys(arity), args.length)
	  }
	  for (let ii = 0; ii < args.length; ++ii) {
	    let newMatching = matching.filter(schema => {
	      const type = schema[ii];
	      const typeCheck = types[type].check;
	      return typeCheck(args[ii])
	    });
	    if (!newMatching.length) {
	      const labels = matching.map(_ => types[_[ii]].label).filter(_ => _ != null);
	      throw invalidType(ii, labels, args[ii])
	    }
	    matching = newMatching;
	  }
	}

	function missingRequiredArg (num) {
	  return newException('EMISSINGARG', 'Missing required argument #' + (num + 1))
	}

	function unknownType (num, type) {
	  return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1))
	}

	function invalidType (num, expectedTypes, value) {
	  let valueType;
	  Object.keys(types).forEach(typeCode => {
	    if (types[typeCode].check(value)) valueType = types[typeCode].label;
	  });
	  return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' +
	    englishList(expectedTypes) + ' but got ' + valueType)
	}

	function englishList (list) {
	  return list.join(', ').replace(/, ([^,]+)$/, ' or $1')
	}

	function wrongNumberOfArgs (expected, got) {
	  const english = englishList(expected);
	  const args = expected.every(ex => ex.length === 1)
	    ? 'argument'
	    : 'arguments';
	  return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got)
	}

	function moreThanOneError (schema) {
	  return newException('ETOOMANYERRORTYPES',
	    'Only one error type per argument signature is allowed, more than one found in "' + schema + '"')
	}

	function newException (code, msg) {
	  const err = new Error(msg);
	  err.code = code;
	  /* istanbul ignore else */
	  if (Error.captureStackTrace) Error.captureStackTrace(err, validate$3);
	  return err
	}

	var stringWidth$2 = stringWidth$5.exports;
	var stripAnsi = stripAnsi$2;

	var wideTruncate_1 = wideTruncate$2;

	function wideTruncate$2 (str, target) {
	  if (stringWidth$2(str) === 0) {
	    return str
	  }
	  if (target <= 0) {
	    return ''
	  }
	  if (stringWidth$2(str) <= target) {
	    return str
	  }

	  // We compute the number of bytes of ansi sequences here and add
	  // that to our initial truncation to ensure that we don't slice one
	  // that we want to keep in half.
	  var noAnsi = stripAnsi(str);
	  var ansiSize = str.length + noAnsi.length;
	  var truncated = str.slice(0, target + ansiSize);

	  // we have to shrink the result to account for our ansi sequence buffer
	  // (if an ansi sequence was truncated) and double width characters.
	  while (stringWidth$2(truncated) > target) {
	    truncated = truncated.slice(0, -1);
	  }
	  return truncated
	}

	var error$1 = {};

	var util = require$$0__default$1["default"];

	var User = error$1.User = function User (msg) {
	  var err = new Error(msg);
	  Error.captureStackTrace(err, User);
	  err.code = 'EGAUGE';
	  return err
	};

	error$1.MissingTemplateValue = function MissingTemplateValue (item, values) {
	  var err = new User(util.format('Missing template value "%s"', item.type));
	  Error.captureStackTrace(err, MissingTemplateValue);
	  err.template = item;
	  err.values = values;
	  return err
	};

	error$1.Internal = function Internal (msg) {
	  var err = new Error(msg);
	  Error.captureStackTrace(err, Internal);
	  err.code = 'EGAUGEINTERNAL';
	  return err
	};

	var stringWidth$1 = stringWidth$5.exports;

	var templateItem = TemplateItem$1;

	function isPercent (num) {
	  if (typeof num !== 'string') {
	    return false
	  }
	  return num.slice(-1) === '%'
	}

	function percent (num) {
	  return Number(num.slice(0, -1)) / 100
	}

	function TemplateItem$1 (values, outputLength) {
	  this.overallOutputLength = outputLength;
	  this.finished = false;
	  this.type = null;
	  this.value = null;
	  this.length = null;
	  this.maxLength = null;
	  this.minLength = null;
	  this.kerning = null;
	  this.align = 'left';
	  this.padLeft = 0;
	  this.padRight = 0;
	  this.index = null;
	  this.first = null;
	  this.last = null;
	  if (typeof values === 'string') {
	    this.value = values;
	  } else {
	    for (var prop in values) {
	      this[prop] = values[prop];
	    }
	  }
	  // Realize percents
	  if (isPercent(this.length)) {
	    this.length = Math.round(this.overallOutputLength * percent(this.length));
	  }
	  if (isPercent(this.minLength)) {
	    this.minLength = Math.round(this.overallOutputLength * percent(this.minLength));
	  }
	  if (isPercent(this.maxLength)) {
	    this.maxLength = Math.round(this.overallOutputLength * percent(this.maxLength));
	  }
	  return this
	}

	TemplateItem$1.prototype = {};

	TemplateItem$1.prototype.getBaseLength = function () {
	  var length = this.length;
	  if (
	    length == null &&
	    typeof this.value === 'string' &&
	    this.maxLength == null &&
	    this.minLength == null
	  ) {
	    length = stringWidth$1(this.value);
	  }
	  return length
	};

	TemplateItem$1.prototype.getLength = function () {
	  var length = this.getBaseLength();
	  if (length == null) {
	    return null
	  }
	  return length + this.padLeft + this.padRight
	};

	TemplateItem$1.prototype.getMaxLength = function () {
	  if (this.maxLength == null) {
	    return null
	  }
	  return this.maxLength + this.padLeft + this.padRight
	};

	TemplateItem$1.prototype.getMinLength = function () {
	  if (this.minLength == null) {
	    return null
	  }
	  return this.minLength + this.padLeft + this.padRight
	};

	var align = align$1;
	var validate$2 = aproba;
	var wideTruncate$1 = wideTruncate_1;
	var error = error$1;
	var TemplateItem = templateItem;

	function renderValueWithValues (values) {
	  return function (item) {
	    return renderValue(item, values)
	  }
	}

	var renderTemplate$2 = renderTemplate$3.exports = function (width, template, values) {
	  var items = prepareItems(width, template, values);
	  var rendered = items.map(renderValueWithValues(values)).join('');
	  return align.left(wideTruncate$1(rendered, width), width)
	};

	function preType (item) {
	  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
	  return 'pre' + cappedTypeName
	}

	function postType (item) {
	  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
	  return 'post' + cappedTypeName
	}

	function hasPreOrPost (item, values) {
	  if (!item.type) {
	    return
	  }
	  return values[preType(item)] || values[postType(item)]
	}

	function generatePreAndPost (baseItem, parentValues) {
	  var item = Object.assign({}, baseItem);
	  var values = Object.create(parentValues);
	  var template = [];
	  var pre = preType(item);
	  var post = postType(item);
	  if (values[pre]) {
	    template.push({ value: values[pre] });
	    values[pre] = null;
	  }
	  item.minLength = null;
	  item.length = null;
	  item.maxLength = null;
	  template.push(item);
	  values[item.type] = values[item.type];
	  if (values[post]) {
	    template.push({ value: values[post] });
	    values[post] = null;
	  }
	  return function ($1, $2, length) {
	    return renderTemplate$2(length, template, values)
	  }
	}

	function prepareItems (width, template, values) {
	  function cloneAndObjectify (item, index, arr) {
	    var cloned = new TemplateItem(item, width);
	    var type = cloned.type;
	    if (cloned.value == null) {
	      if (!(type in values)) {
	        if (cloned.default == null) {
	          throw new error.MissingTemplateValue(cloned, values)
	        } else {
	          cloned.value = cloned.default;
	        }
	      } else {
	        cloned.value = values[type];
	      }
	    }
	    if (cloned.value == null || cloned.value === '') {
	      return null
	    }
	    cloned.index = index;
	    cloned.first = index === 0;
	    cloned.last = index === arr.length - 1;
	    if (hasPreOrPost(cloned, values)) {
	      cloned.value = generatePreAndPost(cloned, values);
	    }
	    return cloned
	  }

	  var output = template.map(cloneAndObjectify).filter(function (item) {
	    return item != null
	  });

	  var remainingSpace = width;
	  var variableCount = output.length;

	  function consumeSpace (length) {
	    if (length > remainingSpace) {
	      length = remainingSpace;
	    }
	    remainingSpace -= length;
	  }

	  function finishSizing (item, length) {
	    if (item.finished) {
	      throw new error.Internal('Tried to finish template item that was already finished')
	    }
	    if (length === Infinity) {
	      throw new error.Internal('Length of template item cannot be infinity')
	    }
	    if (length != null) {
	      item.length = length;
	    }
	    item.minLength = null;
	    item.maxLength = null;
	    --variableCount;
	    item.finished = true;
	    if (item.length == null) {
	      item.length = item.getBaseLength();
	    }
	    if (item.length == null) {
	      throw new error.Internal('Finished template items must have a length')
	    }
	    consumeSpace(item.getLength());
	  }

	  output.forEach(function (item) {
	    if (!item.kerning) {
	      return
	    }
	    var prevPadRight = item.first ? 0 : output[item.index - 1].padRight;
	    if (!item.first && prevPadRight < item.kerning) {
	      item.padLeft = item.kerning - prevPadRight;
	    }
	    if (!item.last) {
	      item.padRight = item.kerning;
	    }
	  });

	  // Finish any that have a fixed (literal or intuited) length
	  output.forEach(function (item) {
	    if (item.getBaseLength() == null) {
	      return
	    }
	    finishSizing(item);
	  });

	  var resized = 0;
	  var resizing;
	  var hunkSize;
	  do {
	    resizing = false;
	    hunkSize = Math.round(remainingSpace / variableCount);
	    output.forEach(function (item) {
	      if (item.finished) {
	        return
	      }
	      if (!item.maxLength) {
	        return
	      }
	      if (item.getMaxLength() < hunkSize) {
	        finishSizing(item, item.maxLength);
	        resizing = true;
	      }
	    });
	  } while (resizing && resized++ < output.length)
	  if (resizing) {
	    throw new error.Internal('Resize loop iterated too many times while determining maxLength')
	  }

	  resized = 0;
	  do {
	    resizing = false;
	    hunkSize = Math.round(remainingSpace / variableCount);
	    output.forEach(function (item) {
	      if (item.finished) {
	        return
	      }
	      if (!item.minLength) {
	        return
	      }
	      if (item.getMinLength() >= hunkSize) {
	        finishSizing(item, item.minLength);
	        resizing = true;
	      }
	    });
	  } while (resizing && resized++ < output.length)
	  if (resizing) {
	    throw new error.Internal('Resize loop iterated too many times while determining minLength')
	  }

	  hunkSize = Math.round(remainingSpace / variableCount);
	  output.forEach(function (item) {
	    if (item.finished) {
	      return
	    }
	    finishSizing(item, hunkSize);
	  });

	  return output
	}

	function renderFunction (item, values, length) {
	  validate$2('OON', arguments);
	  if (item.type) {
	    return item.value(values, values[item.type + 'Theme'] || {}, length)
	  } else {
	    return item.value(values, {}, length)
	  }
	}

	function renderValue (item, values) {
	  var length = item.getBaseLength();
	  var value = typeof item.value === 'function' ? renderFunction(item, values, length) : item.value;
	  if (value == null || value === '') {
	    return ''
	  }
	  var alignWith = align[item.align] || align.left;
	  var leftPadding = item.padLeft ? align.left('', item.padLeft) : '';
	  var rightPadding = item.padRight ? align.right('', item.padRight) : '';
	  var truncated = wideTruncate$1(String(value), length);
	  var aligned = alignWith(truncated, length);
	  return leftPadding + aligned + rightPadding
	}

	var consoleControl = consoleControlStrings;
	var renderTemplate$1 = renderTemplate$3.exports;
	var validate$1 = aproba;

	var Plumbing$1 = plumbing.exports = function (theme, template, width) {
	  if (!width) {
	    width = 80;
	  }
	  validate$1('OAN', [theme, template, width]);
	  this.showing = false;
	  this.theme = theme;
	  this.width = width;
	  this.template = template;
	};
	Plumbing$1.prototype = {};

	Plumbing$1.prototype.setTheme = function (theme) {
	  validate$1('O', [theme]);
	  this.theme = theme;
	};

	Plumbing$1.prototype.setTemplate = function (template) {
	  validate$1('A', [template]);
	  this.template = template;
	};

	Plumbing$1.prototype.setWidth = function (width) {
	  validate$1('N', [width]);
	  this.width = width;
	};

	Plumbing$1.prototype.hide = function () {
	  return consoleControl.gotoSOL() + consoleControl.eraseLine()
	};

	Plumbing$1.prototype.hideCursor = consoleControl.hideCursor;

	Plumbing$1.prototype.showCursor = consoleControl.showCursor;

	Plumbing$1.prototype.show = function (status) {
	  var values = Object.create(this.theme);
	  for (var key in status) {
	    values[key] = status[key];
	  }

	  return renderTemplate$1(this.width, this.template, values).trim() +
	         consoleControl.color('reset') +
	         consoleControl.eraseLine() + consoleControl.gotoSOL()
	};

	var hasUnicode$1 = {exports: {}};

	var os = require$$0__default$4["default"];

	hasUnicode$1.exports = function () {
	  // Recent Win32 platforms (>XP) CAN support unicode in the console but
	  // don't have to, and in non-english locales often use traditional local
	  // code pages. There's no way, short of windows system calls or execing
	  // the chcp command line program to figure this out. As such, we default
	  // this to false and encourage your users to override it via config if
	  // appropriate.
	  if (os.type() == "Windows_NT") { return false }

	  var isUTF8 = /UTF-?8$/i;
	  var ctype = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG;
	  return isUTF8.test(ctype)
	};

	// call it on itself so we can test the export val for basic stuff
	var colorSupport_1 = colorSupport$1({ alwaysReturn: true }, colorSupport$1);

	function hasNone (obj, options) {
	  obj.level = 0;
	  obj.hasBasic = false;
	  obj.has256 = false;
	  obj.has16m = false;
	  if (!options.alwaysReturn) {
	    return false
	  }
	  return obj
	}

	function hasBasic (obj) {
	  obj.hasBasic = true;
	  obj.has256 = false;
	  obj.has16m = false;
	  obj.level = 1;
	  return obj
	}

	function has256 (obj) {
	  obj.hasBasic = true;
	  obj.has256 = true;
	  obj.has16m = false;
	  obj.level = 2;
	  return obj
	}

	function has16m (obj) {
	  obj.hasBasic = true;
	  obj.has256 = true;
	  obj.has16m = true;
	  obj.level = 3;
	  return obj
	}

	function colorSupport$1 (options, obj) {
	  options = options || {};

	  obj = obj || {};

	  // if just requesting a specific level, then return that.
	  if (typeof options.level === 'number') {
	    switch (options.level) {
	      case 0:
	        return hasNone(obj, options)
	      case 1:
	        return hasBasic(obj)
	      case 2:
	        return has256(obj)
	      case 3:
	        return has16m(obj)
	    }
	  }

	  obj.level = 0;
	  obj.hasBasic = false;
	  obj.has256 = false;
	  obj.has16m = false;

	  if (typeof process === 'undefined' ||
	      !process ||
	      !process.stdout ||
	      !process.env ||
	      !process.platform) {
	    return hasNone(obj, options)
	  }

	  var env = options.env || process.env;
	  var stream = options.stream || process.stdout;
	  var term = options.term || env.TERM || '';
	  var platform = options.platform || process.platform;

	  if (!options.ignoreTTY && !stream.isTTY) {
	    return hasNone(obj, options)
	  }

	  if (!options.ignoreDumb && term === 'dumb' && !env.COLORTERM) {
	    return hasNone(obj, options)
	  }

	  if (platform === 'win32') {
	    return hasBasic(obj)
	  }

	  if (env.TMUX) {
	    return has256(obj)
	  }

	  if (!options.ignoreCI && (env.CI || env.TEAMCITY_VERSION)) {
	    if (env.TRAVIS) {
	      return has256(obj)
	    } else {
	      return hasNone(obj, options)
	    }
	  }

	  // TODO: add more term programs
	  switch (env.TERM_PROGRAM) {
	    case 'iTerm.app':
	      var ver = env.TERM_PROGRAM_VERSION || '0.';
	      if (/^[0-2]\./.test(ver)) {
	        return has256(obj)
	      } else {
	        return has16m(obj)
	      }

	    case 'HyperTerm':
	    case 'Hyper':
	      return has16m(obj)

	    case 'MacTerm':
	      return has16m(obj)

	    case 'Apple_Terminal':
	      return has256(obj)
	  }

	  if (/^xterm-256/.test(term)) {
	    return has256(obj)
	  }

	  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(term)) {
	    return hasBasic(obj)
	  }

	  if (env.COLORTERM) {
	    return hasBasic(obj)
	  }

	  return hasNone(obj, options)
	}

	var colorSupport = colorSupport_1;

	var hasColor$1 = colorSupport().hasBasic;

	var signalExit = {exports: {}};

	var signals$1 = {exports: {}};

	(function (module) {
	// This is not the set of all possible signals.
	//
	// It IS, however, the set of all signals that trigger
	// an exit on either Linux or BSD systems.  Linux is a
	// superset of the signal names supported on BSD, and
	// the unknown signals just fail to register, so we can
	// catch that easily enough.
	//
	// Don't bother with SIGKILL.  It's uncatchable, which
	// means that we can't fire any callbacks anyway.
	//
	// If a user does happen to register a handler on a non-
	// fatal signal like SIGWINCH or something, and then
	// exit, it'll end up firing `process.emit('exit')`, so
	// the handler will be fired anyway.
	//
	// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
	// artificially, inherently leave the process in a
	// state from which it is not safe to try and enter JS
	// listeners.
	module.exports = [
	  'SIGABRT',
	  'SIGALRM',
	  'SIGHUP',
	  'SIGINT',
	  'SIGTERM'
	];

	if (process.platform !== 'win32') {
	  module.exports.push(
	    'SIGVTALRM',
	    'SIGXCPU',
	    'SIGXFSZ',
	    'SIGUSR2',
	    'SIGTRAP',
	    'SIGSYS',
	    'SIGQUIT',
	    'SIGIOT'
	    // should detect profiler and enable/disable accordingly.
	    // see #21
	    // 'SIGPROF'
	  );
	}

	if (process.platform === 'linux') {
	  module.exports.push(
	    'SIGIO',
	    'SIGPOLL',
	    'SIGPWR',
	    'SIGSTKFLT',
	    'SIGUNUSED'
	  );
	}
	}(signals$1));

	// Note: since nyc uses this module to output coverage, any lines
	// that are in the direct sync flow of nyc's outputCoverage are
	// ignored, since we can never get coverage for them.
	// grab a reference to node's real process object right away
	var process$3 = commonjsGlobal.process;

	const processOk = function (process) {
	  return process &&
	    typeof process === 'object' &&
	    typeof process.removeListener === 'function' &&
	    typeof process.emit === 'function' &&
	    typeof process.reallyExit === 'function' &&
	    typeof process.listeners === 'function' &&
	    typeof process.kill === 'function' &&
	    typeof process.pid === 'number' &&
	    typeof process.on === 'function'
	};

	// some kind of non-node environment, just no-op
	/* istanbul ignore if */
	if (!processOk(process$3)) {
	  signalExit.exports = function () {};
	} else {
	  var assert = require$$0__default$5["default"];
	  var signals = signals$1.exports;
	  var isWin = /^win/i.test(process$3.platform);

	  var EE = require$$0__default["default"];
	  /* istanbul ignore if */
	  if (typeof EE !== 'function') {
	    EE = EE.EventEmitter;
	  }

	  var emitter;
	  if (process$3.__signal_exit_emitter__) {
	    emitter = process$3.__signal_exit_emitter__;
	  } else {
	    emitter = process$3.__signal_exit_emitter__ = new EE();
	    emitter.count = 0;
	    emitter.emitted = {};
	  }

	  // Because this emitter is a global, we have to check to see if a
	  // previous version of this library failed to enable infinite listeners.
	  // I know what you're about to say.  But literally everything about
	  // signal-exit is a compromise with evil.  Get used to it.
	  if (!emitter.infinite) {
	    emitter.setMaxListeners(Infinity);
	    emitter.infinite = true;
	  }

	  signalExit.exports = function (cb, opts) {
	    /* istanbul ignore if */
	    if (!processOk(commonjsGlobal.process)) {
	      return
	    }
	    assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler');

	    if (loaded === false) {
	      load();
	    }

	    var ev = 'exit';
	    if (opts && opts.alwaysLast) {
	      ev = 'afterexit';
	    }

	    var remove = function () {
	      emitter.removeListener(ev, cb);
	      if (emitter.listeners('exit').length === 0 &&
	          emitter.listeners('afterexit').length === 0) {
	        unload();
	      }
	    };
	    emitter.on(ev, cb);

	    return remove
	  };

	  var unload = function unload () {
	    if (!loaded || !processOk(commonjsGlobal.process)) {
	      return
	    }
	    loaded = false;

	    signals.forEach(function (sig) {
	      try {
	        process$3.removeListener(sig, sigListeners[sig]);
	      } catch (er) {}
	    });
	    process$3.emit = originalProcessEmit;
	    process$3.reallyExit = originalProcessReallyExit;
	    emitter.count -= 1;
	  };
	  signalExit.exports.unload = unload;

	  var emit = function emit (event, code, signal) {
	    /* istanbul ignore if */
	    if (emitter.emitted[event]) {
	      return
	    }
	    emitter.emitted[event] = true;
	    emitter.emit(event, code, signal);
	  };

	  // { <signal>: <listener fn>, ... }
	  var sigListeners = {};
	  signals.forEach(function (sig) {
	    sigListeners[sig] = function listener () {
	      /* istanbul ignore if */
	      if (!processOk(commonjsGlobal.process)) {
	        return
	      }
	      // If there are no other listeners, an exit is coming!
	      // Simplest way: remove us and then re-send the signal.
	      // We know that this will kill the process, so we can
	      // safely emit now.
	      var listeners = process$3.listeners(sig);
	      if (listeners.length === emitter.count) {
	        unload();
	        emit('exit', null, sig);
	        /* istanbul ignore next */
	        emit('afterexit', null, sig);
	        /* istanbul ignore next */
	        if (isWin && sig === 'SIGHUP') {
	          // "SIGHUP" throws an `ENOSYS` error on Windows,
	          // so use a supported signal instead
	          sig = 'SIGINT';
	        }
	        /* istanbul ignore next */
	        process$3.kill(process$3.pid, sig);
	      }
	    };
	  });

	  signalExit.exports.signals = function () {
	    return signals
	  };

	  var loaded = false;

	  var load = function load () {
	    if (loaded || !processOk(commonjsGlobal.process)) {
	      return
	    }
	    loaded = true;

	    // This is the number of onSignalExit's that are in play.
	    // It's important so that we can count the correct number of
	    // listeners on signals, and don't wait for the other one to
	    // handle it instead of us.
	    emitter.count += 1;

	    signals = signals.filter(function (sig) {
	      try {
	        process$3.on(sig, sigListeners[sig]);
	        return true
	      } catch (er) {
	        return false
	      }
	    });

	    process$3.emit = processEmit;
	    process$3.reallyExit = processReallyExit;
	  };
	  signalExit.exports.load = load;

	  var originalProcessReallyExit = process$3.reallyExit;
	  var processReallyExit = function processReallyExit (code) {
	    /* istanbul ignore if */
	    if (!processOk(commonjsGlobal.process)) {
	      return
	    }
	    process$3.exitCode = code || /* istanbul ignore next */ 0;
	    emit('exit', process$3.exitCode, null);
	    /* istanbul ignore next */
	    emit('afterexit', process$3.exitCode, null);
	    /* istanbul ignore next */
	    originalProcessReallyExit.call(process$3, process$3.exitCode);
	  };

	  var originalProcessEmit = process$3.emit;
	  var processEmit = function processEmit (ev, arg) {
	    if (ev === 'exit' && processOk(commonjsGlobal.process)) {
	      /* istanbul ignore else */
	      if (arg !== undefined) {
	        process$3.exitCode = arg;
	      }
	      var ret = originalProcessEmit.apply(this, arguments);
	      /* istanbul ignore next */
	      emit('exit', process$3.exitCode, null);
	      /* istanbul ignore next */
	      emit('afterexit', process$3.exitCode, null);
	      /* istanbul ignore next */
	      return ret
	    } else {
	      return originalProcessEmit.apply(this, arguments)
	    }
	  };
	}

	var themes$1 = {exports: {}};

	var spin$1 = function spin (spinstr, spun) {
	  return spinstr[spun % spinstr.length]
	};

	var validate = aproba;
	var renderTemplate = renderTemplate$3.exports;
	var wideTruncate = wideTruncate_1;
	var stringWidth = stringWidth$5.exports;

	var progressBar$1 = function (theme, width, completed) {
	  validate('ONN', [theme, width, completed]);
	  if (completed < 0) {
	    completed = 0;
	  }
	  if (completed > 1) {
	    completed = 1;
	  }
	  if (width <= 0) {
	    return ''
	  }
	  var sofar = Math.round(width * completed);
	  var rest = width - sofar;
	  var template = [
	    { type: 'complete', value: repeat(theme.complete, sofar), length: sofar },
	    { type: 'remaining', value: repeat(theme.remaining, rest), length: rest },
	  ];
	  return renderTemplate(width, template, theme)
	};

	// lodash's way of repeating
	function repeat (string, width) {
	  var result = '';
	  var n = width;
	  do {
	    if (n % 2) {
	      result += string;
	    }
	    n = Math.floor(n / 2);
	    /* eslint no-self-assign: 0 */
	    string += string;
	  } while (n && stringWidth(result) < width)

	  return wideTruncate(result, width)
	}

	var spin = spin$1;
	var progressBar = progressBar$1;

	var baseTheme = {
	  activityIndicator: function (values, theme, width) {
	    if (values.spun == null) {
	      return
	    }
	    return spin(theme, values.spun)
	  },
	  progressbar: function (values, theme, width) {
	    if (values.completed == null) {
	      return
	    }
	    return progressBar(theme, width, values.completed)
	  },
	};

	var themeSet = function () {
	  return ThemeSetProto.newThemeSet()
	};

	var ThemeSetProto = {};

	ThemeSetProto.baseTheme = baseTheme;

	ThemeSetProto.newTheme = function (parent, theme) {
	  if (!theme) {
	    theme = parent;
	    parent = this.baseTheme;
	  }
	  return Object.assign({}, parent, theme)
	};

	ThemeSetProto.getThemeNames = function () {
	  return Object.keys(this.themes)
	};

	ThemeSetProto.addTheme = function (name, parent, theme) {
	  this.themes[name] = this.newTheme(parent, theme);
	};

	ThemeSetProto.addToAllThemes = function (theme) {
	  var themes = this.themes;
	  Object.keys(themes).forEach(function (name) {
	    Object.assign(themes[name], theme);
	  });
	  Object.assign(this.baseTheme, theme);
	};

	ThemeSetProto.getTheme = function (name) {
	  if (!this.themes[name]) {
	    throw this.newMissingThemeError(name)
	  }
	  return this.themes[name]
	};

	ThemeSetProto.setDefault = function (opts, name) {
	  if (name == null) {
	    name = opts;
	    opts = {};
	  }
	  var platform = opts.platform == null ? 'fallback' : opts.platform;
	  var hasUnicode = !!opts.hasUnicode;
	  var hasColor = !!opts.hasColor;
	  if (!this.defaults[platform]) {
	    this.defaults[platform] = { true: {}, false: {} };
	  }
	  this.defaults[platform][hasUnicode][hasColor] = name;
	};

	ThemeSetProto.getDefault = function (opts) {
	  if (!opts) {
	    opts = {};
	  }
	  var platformName = opts.platform || process.platform;
	  var platform = this.defaults[platformName] || this.defaults.fallback;
	  var hasUnicode = !!opts.hasUnicode;
	  var hasColor = !!opts.hasColor;
	  if (!platform) {
	    throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
	  }
	  if (!platform[hasUnicode][hasColor]) {
	    if (hasUnicode && hasColor && platform[!hasUnicode][hasColor]) {
	      hasUnicode = false;
	    } else if (hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
	      hasColor = false;
	    } else if (hasUnicode && hasColor && platform[!hasUnicode][!hasColor]) {
	      hasUnicode = false;
	      hasColor = false;
	    } else if (hasUnicode && !hasColor && platform[!hasUnicode][hasColor]) {
	      hasUnicode = false;
	    } else if (!hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
	      hasColor = false;
	    } else if (platform === this.defaults.fallback) {
	      throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
	    }
	  }
	  if (platform[hasUnicode][hasColor]) {
	    return this.getTheme(platform[hasUnicode][hasColor])
	  } else {
	    return this.getDefault(Object.assign({}, opts, { platform: 'fallback' }))
	  }
	};

	ThemeSetProto.newMissingThemeError = function newMissingThemeError (name) {
	  var err = new Error('Could not find a gauge theme named "' + name + '"');
	  Error.captureStackTrace.call(err, newMissingThemeError);
	  err.theme = name;
	  err.code = 'EMISSINGTHEME';
	  return err
	};

	ThemeSetProto.newMissingDefaultThemeError =
	  function newMissingDefaultThemeError (platformName, hasUnicode, hasColor) {
	    var err = new Error(
	      'Could not find a gauge theme for your platform/unicode/color use combo:\n' +
	    '    platform = ' + platformName + '\n' +
	    '    hasUnicode = ' + hasUnicode + '\n' +
	    '    hasColor = ' + hasColor);
	    Error.captureStackTrace.call(err, newMissingDefaultThemeError);
	    err.platform = platformName;
	    err.hasUnicode = hasUnicode;
	    err.hasColor = hasColor;
	    err.code = 'EMISSINGTHEME';
	    return err
	  };

	ThemeSetProto.newThemeSet = function () {
	  var themeset = function (opts) {
	    return themeset.getDefault(opts)
	  };
	  return Object.assign(themeset, ThemeSetProto, {
	    themes: Object.assign({}, this.themes),
	    baseTheme: Object.assign({}, this.baseTheme),
	    defaults: JSON.parse(JSON.stringify(this.defaults || {})),
	  })
	};

	var color = consoleControlStrings.color;
	var ThemeSet = themeSet;

	var themes = themes$1.exports = new ThemeSet();

	themes.addTheme('ASCII', {
	  preProgressbar: '[',
	  postProgressbar: ']',
	  progressbarTheme: {
	    complete: '#',
	    remaining: '.',
	  },
	  activityIndicatorTheme: '-\\|/',
	  preSubsection: '>',
	});

	themes.addTheme('colorASCII', themes.getTheme('ASCII'), {
	  progressbarTheme: {
	    preComplete: color('bgBrightWhite', 'brightWhite'),
	    complete: '#',
	    postComplete: color('reset'),
	    preRemaining: color('bgBrightBlack', 'brightBlack'),
	    remaining: '.',
	    postRemaining: color('reset'),
	  },
	});

	themes.addTheme('brailleSpinner', {
	  preProgressbar: '???',
	  postProgressbar: '???',
	  progressbarTheme: {
	    complete: '#',
	    remaining: '???',
	  },
	  activityIndicatorTheme: '??????????????????????????????',
	  preSubsection: '>',
	});

	themes.addTheme('colorBrailleSpinner', themes.getTheme('brailleSpinner'), {
	  progressbarTheme: {
	    preComplete: color('bgBrightWhite', 'brightWhite'),
	    complete: '#',
	    postComplete: color('reset'),
	    preRemaining: color('bgBrightBlack', 'brightBlack'),
	    remaining: '???',
	    postRemaining: color('reset'),
	  },
	});

	themes.setDefault({}, 'ASCII');
	themes.setDefault({ hasColor: true }, 'colorASCII');
	themes.setDefault({ platform: 'darwin', hasUnicode: true }, 'brailleSpinner');
	themes.setDefault({ platform: 'darwin', hasUnicode: true, hasColor: true }, 'colorBrailleSpinner');
	themes.setDefault({ platform: 'linux', hasUnicode: true }, 'brailleSpinner');
	themes.setDefault({ platform: 'linux', hasUnicode: true, hasColor: true }, 'colorBrailleSpinner');

	// this exists so we can replace it during testing
	var setInterval_1 = setInterval;

	// this exists so we can replace it during testing
	var process_1 = process;

	var setImmediate$2 = {exports: {}};

	var process$2 = process_1;
	try {
	  setImmediate$2.exports = setImmediate;
	} catch (ex) {
	  setImmediate$2.exports = process$2.nextTick;
	}

	var Plumbing = plumbing.exports;
	var hasUnicode = hasUnicode$1.exports;
	var hasColor = hasColor$1;
	var onExit = signalExit.exports;
	var defaultThemes = themes$1.exports;
	var setInterval$1 = setInterval_1;
	var process$1 = process_1;
	var setImmediate$1 = setImmediate$2.exports;

	var lib = Gauge;

	function callWith (obj, method) {
	  return function () {
	    return method.call(obj)
	  }
	}

	function Gauge (arg1, arg2) {
	  var options, writeTo;
	  if (arg1 && arg1.write) {
	    writeTo = arg1;
	    options = arg2 || {};
	  } else if (arg2 && arg2.write) {
	    writeTo = arg2;
	    options = arg1 || {};
	  } else {
	    writeTo = process$1.stderr;
	    options = arg1 || arg2 || {};
	  }

	  this._status = {
	    spun: 0,
	    section: '',
	    subsection: '',
	  };
	  this._paused = false; // are we paused for back pressure?
	  this._disabled = true; // are all progress bar updates disabled?
	  this._showing = false; // do we WANT the progress bar on screen
	  this._onScreen = false; // IS the progress bar on screen
	  this._needsRedraw = false; // should we print something at next tick?
	  this._hideCursor = options.hideCursor == null ? true : options.hideCursor;
	  this._fixedFramerate = options.fixedFramerate == null
	    ? !(/^v0\.8\./.test(process$1.version))
	    : options.fixedFramerate;
	  this._lastUpdateAt = null;
	  this._updateInterval = options.updateInterval == null ? 50 : options.updateInterval;

	  this._themes = options.themes || defaultThemes;
	  this._theme = options.theme;
	  var theme = this._computeTheme(options.theme);
	  var template = options.template || [
	    { type: 'progressbar', length: 20 },
	    { type: 'activityIndicator', kerning: 1, length: 1 },
	    { type: 'section', kerning: 1, default: '' },
	    { type: 'subsection', kerning: 1, default: '' },
	  ];
	  this.setWriteTo(writeTo, options.tty);
	  var PlumbingClass = options.Plumbing || Plumbing;
	  this._gauge = new PlumbingClass(theme, template, this.getWidth());

	  this._$$doRedraw = callWith(this, this._doRedraw);
	  this._$$handleSizeChange = callWith(this, this._handleSizeChange);

	  this._cleanupOnExit = options.cleanupOnExit == null || options.cleanupOnExit;
	  this._removeOnExit = null;

	  if (options.enabled || (options.enabled == null && this._tty && this._tty.isTTY)) {
	    this.enable();
	  } else {
	    this.disable();
	  }
	}
	Gauge.prototype = {};

	Gauge.prototype.isEnabled = function () {
	  return !this._disabled
	};

	Gauge.prototype.setTemplate = function (template) {
	  this._gauge.setTemplate(template);
	  if (this._showing) {
	    this._requestRedraw();
	  }
	};

	Gauge.prototype._computeTheme = function (theme) {
	  if (!theme) {
	    theme = {};
	  }
	  if (typeof theme === 'string') {
	    theme = this._themes.getTheme(theme);
	  } else if (
	    theme &&
	    (Object.keys(theme).length === 0 || theme.hasUnicode != null || theme.hasColor != null)
	  ) {
	    var useUnicode = theme.hasUnicode == null ? hasUnicode() : theme.hasUnicode;
	    var useColor = theme.hasColor == null ? hasColor : theme.hasColor;
	    theme = this._themes.getDefault({
	      hasUnicode: useUnicode,
	      hasColor: useColor,
	      platform: theme.platform,
	    });
	  }
	  return theme
	};

	Gauge.prototype.setThemeset = function (themes) {
	  this._themes = themes;
	  this.setTheme(this._theme);
	};

	Gauge.prototype.setTheme = function (theme) {
	  this._gauge.setTheme(this._computeTheme(theme));
	  if (this._showing) {
	    this._requestRedraw();
	  }
	  this._theme = theme;
	};

	Gauge.prototype._requestRedraw = function () {
	  this._needsRedraw = true;
	  if (!this._fixedFramerate) {
	    this._doRedraw();
	  }
	};

	Gauge.prototype.getWidth = function () {
	  return ((this._tty && this._tty.columns) || 80) - 1
	};

	Gauge.prototype.setWriteTo = function (writeTo, tty) {
	  var enabled = !this._disabled;
	  if (enabled) {
	    this.disable();
	  }
	  this._writeTo = writeTo;
	  this._tty = tty ||
	    (writeTo === process$1.stderr && process$1.stdout.isTTY && process$1.stdout) ||
	    (writeTo.isTTY && writeTo) ||
	    this._tty;
	  if (this._gauge) {
	    this._gauge.setWidth(this.getWidth());
	  }
	  if (enabled) {
	    this.enable();
	  }
	};

	Gauge.prototype.enable = function () {
	  if (!this._disabled) {
	    return
	  }
	  this._disabled = false;
	  if (this._tty) {
	    this._enableEvents();
	  }
	  if (this._showing) {
	    this.show();
	  }
	};

	Gauge.prototype.disable = function () {
	  if (this._disabled) {
	    return
	  }
	  if (this._showing) {
	    this._lastUpdateAt = null;
	    this._showing = false;
	    this._doRedraw();
	    this._showing = true;
	  }
	  this._disabled = true;
	  if (this._tty) {
	    this._disableEvents();
	  }
	};

	Gauge.prototype._enableEvents = function () {
	  if (this._cleanupOnExit) {
	    this._removeOnExit = onExit(callWith(this, this.disable));
	  }
	  this._tty.on('resize', this._$$handleSizeChange);
	  if (this._fixedFramerate) {
	    this.redrawTracker = setInterval$1(this._$$doRedraw, this._updateInterval);
	    if (this.redrawTracker.unref) {
	      this.redrawTracker.unref();
	    }
	  }
	};

	Gauge.prototype._disableEvents = function () {
	  this._tty.removeListener('resize', this._$$handleSizeChange);
	  if (this._fixedFramerate) {
	    clearInterval(this.redrawTracker);
	  }
	  if (this._removeOnExit) {
	    this._removeOnExit();
	  }
	};

	Gauge.prototype.hide = function (cb) {
	  if (this._disabled) {
	    return cb && process$1.nextTick(cb)
	  }
	  if (!this._showing) {
	    return cb && process$1.nextTick(cb)
	  }
	  this._showing = false;
	  this._doRedraw();
	  cb && setImmediate$1(cb);
	};

	Gauge.prototype.show = function (section, completed) {
	  this._showing = true;
	  if (typeof section === 'string') {
	    this._status.section = section;
	  } else if (typeof section === 'object') {
	    var sectionKeys = Object.keys(section);
	    for (var ii = 0; ii < sectionKeys.length; ++ii) {
	      var key = sectionKeys[ii];
	      this._status[key] = section[key];
	    }
	  }
	  if (completed != null) {
	    this._status.completed = completed;
	  }
	  if (this._disabled) {
	    return
	  }
	  this._requestRedraw();
	};

	Gauge.prototype.pulse = function (subsection) {
	  this._status.subsection = subsection || '';
	  this._status.spun++;
	  if (this._disabled) {
	    return
	  }
	  if (!this._showing) {
	    return
	  }
	  this._requestRedraw();
	};

	Gauge.prototype._handleSizeChange = function () {
	  this._gauge.setWidth(this._tty.columns - 1);
	  this._requestRedraw();
	};

	Gauge.prototype._doRedraw = function () {
	  if (this._disabled || this._paused) {
	    return
	  }
	  if (!this._fixedFramerate) {
	    var now = Date.now();
	    if (this._lastUpdateAt && now - this._lastUpdateAt < this._updateInterval) {
	      return
	    }
	    this._lastUpdateAt = now;
	  }
	  if (!this._showing && this._onScreen) {
	    this._onScreen = false;
	    var result = this._gauge.hide();
	    if (this._hideCursor) {
	      result += this._gauge.showCursor();
	    }
	    return this._writeTo.write(result)
	  }
	  if (!this._showing && !this._onScreen) {
	    return
	  }
	  if (this._showing && !this._onScreen) {
	    this._onScreen = true;
	    this._needsRedraw = true;
	    if (this._hideCursor) {
	      this._writeTo.write(this._gauge.hideCursor());
	    }
	  }
	  if (!this._needsRedraw) {
	    return
	  }
	  if (!this._writeTo.write(this._gauge.show(this._status))) {
	    this._paused = true;
	    this._writeTo.on('drain', callWith(this, function () {
	      this._paused = false;
	      this._doRedraw();
	    }));
	  }
	};

	var setBlocking = function (blocking) {
	  [process.stdout, process.stderr].forEach(function (stream) {
	    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
	      stream._handle.setBlocking(blocking);
	    }
	  });
	};

	(function (module, exports) {
	var Progress = lib$1;
	var Gauge = lib;
	var EE = require$$0__default["default"].EventEmitter;
	var log = module.exports = new EE();
	var util = require$$0__default$1["default"];

	var setBlocking$1 = setBlocking;
	var consoleControl = consoleControlStrings;

	setBlocking$1(true);
	var stream = process.stderr;
	Object.defineProperty(log, 'stream', {
	  set: function (newStream) {
	    stream = newStream;
	    if (this.gauge) {
	      this.gauge.setWriteTo(stream, stream);
	    }
	  },
	  get: function () {
	    return stream
	  },
	});

	// by default, decide based on tty-ness.
	var colorEnabled;
	log.useColor = function () {
	  return colorEnabled != null ? colorEnabled : stream.isTTY
	};

	log.enableColor = function () {
	  colorEnabled = true;
	  this.gauge.setTheme({ hasColor: colorEnabled, hasUnicode: unicodeEnabled });
	};
	log.disableColor = function () {
	  colorEnabled = false;
	  this.gauge.setTheme({ hasColor: colorEnabled, hasUnicode: unicodeEnabled });
	};

	// default level
	log.level = 'info';

	log.gauge = new Gauge(stream, {
	  enabled: false, // no progress bars unless asked
	  theme: { hasColor: log.useColor() },
	  template: [
	    { type: 'progressbar', length: 20 },
	    { type: 'activityIndicator', kerning: 1, length: 1 },
	    { type: 'section', default: '' },
	    ':',
	    { type: 'logline', kerning: 1, default: '' },
	  ],
	});

	log.tracker = new Progress.TrackerGroup();

	// we track this separately as we may need to temporarily disable the
	// display of the status bar for our own loggy purposes.
	log.progressEnabled = log.gauge.isEnabled();

	var unicodeEnabled;

	log.enableUnicode = function () {
	  unicodeEnabled = true;
	  this.gauge.setTheme({ hasColor: this.useColor(), hasUnicode: unicodeEnabled });
	};

	log.disableUnicode = function () {
	  unicodeEnabled = false;
	  this.gauge.setTheme({ hasColor: this.useColor(), hasUnicode: unicodeEnabled });
	};

	log.setGaugeThemeset = function (themes) {
	  this.gauge.setThemeset(themes);
	};

	log.setGaugeTemplate = function (template) {
	  this.gauge.setTemplate(template);
	};

	log.enableProgress = function () {
	  if (this.progressEnabled) {
	    return
	  }

	  this.progressEnabled = true;
	  this.tracker.on('change', this.showProgress);
	  if (this._paused) {
	    return
	  }

	  this.gauge.enable();
	};

	log.disableProgress = function () {
	  if (!this.progressEnabled) {
	    return
	  }
	  this.progressEnabled = false;
	  this.tracker.removeListener('change', this.showProgress);
	  this.gauge.disable();
	};

	var trackerConstructors = ['newGroup', 'newItem', 'newStream'];

	var mixinLog = function (tracker) {
	  // mixin the public methods from log into the tracker
	  // (except: conflicts and one's we handle specially)
	  Object.keys(log).forEach(function (P) {
	    if (P[0] === '_') {
	      return
	    }

	    if (trackerConstructors.filter(function (C) {
	      return C === P
	    }).length) {
	      return
	    }

	    if (tracker[P]) {
	      return
	    }

	    if (typeof log[P] !== 'function') {
	      return
	    }

	    var func = log[P];
	    tracker[P] = function () {
	      return func.apply(log, arguments)
	    };
	  });
	  // if the new tracker is a group, make sure any subtrackers get
	  // mixed in too
	  if (tracker instanceof Progress.TrackerGroup) {
	    trackerConstructors.forEach(function (C) {
	      var func = tracker[C];
	      tracker[C] = function () {
	        return mixinLog(func.apply(tracker, arguments))
	      };
	    });
	  }
	  return tracker
	};

	// Add tracker constructors to the top level log object
	trackerConstructors.forEach(function (C) {
	  log[C] = function () {
	    return mixinLog(this.tracker[C].apply(this.tracker, arguments))
	  };
	});

	log.clearProgress = function (cb) {
	  if (!this.progressEnabled) {
	    return cb && process.nextTick(cb)
	  }

	  this.gauge.hide(cb);
	};

	log.showProgress = function (name, completed) {
	  if (!this.progressEnabled) {
	    return
	  }

	  var values = {};
	  if (name) {
	    values.section = name;
	  }

	  var last = log.record[log.record.length - 1];
	  if (last) {
	    values.subsection = last.prefix;
	    var disp = log.disp[last.level] || last.level;
	    var logline = this._format(disp, log.style[last.level]);
	    if (last.prefix) {
	      logline += ' ' + this._format(last.prefix, this.prefixStyle);
	    }

	    logline += ' ' + last.message.split(/\r?\n/)[0];
	    values.logline = logline;
	  }
	  values.completed = completed || this.tracker.completed();
	  this.gauge.show(values);
	}.bind(log); // bind for use in tracker's on-change listener

	// temporarily stop emitting, but don't drop
	log.pause = function () {
	  this._paused = true;
	  if (this.progressEnabled) {
	    this.gauge.disable();
	  }
	};

	log.resume = function () {
	  if (!this._paused) {
	    return
	  }

	  this._paused = false;

	  var b = this._buffer;
	  this._buffer = [];
	  b.forEach(function (m) {
	    this.emitLog(m);
	  }, this);
	  if (this.progressEnabled) {
	    this.gauge.enable();
	  }
	};

	log._buffer = [];

	var id = 0;
	log.record = [];
	log.maxRecordSize = 10000;
	log.log = function (lvl, prefix, message) {
	  var l = this.levels[lvl];
	  if (l === undefined) {
	    return this.emit('error', new Error(util.format(
	      'Undefined log level: %j', lvl)))
	  }

	  var a = new Array(arguments.length - 2);
	  var stack = null;
	  for (var i = 2; i < arguments.length; i++) {
	    var arg = a[i - 2] = arguments[i];

	    // resolve stack traces to a plain string.
	    if (typeof arg === 'object' && arg instanceof Error && arg.stack) {
	      Object.defineProperty(arg, 'stack', {
	        value: stack = arg.stack + '',
	        enumerable: true,
	        writable: true,
	      });
	    }
	  }
	  if (stack) {
	    a.unshift(stack + '\n');
	  }
	  message = util.format.apply(util, a);

	  var m = {
	    id: id++,
	    level: lvl,
	    prefix: String(prefix || ''),
	    message: message,
	    messageRaw: a,
	  };

	  this.emit('log', m);
	  this.emit('log.' + lvl, m);
	  if (m.prefix) {
	    this.emit(m.prefix, m);
	  }

	  this.record.push(m);
	  var mrs = this.maxRecordSize;
	  var n = this.record.length - mrs;
	  if (n > mrs / 10) {
	    var newSize = Math.floor(mrs * 0.9);
	    this.record = this.record.slice(-1 * newSize);
	  }

	  this.emitLog(m);
	}.bind(log);

	log.emitLog = function (m) {
	  if (this._paused) {
	    this._buffer.push(m);
	    return
	  }
	  if (this.progressEnabled) {
	    this.gauge.pulse(m.prefix);
	  }

	  var l = this.levels[m.level];
	  if (l === undefined) {
	    return
	  }

	  if (l < this.levels[this.level]) {
	    return
	  }

	  if (l > 0 && !isFinite(l)) {
	    return
	  }

	  // If 'disp' is null or undefined, use the lvl as a default
	  // Allows: '', 0 as valid disp
	  var disp = log.disp[m.level] != null ? log.disp[m.level] : m.level;
	  this.clearProgress();
	  m.message.split(/\r?\n/).forEach(function (line) {
	    if (this.heading) {
	      this.write(this.heading, this.headingStyle);
	      this.write(' ');
	    }
	    this.write(disp, log.style[m.level]);
	    var p = m.prefix || '';
	    if (p) {
	      this.write(' ');
	    }

	    this.write(p, this.prefixStyle);
	    this.write(' ' + line + '\n');
	  }, this);
	  this.showProgress();
	};

	log._format = function (msg, style) {
	  if (!stream) {
	    return
	  }

	  var output = '';
	  if (this.useColor()) {
	    style = style || {};
	    var settings = [];
	    if (style.fg) {
	      settings.push(style.fg);
	    }

	    if (style.bg) {
	      settings.push('bg' + style.bg[0].toUpperCase() + style.bg.slice(1));
	    }

	    if (style.bold) {
	      settings.push('bold');
	    }

	    if (style.underline) {
	      settings.push('underline');
	    }

	    if (style.inverse) {
	      settings.push('inverse');
	    }

	    if (settings.length) {
	      output += consoleControl.color(settings);
	    }

	    if (style.beep) {
	      output += consoleControl.beep();
	    }
	  }
	  output += msg;
	  if (this.useColor()) {
	    output += consoleControl.color('reset');
	  }

	  return output
	};

	log.write = function (msg, style) {
	  if (!stream) {
	    return
	  }

	  stream.write(this._format(msg, style));
	};

	log.addLevel = function (lvl, n, style, disp) {
	  // If 'disp' is null or undefined, use the lvl as a default
	  if (disp == null) {
	    disp = lvl;
	  }

	  this.levels[lvl] = n;
	  this.style[lvl] = style;
	  if (!this[lvl]) {
	    this[lvl] = function () {
	      var a = new Array(arguments.length + 1);
	      a[0] = lvl;
	      for (var i = 0; i < arguments.length; i++) {
	        a[i + 1] = arguments[i];
	      }

	      return this.log.apply(this, a)
	    }.bind(this);
	  }
	  this.disp[lvl] = disp;
	};

	log.prefixStyle = { fg: 'magenta' };
	log.headingStyle = { fg: 'white', bg: 'black' };

	log.style = {};
	log.levels = {};
	log.disp = {};
	log.addLevel('silly', -Infinity, { inverse: true }, 'sill');
	log.addLevel('verbose', 1000, { fg: 'blue', bg: 'black' }, 'verb');
	log.addLevel('info', 2000, { fg: 'green' });
	log.addLevel('timing', 2500, { fg: 'green', bg: 'black' });
	log.addLevel('http', 3000, { fg: 'green', bg: 'black' });
	log.addLevel('notice', 3500, { fg: 'blue', bg: 'black' });
	log.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, 'WARN');
	log.addLevel('error', 5000, { fg: 'red', bg: 'black' }, 'ERR!');
	log.addLevel('silent', Infinity);

	// allow 'error' prefix
	log.on('error', function () {});
	}(log$1));

	var log = log$1.exports;

	log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
	log.heading = 'js-cli';
	log.addLevel('success', 2000, { fg: 'green', bold: true });

	exports.log = log;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
