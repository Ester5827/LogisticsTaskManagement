using System;
using System.Collections.Generic;
using System.Linq;

namespace LogisticsTasks.Api.Services
{
    public class LogAnalysisService
    {
        /// <summary>
        /// PART 3 - SECTION B: LINQ Implementation
        /// Returns the top 5 most repeated words (longer than 3 characters) from a list of logs.
        /// </summary>
        public List<string> GetTopRepeatedWords(List<string> logs)
        {
            if (logs == null || !logs.Any())
                return new List<string>();

            return logs
                .Where(word => !string.IsNullOrWhiteSpace(word) && word.Length > 3)
                .GroupBy(word => word.Trim().ToLower()) // טיפול ברווחים ורישיות (Case-Insensitive)
                .OrderByDescending(group => group.Count())
                .Take(5)
                .Select(group => group.Key)
                .ToList();
        }
    }
}