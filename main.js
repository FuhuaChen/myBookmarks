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
var hashInlocalStorage = JSON.parse(localStorage.getItem('zzz') || 'null')
//如果hashInlocaStorage存在就覆盖
if (hashInlocalStorage) {
    hash = hashInlocalStorage
}
//遍历数组，生成kbd、div标签，插入标签
var index = 0
while (index < keys.length) { //取值为0 1 2
    div = document.createElement('div')
    main.appendChild(div)
    row = keys[index]  //取值为 第一个数组 第二个数组 第三个数组
    index2 = 0
    while (index2 < row.length) { //取值为 0-9 0-8 0-7
        kbd = document.createElement('kbd')
        kbd.textContent = row[index2]
        button = document.createElement('button')
        button.textContent = '编辑'
        kbd.appendChild(button)
        button.id = row[index2]  //给button一个id
        //other[target]就是用户点击的元素
        button.onclick = function (other) {
            key = other.target.id  //用户点击的元素的id
            x = prompt('请输入一个网址')
            hash[key] = x  //hash变更
            //把变更的hash存入localStorage
            localStorage.setItem('zzz', JSON.stringify(hash))
            console.log(hash)
        }
        div.appendChild(kbd)
        index2 = index2 + 1
    }
    index = index + 1
}
document.onkeypress = function (other) {
    key = other.key  //取用户输入的键
    website = hash[key] //取hash里对应的网址
    //location.href = 'http://' + website
    window.open('http://' + website, '_blank')  //在新窗口打开
}