package lk.childsafe.Dao;

import lk.childsafe.Entity.Parent;
import lk.childsafe.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepositiry extends JpaRepository <Parent,Integer>{
}
