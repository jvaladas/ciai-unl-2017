package pt.unl.fct.iadi.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.unl.fct.iadi.main.model.Task;
import pt.unl.fct.iadi.main.services.TaskService;

// Inspired in: https://spring.io/guides/gs/rest-service/

@RestController
@RequestMapping(value="/tasks")
public class TasksController {

    @Autowired
    TaskService tasks;

    @RequestMapping(value="", method= RequestMethod.GET)
    Task[] getAll(@RequestParam(required=false, value="") String search) {
        return search == null || search.equals("") // just in case
                ?
                tasks.findAll()
                :
                tasks.findWithDescription(search);
    }


    @RequestMapping(value="", method = RequestMethod.POST)
    void createTask(@RequestBody Task t) {
        Task.valid(t);
        tasks.create(t);
    }


    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    Task showTask(@PathVariable int id) {
        Task t = tasks.findById(id);
        Preconditions.checkFound(t);

        return t;
    }


    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    void updateTask(@PathVariable int id, @RequestBody Task t) {
        Preconditions.checkCondition(t.getId()==id);
    	Task t2 = tasks.findById(id);
    	Preconditions.checkFound(t2);
        Task.valid(t);
        
        tasks.update(t);
    }


    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    void deleteTask(@PathVariable int id) {
        Task t = tasks.findById(id);
        Preconditions.checkFound(t);
        tasks.remove(id);
    }
}
