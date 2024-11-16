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
public class StudentClassRegistration {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "description")
    private String description;

    @Column(name = "class_code")
    private String class_code;


    @ManyToOne
    @JoinColumn(name = "stu_registration_status_id",referencedColumnName = "id")
    private StudentRegStatus stu_registration_status_id;

    @ManyToOne
    @JoinColumn(name = "institute_implementation_id",referencedColumnName = "id")
    private Institute institute_implementation_id;

    @ManyToOne
    @JoinColumn(name = "student_id",referencedColumnName = "id")
    private Student student_id;

    @ManyToOne
    @JoinColumn(name = "class_implementation_id",referencedColumnName = "id")
    private ClassImplementation class_implementation_id;





}
