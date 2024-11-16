package lk.childsafe.Dao;

import lk.childsafe.Entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository extends JpaRepository <Parent,Integer>{
}
