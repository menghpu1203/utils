/**
 * utils js扩展函数
 * limeng_bj@lakala.com
 * 2019-06-25
 *
 * getType                     |   数据类型判断
 * isObject                    |   isObject 
 * isArray                     |   isArray 
 * isFunction                  |   isFunction 
 * isString                    |   isString 
 * isNumber                    |   isNumber 
 * isDate                      |   isDate 
 * countDown                   |   计时器
 * setStorage                  |   本地存储
 * getStorage                  |   获取本地数据
 * clearStorage                |   删除本地数据
 * img2base64                  |   img2base64
 * base64_encode               |   字符串转base64
 * base64_decode               |   base64解码
 * utf8_encode                 |   utf8 转码
 * utf8_decode                 |   utf8 解码
 * getNewURL                   |   url处理
 * throttle                    |   节流函数
 * debounce                    |   防抖函数
 * 
 */
var L = {
    version: 1.0,
    system: {
        ua: navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || 'pc',
        os: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? 'ios' : 'android'
    },
    base64_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
};

// 设置属性不可修改
L.defineProperty(null, 1);

/**
 * [getType 数据类型判断]
 * @param  {[all]} e [description]
 * @return {[Object|String|Number|Boolean|Undefined|Null|Function|Array|Date|RegExp]}
 */
L.getType = function(e) {
    return O.toString.call(e).replace(/\[object |\]/g, '').toLocaleLowerCase();
};

// isObject
L.isObject = function(e) {
    return this.getType(e) === 'object';
};

// isArray
L.isArray = function(e) {
    return this.getType(e) === 'array';
};

// isFunction
L.isFunction = function(e) {
    return this.getType(e) === 'function';
};

// isString
L.isString = function(e) {
    return this.getType(e) === 'string';
};

// isNumber
L.isNumber = function(e) {
    return this.getType(e) === 'number';
};

// isDate
L.isDate = function(e) {
    return this.getType(e) === 'date';
};

/**
 * [countDown 计时器]
 * @param  {Function}               callback    [回调函数]
 * @param  {Number|Date|String}     endTime     [结束时间]
 * @param  {Number}                 times       [距离结束时间间隔,默认1分钟]
 * @param  {Number}                 interval    [间隔时间]
 * @param  {Number}                 count       [计数]
 * @param  {Number}                 timeType    [返回时间格式 参考formatRemainTime]
 * @return {Object}            
 * @return {Number}                 times       [剩余时间ms]
 * @return {Number}                 count       [执行次数]
 * @return {String}                 formatRemainTime       [格式剩余时间]
 */
L.countDown = function(obj) {
    let _obj = Object.assign({
            endTime: 0,
            times: 60 * 1000,
            interval: 1000,
            count: 0,
            beginTime: Date.now(),
            formatRemainTime: '',
            timeType: 4
        }, obj),
        offset = 0,
        nextTime = _obj.interval;

    if (!_obj.count && _obj.endTime) {
        if (new Date(_obj.endTime) == 'Invalid Date') {
            return 'Invalid endTime';
        }
        _obj.times = new Date(_obj.endTime).getTime() - _obj.beginTime;
    }

    if (_obj.count && this.isFunction(_obj.callback)) {
        //格式剩余时间
        _obj.formatRemainTime = new Date().formatRemainTime(_obj.times, _obj.timeType);
        _obj.callback({
            times: _obj.times,
            count: _obj.count,
            formatRemainTime: _obj.formatRemainTime
        });
    }

    if (_obj.times > 0) {
        offset = Date.now() - (_obj.beginTime + _obj.count * 1000); //误差
        nextTime = _obj.interval - offset; //修正误差
        if (nextTime < 0) {
            nextTime = 0;
        }
        setTimeout(() => {
            _obj.count++;
            _obj.times -= _obj.interval;
            this.countDown(_obj);
        }, nextTime);
    }
};

// 本地存储
L.setStorage = function(obj) {
    let _val = '',
        temp = '';
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp = obj[key];
            _val = this.isObject(temp) || this.isArray(temp) ? JSON.stringify(temp) : String(temp);
            localStorage.setItem(key, _val);
        }
    }
};

