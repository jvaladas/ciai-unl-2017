package pt.unl.fct.iadi.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.unl.fct.iadi.main.model.User;
import pt.unl.fct.iadi.main.services.UserService;

@RestController
@CrossOrigin
@RequestMapping(value="/users")
public class UserController {


	// Inspired in: https://spring.io/guides/gs/rest-service/

	
	    @Autowired
	    UserService users;

	    @RequestMapping(value="", method= RequestMethod.GET)
	    User[] getAll(@RequestParam(required=false, value="") String search) {
	        return search == null || search.equals("") // just in case
	                ?
	                users.findAll()
	                :
	                users.findWithDescription(search);
	    }


	    @RequestMapping(value="", method = RequestMethod.POST)
	    void createUser(@RequestBody User t) {
	        User.valid(t);
	        users.create(t);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.GET)
	    User showUser(@PathVariable int id) {
	        User u = users.findById(id);
	        Preconditions.checkFound(u);

	        return u;
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
	    void updateUser(@PathVariable int id, @RequestBody User u) {
	        Preconditions.checkCondition(u.getId()==id);
	    	User u2 = users.findById(id);
	    	Preconditions.checkFound(u2);
	        User.valid(u);
	        
	        users.update(u);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	    void deleteUser(@PathVariable int id) {
	        User u = users.findById(id);
	        Preconditions.checkFound(u);
	        users.remove(id);
	    }
	
}
