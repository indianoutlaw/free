

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mixdrop = function () {
    function Mixdrop(props) {
        _classCallCheck(this, Mixdrop);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Mixdrop, [{
        key: 'checkLive',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                var httpRequest, html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(url.indexOf('http://') != 0 && url.indexOf('https://') != 0)) {
                                    _context.next = 2;
                                    break;
                                }

                                throw new Error('NOT_FOUND');

                            case 2:
                                httpRequest = this.libs.httpRequest;
                                _context.prev = 3;
                                _context.next = 6;
                                return httpRequest.getHTML(url);

                            case 6:
                                html = _context.sent;
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](3);
                                throw new Error('NOT_FOUND');

                            case 12:
                                return _context.abrupt('return', html);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 9]]);
            }));

            function checkLive(_x) {
                return _ref.apply(this, arguments);
            }

            return checkLive;
        }()
    }, {
        key: 'getLink',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                var _libs, httpRequest, cheerio, results, html, m, MDCore, u, isDie, s;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(url.search('https://') == -1 && url.search('http://') == -1)) {
                                    _context2.next = 2;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 2:

                                url = url.replace('/f/', '/e/');

                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                results = [];
                                _context2.next = 7;
                                return this.checkLive(url);

                            case 7:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 10;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 10:
                                m = html.split('eval(')[1];

                                m = m.split('</script>')[0];
                                m = 'eval(' + m;
                                MDCore = {};
                                _context2.prev = 14;

                                eval(m);
                                u = MDCore.vsrc.indexOf('http') == -1 ? 'https:' + MDCore.vsrc : MDCore.vsrc;
                                _context2.next = 19;
                                return httpRequest.isLinkDie(u);

                            case 19:
                                isDie = _context2.sent;

                                if (u.indexOf('http') === 0) {
                                    s = {
                                        label: "NOR",
                                        file: u,
                                        type: "direct",
                                        size: isDie ? isDie : "NOR"
                                    };

                                    results.push(s);
                                }
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Mixdrop"
                                    },
                                    result: results
                                });

                            case 24:
                                _context2.prev = 24;
                                _context2.t0 = _context2['catch'](14);
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Mixdrop"
                                    },
                                    result: []
                                });

                            case 27:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[14, 24]]);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Mixdrop;
}();

thisSource.function = function (libs, settings) {
    return new Mixdrop({ libs: libs, settings: settings });
};