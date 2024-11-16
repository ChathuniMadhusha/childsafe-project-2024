package lk.childsafe.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teacher_registration")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherRegistration {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "description")
    private String description;

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

    @ManyToOne
    @JoinColumn(name = "teacher_reg_status_id",referencedColumnName = "id")
    private TeacherRegStatus teacher_reg_status_id;



}
