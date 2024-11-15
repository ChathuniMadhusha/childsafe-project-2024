package lk.childsafe.Dao;

import lk.childsafe.Entity.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentstatusRepositiry extends JpaRepository <StudentStatus,Integer>{
}
