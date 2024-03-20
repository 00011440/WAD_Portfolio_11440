using DAL11440.Context;
using Entities11440.DTOs;
using Microsoft.EntityFrameworkCore;
using Models;
using System;

namespace DAL11440.Repository
{
    public class TaskRepository : IGenericRepository<ToDoTask, TaskDTO>
    {
        private readonly MainDbContext _context;

        public TaskRepository(MainDbContext context)
        {
            _context = context;
        }

        public async Task Create(TaskDTO entity)
        {
            var person = await _context.People.FirstOrDefaultAsync(p => entity.PersonId == p.Id);

            if (person == null)
                throw new NullReferenceException(nameof(person));

            var task = new ToDoTask()
            {
                Title = entity.Title,
                Description = entity.Description,
                Person = person
            };

            _context.Tasks.Add(task);
        }

        public async Task DeleteById(int id)
        {
            var task = await GetById(id);
            if (task == null)
            {
                throw new NullReferenceException(nameof(task));
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ToDoTask>> GetAll()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<ToDoTask?> GetById(int id)
        {
            return await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ToDoTask> UpdateById(int id, TaskDTO entity)
        {
            var task = await GetById(id);
            var person = await _context.People.FirstOrDefaultAsync(p => entity.PersonId == p.Id);

            if (task == null)
            {
                throw new NullReferenceException(nameof(task));
            }

            _context.Entry(task).State = EntityState.Modified;

            task.Title = entity.Title;
            task.Description = entity.Description;

            if (person != null)
                task.Person = person;

            await _context.SaveChangesAsync();
            return await _context.Tasks.FirstAsync(t => t.Id == id);
        }
    }
}
