package lk.childsafe.Dao;

import lk.childsafe.Entity.Role;
import lk.childsafe.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository <Role,Integer>{

}
