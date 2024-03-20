namespace Entities11440;

public class ToDoTask
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required Person Person { get; set; }
}