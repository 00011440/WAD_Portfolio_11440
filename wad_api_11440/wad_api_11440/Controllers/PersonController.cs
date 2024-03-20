using DAL11440.Repository;
using Entities11440.DTOs;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Threading.Tasks;

namespace API11440.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IGenericRepository<Person, PersonDTO> _repository;

        public PersonController(IGenericRepository<Person, PersonDTO> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetPeople()
        {
            return Ok(await _repository.GetAll());
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetPersonById(int id)
        {
            var person = await _repository.GetById(id);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePerson(PersonDTO person)
        {
            try
            {
                await _repository.Create(person);
                return Ok(person);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("id")]
        public async Task<IActionResult> EditPerson(int id, PersonDTO person)
        {
            try
            {
                return Ok(await _repository.UpdateById(id, person));
            }
            catch (NullReferenceException)
            {
                return NotFound($"Person with id {id} was not found");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("id")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            try
            {
                await _repository.DeleteById(id);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound($"Person with id {id} was not found");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
