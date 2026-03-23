using Hangfire;
using Hangfire.MemoryStorage;
using LogisticsTasks.Api.Services;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// 1. הגדרת ה-Rate Limiting (דרישה 2)
builder.Services.AddRateLimiter(options =>
{
    // הגדרת קוד השגיאה 
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddFixedWindowLimiter(policyName: "fixed", opt =>
    {
        opt.PermitLimit = 5;
        opt.Window = TimeSpan.FromMinutes(1);
        opt.QueueLimit = 0; // אל תכניס לתור בקשות שחרגו מהמכסה
    });
});

// 2. הגדרת התורים (דרישה 1) - כרגע בזיכרון
builder.Services.AddHangfire(config => config
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseMemoryStorage()); // כאן נחליף בעתיד ל-UseRedisStorage

builder.Services.AddHangfireServer();
builder.Services.AddControllers();

builder.Services.AddScoped<ILogisticsService, LogisticsService>();

var app = builder.Build();

app.UseRateLimiter();
app.UseHangfireDashboard(); // ממשק ניהול לתורים בכתובת /hangfire
app.MapControllers();

app.Run();