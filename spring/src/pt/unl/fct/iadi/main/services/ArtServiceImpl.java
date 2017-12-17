package pt.unl.fct.iadi.main.services;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.unl.fct.iadi.main.model.ArtPiece;
import pt.unl.fct.iadi.main.model.ArtRepository;





@Service
public class ArtServiceImpl implements ArtService {
	

		@Autowired
	    ArtRepository repository;

	    @Override
	    public ArtPiece[] findAll() {
	        List<ArtPiece> l = new ArrayList<ArtPiece>();
	        for(ArtPiece a: repository.findAll()) {
	        		l.add(a);
	        }
	        return l.toArray(new ArtPiece[l.size()]);
	    }

	    @Override
	    public ArtPiece[] findWithDescription(String description) {
	        return repository.findByDescription(description);
	    }

	    @Override
	    public void create(ArtPiece a) {
	        repository.save(a); // generates automatically the id (see model class)
	    }

	    @Override
	    public void update(ArtPiece a) {
	        ArtPiece tx = repository.findOne(a.getId());
	        tx.setDescription(a.getDescription());
	        tx.setCreationDate(a.getCreationDate());
	        repository.save(tx);
	    }

	    @Override
	    public ArtPiece findById(int id) {
	        return repository.findOne(id);
	    }

	    @Override
	    public void remove(int id) {
	        ArtPiece tx = repository.findOne(id);
	        repository.delete(tx);
	    }
}
