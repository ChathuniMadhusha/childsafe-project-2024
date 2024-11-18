package lk.childsafe.Dao;

import lk.childsafe.Entity.StudentRegStatus;
import lk.childsafe.Entity.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StuClzStatusRepositiry extends JpaRepository <StudentRegStatus,Integer>{

}
