package lk.childsafe.Dao;

import lk.childsafe.Entity.Grade;
import lk.childsafe.Entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository <Subject,Integer>{
}
