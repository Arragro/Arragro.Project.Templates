using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using dotnet.ts.react.redux.Models;
using Microsoft.AspNetCore.Mvc;

namespace dotnet.ts.react.redux.Controllers 
{
    
    [Route("api/[controller]")]
    public class TodoController : Controller 
    {
        private static readonly ConcurrentDictionary<int, TodoModel> _todos = new ConcurrentDictionary<int, TodoModel>(new Dictionary<int, TodoModel>
        {
             
            {
                1, 
                new TodoModel
                {
                    Id = 1,
                    Text = "Use Redux",
                    Completed = false
                }
            },
            {
                2,
                new TodoModel
                {
                    Id = 2,
                    Text = "With state in DotnetCore ASPNET API",
                    Completed = false
                }
            }
        });

        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(_todos.Select(x => x.Value).OrderBy(x => x.Id));
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult Get(int id)
        {
            TodoModel output;
            if (!_todos.TryGetValue(id, out output))
                return NotFound();
            return Json(output);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TodoModel todoModel)
        {
            if (todoModel == null || id != todoModel.Id)
                return BadRequest();

            if (_todos.ContainsKey(id))
            {
                 if (_todos.TryUpdate(id, todoModel, _todos[id]))
                    return Json(todoModel);
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Post([FromBody] TodoModel todoModel)
        {
            var id = _todos.Keys.Count + 1;
            todoModel.Id = id;
            if (_todos.TryAdd(todoModel.Id, todoModel))
            {
                return Json(todoModel);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            TodoModel output;
            if (_todos.TryRemove(id, out output))
                return Json(output);
            return BadRequest();
        }

        [HttpPut("complete/{id}")]
        public IActionResult Complete(int id, [FromBody] TodoModel todoModel)
        {
            if (!todoModel.Completed)
                return BadRequest();
            
            return this.Put(id, todoModel);
        }

        [HttpPut("complete/all")]
        public IActionResult CompleteAll()
        {
            foreach (var key in _todos.Keys)
            {
                _todos[key].Completed = true;
            }
            return GetAll();
        }

        [HttpDelete("clear-completed")]
        public IActionResult ClearCompleted()
        {
            foreach (var key in _todos.Keys)
            {
                TodoModel output;
                if (!_todos.TryRemove(key, out output))
                    return BadRequest();
            }
            return GetAll();
        }
    }
}