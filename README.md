# Counter 计数器

可以插入Markdown文件或HTML网页的计数器

Powered by [Vercel](https://vercel.com/) and [Aircode](https://aircode.io/)

## 使用方法

将下方代码插入到网页中即可。

1. **Markdown** （推荐）
   
   ```markdown
   ![Counter](https://counter.jerryz.com.cn/api?name=counter)
   ```
   ![Counter](https://counter.jerryz.com.cn/api?name=counter)

2. HTML

   ```html
   <img src="https://counter.jerryz.com.cn/api?name=counter" alt="Counter">
   ```
   <img src="https://counter.jerryz.com.cn/api?name=counter" alt="Counter">

代码块前后也可以插入文字，例如：

您是该网页的第 ![Counter](https://counter.jerryz.com.cn/api?name=counter) 位访客。

## 参数说明

1. 是否将当前显示计入计数器
   
   - 计入：`/api`
      ```markdown
      ![Counter](https://counter.jerryz.com.cn/api?name=counter)
      ```
      ![Counter](https://counter.jerryz.com.cn/api?name=counter)

   - 不计入：`/view`
      ```markdown
      ![Counter](https://counter.jerryz.com.cn/view?name=counter)
      ```
      ![Counter](https://counter.jerryz.com.cn/view?name=counter)

2. 字体大小

   ```markdown
   ![Counter](https://counter.jerryz.com.cn/api?name=counter&font=20)
   ```
   ![Counter](https://counter.jerryz.com.cn/api?name=counter&font=20)

3. 深色模式（显示白色字体）

   ```markdown
   ![Counter](https://counter.jerryz.com.cn/api?name=counter&dark=1)
   ```
   ![Counter](https://counter.jerryz.com.cn/api?name=counter&dark=1)

   