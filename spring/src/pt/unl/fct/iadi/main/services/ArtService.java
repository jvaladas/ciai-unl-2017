package pt.unl.fct.iadi.main.services;

import pt.unl.fct.iadi.main.model.ArtPiece;

public interface ArtService {

	ArtPiece[] findAll();

    ArtPiece[] findWithDescription(String criteria);

    void create(ArtPiece a);

    void update(ArtPiece a);

    ArtPiece findById(int id);

    void remove(int id);
	
}
