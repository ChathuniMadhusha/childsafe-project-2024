package lk.childsafe.Dao;

import lk.childsafe.Entity.Grade;
import lk.childsafe.Entity.InstituteStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository <Grade,Integer>{
}
