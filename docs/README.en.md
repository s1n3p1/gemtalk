<div align="center">

# GemTalk

Watch characters powered by Gemini chat.

[Korean](README.ko.md) · **[English](README.en.md)** · [French](README.fr.md) · [Spanish](README.es.md) · [Chinese](README.zh.md) · [Japanese](README.ja.md) · [Hindi](README.hi.md)

[![license: MIT](https://img.shields.io/badge/license-MIT-64734f.svg)](../LICENSE)
![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-64734f.svg)
![runtime dependencies: 0](https://img.shields.io/badge/runtime%20dependencies-0-64734f.svg)

<img src="assets/gemtalk-readme.en.png" alt="Sol, Mo and Ru discussing mechanical keyboards in the office" width="760">

</div>

## Features

Each member keeps a separate Antigravity conversation and responds to other members and spectator comments. Replies use real model output.

- **Any number of members, starting with two.** Set names and personalities, add/edit/delete members, and select a cast for each room. Manage members from the header’s members icon.
- **Six default portraits and your own photos.** Upload PNG/JPG/WebP/GIF images or use a web image URL. Only default characters appear in the living-room animation.
- **Full-width room rows and history.** Open past rooms and resume the same sessions. Spectators can send comments, and every message shows its date and time. Delete individual conversations from the list after confirmation.
- **System settings.** Use the header’s sun/moon button for light or neutral-gray dark appearance, models discovered from the installed CLI, reply limits, intervals, absence pausing and animation. Interface and default conversation languages share one row. Reset and deletion require confirmation. Conversation languages are Korean, English, French, Spanish, Portuguese, German, Chinese, Japanese, Arabic and Hindi.
- **One interface language for the server.** Your first choice is saved on the server and used by every browser. The interface, default character names and personalities, and suggested topics follow this setting. Change it in settings; existing conversations and your edits are preserved.

## Linux installation

### 1. Prepare the runtime

You need Node.js 18+, Git, curl and an Antigravity account you can sign into. These commands install Node.js 22 on Ubuntu/Debian. If a suitable version is already installed, skip installation and check the versions. For other distributions, see the [official Node.js download](https://nodejs.org/en/download).

```bash
sudo apt-get update
sudo apt-get install -y curl git ca-certificates
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

### 2. Install Antigravity and sign in

Install the [official CLI](https://www.agy.dev/docs/getting-started?tab=cli) separately. Run `agy` interactively, complete browser login and initial setup, then exit. Run the web server as the same Linux user.

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
agy
agy --version
agy models
```

For future terminals, add the `export PATH="$HOME/.local/bin:$PATH"` line above to `~/.bashrc` and run `source ~/.bashrc`. Use `agy models` to see models available to your account.

### 3. Clone and run

No additional npm packages are required at runtime.

```bash
git clone https://github.com/s1n3p1/gemtalk.git gemtalk
cd gemtalk
npm test
npm start
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). Choose a language during the server’s first setup to reach the room list. New browsers then open directly in the saved language. Add/edit members, create a new room, select at least two members and a conversation language, then start.

### 4. Connect to a remote server

The default server is accessible only on its own computer. For a remote installation, open this tunnel on your computer and visit the same browser address. Replace `user@your-server` with your actual user and server.

```bash
ssh -N -L 3000:127.0.0.1:3000 user@your-server
```

## Windows installation

### 1. Install the runtime tools

Open PowerShell on 64-bit Windows 10 or Windows 11. Install Node.js LTS and Git. If `winget` is unavailable, install [Microsoft App Installer](https://learn.microsoft.com/en-us/windows/package-manager/winget/) or use the [Node.js installer](https://nodejs.org/en/download) and [Git installer](https://git-scm.com/install/windows).

```powershell
winget install --exact --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
winget install --exact --id Git.Git --accept-package-agreements --accept-source-agreements
```

Close PowerShell and open a new window after installation so PATH updates take effect, then check the versions. If version numbers appear, the installation was successful.

```powershell
node --version
npm.cmd --version
git --version
```

### 2. Install Antigravity

Use the [official Windows installer](https://www.agy.dev/docs/getting-started?tab=cli). It installs `%LOCALAPPDATA%\agy\bin\agy.exe` by default. The PATH update below applies to the current window immediately.

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
$env:Path = "$env:LOCALAPPDATA\agy\bin;$env:Path"
agy --version
```

### 3. Clone, sign in and run

Clone into your home folder and launch Antigravity inside the repository. Complete Google login in the browser and initial setup, then exit the CLI.

```powershell
Set-Location $env:USERPROFILE
git clone https://github.com/s1n3p1/gemtalk.git gemtalk
Set-Location gemtalk
agy
```

Use the same authenticated user and PowerShell window to list models and start the app. `npm.cmd` avoids changing the PowerShell execution policy.

```powershell
agy models
npm.cmd test
npm.cmd start
```

### 4. Check the first conversation

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) and choose an interface language if the server has not been configured yet. In settings, choose a model from the actual model list, set the reply limit to **2**, and save. Start a conversation with two members and confirm that two real replies arrive before it pauses. Reload: history and interface language should remain. Click the sun/moon button to check both light and dark appearance. Cancel reset and deletion first; confirm deletion only for the test conversation you just created. Keep the terminal open; stop the app with `Ctrl+C`.

## Settings and usage

Defaults are **system appearance, the language chosen on your first visit, `gemini-3.8-flash-low`, a three-second reply interval and absence pausing enabled**. Editing/deleting a member does not change existing room casts or transcripts. New rooms preserve their selected cast, model and language. Model and default-language changes apply to new rooms; other settings apply immediately after saving. An in-flight reply is allowed to finish.

Appearance initially follows the operating system. The header’s sun/moon button switches between light and dark with each click and saves your choice. Reset keeps interface language, members and history while restoring other defaults. Default conversation language returns to interface language, appearance to the operating system, and reply limit to 0 (unlimited). Delete all conversations stops generation and removes every app conversation and message while retaining members and settings. Both actions require a confirmation dialog. The CLI’s own session storage and separate backups are not deleted.

**The default reply limit is 0: unlimited.** Generation consumes your account allowance until manually paused, stopped by a configured limit or absence policy, or interrupted by a connection error. The limit counts all AI replies in a room, excluding spectator comments.

Absence pausing waits 90 seconds by default without a visible viewer of that room, then pauses after any in-flight reply finishes. The room list and hidden tabs do not count as viewers. Disabling this setting allows generation with the browser closed. Only one room generates at a time; starting another pauses the previous room. Restarting the server pauses generation, and reopening the page never starts it automatically.

The owner measured **Google AI Pro / Gemini 3.8 Flash (Low) / 30 total AI replies**:

| Allowance | Usage |
| --- | ---: |
| Five-hour allowance | **0.89%** |
| Weekly allowance | **0.15%** |

This single-user observation was shared on 2026-10-03. Member count, accumulated context, reply length, reasoning settings and account policies affect usage. It is not a cost estimate or an official Google guarantee.

## Run in the background on Linux

Run PM2 as the authenticated user. For boot startup, review and apply the command printed by `pm2 startup`, then save with `pm2 save`.

```bash
npm install --global pm2
AGY_BIN="$HOME/.local/bin/agy" pm2 start server.js --name gemtalk
pm2 save
```

Inspect logs, restart, or stop:

```bash
pm2 logs gemtalk --lines 20
pm2 restart gemtalk
pm2 stop gemtalk
```

After a restart, use the resume control in the UI to continue the conversation.

## Environment variables and data

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | Local listening port |
| `AGY_BIN` | `agy` / Windows `agy.exe` found in `PATH` | CLI executable path |
| `AGY_MODEL` | `gemini-3.8-flash-low` | Initial model for a fresh data directory |
| `GEMTALK_DATA_DIR` | Project's `./data` | Profiles, settings, transcripts and private diagnostics |

Example with a different port and executable path:

```bash
PORT=3001 AGY_BIN="$HOME/.local/bin/agy" npm start
```

`data/` contains profiles, settings, transcripts and private diagnostics. Back up **both the data directory and the CLI's own session storage** to restore resumable conversations. Never commit `data/`, `workspaces/`, credentials or execution logs. Records are not automatically pruned; disk, RAM and model context limits still apply.

This is a single-owner app without built-in login or user isolation. Use an authenticated reverse proxy if exposing it to a network. Remote profile photos are loaded directly by the browser; conversation text is sent to the selected model through your authenticated CLI.

## Troubleshooting

- **`agy: command not found`**: check `PATH` or the executable path in `AGY_BIN`.
- **Login, model discovery or SSH keyring errors**: run `agy` and `agy models` as the server user. For keyring issues, check the D-Bus session and unlocking using the [official troubleshooting guide](https://www.agy.dev/docs/cli/troubleshooting/).
- **Failed model reply**: the room pauses with an error. Use resume to retry.
- **Port conflict**: choose another port, such as `PORT=3001 npm start`.
- **Reply limit reached**: increase the limit or set it to 0 in system settings, then resume.

## License and credits

Application code, default characters and site icons use the [MIT license](../LICENSE). You may use, modify and distribute them, provided copyright and license notices accompany copies or substantial portions. The software is supplied without warranty. Refer to the original license for the exact terms.

Bundled Inter and Noto Sans KR fonts use the SIL Open Font License 1.1. Their [license notices](../public/fonts/licenses/) remain unchanged; these terms take precedence over the application's MIT license for the font files.

The default characters and living-room artwork are original. README images redecorate the owner's screenshot with OpenAI's image generation tool. **The Korean version keeps the original dialogue verbatim; foreign versions translate the same conversation into their language.** All seven versions share a layout, and their lettering was checked. The [original screenshot](assets/conversation-original.png) is retained for comparison. These are reconstructed README illustrations; see the [attribution notice](../NOTICE.md).

Antigravity CLI and its models are separately installed or accessed third-party services. They are not bundled or relicensed by this repository. This project is not affiliated with Google, Antigravity or GemTalk Systems.

We researched similar projects SillyTavern, AutoGen and ChatDev without importing their code, layouts, characters or artwork. An existing organization also uses the GemTalk name; trademark availability is not guaranteed. See the [related-project and name-overlap comparison](RELATED_PROJECTS.md).

## Contributing

After changes, run `npm test` and verify the real browser flow: member selection → room creation → model replies → pause/resume → persisted readback. Before a large architectural change, open an issue with reproduction steps and error details stripped of private information. Translations must retain the same sections, installation commands, usage figures, unlimited-generation warning and license information across languages. Contributions use the MIT license; see the [contribution guide](../CONTRIBUTING.md).
