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
import pt.unl.fct.iadi.main.model.Review;
import pt.unl.fct.iadi.main.services.ArtServiceImpl;
import pt.unl.fct.iadi.main.services.ReviewServiceImpl;


@RestController
@CrossOrigin
@RequestMapping(value="/reviews")
public class ReviewController {
	
	    @Autowired
	    ReviewServiceImpl reviews;

	    @RequestMapping(value="", method= RequestMethod.GET)
	    Review[] getAll(@RequestParam(required=false, value="") String articleId) {
	        return articleId == null || articleId.equals("") // just in case
	                ?
	                		reviews.findAll()
	                :
	                	reviews.findWithArticleId(Integer.parseInt(articleId));
	    }


	    @RequestMapping(value="", method = RequestMethod.POST)
	    void createReview(@RequestBody Review a) {
	        Review.valid(a);
	        reviews.create(a);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.GET)
	    Review showReview(@PathVariable int id) {
	        Review a = reviews.findById(id);
	        Preconditions.checkFound(a);

	        return a;
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
	    void updateReview(@PathVariable int id, @RequestBody Review a) {
	        Preconditions.checkCondition(a.getId()==id);
	    	Review a2 = reviews.findById(id);
	    	Preconditions.checkFound(a2);
	        Review.valid(a);
	        
	        reviews.update(a);
	    }


	    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	    void deleteReview(@PathVariable int id) {
	        Review a = reviews.findById(id);
	        Preconditions.checkFound(a);
	        reviews.remove(id);
	    }
	   
	    
	
}
