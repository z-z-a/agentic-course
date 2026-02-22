# Claude Code - מדריך התקנה

ברוכים הבאים!
מדריך זה ילווה אתכם בהתקנת **Claude Code**, כלי פיתוח אגנטי של Anthropic שרץ בטרמינל. אין צורך בניסיון קודם עם כלי AI לפיתוח.

---

## שלב 1: רכישת מנוי ל-Claude

לפני התקנת Claude Code, נדרש מנוי פעיל ל-Claude.

1. היכנסו ל-[claude.ai](https://claude.ai) וצרו חשבון (או התחברו לחשבון קיים)
2. הירשמו לתוכנית **Claude Pro** ($20 לחודש)
   - ניתן לבטל את המנוי לאחר הקורס
   - Pro מספיק ללמידה ולעבודה יומיומית
   - אין צורך בחשבון Max בשלב הזה
3. Claude Code משתמש ישירות במנוי שלכם — אין צורך בחיוב API נפרד

> **למה להירשם למנוי?** Claude Code מתחבר למודלים המתקדמים ביותר של Claude. מנוי מבטיח שתהיה לכם מספיק גישה כדי לעקוב אחרי התרגילים בקורס ללא הפרעות.

---

## שלב 2: התקנת Claude Code

### Mac / Linux / WSL

פתחו את ה-**Terminal** והריצו:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### (PowerShell) Windows

```powershell
irm https://claude.ai/install.ps1 | iex
```

### (CMD) Windows

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### אימות ההתקנה

```bash
claude --version
```
---

## שלב 3: הערות ל-Windows

יש שתי אפשרויות להפעלת Claude Code על Windows:

1. **Windows רגיל עם Git Bash** (הכי פשוט) — דורש [Git for Windows](https://git-scm.com/downloads/win)
2. **בתוך WSL** — נתמכים WSL 1 ו-WSL 2 (מומלץ WSL 2)

---

## שלב 4: הפעלה ראשונה והתחברות

1. פתחו את הטרמינל ונווטו לתיקיית פרויקט כלשהי:

   ```bash
   cd ~/my-project
   ```

2. הפעילו את Claude Code:

   ```bash
   claude
   ```

3. בהפעלה הראשונה, תתבקשו להתחבר. בחרו **"Use Claude.ai account"** ועקבו אחר תהליך ההתחברות בדפדפן.

4. לאחר ההתחברות, אתם מוכנים! נסו להקליד משהו כמו:

   ```
   What files are in this directory?
   ```

> **טיפ:** הריצו `claude doctor` לאחר ההתקנה כדי לוודא שהכל מוגדר כראוי.

---

## טיפים להתחלה

- **הפעילו את Claude Code מתיקיית הפרויקט** — הכלי עובד הכי טוב כשמפעילים אותו מהתיקייה הראשית של הפרויקט
- הקלידו `/help` בתוך Claude Code כדי לראות פקודות זמינות
- לחצו `Escape` כדי לבטל פעולה שרצה
- לחצו `Ctrl+C` כדי לצאת מ-Claude Code
- כתבו את הבקשות שלכם באנגלית פשוטה — תארו מה אתם רוצים לבנות, לתקן, או להבין

---

## פתרון בעיות

| בעיה | פתרון |
|---|---|
| `claude: command not found` | הריצו שוב את סקריפט ההתקנה ופתחו חלון טרמינל חדש |
| שגיאות הרשאות ב-Mac | `sudo curl -fsSL https://claude.ai/install.sh \| bash` :הוסיפו sudo |
| שגיאות הרשאות ב-Windows | פתחו PowerShell כמנהל מערכת ונסו שוב |
| ההתחברות נכשלת | ודאו שיש לכם מנוי Claude Pro/Max פעיל |
| משהו לא עובד כמו שצריך | הריצו `claude doctor` לאבחון בעיות |

---

## דרישות מערכת

- **מערכת הפעלה**: macOS 13.0+, Windows 10+ (עם Git Bash או WSL), Ubuntu 20.04+, Debian 10+
- **זיכרון RAM**: מינימום 4 GB
- **Shell**: מומלץ Bash או Zsh
- **אינטרנט**: נדרש (Claude Code מתחבר ל-API הענן של Claude)

---


הכל מוכן! נתראה בכיתה.
