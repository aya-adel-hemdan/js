package online.ordering.repository;

import java.util.List;
import java.util.Map;

import online.ordering.lookup.erp_partner_class_lang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import online.ordering.lookup.Erp_partner_classes;


public interface Erp_partner_classes_Repository extends JpaRepository<Erp_partner_classes, Long >{

    @Query("SELECT max( i.id ) FROM Erp_partner_classes i")
    long Last_Id ( ) ;

    @Query("select l from erp_partner_class_lang e join Erp_partner_classes l ON e.PARTNER_CLASS_ID=l.id where l.PARTNER_TYPE_ID=47 and e.PARTNER_CLASS_ID=?1 ")
    Erp_partner_classes findPartnerClass(long id,String lang);

    @Query("select l from  Erp_partner_classes l  where l.DESCRIPTION=?1 ")
    Erp_partner_classes findClassDecription(String description);

    //@Query("select v.DESCRIPTION,v.id from erp_partner_class_lang e join Erp_partner_classes l join sys_lookup_values_lang v ON e.PARTNER_CLASS_ID=l.id and l.CURRANCY_ID = v.id where l.PARTNER_TYPE_ID=1 and e.PARTNER_CLASS_ID=?1 AND e.LANGUAGE_CODE='US'")
    //Map<String,Long> findPartnerCurrency(long id);

}
