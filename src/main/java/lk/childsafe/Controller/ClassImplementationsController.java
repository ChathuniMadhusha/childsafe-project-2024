package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.ClassImpleStatusRepository;
import lk.childsafe.Dao.ClassImplementationsRepository;
import lk.childsafe.Dao.InstituteRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Entity.ClassImplementation;
import lk.childsafe.Entity.Institute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/classImplementation")
public class ClassImplementationsController {

    @Autowired
    private ClassImplementationsRepository classimplementationDao;

    @Autowired
    private ClassImpleStatusRepository classimplementationstatusDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView classimpleUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("ClassImplementation.html");
        return modelandview;
    }

    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<ClassImplementation> classImplementations() {
        return classimplementationDao.findAll();
    }


    @PostMapping
    @Transactional
    public String addClass(@RequestBody ClassImplementation classImplementation){

        try{

            //save
            classimplementationDao.save(classImplementation);
            return "0";

        }catch(Exception e){
            return "Class Add not complete :" + e.getMessage();
        }

    }















}
