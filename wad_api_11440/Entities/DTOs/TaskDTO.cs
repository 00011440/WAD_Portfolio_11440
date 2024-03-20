using Models;

namespace Entities11440.DTOs
{
    public class TaskDTO
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required int PersonId { get; set; }
    }
}
