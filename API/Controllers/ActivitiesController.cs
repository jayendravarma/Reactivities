// using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediatro;
        public ActivitiesController(IMediator mediatro)
        {
            this._mediatro = mediatro;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediatro.Send(new List.Query());
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediatro.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediatro.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id , Edit.Command command)
        {
            command.Id=id;
            return await _mediatro.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediatro.Send(new Delete.Command{Id = id});
        }
    }
}