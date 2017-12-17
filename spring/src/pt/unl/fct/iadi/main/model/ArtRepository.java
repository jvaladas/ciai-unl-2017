package pt.unl.fct.iadi.main.model;

import org.springframework.data.repository.CrudRepository;

public interface ArtRepository extends CrudRepository<ArtPiece,Integer> {
    ArtPiece[] findByDescription(String desc);
}