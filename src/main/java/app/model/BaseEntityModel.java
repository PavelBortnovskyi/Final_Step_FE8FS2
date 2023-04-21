package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.lang.Nullable;

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
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "created at")
    @Nullable
    private LocalDateTime created_at;

    @Column(name = "updated at")
    @Nullable
    private LocalDateTime updated_at;

    @Column(name = "created by")
    @Nullable
    private Long created_by;

    @Column(name = "updated by")
    @Nullable
    private long updated_by;
}