// 获取本地数据 return object
L.getStorage = function(arr) {
    let obj = {},
        i = 0,
        temp = '',
        len = arr.length;

    if (this.isString(arr)) {
        return localStorage.getItem(arr);
    } else if (this.isArray(arr)) {
        for (; i < len; i++) {
            temp = localStorage.getItem(arr[i]);

            if (temp.startsWith('function')) {
                eval('obj.' + arr[i] + '=' + temp);
            } else if (temp.startsWith('{') && temp.endsWith('}') || temp.startsWith('[') && temp.endsWith(']')) {
                obj[arr[i]] = JSON.parse(temp);
            }
        }
        return obj;
    }
};

// 删除本地数据
L.clearStorage = function(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        localStorage.removeItem(arr[i]);
    }
};

// img2base64
L.img2base64 = function(imgUrl, fn) {
    let xhr = new XMLHttpRequest();

    xhr.open("get", imgUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (this.status == 200) {
            let blob = this.response,
                oFileReader = new FileReader();  
            oFileReader.onloadend = function(e) {
                typeof fn == 'function' && fn(e.target.result);
            };
            oFileReader.readAsDataURL(blob);
        }
    };
    xhr.send();
};

// 字符串转base64
L.base64_encode = function(input) {
    let output = "",
        chr1, chr2, chr3, enc1, enc2, enc3, enc4,
        i = len = 0;

    input = this.utf8_encode(input);
    len = input.length;
    while (i < len) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + this.base64_keyStr.charAt(enc1) + this.base64_keyStr.charAt(enc2) + this.base64_keyStr.charAt(enc3) + this.base64_keyStr.charAt(enc4);
    }

    return output;
};

// base64解码
L.base64_decode = function(input) {
    let output = "",
        chr1, chr2, chr3, enc1, enc2, enc3, enc4,
        i = len = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    len = input.length;
    while (i < len) {
        enc1 = this.base64_keyStr.indexOf(input.charAt(i++));
        enc2 = this.base64_keyStr.indexOf(input.charAt(i++));
        enc3 = this.base64_keyStr.indexOf(input.charAt(i++));
        enc4 = this.base64_keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = this.utf8_decode(output);

    return output;

};

// utf8 转码
L.utf8_encode = function(string) {
    string = string.replace(/\r\n/g, "\n");
    let utftext = "",
        len = string.length,
        n = 0;

    for (; n < len; n++) {
        let c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }

    return utftext;
};

// utf8 解码
L.utf8_decode = function(utftext) {
    let string = "",
        i = c = c1 = c2 = 0,
        len = utftext.length;

    while (i < len) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return string;
};

/**
 * [getNewURL url处理 要不要转码]
 * @param  {[string]}     url         [URL]
 * @param  {[object]}     obj         [参数]
 * @return {[string]}                 [新的URL]
 */
L.getNewURL = function(url, obj) {
    let nUrl = url,
        key, reg, _val;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            _val = obj[key];
            _val = key + '=' + (this.isObject(_val) ? JSON.stringify(_val) : _val);

            if (nUrl.isInList(key+'=')) {
                reg = eval('/(' + key + '=)([^&]*)/gi');
                nUrl = nUrl.replace(reg, _val);
            } else {
                nUrl += (nUrl.indexOf('?') == -1 ? '?' : '&') + _val;
            }
        }
    }
    return nUrl;
};

/**
 * [throttle 函数节流]
 * @param  {Function}            fn                   [要执行的函数]
 * @param  {[number]}            wait                 [延迟执行毫秒数]
 * @param  {[Boolean]}           type                 [false 立即执行，true 延迟执行]
 */
L.throttle = function(fn, wait, type) {
    let before = 0,
        _wait = wait || 500,
        timer = null;

    return function() {
        if (type) {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    fn();
                }, _wait);
            }
        } else {
            let now = Date.now();

            if (now - before > _wait) {
                fn();
                before = now;
            }
        }
    };
};

/**
 * [debounce 函数防抖]
 * @param  {Function}              fn               [要执行的函数]
 * @param  {[number]}              wait             [延迟执行毫秒数]
 * @param  {[Boolean]}             type             [false 立即执行，true 延迟执行]
 */
L.debounce = function(fn, wait, type) {
    let timer = null,
        _wait = wait || 500;

    return () => {
        timer && clearTimeout(timer);
        if (type) {
            timer = setTimeout(() => {
                fn();
            }, _wait);
        } else {
            if (!timer) fn();
            timer = setTimeout(() => {
                timer = null;
            }, _wait);
        }
    };
};
