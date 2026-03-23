using Hangfire;
using LogisticsTasks.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("fixed")]
public class TasksController : ControllerBase
{
    private readonly IBackgroundJobClient _backgroundJobs;

    public TasksController(IBackgroundJobClient backgroundJobs)
    {
        _backgroundJobs = backgroundJobs;
    }

    [HttpPost]
    public IActionResult CreateTask([FromBody] string description)
    {
        if (string.IsNullOrEmpty(description)) return BadRequest("Description is required");

        _backgroundJobs.Enqueue<ILogisticsService>(service => service.ProcessUrgentTask(description));

        return Accepted(new { message = "Task queued successfully!" });
    }
}