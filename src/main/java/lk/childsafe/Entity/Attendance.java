package lk.childsafe.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    @JoinColumn(name = "institute_implementation_id",referencedColumnName = "id")
    private Institute institute_implementation_id;

    @ManyToOne
    @JoinColumn(name = "class_implementation_id",referencedColumnName = "id")
    private ClassImplementation class_implementation_id;



}
