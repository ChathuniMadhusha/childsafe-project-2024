package lk.childsafe.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "class_implementation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassImplementation {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "class_name")
    private String class_name;

    @Column(name = "class_code")
    private String class_code;


    @ManyToOne
    @JoinColumn(name = "grade_id",referencedColumnName = "id")
    private Grade grade_id;

    @ManyToOne
    @JoinColumn(name = "institute_implementation_id",referencedColumnName = "id")
    private Institute institute_implementation_id;

    @ManyToOne
    @JoinColumn(name = "teacher_id",referencedColumnName = "id")
    private Teacher teacher_id;

    @ManyToOne
    @JoinColumn(name = "subject_id",referencedColumnName = "id")
    private Subject subject_id;



}
