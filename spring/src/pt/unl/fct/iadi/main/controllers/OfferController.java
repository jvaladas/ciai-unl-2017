package pt.unl.fct.iadi.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.unl.fct.iadi.main.model.Offer;
import pt.unl.fct.iadi.main.services.OfferServiceImpl;

@RestController
@CrossOrigin
@RequestMapping(value="/offers")
public class OfferController {
	
	    @Autowired
	    OfferServiceImpl offers;

	    @RequestMapping(value="", method= RequestMethod.GET)
	    Offer[] getAll(@RequestParam(required=false, value="") String authorId) {
	        return authorId == null || authorId.equals("") // just in case
	                ?
	                		offers.findAll()
	                :
	                	offers.findWithAuthorId(Integer.parseInt(authorId));
	    }


	    @RequestMapping(value="", method = RequestMethod.POST)
	    void createOffer(@RequestBody Offer a) {
	    	Offer.valid(a);
	        offers.create(a);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.GET)
	    Offer showOffer(@PathVariable int id) {
	    	Offer a = offers.findById(id);
	        Preconditions.checkFound(a);

	        return a;
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
	    void updateOffer(@PathVariable int id, @RequestBody Offer a) {
	        Preconditions.checkCondition(a.getId()==id);
	        Offer a2 = offers.findById(id);
	    	Preconditions.checkFound(a2);
	    	Offer.valid(a);
	        
	        offers.update(a);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	    void deleteOffer(@PathVariable int id) {
	    	Offer a = offers.findById(id);
	        Preconditions.checkFound(a);
	        offers.remove(id);
	    }
	   
}