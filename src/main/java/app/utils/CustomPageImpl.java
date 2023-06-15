package app.utils;

import app.annotations.Marker;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

public class CustomPageImpl<T> implements Page<T> {

  private Page<T> pageObj;

  public CustomPageImpl(Page<T> pageObj) {
    this.pageObj = pageObj;
  }

  @JsonView({Marker.ChatDetails.class, Marker.Preview.class})
  @Override
  public int getNumber() {
    return pageObj.getNumber();
  }

  @Override
  public int getSize() {
    return pageObj.getSize();
  }

  @JsonView({Marker.ChatDetails.class, Marker.Preview.class})
  @Override
  public int getNumberOfElements() {
    return pageObj.getNumberOfElements();
  }

  @JsonView({Marker.ChatDetails.class, Marker.Preview.class})
  @Override
  public List<T> getContent() {
    return pageObj.getContent();
  }

  @Override
  public boolean hasContent() {
    return pageObj.hasContent();
  }

  public Sort getSort() {
    return pageObj.getSort();
  }

  @JsonView({Marker.ChatDetails.class, Marker.Preview.class})
  @Override
  public boolean isFirst() {
    return pageObj.isFirst();
  }

  @JsonView({Marker.ChatDetails.class, Marker.Preview.class})
  @Override
  public boolean isLast() {
    return pageObj.isLast();
  }

  @Override
  public boolean hasNext() {
    return pageObj.hasNext();
  }

  @Override
  public boolean hasPrevious() {
    return pageObj.hasPrevious();
  }

  @Override
  public Pageable nextPageable() {
    return pageObj.nextPageable();
  }


  @Override
  public Pageable previousPageable() {
    return pageObj.previousPageable();
  }

  @Override
  public Iterator<T> iterator() {
    return pageObj.iterator();
  }

  @JsonView({Marker.ChatDetails.class, Marker.Preview.class})
  @Override
  public int getTotalPages() {
    return pageObj.getTotalPages();
  }

  @JsonView({Marker.ChatDetails.class, Marker.Preview.class})
  @Override
  public long getTotalElements() {
    return pageObj.getTotalElements();
  }

  @Override
  public <U> Page<U> map(Function<? super T, ? extends U> converter) {
    return null;
  }
}