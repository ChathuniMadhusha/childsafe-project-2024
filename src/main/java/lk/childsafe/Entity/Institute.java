package lk.childsafe.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "institute_implementation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Institute {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Inst_name")
    private String Inst_name;

    @Column(name = "location")
    private String location;

    @Column(name = "contact_number")
    private String contact_number;

    @Column(name = "email")
    private String email;


    @ManyToOne
    @JoinColumn(name = "status_id",referencedColumnName = "id")
    private InstituteStatus status_id;



}
