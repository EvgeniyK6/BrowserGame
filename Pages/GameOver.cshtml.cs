using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BrowserGame.Pages
{
    public class GameOverModel : PageModel
    {
        public string fileName { get; set; } = @"C:\EvgeniyPrograms\BrowserGame\Scores.txt";
        public void OnGet()
        {
        }

        public void OnPost()
        {
            var score = HttpContext.Request.Form["score"];
            var date = DateTime.Now;
            
            using (StreamWriter writer = new StreamWriter(fileName, true))
            {
                writer.WriteLine($"Date: {date}, score: {score}");
            }
        }
    }
}
