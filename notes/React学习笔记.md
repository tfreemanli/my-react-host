## 什么是框架 
针对一些JavaScript的高级程序设计产生了JavaScript库，这些库常被称为 JavaScript框架。例如JQuery等。

```HTML
<script src="https://cdn.staticfile.org/jquery/1.8.3/jquery.min.js">
</script>
<script>
function myFunction(){
    $("#h01").attr("style","color:red").html("Hello jQuery");
}
$(document).ready(myFunction);
</script>
```
随着Javascript发展，对JS的改造比JQuery更彻底了，出现了诸如React、Vue等的框架。

## React简述
React的运作机制简单说：
* 在浏览器端，在一个近乎空白的HTML上用JavaScript画出所有的DOM，这个过程称为渲染（Render）
* 在服务器端，用Node.js安装/管理/运行React的各种组成模块，包括Http服务、Sass服务、JSX编译器等

React一般使用JSX语法，JSX语法在浏览器编译成JS之后再运行渲染。所以React多被称为前段渲染。
```HTML
//在HTML里面使用，引入react 3个主要的js。
//React-dom是虚拟dom
//babel是JSX编译器
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
//注意 type=babel，是为了使用JSX语法
//myReactCode goes here
</script>
```
```Javascript
//js中，JSX编译器/渲染器在虚拟DOM里实现
import React from "react";
import ReactDOM from "react-dom";
//myReactApp goes here
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<myReactApp />);
```

换句话说，浏览器里看到的页面是React在浏览器的虚拟环境下“画”出来的结果，`ReactDOM.createRoot()` 就是在创建一个虚拟的DOM。每当虚拟环境下的内容改变时，浏览器就重新“画”一次。从MVC模式看，浏览器的画面是内存虚拟环境里各个JS“对象”的V，内存里还有对象本身M以及控制逻辑C

## 1. ES6 中的常用语法
ECMAscript6 发布于2016，是JavaScript最新标准版本。React经常使用的ES6语法知识点包括：
* Classes
* Arrow Functions
* Variables (let, const, var)
* Array Methods like .map()
* Destructuring
* Modules
* Ternary Operator
* Spread Operator


    ### 1.1. Class 类
    谨记JavaScript最大的一个特点——  <font style= color:orange>“函数就是值，值就是函数”</font>

    JS的Class语法有点像Java，几点注意的如下：
    * 构造函数直接用 `constructor(){}` 命名
    * 用 this.var 来访问成员变量
    * getter 和 setter 体现了“函数即值，值即函数”的思想

    ```javascript
    class Animal {
        name="Bobby"; 	//公有成员变量，通过this.name访问
        url;			//公有成员变量
        #age = 5;		//私有成员变量

        constructor(n, u) {
            super(n,u);
            //this.name = n;
            this.url = u;
        }

        get age(){return this.#age;} //公有方法 getter

        eat(){	//公有方法
            console.log(this.name + " is eating." + this.url);
            this.#sleep();
            return;
        }

        #sleep(){	//私有方法
            console.log(this.name + " is sleepin Zzz..." );
        }
    }

    var anml = new Animal("BBear", "Woww...");
    console.log(anml.name + " " + anml.age);
    anml.eat();
    ```

    ### 1.2. Arrow Functions
    接近于Lambda语法
    ```Javascript
    const fn = (para) => { 
        //todo
    };
    ```
    普通的函数定义方式中this是指函数的caller，但箭头函数的this没有绑定，是指函数的定义者。
    
    ### 1.3. Variables (let, const, var)

    参考JavaScript学习笔记
    貌似W3school的示例中大都使用const。
    const就是常量，定义时即刻赋值，之后不得再更改。但常量对象的属性、数据等可以更改。
    var和let都是变量。

    （1）let

    和const有点像，比var更严格。
    如果在父域用let定义了一个变量名，那么：
    1）在相同的作用域内，（无论用var或let）不能重新定义这个变量名；  
    2）在子域内，能且只能用let重新定义该变量名，这样这两个名字一样的变量其实完全没关系的,只是名字一样而已；子域内如果用var重新定义该变量名则运行时出错。
    * 换言之，let定义一个变量名，该变量名对其父域相当于是透明的，对子域是锁定不能用var的。

    （2）var

    最宽松的作用域，不被作用域限制，即能被父域和子域内重定义及访问。  
    *注意：子域var定义的变量，父域也可以直接访问。*  
    只有var可以先赋值再声明。

    （3）函数  

    以上所说的子域是指<span style="color:orange">循环语句和代码块</span>等，<span style="color:red">但不包括函数。Javascript就利用函数的这个封闭性来实现变量的 private，在JavaScript学习函数的闭包中学习。</span>  
    函数内定义的是局部变量，作用域只在函数范围。  
    函数内不声明而直接赋值的变量，<span style="color:orange">当函数运行过一次之后</span>，就当作是全局变量。  
    函数能访问全局变量，除非函数使用相同的变量名重新声明该变量或以相同命名为参数。
    ### 1.4. Array Methods like .map()
    `Collection.map(fnCallBack)` 把数据集里的元素按List顺序执行callBack 函数
    ### 1.5. Destructuring 解构
    > [var1, var2] = fnReturnCollection();
    ### 1.6. Modules
    有点像JAVA，把Javascript写在一个.js文件里，这个文件就理解为一个Module。
    其他.js文件可以在文件头 import 其他Module并使用里面的Class
    ```Javascript
    const myModule = ()=>{
        //do logic or create DOM
        return;
    };
    export default myModule;
    ```
    ### 1.7. Ternary Operator
    三元运算符，即 if then 的简版
    > (boolean)? {then} : {otherwise};
    ### 1.8. Spread Operator
    把一个数组展开
    > arr1 = [arr1..., newElement]; //


## 2. JSX 常用语法