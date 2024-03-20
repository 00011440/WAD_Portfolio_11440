using DAL11440.Context;
using Entities11440.DTOs;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DAL11440.Repository
{
    public class PersonRepository : IGenericRepository<Person, PersonDTO>
    {
        private readonly MainDbContext _context;

        public PersonRepository(MainDbContext context)
        {
            _context = context;
        }

        public async Task Create(PersonDTO entity)
        {
            var person = new Person() { FirstName = entity.FirstName, LastName = entity.LastName };
            _context.People.Add(person);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(int id)
        {
            var person = await GetById(id);
            if (person == null)
            {
                throw new NullReferenceException();
            }
            _context.People.Remove(person);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Person>> GetAll()
        {
            return await _context.People.ToListAsync();
        }

        public async Task<Person?> GetById(int id)
        {
            return await _context.People.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Person> UpdateById(int id, PersonDTO entity)
        {
            var person = await GetById(id);
            if(person == null)
            {
                throw new NullReferenceException();
            }

            _context.Entry(person).State = EntityState.Modified;
            person.FirstName = entity.FirstName;
            person.LastName = entity.LastName;

            await _context.SaveChangesAsync();
            return await _context.People.FirstAsync(x => x.Id == id);
        }
    }
}
