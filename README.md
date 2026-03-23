# Logistics Task Management System 
 Author: אסתר בירנצוויג

מערכת מקצה לקצה לניהול משימות לוגיסטיות בזמן אמת, הכוללת Backend מבוסס תורים ו-Frontend אופטימיזציוני.

---

## 🛠 טכנולוגיות בשימוש (Stack)

### Backend (.NET):
- **Framework:** .NET 9.0 (Web API)
- **Background Jobs:** Hangfire (Queue Management)
- **Security:** ASP.NET Core Rate Limiting
- **Testing:** xUnit & Moq
- **Logic:** LINQ for advanced data processing

### Frontend (Angular):
- **Framework:** Angular 17/18
- **Performance:** CDK Virtual Scroll
- **State Management:** RxJS (Observables & Subjects)
- **Change Detection:** OnPush Strategy

---

## 🏗 ארכיטקטורה ומימוש

### 1. צד שרת (Backend)
- **Async Queuing:** מימוש מנגנון תורים באמצעות **Hangfire**. 
  המערכת מוגדרת כרגע לעבודה עם **In-Memory Storage** 
  עקב מגבלות סביבת פיתוח, 
  אך תוכננה למעבר מהיר ל **Redis** בסביבת Production.
- **Rate Limiting:** הגדרת פוליסת **Fixed Window** (עד 5 בקשות לדקה לכל Endpoint) למניעת הצפות.
- **LINQ Implementation:** מימוש פונקציית `GetTopRepeatedWords`
  המנתחת לוגים ושולפת את המילים השכיחות ביותר (מעל 3 תווים) ביעילות.

### 2. צד לקוח (Frontend)
- **Virtual Scrolling:** הצגת 100+ משימות בצורה אופטימיזציונית באמצעות **CDK Virtual Scroll**,
  המרנדר רק את האלמנטים הנראים לעין.

- **Real-time Simulation:** סימולציית **WebSocket** 
- המעדכנת סטטוסים של משימות באופן אסינכרוני ללא רענון עמוד.

- **Memory Management:** טיפול ב-**Memory Leaks** על ידי שימוש בתבנית `takeUntil(destroy$)`
- לסגירת Subscriptions בעת השמדת קומפוננטות.

- **Performance:** שימוש ב-`OnPush` Change Detection למניעת רינדורים מיותרים.

---

## 🧠 חלק 3: פתרון בעיות ותיקוני באגים (Bug Fixes)

### א. Angular Memory Leak
בקטע הקוד שניתן, ה-Subscription נשאר פתוח גם לאחר סגירת הקומפוננטה.
- **התיקון:** מימשתי את ממשק `OnDestroy` והוספתי אופרטור `takeUntil` המבטיח ניקוי זיכרון מלא.
- **מיקום:** ניתן למצוא את המימוש ב-`vehicle-monitor.component.ts`.

### ב. LINQ Analysis
נדרשתי למצוא את 5 המילים השכיחות ביותר מעל 3 אותיות מתוך רשימת מחרוזות.
- **התיקון:** שימוש ב-`Where`, `GroupBy`, `OrderByDescending` ו-`Take(5)`.
- **מיקום:** הקוד נמצא תחת `LogisticsTasks.Api/Services/LogAnalysisService.cs` ב-Backend.

---

## 📝 חלק 4: שאלות ותשובות (Q&A)

### 1. גילוי פרצת אבטחה בספריית NPM ללא עדכון גרסה זמין
במקרה כזה אפעל לפי השלבים הבאים:
* **Usage Check:** בדיקה האם הפרויקט שלי באמת משתמש בחלק הפגיע (Vulnerable) של הספרייה. 
  אם לא, הסיכון נמוך יותר אך עדיין דורש טיפול.
* **Workaround:** חיפוש מעקף בקהילת המפתחים או ב-GitHub Issues של הספרייה.
* **Patching:** שימוש בכלי כמו `patch-package` לתיקון ידני של התיקייה בתוך `node_modules` ושמירת התיקון ב-Git.
* **Replacement:** אם הפרצה קריטית ואין פתרון באופק, אשקול מעבר לספרייה חלופית יציבה יותר.

### 2. המערכת עובדת לאט מאוד בשעות שיא (08:00 בבוקר)
* **פתרון טכני:** הגדרת **Auto-scaling** בשרתים להוספת מופעי API נוספים באופן דינמי, ושימוש ב-
* **Caching** שימוש ב-Redis לנתונים שנקראים בתדירות גבוהה כדי להוריד עומס ממסד הנתונים.
* **פתרון תהליכי:** העברת פעולות "כבדות" (כמו הפקת דוחות או חישובים) לעיבוד רקע 
  (Offloading) באמצעות **Hangfire**,
  כך שהמשתמש מקבל תגובה מהירה והתהליך מסתיים בתור נפרד מבלי לעכב את שאר המשתמשים.

---

## 🚀 איך להריץ?
1. **Backend:** פתח/י את ה-Solution ב-Visual Studio והרץ/י (F5). ה-Dashboard זמין בכתובת `/hangfire`.
2. **Frontend:** נווט/י לתיקיית `logistics-tasks-app` והרץ/י `npm install` ולאחר מכן `ng serve`.
3. **API Testing:** ניתן להשתמש בקובץ ה-`.http` המצורף בפרויקט ה-Backend או ב-Postman.
