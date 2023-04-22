package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BaseEntityModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(
            name = "sequence-generator",
            sequenceName = "id_seq",
            allocationSize = 1
    )
    @Column(name = "id")
    private Long id;
    @Column(name = "created at", nullable = true)
    private LocalDateTime created_at;
    @Column(name = "updated at", nullable = true)
    private LocalDateTime updated_at;
    @Column(name = "created by", nullable = true)
    private Long created_by;
    @Column(name = "updated by", nullable = true)
    private Long updated_by;
}
