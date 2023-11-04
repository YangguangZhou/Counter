# Counter 计数器

可以插入Markdown文件或HTML网页的计数器

Powered by [Vercel](https://vercel.com/) and [Aircode](https://aircode.io/)

## 使用方法

将下方代码插入到网页中即可。

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

## API

1. Python：

```python
import requests

url = "https://counter.jerryz.com.cn/api/counter"
name = "your_variable_here"
data = {"name": name}

response = requests.post(url, json=data)

print(response.text)
```

2. JavaScript（使用Node.js）：

```javascript
const axios = require('axios');

const url = "https://counter.jerryz.com.cn/api/counter";
const name = "your_variable_here";
const data = { name };

axios.post(url, data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

3. Java（使用HttpClient）：

```java
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;

public class Main {
    public static void main(String[] args) {
        try {
            String url = "https://counter.jerryz.com.cn/api/counter";
            String name = "your_variable_here";
            HttpClient client = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(url);

            StringEntity input = new StringEntity("{\"name\": \"" + name + "\"}");
            input.setContentType("application/json");
            post.setEntity(input);

            HttpResponse response = client.execute(post);

            // 处理响应
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

4. Shell脚本：

```bash
#!/bin/bash

URL="https://counter.jerryz.com.cn/api/counter"
NAME="your_variable_here"
DATA="{\"name\": \"$NAME\"}"

curl -X POST -H "Content-Type: application/json" -d "$DATA" "$URL"
```

在这些示例中，将 `your_variable_here` 替换为你实际想要发送的变量值。然后运行相应的程序以发送POST请求。
   
