using LogisticsTasks.Api.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace LogisticsTasks.UnitTests
{
    public class LogisticsServiceTests
    {
        private readonly Mock<ILogger<LogisticsService>> _loggerMock;
        private readonly LogisticsService _service;

        public LogisticsServiceTests()
        {
            _loggerMock = new Mock<ILogger<LogisticsService>>();
            _service = new LogisticsService(_loggerMock.Object);
        }

        [Fact]
        public void ProcessUrgentTask_ShouldLogInformation()
        {
            // Arrange
            var taskDescription = "משימה לבדיקה";

            // Act
            _service.ProcessUrgentTask(taskDescription);

            // Assert
            _loggerMock.Verify(
                x => x.Log(
                    LogLevel.Information,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains(taskDescription)),
                    It.IsAny<Exception>(),
                    It.Is<Func<It.IsAnyType, Exception, string>>((v, t) => true)),
                Times.AtLeastOnce);
        }
    }
}