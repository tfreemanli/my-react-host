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
//在HTML里面标识编译器类型 babel
<script type="text/babel">  </script>
```
```Javascript
//js中，JSX编译器/渲染器在虚拟DOM里实现
import ReactDOM from "react-dom";
```

换句话说，浏览器里看到的页面是React在浏览器的虚拟环境下“画”出来的结果。每当虚拟环境下的内容改变时，浏览器就重新“画”一次。从MVC模式看，浏览器的画面是内存里各个JS“对象”的V，内存里还有对象本身M以及控制逻辑C