package lk.childsafe.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stu_class_registration")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentClassRegistration {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "stu_class_code")
    private String stu_class_code;

    @ManyToOne
    @JoinColumn(name = "student_id",referencedColumnName = "id")
    private Student student_id;


    @ManyToOne
    @JoinColumn(name = "class_implementation_id",referencedColumnName = "id")
    private ClassImplementation class_implementation_id;


    @ManyToOne
    @JoinColumn(name = "registration_status_id",referencedColumnName = "id")
    private StudentRegStatus registration_status_id;


}
