package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.ParentstatusRepository;
import lk.childsafe.Dao.TeacherRepository;
import lk.childsafe.Dao.TeacherstatusRepository;
import lk.childsafe.Entity.ParentStatus;
import lk.childsafe.Entity.Student;
import lk.childsafe.Entity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/teacher")
public class TeacherController {


    @Autowired
    private TeacherRepository teacherDao;

    @Autowired
    private TeacherstatusRepository teacherstatusDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView teacherUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("Teacher.html");
        return modelandview;
    }

    //get all
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Teacher> teacher() {return teacherDao.findAll();}

    //get mapping service for get teacher by given quary variable id[/teacher/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public Teacher getTeacherByQPId(@RequestParam("id") Integer id){
        return teacherDao.getReferenceById(id);
    }


    //get tecaher's first name
    @GetMapping (value = "/getbyteacherid",produces = "application/json")
    public Teacher getByTeacherId(@RequestParam("teacherid") String teacherid){
        return teacherDao.findTeacherByTeacherID(teacherid);}


    //Add section
    @PostMapping
    @Transactional
    public String addTeacher(@RequestBody Teacher teacher){

        try{
            //set auto value
            teacher.setTeacherid(teacherDao.nexTeCode());


            //save
            teacherDao.save(teacher);
            return "0";

        }catch(Exception e){
            return "Teacher Add not complete :" + e.getMessage();
        }

    }

    //Update section
    @PutMapping
    @Transactional
    public String putTeacher(@RequestBody Teacher teacher){
        //check privilage

        //save operate
        try {
            teacherDao.save(teacher);
            return "0";
        }catch(Exception e){
            return "Teacher Update not complete :" + e.getMessage();
        }
    }

    //create delete mapping
    @DeleteMapping
    public String deleteTeacher(@RequestBody Teacher teacher){
        Teacher extteacher = teacherDao.getReferenceById(teacher.getId());
        if(extteacher != null){
            try {

                extteacher.setTeacher_status_id(teacherstatusDao.getReferenceById(3));
                teacherDao.save(extteacher);

                return "0";

            }catch (Exception e){
                return "Delete not complete :"+e.getMessage();
            }
        }else {
            return "Delete not complete : Teacher not exist";
        }


    }

}
