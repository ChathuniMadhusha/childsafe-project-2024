package lk.childsafe.Dao;

import lk.childsafe.Entity.Grade;
import lk.childsafe.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <User,Integer>{

}
