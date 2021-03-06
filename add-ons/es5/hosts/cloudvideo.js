

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cloudvideo = function () {
    function Cloudvideo(props) {
        _classCallCheck(this, Cloudvideo);

        this.libs = props.libs;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Cloudvideo, [{
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
                var _libs, httpRequest, cheerio, results, html, m, op, id, fname, hash, posts, $, u, isDie, s;

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
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio;
                                results = [];
                                _context2.next = 6;
                                return this.checkLive(url);

                            case 6:
                                html = _context2.sent;

                                if (!(html == false)) {
                                    _context2.next = 9;
                                    break;
                                }

                                throw new Error("LINK DIE");

                            case 9:
                                m = html.match(/name="op" value="([^"]+)/);
                                op = m[1];

                                m = html.match(/name="id" value="([^"]+)/);
                                id = m[1];

                                m = html.match(/name="fname" value="([^"]+)/);
                                fname = m[1];

                                m = html.match(/name="hash" value="([^"]+)/);
                                hash = m[1];
                                posts = {
                                    op: 'download1',
                                    usr_login: '',
                                    id: id,
                                    fname: fname,
                                    referer: '',
                                    hash: hash,
                                    imhuman: 'Proceed to video'
                                };
                                _context2.next = 20;
                                return httpRequest.post(url, {}, posts);

                            case 20:
                                html = _context2.sent;
                                $ = cheerio.load(html.data);
                                u = $('source').attr('src');
                                _context2.next = 25;
                                return httpRequest.isLinkDie(u);

                            case 25:
                                isDie = _context2.sent;

                                if (!(u.indexOf('http') !== 0)) {
                                    _context2.next = 28;
                                    break;
                                }

                                throw new Error('Invalid link');

                            case 28:
                                s = {
                                    label: "NOR",
                                    file: u,
                                    type: "direct",
                                    size: isDie ? isDie : "NOR"
                                };

                                results.push(s);
                                return _context2.abrupt('return', {
                                    host: {
                                        url: url,
                                        name: "Cloudvideo"
                                    },
                                    result: results
                                });

                            case 31:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLink(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getLink;
        }()
    }]);

    return Cloudvideo;
}();

thisSource.function = function (libs, settings) {
    return new Cloudvideo({ libs: libs, settings: settings });
};