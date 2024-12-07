package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.GradeRepository;
import lk.childsafe.Dao.SubjectRepository;
import lk.childsafe.Entity.Grade;
import lk.childsafe.Entity.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/subject")
public class SubjectController {


    @Autowired
    SubjectRepository subjectDao;

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Subject> subjects() {return subjectDao.findAll();}


    //Add section
    @PostMapping
    @Transactional
    public String addSubject(@RequestBody Subject subject){

        try{

            //save
            subjectDao.save(subject);
            return "0";

        }catch(Exception e){
            return "Subject Add not complete :" + e.getMessage();
        }

    }


}
