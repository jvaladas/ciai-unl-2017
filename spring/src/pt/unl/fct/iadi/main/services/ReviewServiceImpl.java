package pt.unl.fct.iadi.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.unl.fct.iadi.main.model.Review;
import pt.unl.fct.iadi.main.model.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {
	@Autowired
    ReviewRepository repository;

    @Override
    public Review[] findAll() {
        List<Review> l = new ArrayList<Review>();
        for(Review a: repository.findAll()) {
        		l.add(a);
        }
        return l.toArray(new Review[l.size()]);
    }

    @Override
    public Review[] findWithDescription(String description) {
        return repository.findByDescription(description);
    }
    
    @Override 
    public Review[] findWithArticleId(int articleId) {
    	return repository.findByArticleId(articleId);
    }

    @Override
    public void create(Review a) {
        repository.save(a); // generates automatically the id (see model class)
    }

    @Override
    public void update(Review a) {
    	Review tx = repository.findOne(a.getId());
        tx.setDescription(a.getDescription());
        tx.setDate(a.getDate());
        repository.save(tx);
    }

    @Override
    public Review findById(int id) {
        return repository.findOne(id);
    }

    @Override
    public void remove(int id) {
    	Review tx = repository.findOne(id);
        repository.delete(tx);
    }
}
