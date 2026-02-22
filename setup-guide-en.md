# Claude Code - Installation Guide

Welcome! This guide will walk you through installing **Claude Code**, an agentic coding tool by Anthropic that runs in your terminal. No prior experience with AI coding tools is required.

---

## Step 1: Get a Claude Subscription

Before installing Claude Code, you need an active Claude subscription.

1. Go to [claude.ai](https://claude.ai) and create an account (or sign in)
2. Subscribe to the **Claude Pro** plan ($20/month)
   - You can cancel the subscription after the course.
   - Pro gives you solid usage for learning and daily work
   - No need to buy the Max plan at this stage
3. Claude Code uses your subscription directly — no separate API billing needed

> **Why subscribe?** Claude Code connects to Claude's most capable models. A subscription ensures you have enough usage to follow along with the course exercises without interruptions.

---

## Step 2: Install Claude Code

### Mac / Linux / WSL

Open **Terminal** and run:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows (PowerShell)

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Windows (CMD)

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### Verify Installation

```bash
claude --version
```

> Claude Code auto-updates in the background. Homebrew/WinGet installs require manual updates (`brew upgrade claude-code` / `winget upgrade Anthropic.ClaudeCode`).

---

## Step 3: Windows-Specific Notes

You have two options for running Claude Code on Windows:

1. **Native Windows with Git Bash** (simplest) — requires [Git for Windows](https://git-scm.com/downloads/win)
2. **Inside WSL** — both WSL 1 and WSL 2 are supported (WSL 2 recommended)

---

## Step 4: First Launch & Authentication

1. Open your terminal and navigate to any project folder:

   ```bash
   cd ~/my-project
   ```

2. Launch Claude Code:

   ```bash
   claude
   ```

3. On first launch, you'll be prompted to authenticate. Choose **"Use Claude.ai account"** and follow the browser login flow.

4. Once authenticated, you're ready to go! Try typing a message like:

   ```
   What files are in this directory?
   ```

> **Tip:** Run `claude doctor` after installation to verify everything is set up correctly.

---

## Quick Tips for Getting Started

- **Start Claude Code from your project folder** — it works best when launched from the root of a project
- Type `/help` inside Claude Code to see available commands
- Press `Escape` to cancel a running operation
- Press `Ctrl+C` to exit Claude Code
- Type your requests in plain English — describe what you want to build, fix, or understand

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `claude: command not found` | Re-run the install script, then open a new terminal window |
| Permission errors on Mac | Prefix with `sudo`: `sudo curl -fsSL https://claude.ai/install.sh \| bash` |
| Permission errors on Windows | Open PowerShell as Administrator and retry |
| Authentication fails | Make sure you have an active Claude Pro/Max subscription |
| Something feels off | Run `claude doctor` to diagnose issues |

---

## System Requirements

- **OS**: macOS 13.0+, Windows 10+ (with Git Bash or WSL), Ubuntu 20.04+, Debian 10+
- **RAM**: 4 GB minimum
- **Shell**: Bash or Zsh recommended
- **Internet**: Required (Claude Code connects to Claude's cloud API)

---

You're all set! See you in class.
