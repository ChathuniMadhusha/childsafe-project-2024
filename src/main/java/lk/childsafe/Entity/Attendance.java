package lk.childsafe.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "attendance")

@NoArgsConstructor
@AllArgsConstructor

@Setter
@Getter




public class Attendance {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "reg_count")
    private String reg_count;

    @Column(name = "absent_count")
    private String absent_count;

    @Column(name = "present_count")
    private String present_count;

    @ManyToOne
    @JoinColumn(name = "class_implementation_id",referencedColumnName = "id")
    private ClassImplementation class_implementation_id;

    @OneToMany(mappedBy = "attendance_id",cascade = CascadeType.ALL,orphanRemoval=true)
    List<Attendance_Has_Student> attendance_has_students;



}
