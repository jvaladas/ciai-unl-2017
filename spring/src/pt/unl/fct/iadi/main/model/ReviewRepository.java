package pt.unl.fct.iadi.main.model;

import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review,Integer> {
    Review[] findByDescription(String desc);

	Review[] findByArticleId(int articleId);
}

