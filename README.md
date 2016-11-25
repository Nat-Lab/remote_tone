### remote_tone  ###
---

繼 [osu_pulse](https://github.com/Nat-Lab/osu_pulse) 後突發奇想，寫了這個工具。這個工具是一個遠程控制的方波發生器。

若要使用，先開啟服務：

```
$ git clone https://github.com/Nat-Lab/remote_tone
$ cd backend
$ npm install
$ screen -dmS remote_tone-server npm start
```

這會在妳伺服器的埠 `9980` 開啟一個 `remote_tone` 伺服器。成功開啟後，就可以使用了。`client.html` 是被控制端，`server.html` 是控制端。`server:` 中填寫你的伺服器地址，例如：`http://127.0.0.1:9088`。注意，末尾處不能有 `/`。`id` 是用於辨認這個控制端的序號。`client.html` 是被控端，同樣的，`server:` 中填寫伺服器地址，`id` 是妳在控制端所設置的 `id`。填寫完畢後，按下 Connect 來連接。

控制端是用於添加 `task` 的。每個 `task` 有如下屬性：`freq`, `level`, `interval`, `duration`。分別代表頻率（Hz），音量（db），每次音頻之間的時間間隔（ms），每次音頻的持續時間（ms）。填寫完畢，按下 Add Task 就會將其發送到被控端。添加多個 Task 來組成節奏。你可以在下面的列表中看見進行中的 Task，按下旁邊的 "X" 可以移除。
