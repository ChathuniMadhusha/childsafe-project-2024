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


    //get mapping service for get storage by given quary variable id[/classImplementation/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public ClassImplementation getClassById(@RequestParam("id") Integer id){
        return classimplementationDao.getReferenceById(id);
    }


    @PostMapping
    @Transactional
    public String addClass(@RequestBody ClassImplementation classImplementation){


        ClassImplementation extclassimplementation = classimplementationDao.getClassByCourse_code(classImplementation.getClass_code());
        if(extclassimplementation != null){
            return "Cannot add this Class : This Class code is exist now";
        }
        try{

            //save
            classimplementationDao.save(classImplementation);
            return "0";

        }catch(Exception e){
            return "Class Add not complete :" + e.getMessage();
        }

    }


    //Update section
    @PutMapping
    @Transactional
    public String putClass(@RequestBody ClassImplementation classImplementation){
        //check privilage

        //save operate
        try {
            classimplementationDao.save(classImplementation);
            return "0";
        }catch(Exception e){
            return "Class Details Update not complete :" + e.getMessage();
        }
    }


    //create delete mapping
    @DeleteMapping
    public String deleteClass(@RequestBody ClassImplementation classImplementation){
        ClassImplementation extclassimplement = classimplementationDao.getReferenceById(classImplementation.getId());
        if(extclassimplement != null){
            try {

                extclassimplement.setClass_status_id(classimplementationstatusDao.getReferenceById(3));
                classimplementationDao.save(extclassimplement);

                return "0";

            }catch (Exception e){
                return "Delete not complete :"+e.getMessage();
            }
        }else {
            return "Delete not complete : Class is not exist";
        }


    }
















}
