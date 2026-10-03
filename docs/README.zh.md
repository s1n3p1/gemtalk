<div align="center">

# GemTalk

围观基于 Gemini 的角色聊天。

[韩语](README.ko.md) · [英语](README.en.md) · [法语](README.fr.md) · [西班牙语](README.es.md) · **[中文](README.zh.md)** · [日语](README.ja.md) · [印地语](README.hi.md)

[![许可证: MIT](https://img.shields.io/badge/%E8%AE%B8%E5%8F%AF%E8%AF%81-MIT-64734f.svg)](../LICENSE)
![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-64734f.svg)
![运行依赖: 0](https://img.shields.io/badge/%E8%BF%90%E8%A1%8C%E4%BE%9D%E8%B5%96-0-64734f.svg)

<img src="assets/gemtalk-readme.zh.png" alt="Sol、Mo 和 Ru 讨论是否可以在办公室使用机械键盘" width="760">

</div>

## 功能

每位成员保留独立的 Antigravity 会话，回应其他成员和观众的留言。聊天使用模型的真实回复。

- **至少两位成员，人数不限。** 自定义姓名和性格，添加、编辑或删除成员，并为每次聊天选择参与者。 通过顶部的成员图标管理成员。
- **六款默认头像和自选照片。** 支持上传PNG/JPG/WebP/GIF 图片或使用网页图片地址。客厅动画只显示默认角色。
- **每行一条的宽幅聊天列表与记录。** 打开历史聊天并继续原有会话。观众可以留言，每条消息都显示日期和时间。 可以在列表中确认后删除单个聊天。
- **全局设置。** 顶部太阳／月亮按钮切换浅色／中性灰深色外观、命令行工具识别的模型、回复上限、间隔、离开时暂停和动画。界面语言和默认聊天语言并排显示。重置和全部删除均需确认。聊天支持韩语、英语、法语、西班牙语、葡萄牙语、德语、中文、日语、阿拉伯语和印地语。
- **服务器统一的界面语言。** 首次选择的语言保存在服务器上，所有浏览器都会使用。界面、默认角色的名字和性格以及推荐话题都会使用此设置。可以在设置中更改；已有聊天和手动编辑的内容会保留。

## Linux 安装

### 1. 准备运行环境

需要 Node.js 18 或更新版本、Git、curl，以及可登录的 Antigravity 账户。以下命令在 Ubuntu/Debian 上安装 Node.js 22。如果已有合适版本，可跳过安装并检查版本。其他发行版请参考 [Node.js 官方下载](https://nodejs.org/en/download)。

```bash
sudo apt-get update
sudo apt-get install -y curl git ca-certificates
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

### 2. 安装 Antigravity 并登录

单独安装[官方命令行工具](https://www.agy.dev/docs/getting-started?tab=cli)。交互运行 `agy`，完成浏览器登录和初始设置后退出。网页服务器必须由同一个 Linux 用户运行。

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
agy
agy --version
agy models
```

若要在新终端使用，将上面的 `export PATH="$HOME/.local/bin:$PATH"` 添加到 `~/.bashrc`，再运行 `source ~/.bashrc`。`agy models` 可查看账户可用的模型。

### 3. 下载并运行源码

运行时不需要额外的 npm 软件包。

```bash
git clone https://github.com/s1n3p1/gemtalk.git gemtalk
cd gemtalk
npm test
npm start
```

打开 [http://127.0.0.1:3000](http://127.0.0.1:3000)。首次配置服务器时选择语言，即可进入聊天列表。之后使用新浏览器也会直接以保存的语言打开。添加或编辑成员，创建聊天，选择至少两位成员和聊天语言，然后开始。

### 4. 连接远程服务器

默认服务器仅供本机访问。如果安装在远程服务器上，请在自己的电脑建立以下隧道，再访问相同地址。将 `user@your-server` 替换为实际用户名和服务器地址。

```bash
ssh -N -L 3000:127.0.0.1:3000 user@your-server
```

## Windows 安装

### 1. 安装运行工具

在 64 位 Windows 10 或 Windows 11 中打开 PowerShell，安装 Node.js LTS 和 Git。如果没有 `winget`，请安装 [Microsoft 应用安装程序](https://learn.microsoft.com/en-us/windows/package-manager/winget/)，或使用 [Node.js 安装程序](https://nodejs.org/en/download)和 [Git 安装程序](https://git-scm.com/install/windows)。

```powershell
winget install --exact --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
winget install --exact --id Git.Git --accept-package-agreements --accept-source-agreements
```

安装后关闭 PowerShell，再打开新窗口使 PATH 更新生效，然后检查版本。如果显示版本号，说明已正确安装。

```powershell
node --version
npm.cmd --version
git --version
```

### 2. 安装 Antigravity

使用[官方 Windows 安装方法](https://www.agy.dev/docs/getting-started?tab=cli)，默认安装到 `%LOCALAPPDATA%\agy\bin\agy.exe`。下面的 PATH 设置立即应用于当前窗口。

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
$env:Path = "$env:LOCALAPPDATA\agy\bin;$env:Path"
agy --version
```

### 3. 克隆、登录并运行

在用户主目录克隆源码，并在仓库目录启动 Antigravity。在浏览器完成 Google 登录和初始设置，然后退出命令行工具。

```powershell
Set-Location $env:USERPROFILE
git clone https://github.com/s1n3p1/gemtalk.git gemtalk
Set-Location gemtalk
agy
```

使用已登录的同一用户和 PowerShell 窗口查看模型并启动应用。使用 `npm.cmd`，无需修改 PowerShell 执行策略。

```powershell
agy models
npm.cmd test
npm.cmd start
```

### 4. 检查首次聊天

打开 [http://127.0.0.1:3000](http://127.0.0.1:3000)，如果服务器尚未配置，请选择界面语言。在设置中从实际模型列表选择模型，将回复上限设为 **2** 并保存。用两位成员开始聊天，确认收到两条真实回复后暂停。刷新后应保留记录和界面语言。点击太阳／月亮按钮，检查浅色和深色外观。先取消重置和删除；只对刚创建的测试聊天确认删除。保持终端开启，使用 `Ctrl+C` 停止应用。

## 设置与用量

默认设置为**系统主题、首次访问时选择的语言、`gemini-3.8-flash-low`、三秒回复间隔，以及开启离开时暂停**。编辑或删除成员不会改变已有聊天的参与者和记录。新聊天保留选定的成员、模型和语言。模型与默认语言的更改仅用于新聊天，其他设置在保存后立即生效；正在生成的回复会先完成。

外观初始跟随操作系统。每次点击顶部太阳／月亮按钮都会切换浅色与深色，并保存选择。重置保留界面语言、成员和记录，将其他设置恢复为默认值：默认聊天语言使用界面语言，外观跟随系统，回复上限为 0（无限制）。删除全部聊天会停止生成并删除应用的所有聊天和消息，保留成员和设置。两项操作均需确认。不删除命令行工具自身的会话存储或独立备份。

**默认回复上限为 0，即无限。** 在手动暂停、达到设定上限、触发离开暂停或发生连接错误之前，生成会持续消耗账户额度。上限统计一场聊天中的全部人工智能回复，不包含观众留言。

默认离开暂停会在无人观看该聊天的可见页面后等待 90 秒，然后在当前回复完成后暂停。聊天列表和隐藏标签页不算观众。关闭该设置后，即使关闭浏览器也会继续。一次只能生成一场聊天，启动另一场会暂停上一场。重启服务器会暂停生成，重新打开页面不会自动开始。

项目所有者测量了 **Google AI Pro / Gemini 3.8 Flash (Low) / 总计 30 条人工智能回复**：

| 额度 | 用量 |
| --- | ---: |
| 五小时额度 | **0.89%** |
| 每周额度 | **0.15%** |

这是于 2026-10-03 分享的一次单用户测量。成员数、累计上下文、回复长度、推理设置和账户政策都会影响用量。这不是费用估算，也不是 Google 的官方保证。

## Linux 后台运行

使用已登录的用户运行 PM2。如需开机启动，检查并执行 `pm2 startup` 输出的命令，然后通过 `pm2 save` 保存。

```bash
npm install --global pm2
AGY_BIN="$HOME/.local/bin/agy" pm2 start server.js --name gemtalk
pm2 save
```

查看日志、重启或停止：

```bash
pm2 logs gemtalk --lines 20
pm2 restart gemtalk
pm2 stop gemtalk
```

重启后，通过界面中的继续按钮恢复聊天。

## 环境变量与数据

| 变量 | 默认值 | 用途 |
| --- | --- | --- |
| `PORT` | `3000` | 本地监听端口 |
| `AGY_BIN` | 从 `PATH` 查找的 `agy` / Windows `agy.exe` | 命令行工具可执行文件路径 |
| `AGY_MODEL` | `gemini-3.8-flash-low` | 新数据目录的初始模型 |
| `GEMTALK_DATA_DIR` | 项目中的 `./data` | 成员、设置、聊天记录和私有诊断 |

更改端口和可执行文件路径的示例：

```bash
PORT=3001 AGY_BIN="$HOME/.local/bin/agy" npm start
```

`data/` 保存成员、设置、聊天记录和私有诊断。要恢复可继续的会话，请**同时备份数据目录和命令行工具自身的会话存储**。不要将 `data/`、`workspaces/`、凭据或运行日志提交到 Git。记录不会自动清理，仍受磁盘、内存和模型上下文限制。

本应用供单一所有者使用，没有内置登录或用户隔离。如需对网络开放，应使用带认证的反向代理。远程头像由浏览器直接加载，聊天文本通过已登录的命令行工具发送给所选模型。

## 故障排查

- **`agy: command not found`**：检查 `PATH` 或 `AGY_BIN` 中的可执行文件路径。
- **登录、模型列表或 SSH 密钥环错误**：使用服务器用户运行 `agy` 和 `agy models`。密钥环问题请按[官方故障排查指南](https://www.agy.dev/docs/cli/troubleshooting/)检查 D-Bus 会话与解锁状态。
- **模型回复失败**：聊天会因错误暂停，使用继续按钮重试。
- **端口冲突**：指定其他端口，例如 `PORT=3001 npm start`。
- **达到回复上限**：在全局设置中提高上限或设为 0，然后继续。

## 许可证与来源

应用代码、默认角色和网站图标采用 [MIT 许可证](../LICENSE)。可以使用、修改和分发，但副本或实质性部分须包含版权和许可声明。软件不提供任何担保，具体条款以许可证原文为准。

包含的 Inter 和 Noto Sans KR 字体采用 SIL Open Font License 1.1。[字体许可声明](../public/fonts/licenses/)保持原文，对字体文件优先于应用的 MIT 许可证。

默认角色和客厅插画为原创。README 图片使用 OpenAI 图像生成工具重新装饰所有者提供的截图。**韩语版逐字保留原始对话，外语版将同一段对话翻译为相应语言。**七种语言的图片采用统一布局，并检查了文字。[原始截图](assets/conversation-original.png)保留以供比较。这些是为 README 重新制作的示意图，详细来源见[来源声明](../NOTICE.md)。

Antigravity 命令行工具及其模型是单独安装或使用的第三方服务，本仓库不包含这些服务，也不更改其许可证。本项目与 Google、Antigravity 或 GemTalk Systems 无关联。

我们研究了 SillyTavern、AutoGen 和 ChatDev，未引入其代码、布局、角色或插画。已有其他组织使用 GemTalk 名称，本项目不保证商标可用性。请参考[同类项目与名称重叠比较](RELATED_PROJECTS.md)。

## 参与贡献

修改后运行 `npm test`，并在真实浏览器中验证成员选择 → 创建聊天 → 模型回复 → 暂停与继续 → 确认保存的数据。重大架构更改前，请提交包含复现步骤和已移除私有信息的错误详情的问题。各语言译文须保留相同章节、安装命令、用量数值、无限生成警告及许可说明。贡献采用 MIT 许可证，详见[贡献指南](../CONTRIBUTING.md)。
