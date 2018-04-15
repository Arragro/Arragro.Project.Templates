using System.ComponentModel.DataAnnotations;

namespace dotnet.ts.react.redux.Models
{

    public class TodoModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Text { get; set; }
        public bool Completed { get; set; }
    }
}