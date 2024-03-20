using DAL11440.Repository;
using Entities11440.DTOs;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Threading.Tasks;

namespace API11440.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IGenericRepository<ToDoTask, TaskDTO> _repository;

        public TaskController(IGenericRepository<ToDoTask, TaskDTO> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            return Ok(await _repository.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _repository.GetById(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskDTO task)
        {
            try
            {
                await _repository.Create(task);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound($"Person with id {task.PersonId} was not found");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTask(int id, TaskDTO task)
        {
            try
            {
                return Ok(await _repository.UpdateById(id, task));
            }
            catch (NullReferenceException)
            {
                return NotFound($"Task with id {id} was not found");
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskById(int id)
        {
            try
            {
                await _repository.DeleteById(id);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound($"Task with id {id} was not found");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
