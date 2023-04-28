package app.service;

import app.model.BaseEntityModel;
import app.repository.RepositoryInterface;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@AllArgsConstructor
public abstract class GeneralService<E extends BaseEntityModel> implements ServiceInterface<E> {
  @Autowired
  private RepositoryInterface<E> repo;

  @Override
  public E save(E entity) {
    return repo.save(entity);
  }

  @Override
  public void delete(E entity) {
    repo.delete(entity);
  }

  @Override
  public List<E> findAll() {
    return repo.findAll();
  }

  @Override
  public void deleteById(Long id) {
    Optional<E> entityOpt = repo.findById(id);
    if (!entityOpt.isPresent()) {
      String msg = String.format("Entity with id %d was not found.", id);
      // throw new DataNotFoundException(msg);
    }

    delete(entityOpt.get());
  }

  @Override
  public Optional<E> findById(Long id) {
    return repo.findById(id);
  }

  @Override
  public E getOne(Long id) {
    return repo.getById(id);
  }

//  @Override
//  public E findEntityById(Long id) {
//    return repo.findEntityById(id);
//  }

  @Override
  public List<E> findAllById(Iterable<Long> listOfIds) {
    return repo.findAllById(listOfIds);
  }


}
