"use strict";

/**
* extend js扩展函数
* limeng_bj@lakala.com
* 2019-06-11
*
* deleteCharAt(index)         |   删除指定索引位置的字符，索引无效将不删除任何字符
* deleteString(start, end)    |   删除指定索引区间的字符串
* equal(str)                  |   比较两个字符串是否相等，不区分大小写
* insert(ofset, subStr)       |   将指定的字符串插入到指定的位置后面，索引无效将直接追加到字符串的末尾
* resetBlank                  |   合并多个空白为一个空白
* reserve                     |   将字符串反序排列
* setCharAt(index, subStr)    |   将指定的位置的字符设置为另外指定的字符或字符串.索引无效将直接返回不做任何处理
* charLength                  |   计算长度，每个汉字占两个长度，英文字符每个占一个长度
* left(n)                     |   从左截取指定长度的字串
* right(n)                    |   从右截取指定长度的字串
* Occurs(str)                 |   统计指定字符出现的次数
* isDigit                     |   检查是否由数字组成
* isInt                       |   测试是否是整数
* isAlpha                     |   检查是否由数字字母和下划线组成
* isNumber                    |   检查是否为数
* isInChinese                 |   检查是否包含汉字
* isInList                    |   检查是否有列表中的字符字符
* GetNum                      |   保留数字
* GetCN                       |   保留中文
* getEn                       |   保留字母
* ToInt                       |   String转化为Number
* isEmail                     |   判断是否为邮箱地址
* isIdCard                    |   判断是否为身份证号
* isUrl                       |   判断是否为URL地址
* isPhoneNum                  |   判断是否为手机号
* isContainsSpecialChar       |   判断是否包含中英文特殊字符，除英文"-_"字符外
* escapeHTML                  |   html特殊字符转码
* LenWithZero                 |   数字补零
* ChrW                        |   Unicode还原
* moneyFormat                 |   数字千分位加','并保留两位小数
* accAdd                      |   加法运算
* accSub                      |   减法运算
* accMul                      |   乘法运算
* accDiv                      |   除法运算
* getMax                      |   获得数字数组中最大项
* getMin                      |   获得数字数组中最小项
* getSum                      |   求和
* extend                      |   合并对象
* IsNullOrEmpty               |   检测是否为空
* defineProperty              |   在一个对象上定义新的属性或修改现有属性。
* getCNDate                   |   获取当前时间的中文形式
* format                      |   Date 转化为指定格式的String
* formatPassTime              |   格式化开始时间距现在的已过时间
* formatRemainTime            |   格式化现在距结束的剩余时间
* 
*/

var S = String.prototype,
    N = Number.prototype,
    A = Array.prototype,
    O = Object.prototype,
    D = Date.prototype;

// 删除指定索引位置的字符，索引无效将不删除任何字符
S.deleteCharAt = function (index) {
    if (index < 0 || index >= this.length) {
        return this.valueOf();
    } else if (index == 0) {
        return this.substring(1, this.length);
    } else if (index == this.length - 1) {
        return this.substring(0, this.length - 1);
    } else {
        return this.substring(0, index) + this.substring(index + 1);
    }
};

// 删除指定索引区间的字符串
S.deleteString = function (start, end) {
    if (start == end) {
        return this.deleteCharAt(start);
    } else {
        if (start > end) {
            var temp = start;
            start = end;
            end = temp;
        }
        if (start < 0) {
            start = 0;
        }
        if (end > this.length - 1) {
            end = this.length - 1;
        }
        return this.substring(0, start) + this.substring(end + 1, this.length);
    }
};

// 比较两个字符串是否相等，不区分大小写
S.equal = function (str) {
    return this.toLowerCase() == str.toLowerCase();
};

// 将指定的字符串插入到指定的位置后面，索引无效将直接追加到字符串的末尾
S.insert = function (ofset, subStr) {
    if (ofset < 0 || ofset >= this.length - 1) {
        return this.concat(subStr);
    }
    return this.substring(0, ofset + 1) + subStr + this.substring(ofset + 1);
};

