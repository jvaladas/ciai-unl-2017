package pt.unl.fct.iadi.main.services;

import pt.unl.fct.iadi.main.model.Offer;
import pt.unl.fct.iadi.main.model.Review;

public interface OfferService {

	Offer[] findAll();

    void create(Offer a);

    void update(Offer a);

    Offer findById(int id);

    void remove(int id);

    Offer[] findWithAuthorId(int authorId);
	
    
}
