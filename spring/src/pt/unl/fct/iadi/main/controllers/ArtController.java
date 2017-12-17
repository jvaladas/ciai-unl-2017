package pt.unl.fct.iadi.main.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.unl.fct.iadi.main.model.ArtPiece;
import pt.unl.fct.iadi.main.model.Task;
import pt.unl.fct.iadi.main.services.ArtServiceImpl;
import pt.unl.fct.iadi.main.services.TaskService;


@RestController
@CrossOrigin
@RequestMapping(value="/articles")
public class ArtController {
	
	    @Autowired
	    ArtServiceImpl arts;

	    @RequestMapping(value="", method= RequestMethod.GET)
	    ArtPiece[] getAll(@RequestParam(required=false, value="") String search) {
	        return search == null || search.equals("") // just in case
	                ?
	                arts.findAll()
	                :
	                arts.findWithDescription(search);
	    }


	    @RequestMapping(value="", method = RequestMethod.POST)
	    void createArt(@RequestBody ArtPiece a) {
	        ArtPiece.valid(a);
	        arts.create(a);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.GET)
	    ArtPiece showArt(@PathVariable int id) {
	        ArtPiece a = arts.findById(id);
	        Preconditions.checkFound(a);

	        return a;
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
	    void updateArt(@PathVariable int id, @RequestBody ArtPiece a) {
	        Preconditions.checkCondition(a.getId()==id);
	    	ArtPiece a2 = arts.findById(id);
	    	Preconditions.checkFound(a2);
	        ArtPiece.valid(a);
	        
	        arts.update(a);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	    void deleteArt(@PathVariable int id) {
	        ArtPiece a = arts.findById(id);
	        Preconditions.checkFound(a);
	        arts.remove(id);
	    }
	
}
