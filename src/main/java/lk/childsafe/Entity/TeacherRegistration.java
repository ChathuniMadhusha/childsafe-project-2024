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

    @Column(name = "teacher_reg_code")
    private String teacher_reg_code;

    @ManyToOne
    @JoinColumn(name = "teacher_id",referencedColumnName = "id")
    private Teacher teacher_id;

    @ManyToOne
    @JoinColumn(name = "class_implementation_id",referencedColumnName = "id")
    private ClassImplementation class_implementation_id;

    @ManyToOne
    @JoinColumn(name = "teacher_reg_status_id",referencedColumnName = "id")
    private TeacherRegStatus teacher_reg_status_id;


    public TeacherRegistration(Long id){
        this.teacher_reg_code = id.toString();
    }



}
