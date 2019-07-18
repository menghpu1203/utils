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
S.deleteCharAt = function(index) {
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
S.deleteString = function(start, end) {
    if (start == end) {
        return this.deleteCharAt(start);
    } else {
        if (start > end) {
            let temp = start;
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
S.equal = function(str) {
    return this.toLowerCase() == str.toLowerCase();
};

// 将指定的字符串插入到指定的位置后面，索引无效将直接追加到字符串的末尾
S.insert = function(ofset, subStr) {
    if (ofset < 0 || ofset >= this.length - 1) {
        return this.concat(subStr);
    }
    return this.substring(0, ofset + 1) + subStr + this.substring(ofset + 1);
};

// 合并多个空白为一个空白
S.resetBlank = function() {
    return this.replace(/s+/g, " ");
};

// 将字符串反序排列
S.reserve = function() {
    let temp = "",
        i = this.length - 1;
    for (; i >= 0; i--) {
        temp = temp.concat(this.charAt(i));
    }
    return temp;
};

// 将指定的位置的字符设置为另外指定的字符或字符串.索引无效将直接返回不做任何处理
S.setCharAt = function(index, subStr) {
    if (index < 0 || index > this.length - 1) {
        return this.valueOf();
    }
    return this.substring(0, index) + subStr + this.substring(index + 1);
};

// 计算长度，每个汉字占两个长度，英文字符每个占一个长度
S.charLength = function() {
    let temp = i = 0,
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
S.left = function(n) {
    return this.slice(0, n);
};

// 从右截取指定长度的字串
S.right = function(n) {
    return this.slice(this.length - n);
};

// 统计指定字符出现的次数
S.Occurs = function(str) {
    return this.split(str).length - 1;
};

// 检查是否由数字组成
S.isDigit = function() {
    let s = this.trim();
    return (s.replace(/\d/g, "").length == 0);
};

// 测试是否是整数
S.isInt = function() {
    if (this == "NaN")
        return false;
    return this == parseInt(this).toString();
};

// 检查是否由数字字母和下划线组成
S.isAlpha = function() {
    return (this.replace(/\w/g, "").length == 0);
};

// 检查是否为数
S.isNumber = function() {
    let s = this.trim();
    return (s.search(/^[+-]?[0-9.]*$/) >= 0);
};

// 检查是否包含汉字
S.isInChinese = function() {
    return (this.length != this.replace(/[^\x00-\xff]/g, "**").length);
};

// 检查是否有列表中的字符字符
S.isInList = function(list) {
    let re = eval("/[" + list + "]/");
    return re.test(this);
};

// 保留数字
S.GetNum = function() {
    return this.replace(/[^\d]/g, '');
};

// 保留中文
S.GetCN = function() {
    return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g, '');
};

// 保留字母
S.getEn = function() {
    return this.replace(/[^A-Za-z]/g, '');
};

// String转化为Number
S.ToInt = function() {
    return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
};

// 判断是否为邮箱地址
S.isEmail = function() {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this);
};

// 判断是否为身份证号
S.isIdCard = function() {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(this);
};

// 判断是否为URL地址
S.isUrl = function() {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(this);
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
S.isPhoneNum = function() {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this);
};

// 判断是否包含中英文特殊字符，除英文"-_"字符外
S.isContainsSpecialChar = function() {
    if (this == null || this == "") return false;
    let reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
    return reg.test(this);
};

// html特殊字符转码
S.escapeHTML = function() {
    return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/"/g, "&#34;").replace(/'/g, "&#39;");
};

// 数字补零
N.LenWithZero = function(oCount) {
    let strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
};

// Unicode还原
N.ChrW = function() {
    return String.fromCharCode(this);
};

// 数字千分位加','并保留两位小数
N.moneyFormat = function() {
    // return (this+"").replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    return (this.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

// 加法运算
N.accAdd = function(num) {
    let r1, r2, m;
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
N.accSub = function(num) {
    let r1, r2, m, n;
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
    n = (r1 >= r2) ? r1 : r2;
    return (Math.round(this * m - num * m) / m).toFixed(n);
};

// 乘法运算
N.accMul = function(num) {
    let m = 0,
        s1 = this.toString(),
        s2 = num.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {};
    try {
        m += s2.split(".")[1].length
    } catch (e) {};
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};

// 除法运算
N.accDiv = function(num) {
    let t1, t2, r1, r2;
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
    return (r1 / r2) * Math.pow(10, t2 - t1);
};

// 获得数字数组中最大项
A.getMax = function() {
    return this.sort((a, b) => b - a)[0];
};

// 获得数字数组中最小项
A.getMin = function() {
    return this.sort((a, b) => a - b)[0];
};

// 求和
A.getSum = function() {
    let sum = i = 0,
        len = this.length;
    for (; i < len; i++) {
        sum = sum.accAdd(i);
    }
    return sum;
};

//合并对象
O.extend = function(obj) {
    return Object.assign(this, obj);
};

// 检测是否为空
O.isNullOrEmpty = function() {
    let obj = this,
        flag = false;
    if (obj == null || obj == undefined || typeof(obj) == 'undefined' || obj == '') {
        flag = true;
    } else if (typeof(obj) == 'string') {
        obj = obj.trim();
        if (obj == '') { //为空
            flag = true;
        } else { //不为空
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
O.defineProperty = function(obj,deep) {
    let _o = obj || {},
        i = deep || 0,
        key;

    for (key in this) {
        if (this.hasOwnProperty(key)) {
            Object.defineProperty(this, key, {
                configurable: _o.configurable || false,
                enumerable: _o.enumerable === false ? false : true,
                writable: _o.writable || false,
                value: this[key]
            });

            if (i && O.toString.call(this[key]) === '[object Object]') {
                this[key].defineProperty(_o,--i)
            }
        }
    }
};

O.defineProperty({
    enumerable: false
});

// 获取当前时间的中文形式
D.getCNDate = function() {
    let oDateText = '';
    oDateText += this.getFullYear().LenWithZero(4) + '\u5e74';
    oDateText += this.getMonth().LenWithZero(2) + '\u6708';
    oDateText += this.getDate().LenWithZero(2) + '\u65e5';
    oDateText += this.getHours().LenWithZero(2) + '\u65f6';
    oDateText += this.getMinutes().LenWithZero(2) + '\u5206';
    oDateText += this.getSeconds().LenWithZero(2) + '\u79d2';
    oDateText += '  \u661f\u671f' + new String('\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d').substr(this.getDay(), 1);
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
D.format = function(format) {
    let o = {
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
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        },
        fmt = 'yyyy-MM-dd HH:mm:ss' || format;
    if (/(y+)/.test(format)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

// 格式化开始时间距现在的已过时间
D.formatPassTime = function() {
    let time = Date.now() - this,
        day = Math.floor(time / (1000 * 60 * 60 * 24)),
        hour = Math.floor(time / (1000 * 60 * 60)),
        min = Math.floor(time / (1000 * 60)),
        month = Math.floor(day / 30),
        year = Math.floor(month / 12);
    if (year) return year + "\u5e74\u524d"
    if (month) return month + "\u4e2a\u6708\u524d"
    if (day) return day + "\u5929\u524d"
    if (hour) return hour + "\u5c0f\u65f6\u524d"
    if (min) return min + "\u5206\u949f\u524d"
    else return '\u521a\u521a'
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
D.formatRemainTime = function(times,type) {
    let t = times || (this - Date.now()), //时间差
        d = h = m = s= 0,
        _type = type || 1;

    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24).LenWithZero(2);
        m = Math.floor(t / 1000 / 60 % 60).LenWithZero(2);
        s = Math.floor(t / 1000 % 60).LenWithZero(2);
    }
    
    switch(_type) {
        case 1:
            return (d ? d + ":" : "")+ h + ":" + m + ":" + s;
            break;
        case 2:
            return (d ? d + "\u5929" : "")+ h + "\u65f6" + m + "\u5206" + s + "\u79d2";
            break;
        case 3:
            if (d) {
                return d + "\u5929" + h + "\u65f6" + m + "\u5206" + s + "\u79d2";
            } else if (+h) {
                return h + "\u65f6" + m + "\u5206" + s + "\u79d2";
            } else if (+m) {
                return m + "\u5206" + s + "\u79d2";
            } else {
                return s + "\u79d2";
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