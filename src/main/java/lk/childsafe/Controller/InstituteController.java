package lk.childsafe.Controller;

import jakarta.transaction.Transactional;
import lk.childsafe.Dao.InstituteRepository;
import lk.childsafe.Dao.InstitutestatusRepository;
import lk.childsafe.Dao.StudentRepositiry;
import lk.childsafe.Dao.StudentstatusRepositiry;
import lk.childsafe.Entity.Institute;
import lk.childsafe.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController //awashya services denna
@RequestMapping("/institute")
public class InstituteController {

    @Autowired
    private InstituteRepository instituteDao;

    @Autowired
    private InstitutestatusRepository institutestatusDao;

    //Load UI
    @GetMapping(value = "")
    public ModelAndView instituteUI() {
        ModelAndView modelandview = new ModelAndView();
        modelandview.setViewName("InstituteImplementation.html");
        return modelandview;
    }

    //Get all date from table
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Institute> institutes() {
        return instituteDao.findAll();
    }





    @PostMapping
    @Transactional
    public String addInstitute(@RequestBody Institute institute){

        try{

            //save
            instituteDao.save(institute);
            return "0";

        }catch(Exception e){
            return "Institute Add not complete :" + e.getMessage();
        }

    }



    //get mapping service for get storage by given quary variable id[/student/getbyid?id=1]
    @GetMapping(value = "/getbyid" , produces = "application/json")
    public Institute getInstituteById(@RequestParam("id") Integer id){
        return instituteDao.getReferenceById(id);
    }


    //Update section
    @PutMapping
    @Transactional
    public String putInstitute(@RequestBody Institute institute){
        //check privilage

        //save operate
        try {
            instituteDao.save(institute);
            return "0";
        }catch(Exception e){
            return "Institute Update not complete :" + e.getMessage();
        }
    }



    //create delete mapping
    @DeleteMapping
    public String deleteInstitute(@RequestBody Institute institute){
        Institute extinstitute = instituteDao.getReferenceById(institute.getId());
        if(extinstitute != null){
            try {

                extinstitute.setInstitute_status_id(institutestatusDao.getReferenceById(3));
                instituteDao.save(extinstitute);

                return "0";

            }catch (Exception e){
                return "Delete not complete :"+e.getMessage();
            }
        }else {
            return "Delete not complete : Institute is not exist";
        }


    }





}
