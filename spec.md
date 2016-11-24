nato-play 規範
---

nato-play 是一個遠程控制的，運行於 web 瀏覽器中的音調生成工具。控制端／被控制端的細節如下：

#### 對象：

task 對象：

名稱|類型|必須？|值
:--|:--|:--|:--
freq|int|必須|音頻的頻率。(Hz)
level|int|必須|音頻的音量。(db)
interval|int|必須|每次音頻之間的時間間隔。(ms)
duration|int|必須|每次音頻的持續時間。(ms)

task\_element 對象：

名稱|類型|必須？|值
:--|:--|:--|:--
task|task 對象|必須|任務對象。
id|int|必須|任務 ID。

#### 被控制端：

從 `http[s]://server_url/client.cgi?id=<id>&action=get&offset=<offset>` 獲取指令。在第一次獲取時，`offset` 應該使用 0。在之後的請求中，`offset` 應取返回的 Json 對象中指明的數。

請求應該返回 Json 對象：

名稱|類型|必須？|值
:--|:--|:--|:--
action|字符串|必須|`add` 或者 `remove`
task|task 對象|可選|要添加的 task。
id|int|可選|`remove` 時，用於指定要移除的 task。
offset|int|必須|下一個 Json 對象的 `offest`。

客戶端收到 `add` 操作時，應該使用：`var id = toneControl.create(freq, level, interval, duration)` 來新建任務。任務建立後，POST 一個 `task_element` 數組到 `http[s]://server_url/client.cgi?id=<id>&action=report`，內容為所有進行中的 task。 

客戶端收到 `remove` 操作時，應該使用：`toneControl.destroy(id)` 來銷毀任務。任務銷毀後，POST 一個 `task_element` 數組到 `http[s]://server_url/client.cgi?id=<id>&action=report`，內容為所有進行中的 task。 

#### 控制端：

POST 下面的 Json 到 `http[s]://server_url/server.cgi?id=<id>&action=control`

名稱|類型|必須？|值
:--|:--|:--|:--
action|字符串|必須|`add` 或者 `remove`
task|task 對象|可選|要添加的 task。
id|int|可選|`remove` 時，用於指定要移除的 task。

從 `http[s]://server_url/server.cgi?id=[id]&action=get_report` 獲取客戶端任務列表。返回的是一個數組，內有 tasks 對象。