// 合并多个空白为一个空白
S.resetBlank = function () {
    return this.replace(/s+/g, " ");
};

// 将字符串反序排列
S.reserve = function () {
    var temp = "",
        i = this.length - 1;
    for (; i >= 0; i--) {
        temp = temp.concat(this.charAt(i));
    }
    return temp;
};

// 将指定的位置的字符设置为另外指定的字符或字符串.索引无效将直接返回不做任何处理
S.setCharAt = function (index, subStr) {
    if (index < 0 || index > this.length - 1) {
        return this.valueOf();
    }
    return this.substring(0, index) + subStr + this.substring(index + 1);
};

// 计算长度，每个汉字占两个长度，英文字符每个占一个长度
S.charLength = function () {
    var temp = i = 0,
        len = this.length;
    for (; i < len; i++) {
        if (this.charCodeAt(i) > 255) {
            temp += 2;
        } else {
            temp += 1;
        }
    }
    return temp;
};

// 从左截取指定长度的字串
S.left = function (n) {
    return this.slice(0, n);
};

// 从右截取指定长度的字串
S.right = function (n) {
    return this.slice(this.length - n);
};

// 统计指定字符出现的次数
S.Occurs = function (str) {
    return this.split(str).length - 1;
};

// 检查是否由数字组成
S.isDigit = function () {
    var s = this.trim();
    return s.replace(/\d/g, "").length == 0;
};

// 测试是否是整数
S.isInt = function () {
    if (this == "NaN") return false;
    return this == parseInt(this).toString();
};

// 检查是否由数字字母和下划线组成
S.isAlpha = function () {
    return this.replace(/\w/g, "").length == 0;
};

// 检查是否为数
S.isNumber = function () {
    var s = this.trim();
    return s.search(/^[+-]?[0-9.]*$/) >= 0;
};

// 检查是否包含汉字
S.isInChinese = function () {
    return this.length != this.replace(/[^\x00-\xff]/g, "**").length;
};

// 检查是否有列表中的字符字符
S.isInList = function (list) {
    var re = eval("/[" + list + "]/");
    return re.test(this);
};

// 保留数字
S.GetNum = function () {
    return this.replace(/[^\d]/g, '');
};

// 保留中文
S.GetCN = function () {
    return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g, '');
};

// 保留字母
S.getEn = function () {
    return this.replace(/[^A-Za-z]/g, '');
};

// String转化为Number
S.ToInt = function () {
    return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
};

// 判断是否为邮箱地址
S.isEmail = function () {
    return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this)
    );
};

// 判断是否为身份证号
S.isIdCard = function () {
    return (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(this)
    );
};

// 判断是否为URL地址
S.isUrl = function () {
    return (/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(this)
    );
};

// 判断是否为URL地址
/*S.isUrl = function() {
    if (/<\/?[^>]*>/g.test(this))
        return false;

    var regex = '^' +
        '(((https|http|ftp|rtsp|mms):)?//)?' +
        '(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' +
        '(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*\'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})?' +
        '(:[0-9]{1,4})?' +
        '([^\?#]+)?' +
        '(\\\?[^#]+)?' +
        '(#.+)?' +
        '$';
    return new RegExp(regex).test(this);
}*/

// 判断是否为手机号
S.isPhoneNum = function () {
    return (/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this)
    );
};

// 判断是否包含中英文特殊字符，除英文"-_"字符外
S.isContainsSpecialChar = function () {
    if (this == null || this == "") return false;
    var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
    return reg.test(this);
};

// html特殊字符转码
S.escapeHTML = function () {
    return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/"/g, "&#34;").replace(/'/g, "&#39;");
};

// 数字补零
N.LenWithZero = function (oCount) {
    var strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
};

// Unicode还原
N.ChrW = function () {
    return String.fromCharCode(this);
};

