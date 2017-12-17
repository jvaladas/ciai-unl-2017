package pt.unl.fct.iadi.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.unl.fct.iadi.main.model.Offer;
import pt.unl.fct.iadi.main.model.OfferRepository;

@Service
public class OfferServiceImpl implements OfferService {
	@Autowired
    OfferRepository repository;

    @Override
    public Offer[] findAll() {
        List<Offer> l = new ArrayList<Offer>();
        for(Offer a: repository.findAll()) {
        		l.add(a);
        }
        return l.toArray(new Offer[l.size()]);
    }

    @Override
    public Offer[] findWithAuthorId(int authorId) {
        return repository.findByAuthorId(authorId);
    }
 

    @Override
    public void create(Offer a) {
        repository.save(a); // generates automatically the id (see model class)
    }

    @Override
    public void update(Offer a) {
    	Offer tx = repository.findOne(a.getId());
        tx.setValue(a.getValue());
        tx.setDate(a.getDate());
        repository.save(tx);
    }

    @Override
    public Offer findById(int id) {
        return repository.findOne(id);
    }

    @Override
    public void remove(int id) {
    	Offer tx = repository.findOne(id);
        repository.delete(tx);
    }
}
