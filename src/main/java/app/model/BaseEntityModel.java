package app.model;

import app.utils.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.io.Serializable;

@MappedSuperclass
@Getter
@NoArgsConstructor
public abstract class BaseEntityModel extends Auditable<String> implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "custom_gen")
  @Column(name = "id", nullable = false, insertable = false, updatable = false)
  private Long id;
}
