package pt.unl.fct.iadi.main.model;

import org.springframework.data.repository.CrudRepository;

public interface OfferRepository extends CrudRepository<Offer,Integer> {
    Offer[] findByAuthorId(int authorId);
}
