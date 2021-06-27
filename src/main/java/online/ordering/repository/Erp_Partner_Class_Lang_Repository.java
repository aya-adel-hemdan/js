package online.ordering.repository;

import online.ordering.lookup.erp_partner_class_lang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Erp_Partner_Class_Lang_Repository extends JpaRepository<erp_partner_class_lang, Long > {

    @Query("select e from erp_partner_class_lang e join Erp_partner_classes l ON e.PARTNER_CLASS_ID=l.id where l.PARTNER_TYPE_ID=47  ")
    List<erp_partner_class_lang> findAllClasses(String lang);

    @Query("select e.DESCRIPTION,l.PARTNER_CLASS_CODE,e.id,l.id from erp_partner_class_lang e join Erp_partner_classes l ON e.PARTNER_CLASS_ID=l.id where l.PARTNER_CLASS_CODE=?1 or l.id=?2 ")
    List<String> findSearchedClasses(String code,long id,String lang);

   /* @Query("select l.PARTNER_CLASS_CODE,l.DESCRIPTION,l.CURRANCY_ID,l.PAYMENT_METHOD_ID,l.ACTIVE_FLAG,e.DESCRIPTION,l.id from erp_partner_class_lang e join Erp_partner_classes l ON e.PARTNER_CLASS_ID=l.id where l.id=?1  ")
    List<String> findClasseForEdit(long id);*/

    @Query("select l.PARTNER_CLASS_CODE,l.DESCRIPTION,l.CURRANCY_ID,l.PAYMENT_METHOD_ID,l.ACTIVE_FLAG,e.DESCRIPTION,l.id from erp_partner_class_lang e join Erp_partner_classes l ON e.PARTNER_CLASS_ID=l.id where l.id=?1  ")
    List<String> findClasseForEdit(long id);

    @Query("select e.DESCRIPTION,l.PARTNER_CLASS_CODE,e.id,l.id from erp_partner_class_lang e join Erp_partner_classes l ON e.PARTNER_CLASS_ID=l.id where l.PARTNER_TYPE_ID=47  ")
    List<String> findAllClassesForSearch(String lang);

    @Query("select e.DESCRIPTION from erp_partner_class_lang e where e.PARTNER_CLASS_ID=?1  ")
    String findClassDescription(long id,String lang);

}
