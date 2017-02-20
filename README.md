## vue-async-component-handler

### 介绍:

更方便处理异步加载组件时，加载状态的handler。用于延迟加载一些用户暂时用不到、大部分用户用不到的Vue组件，提升用户看到首屏内容的速度。依赖Webpack的文件拆分打包。

### Usage:

```

// 引入这个包
var AsyncHandler = require('vue-async-component-handler');

// 引入组件时
Vue.component('vue-component-blabla', function (resolve) {
    require(['Some Component Here'], AsyncHandler.load(this, 'foo', resolve));
});

// 用到组件时，根据加载状态准备不同的方法
AsyncHandler.find('foo', {

	// 组件加载完毕会执行prepared方法。例如“展开日历”的响应，可以把showCalendar()放在此处。
	prepared: function () {
	    // doSomething();
	},

	// 组件加载中会执行caught方法。例如异步加载日历组件的时候，如果还没加载完，用户就点击了“展开日历”，那么可以考虑在这里写一些友好的交互。
	caught: function () {
	    // showLoading();
	},

	// 如果caught被触发，那么在组件加载完成之后会尝试调用此方法。例如hideLoading()。然后会自动触发prepared方法（加载完毕，弹出日历）。remedy最后return true的话，不会执行prepared。
	remedy: function () {
	    // hideLoading();
	}
});

```
