package lk.childsafe.Dao;

import lk.childsafe.Entity.Institute;
import lk.childsafe.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstituteRepository extends JpaRepository <Institute,Integer>{
}
