package lk.childsafe.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "parent")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Parent {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "mobile_number")
    private String mobile_number;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "parent_status_id",referencedColumnName = "id")
    private ParentStatus parent_status_id;

}
