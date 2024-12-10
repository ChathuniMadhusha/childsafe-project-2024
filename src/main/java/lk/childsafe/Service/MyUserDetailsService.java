package lk.childsafe.Service;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.ParentRepository;
import lk.childsafe.Dao.UserRepository;
import lk.childsafe.Entity.Parent;
import lk.childsafe.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userDao;

    @Autowired
    ParentRepository parentDao;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {//link with WebConfig Username parameter

        User logeduser = userDao.findUserByUsername(username);

        if (logeduser != null) {

            // Check role
            boolean status = false;
            if (logeduser.getRole_id().getId() == 1) { // Student
                status = true;
                // status = logeduser.getStudent_id().getStudent_status_id().getId() != 3;
            } else if (logeduser.getRole_id().getId() == 2) { // Teacher
                status = true;
                //  status = logeduser.getTeacher_id().getTeacher_status_id().getId() != 3;
            } else if (logeduser.getRole_id().getId() == 3) { // Parent
                List<Parent> extParent = parentDao.getParentByNic(logeduser.getUsername());
                if (extParent.size() > 1){
                    for (Parent p : extParent) {
                        if (p.getParent_status_id().getId() == 1) {
                            status = true;
                        }
                    }
                }else {
                    status = logeduser.getParent_id().getParent_status_id().getId() == 1;
                }

            } else {
                status = true; // Admin role default to active
            }

            // Create authorities (only one role per user assumed)
            GrantedAuthority authority = new SimpleGrantedAuthority(logeduser.getRole_id().getName());
            List<GrantedAuthority> authorities = List.of(authority);

            // Return user details
            return new org.springframework.security.core.userdetails.User(
                    logeduser.getUsername(),
                    logeduser.getPassword(),
                    status, // User enabled status
                    true,   // Account not expired
                    true,   // Credentials not expired
                    true,   // Account not locked
                    authorities
            );

        }else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
