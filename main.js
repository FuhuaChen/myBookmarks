
//1.初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

//2.生成键盘
//遍历数组，生成kbd、div标签，插入标签
generateKeyborde(keys,hash)

//3.监听用户动作
listenToUser(hash)


//下面是工具函数
function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName, attributes) {
    var element = document.createElement(tagName)
    for(var key in attributes){
        element[key] = attributes[key]
    }
    return element
}

function createSpan(textContent) {
    var span = tag('span',{className:'text'})
    span.textContent = textContent
    return span
}

function createImage(domain) {
    var img = tag('img')
    if(domain){
        img.src = 'http://' + domain + '/favicon.ico'
    }else{
        img.src = '//ooo.0o0.ooo/2017/11/19/5a1168df0504a.png'
    }
    img.onerror = function (xxx) {
        xxx.target.src = '//ooo.0o0.ooo/2017/11/19/5a1168df0504a.png'
    }
    return img
}

function createButton(id) {
    var button = tag('button',{textContent:'编辑'})
    button.id = id  //给button一个id
    //other[target]就是用户点击的元素
    button.onclick = function (other) {
        var button2 = other.target
        var img2 = button2.previousSibling
        var key = button2.id  //用户点击的元素的id
        var x = prompt('请输入网址')
        if(x!=='' && x!==null){
            hash[key] = x  //hash变更
            img2.src = 'http://' + x + '/favicon.ico'
            img2.onerror = function (xxx) {
                xxx.target.src = '//ooo.0o0.ooo/2017/11/19/5a1168df0504a.png'
            }
            //把变更的hash存入localStorage
            localStorage.setItem('zzz', JSON.stringify(hash))
        }
    }
    return button
}

function init() {
    var keys = {
        0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        length: 3
    }
    var hash = {
        'q': 'qq.com',
        'w': 'weibo.com',
        'e': 'explainshell.com',
        'r': 'renren.com',
        't': 'tianya.com',
        'y': 'youtube.com',
        'u': 'uc.com',
        'i': 'iconfont.cn',
        'o': 'opera.com',
        'p': 'processon.com',
        'a': 'alpha.wallhaven.cc',
        's': 'sohu.com',
        'd': 'dribbble.com',
        'g': 'github.com',
        'j': 'javascript.ruanyifeng.com',
        'z': 'zhihu.com',
        'c': 'colorzilla.com',
        'v': 'visualgo.net',
        'n': 'namesilo.com',
        'm': 'mcdonalds.com.cn'
    }
//取出localStorage ‘zzz’ 里对应的hash
    var hashInlocalStorage = getFromLocalStorage('zzz')
//如果hashInlocaStorage存在就覆盖
    if (hashInlocalStorage) {
        hash = hashInlocalStorage
    }
    return{
        keys:keys,
        hash:hash
    }
}

function generateKeyborde(keys,hash) {
    for(index=0;index < keys.length;index++){//index 取值为0 1 2
        div = tag('div',{className:'row'})

        main.appendChild(div)

        row = keys[index]  //取值为 第一个数组 第二个数组 第三个数组
        for(index2=0;index2 < row.length;index2++){//index2取值为 0-9 0-8 0-7
            var span = createSpan(row[index2])

            var img = createImage(hash[row[index2]])

            var button = createButton(row[index2])

            var kbd = tag('kbd',{className:'key'})

            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)

            div.appendChild(kbd)
        }
    }
}

function listenToUser(hash){
    document.onkeypress = function (other) {
        var key = other.key  //取用户输入的键
        var website = hash[key] //取hash里对应的网址
        //location.href = 'http://' + website  //在当前窗口打开
        window.open('http://' + website, '_blank')  //在新窗口打开
    }
}