package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.*;
import lk.childsafe.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/parent")
public class ParentController {


    @Autowired
    ParentRepository parentDao;

    @Autowired
    ParentstatusRepository parentstatusDao;

    @Autowired
    StudentRepositiry studentDao;

    @Autowired
    UserRepository userDao;

    @Autowired
    RoleRepository roleDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView parentUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("parent.html");
        return modelandview;
    }



    @GetMapping(value = "/findall", produces = "application/json")
    public List<Parent> parent() {
        return parentDao.findAll();
    }

    //get mapping service for get student by given quary variable id[/student/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public Parent getParentByQPId(@RequestParam("id") Integer id){
        return parentDao.getReferenceById(id);
    }

    //get parent by NIC
    @GetMapping (value = "/getbynic",produces = "application/json")
    public Parent getByNic(@RequestParam("nic") String nic){
        return parentDao.findParentByNic(nic);}


    @PostMapping
    public String addParent(@RequestBody Parent parent){

        Parent activeParent = parentDao.findActiveParentByStudentid(parent.getStudent_id().getStudentid());

        if (activeParent != null) {
            // Parent with student ID exists and is active
            return "Parent insert not complete: Student ID is already linked to an active parent";
        }

        // Proceed with saving if no active parent is found
        try {
            parentDao.save(parent);

            if (parent.getAccountreq()){
                //create user
                User user = new User();
                user.setUsername(parent.getNic());
                user.setPassword(parent.getPr_password());
                user.setParent_id(parent);
                user.setRole_id(roleDao.getReferenceById(3));
                userDao.save(user);
            }

            return "0";
        } catch (Exception e) {
            return "Parent Add not complete: " + e.getMessage();
        }

//        //check duplicate studentID
//        Student extStudentByName = studentDao.findStudentByStudentid(parent.getStudent_id().getStudentid());
//        if(extStudentByName != null) {
//            return "Parent insert not complete:Student ID already exist";
//        }
//
//        try{
//            //save
//            parentDao.save(parent);
//            return "0";
//
//        }catch(Exception e){
//            return "Parent Add not complete :" + e.getMessage();
//        }

    }

    //Update section
    @PutMapping
    public String putParent(@RequestBody Parent parent){
        //check privilage

        //save operate
        try {
            parentDao.save(parent);
            return "0";
        }catch(Exception e){
            return "Parent Update not complete :" + e.getMessage();
        }
    }


    //create delete mapping
    @DeleteMapping
    public String deleteParent(@RequestBody Parent parent){
        Parent extparent = parentDao.getReferenceById(parent.getId());
        if(extparent != null){
            try {

                extparent.setParent_status_id(parentstatusDao.getReferenceById(2));
                parentDao.save(extparent);

                return "0";

            }catch (Exception e){
                return "Delete not complete :"+e.getMessage();
            }
        }else {
            return "Delete not complete : Teacher not exist";
        }


    }
}
