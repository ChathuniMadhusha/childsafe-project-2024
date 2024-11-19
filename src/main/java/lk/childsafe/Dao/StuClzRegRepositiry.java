package lk.childsafe.Dao;

import lk.childsafe.Entity.StudentClassRegistration;
import lk.childsafe.Entity.StudentRegStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StuClzRegRepositiry extends JpaRepository <StudentClassRegistration,Integer>{

}