// 数字千分位加','并保留两位小数
N.moneyFormat = function () {
    // return (this+"").replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    return (this.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

// 加法运算
N.accAdd = function (num) {
    var r1 = void 0,
        r2 = void 0,
        m = void 0;
    try {
        r1 = this.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return Math.round(this * m + num * m) / m;
};

// 减法运算
N.accSub = function (num) {
    var r1 = void 0,
        r2 = void 0,
        m = void 0,
        n = void 0;
    try {
        r1 = this.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return (Math.round(this * m - num * m) / m).toFixed(n);
};

// 乘法运算
N.accMul = function (num) {
    var m = 0,
        s1 = this.toString(),
        s2 = num.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {};
    try {
        m += s2.split(".")[1].length;
    } catch (e) {};
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};

// 除法运算
N.accDiv = function (num) {
    var t1 = void 0,
        t2 = void 0,
        r1 = void 0,
        r2 = void 0;
    try {
        t1 = this.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    r1 = Number(this.toString().replace(".", ""));
    r2 = Number(num.toString().replace(".", ""));
    return r1 / r2 * Math.pow(10, t2 - t1);
};

// 获得数字数组中最大项
A.getMax = function () {
    return this.sort(function (a, b) {
        return b - a;
    })[0];
};

// 获得数字数组中最小项
A.getMin = function () {
    return this.sort(function (a, b) {
        return a - b;
    })[0];
};

// 求和
A.getSum = function () {
    var sum = i = 0,
        len = this.length;
    for (; i < len; i++) {
        sum = sum.accAdd(i);
    }
    return sum;
};

//合并对象
O.extend = function (obj) {
    return Object.assign(this, obj);
};

// 检测是否为空
O.isNullOrEmpty = function () {
    var obj = this,
        flag = false;
    if (obj == null || obj == undefined || typeof obj == 'undefined' || obj == '') {
        flag = true;
    } else if (typeof obj == 'string') {
        obj = obj.trim();
        if (obj == '') {
            //为空
            flag = true;
        } else {
            //不为空
            obj = obj.toUpperCase();
            if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {
                flag = true;
            }
        }
    } else {
        flag = false;
    }
    return flag;
};

/**
 * 在一个对象上定义新的属性或修改现有属性。
 * value:           设置属性的值
 * writable:        值是否可以重写。                                true | false
 * enumerable:      目标属性是否可以被枚举。                        true | false
 * configurable:    目标属性是否可以被删除或是否可以再次修改特性    true | false
 * deep             设置层级 默认0
 */
O.defineProperty = function (obj, deep) {
    var _o = obj || {},
        i = deep || 0,
        key = void 0;

    for (key in this) {
        if (this.hasOwnProperty(key)) {
            Object.defineProperty(this, key, {
                configurable: _o.configurable || false,
                enumerable: _o.enumerable === false ? false : true,
                writable: _o.writable || false,
                value: this[key]
            });

            if (i && O.toString.call(this[key]) === '[object Object]') {
                this[key].defineProperty(_o, --i);
            }
        }
    }
};

O.defineProperty({
    enumerable: false
});

// 获取当前时间的中文形式
D.getCNDate = function () {
    var oDateText = '';
    oDateText += this.getFullYear().LenWithZero(4) + "\u5E74";
    oDateText += this.getMonth().LenWithZero(2) + "\u6708";
    oDateText += this.getDate().LenWithZero(2) + "\u65E5";
    oDateText += this.getHours().LenWithZero(2) + "\u65F6";
    oDateText += this.getMinutes().LenWithZero(2) + "\u5206";
    oDateText += this.getSeconds().LenWithZero(2) + "\u79D2";
    oDateText += "  \u661F\u671F" + new String("\u65E5\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D").substr(this.getDay(), 1);
    return oDateText;
};

/**
 * Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)可以用 1-2 个占位符<br>
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * @param {string} date
 * @param {string} fmt
 * @returns {string}
 * @example
 *
 * formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss.S');
 * // => 2006-07-02 08:09:04.423
 *
 * formatDate(Date.now(), 'yyyy-MM-dd E HH:mm:ss');
 * // => 2009-03-10 二 20:09:04
 *
 * formatDate(Date.now(), 'yyyy-MM-dd EE hh:mm:ss');
 * // => 2009-03-10 周二 08:09:04
 *
 * formatDate(Date.now(), 'yyyy-MM-dd EEE hh:mm:ss');
 * // => 2009-03-10 星期二 08:09:04
 *
 * formatDate(Date.now(), 'yyyy-M-d h:m:s.S')
 * // => 2006-7-2 8:9:4.18
 */
// 扩展Date格式化
D.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //月份     
        "d+": this.getDate(), //日     
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时     
        "H+": this.getHours(), //小时     
        "m+": this.getMinutes(), //分     
        "s+": this.getSeconds(), //秒     
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度     
        "S": this.getMilliseconds() //毫秒     
    },
        week = {
        "0": "\u65E5",
        "1": "\u4E00",
        "2": "\u4E8C",
        "3": "\u4E09",
        "4": "\u56DB",
        "5": "\u4E94",
        "6": "\u516D"
    },
        fmt = 'yyyy-MM-dd HH:mm:ss' || format;
    if (/(y+)/.test(format)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "\u661F\u671F" : "\u5468" : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
};

// 格式化开始时间距现在的已过时间
D.formatPassTime = function () {
    var time = Date.now() - this,
        day = Math.floor(time / (1000 * 60 * 60 * 24)),
        hour = Math.floor(time / (1000 * 60 * 60)),
        min = Math.floor(time / (1000 * 60)),
        month = Math.floor(day / 30),
        year = Math.floor(month / 12);
    if (year) return year + "\u5E74\u524D";
    if (month) return month + "\u4E2A\u6708\u524D";
    if (day) return day + "\u5929\u524D";
    if (hour) return hour + "\u5C0F\u65F6\u524D";
    if (min) return min + "\u5206\u949F\u524D";else return "\u521A\u521A";
};

// 格式化现在距结束的剩余时间 type:1/2/3/4
/**
 * [formatRemainTime 格式化现在距结束的剩余时间]
 * @param  {[type]} times [时间戳]
 * @param  {[type]} type  [类型1/2/3/4]
 * @param  {[type]} 1     [00:00:00:00/00:00:00]
 * @param  {[type]} 2     [00天00小时00分钟00秒/00小时00分钟00秒]
 * @param  {[type]} 3     [00天00小时00分钟00秒/00分钟00秒]
 * @param  {[type]} 4     [00:00:00:00/00:00]
 */
D.formatRemainTime = function (times, type) {
    var t = times || this - Date.now(),
        //时间差
    d = h = m = s = 0,
        _type = type || 1;

    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24).LenWithZero(2);
        m = Math.floor(t / 1000 / 60 % 60).LenWithZero(2);
        s = Math.floor(t / 1000 % 60).LenWithZero(2);
    }

    switch (_type) {
        case 1:
            return (d ? d + ":" : "") + h + ":" + m + ":" + s;
            break;
        case 2:
            return (d ? d + "\u5929" : "") + h + "\u65F6" + m + "\u5206" + s + "\u79D2";
            break;
        case 3:
            if (d) {
                return d + "\u5929" + h + "\u65F6" + m + "\u5206" + s + "\u79D2";
            } else if (+h) {
                return h + "\u65F6" + m + "\u5206" + s + "\u79D2";
            } else if (+m) {
                return m + "\u5206" + s + "\u79D2";
            } else {
                return s + "\u79D2";
            }
            break;
        case 4:
            if (d) {
                return d + ":" + h + ":" + m + ":" + s;
            } else if (+h) {
                return h + ":" + m + ":" + s;
            } else if (+m) {
                return m + ":" + s;
            } else {
                return s;
            }
            break;
        default:
            break;
    }
};
'use strict';

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
* 
*/
var L = {
    version: 1.0,
    // system: {
    //     ua: navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || 'pc',
    //     os: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? 'ios' : 'android'
    // },
    base64_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
};

// 设置属性不可修改
L.defineProperty(null, 1);

/**
 * [getType 数据类型判断]
 * @param  {[all]} e [description]
 * @return {[Object|String|Number|Boolean|Undefined|Null|Function|Array|Date|RegExp]}
 */
L.getType = function (e) {
    return O.toString.call(e).replace(/\[object |\]/g, '').toLocaleLowerCase();
};

// isObject
L.isObject = function (e) {
    return this.getType(e) === 'object';
};

// isArray
L.isArray = function (e) {
    return this.getType(e) === 'array';
};

// isFunction
L.isFunction = function (e) {
    return this.getType(e) === 'function';
};

// isString
L.isString = function (e) {
    return this.getType(e) === 'string';
};

// isNumber
L.isNumber = function (e) {
    return this.getType(e) === 'number';
};

// isDate
L.isDate = function (e) {
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
L.countDown = function (obj) {
    var _this = this;

    var _obj = Object.assign({
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
        };
        setTimeout(function () {
            _obj.count++;
            _obj.times -= _obj.interval;
            _this.countDown(_obj);
        }, nextTime);
    }
};

// 本地存储
L.setStorage = function (obj) {
    var _val = '',
        temp = '';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp = obj[key];
            _val = this.isObject(temp) || this.isArray(temp) ? JSON.stringify(temp) : String(temp);
            localStorage.setItem(key, _val);
        }
    }
};

