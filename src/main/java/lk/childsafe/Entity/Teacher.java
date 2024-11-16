package lk.childsafe.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "teacher")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "address")
    private String address;

    @Column(name = "contact_number")
    private String contact_number;

    @Column(name = "mobile_number")
    private String mobile_number;

    @Column(name = "nic")
    private String nic;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "email")
    private String email;


    @ManyToOne
    @JoinColumn(name = "teacher_status_id",referencedColumnName = "id")
    private TeacherStatus teacher_status_id;



}
