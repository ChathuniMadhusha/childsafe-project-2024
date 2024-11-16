package lk.childsafe.Dao;

import lk.childsafe.Entity.InstituteStatus;
import lk.childsafe.Entity.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutestatusRepository extends JpaRepository <InstituteStatus,Integer>{
}
