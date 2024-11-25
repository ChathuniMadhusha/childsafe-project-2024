package lk.childsafe.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "attendance_has_student")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Attendance_Has_Student {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "present_or_absent")
    private Boolean present_or_absent;

    @ManyToOne //(optional = true)
    @JoinColumn(name = "attendance_id",referencedColumnName = "id")
    @JsonIgnore
    private Attendance attendance_id;

    @ManyToOne //(optional = true)
    @JoinColumn(name = "student_id",referencedColumnName = "id")
    private Student student_id;



}
