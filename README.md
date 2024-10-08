# Counter 计数器

可以插入Markdown文件或HTML网页的计数器

更好的阅读体验请见[博客](https://blog.jerryz.com.cn/article/counter)

![Vercel](https://vercel.jerryz.com.cn/api/YangguangZhou/Counter)

Powered by [Vercel](https://vercel.com/) and [Aircode](https://aircode.io/)

## 使用方法

将下方代码的 `name=` 后替换为自己的标识符，再插入到网页中即可。

1. **Markdown** （推荐）
   
   ```markdown
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter)
   ```
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter)

2. HTML

   ```html
   <img src="https://counter.jerryz.com.cn/counter?name=counter" alt="Counter">
   ```
   <img src="https://counter.jerryz.com.cn/counter?name=counter" alt="Counter">

代码块前后也可以插入文字，例如：

您是该网页的第 ![Counter](https://counter.jerryz.com.cn/counter?name=counter) 位访客。

## 参数说明

1. 是否将当前显示计入计数器
   
   - 计入：`/counter`
      ```markdown
      ![Counter](https://counter.jerryz.com.cn/counter?name=counter)
      ```
      ![Counter](https://counter.jerryz.com.cn/counter?name=counter)

   - 不计入：`/view`
      ```markdown
      ![Counter](https://counter.jerryz.com.cn/view?name=counter)
      ```
      ![Counter](https://counter.jerryz.com.cn/view?name=counter)

2. 字体大小

   ```markdown
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&font=20)
   ```
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&font=20)

3. 深色模式（显示白色字体）

   ```markdown
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&dark=1)
   ```
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&dark=1)

4. 自定义颜色
   
   color后面的值为16进制颜色代码（不含 `#`）或rgb(a)颜色代码（不含空格）

   ```markdown
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&color=279cff)
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&color=rgb(136,136,255))
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&color=rgba(0,0,0,0.5))
   ```
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&color=279cff)

   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&color=rgb(136,136,255))
   
   ![Counter](https://counter.jerryz.com.cn/counter?name=counter&color=rgba(0,0,0,0.5))

## API

以下是使用不同编程语言发送 API 请求的示例代码：

1. Python:
```python
import requests

url = "https://counter.jerryz.com.cn/api/counter"
name = "your_variable_here"
data = {"name": name}

response = requests.post(url, json=data)
times = response.json()["times"]
print(times)
```

2. JavaScript:
```javascript
const fetch = require('node-fetch');

const url = "https://counter.jerryz.com.cn/api/counter";
const name = "your_variable_here";
const data = { name };

fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
})
  .then(response => response.json())
  .then(data => {
    const times = data.times;
    console.log(times);
  });
```

3. Java:
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class APIClient {
    public static void main(String[] args) {
        String url = "https://counter.jerryz.com.cn/api/counter";
        String name = "your_variable_here";
        String data = "{\"name\": \"" + name + "\"}";

        try {
            URL apiUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            connection.getOutputStream().write(data.getBytes());

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            String jsonResponse = response.toString();
            // Parse the JSON response and extract the "times" value
            // ...

            System.out.println(times);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

4. PHP:
```php
<?php
$url = "https://counter.jerryz.com.cn/api/counter";
$name = "your_variable_here";
$data = array("name" => $name);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json",
        'method'  => 'POST',
        'content' => json_encode($data),
    ),
);

$context  = stream_context_create($options);
$response = file_get_contents($url, false, $context);
$responseData = json_decode($response, true);
$times = $responseData["times"];

echo $times;
?>
```

5. 微信小程序:
```javascript
wx.request({
  url: 'https://counter.jerryz.com.cn/api/counter',
  method: 'POST',
  data: {
    name: 'your_variable_here'
  },
  header: {
    'Content-Type': 'application/json'
  },
  success: function (res) {
    const times = res.data.times;
    console.log(times);
  },
  fail: function (error) {
    console.log(error);
  }
});
```

在这些示例中，将 `your_variable_here` 替换为你实际想要发送的变量值。然后运行相应的程序以发送POST请求。如果要将当前请求计入计数器，`url` 使用 `https://counter.jerryz.com.cn/api/counter`。如果不将当前请求计入计数器，`url` 使用 `https://counter.jerryz.com.cn/api/view`
   
<!-- ## 部署

1. 部署到AirCode
   
   [![Deploy with AirCode](https://aircode.io/aircode-deploy-button.svg)](https://aircode.io/dashboard?owner=YangguangZhou&repo=Counter&branch=main&path=Aircode&appname=counter)

   成功创建项目后，点击 `Deploy`，得到Aircode分配的域名（形如 `https://xxxx.us.aircode.run` ）。

2. 部署到Vercel
   
   [![Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/YangguangZhou/Counter)
   
   项目创建完成后，请将代码中所有的 `https://g3rvbpemgm.us.aircode.run/` 更改为Aircode分配的域名。 -->
