package pt.unl.fct.iadi.main.services;

import pt.unl.fct.iadi.main.model.Review;

public interface ReviewService {

	Review[] findAll();

	Review[] findWithDescription(String criteria);

    void create(Review a);

    void update(Review a);

    Review findById(int id);

    void remove(int id);

	Review[] findWithArticleId(int articleId);
	
    
}