// 获取本地数据 return object
L.getStorage = function (arr) {
    var obj = {},
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
L.clearStorage = function (arr) {
    for (var i = 0, _len = arr.length; i < _len; i++) {
        localStorage.removeItem(arr[i]);
    }
};

// img2base64
L.img2base64 = function (imgUrl, fn) {
    var xhr = new XMLHttpRequest();

    xhr.open("get", imgUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            var blob = this.response,
                oFileReader = new FileReader();
            oFileReader.onloadend = function (e) {
                typeof fn == 'function' && fn(e.target.result);
            };
            oFileReader.readAsDataURL(blob);
        }
    };
    xhr.send();
};

// 字符串转base64
L.base64_encode = function (input) {
    var output = "",
        chr1 = void 0,
        chr2 = void 0,
        chr3 = void 0,
        enc1 = void 0,
        enc2 = void 0,
        enc3 = void 0,
        enc4 = void 0,
        i = len = 0;

    input = this.utf8_encode(input);
    len = input.length;
    while (i < len) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
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
L.base64_decode = function (input) {
    var output = "",
        chr1 = void 0,
        chr2 = void 0,
        chr3 = void 0,
        enc1 = void 0,
        enc2 = void 0,
        enc3 = void 0,
        enc4 = void 0,
        i = len = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    len = input.length;
    while (i < len) {
        enc1 = this.base64_keyStr.indexOf(input.charAt(i++));
        enc2 = this.base64_keyStr.indexOf(input.charAt(i++));
        enc3 = this.base64_keyStr.indexOf(input.charAt(i++));
        enc4 = this.base64_keyStr.indexOf(input.charAt(i++));

        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;

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
L.utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "",
        len = string.length,
        n = 0;

    for (; n < len; n++) {
        var _c = string.charCodeAt(n);
        if (_c < 128) {
            utftext += String.fromCharCode(_c);
        } else if (_c > 127 && _c < 2048) {
            utftext += String.fromCharCode(_c >> 6 | 192);
            utftext += String.fromCharCode(_c & 63 | 128);
        } else {
            utftext += String.fromCharCode(_c >> 12 | 224);
            utftext += String.fromCharCode(_c >> 6 & 63 | 128);
            utftext += String.fromCharCode(_c & 63 | 128);
        }
    }

    return utftext;
};

// utf8 解码
L.utf8_decode = function (utftext) {
    var string = "",
        i = c = c1 = c2 = 0,
        len = utftext.length;

    while (i < len) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
        }
    }

    return string;
};

//
