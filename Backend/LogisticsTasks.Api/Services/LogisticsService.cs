namespace LogisticsTasks.Api.Services
{
    public interface ILogisticsService
    {
        void ProcessUrgentTask(string taskDescription);
    }

    public class LogisticsService : ILogisticsService
    {
        private readonly ILogger<LogisticsService> _logger;

        public LogisticsService(ILogger<LogisticsService> logger)
        {
            _logger = logger;
        }

        public void ProcessUrgentTask(string taskDescription)
        {
            // כאן תתבצע הלוגיקה ה"כבדה" (למשל שמירה ל-DB)
            // כרגע נסתפק ברישום ל-Log כדי לראות שזה עובד
            _logger.LogInformation($"[Worker] Starting to process: {taskDescription}");

            // נדמה עבודה כבדה של 15 שניות
            Thread.Sleep(15000);

            _logger.LogInformation($"[Worker] Task completed: {taskDescription}");
        }
    }
}