package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.GradeRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Entity.Grade;
import lk.childsafe.Entity.InstituteStatus;
import lk.childsafe.Entity.Teacher;
import lk.childsafe.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/grade")
public class GradeController {


    @Autowired
    GradeRepository gradeDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Grade> grades() {return gradeDao.findAll();}


    //Add section
    @PostMapping
    @Transactional
    public String addGrade(@RequestBody Grade grade){

        try{

            //save
            gradeDao.save(grade);
            return "0";

        }catch(Exception e){
            return "Grade Add not complete :" + e.getMessage();
        }

    }


}
