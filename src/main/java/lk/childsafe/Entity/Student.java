package lk.childsafe.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Student {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "studentid")
    private String studentid;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "mobile_number")
    private String mobile_number;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "st_password")
    private String st_password;

    @ManyToOne
    @JoinColumn(name = "student_status_id",referencedColumnName = "id")
    private StudentStatus student_status_id;

    public Student(Integer id,String studentid, String first_name){
        this.id = id;
        this.studentid = studentid;
        this.first_name = first_name;

    }
    

}
