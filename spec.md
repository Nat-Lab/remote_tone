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

從 `http[s]://server_url/get?id=<id>` 獲取指令。

請求應該返回 Json 對象：

名稱|類型|必須？|值
:--|:--|:--|:--
action|字符串|必須|`add`，`remove` 或者 `none`。
task|task 對象|可選|要添加的 `task`。
id|int|可選|`remove` 時，用於指定要移除的 `task`。

客戶端收到 `add` 操作時，應該使用：`var id = toneControl.create(freq, level, interval, duration)` 來新建任務。任務建立後，POST 一個 `task_element` 數組到 `http[s]://server_url/report?id=<id>`，內容為所有進行中的 task。 

客戶端收到 `remove` 操作時，應該使用：`toneControl.destroy(id)` 來銷毀任務。任務銷毀後，POST 一個 `task_element` 數組到 `http[s]://server_url/report?id=<id>`，內容為所有進行中的 task。 

客戶端收 `none` 操作時，無須響應。

#### 控制端：

POST 下面的 Json 到 `http[s]://server_url/control?id=<id>`

名稱|類型|必須？|值
:--|:--|:--|:--
action|字符串|必須|`add` 或者 `remove`
task|task 對象|可選|要添加的 `task`。
id|int|可選|`remove` 時，用於指定要移除的 `task`。

從 `http[s]://server_url/get_report?id=<id>` 獲取客戶端任務列表。返回的是一個數組，內有 `task_element` 對象。
