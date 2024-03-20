using Microsoft.EntityFrameworkCore;
using Models;

namespace DAL11440.Context
{
    public class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {

        }

        public DbSet<Person> People { get; set; }
        public DbSet<ToDoTask> Tasks { get; set; }
    }
}
