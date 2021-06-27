package online.ordering.repository;

import online.ordering.lookup.Erp_partner_classes;
import online.ordering.lookup.sys_lookup_values_lang;
import online.ordering.model.sal_customer_lang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface Sys_Lookup_Values_Lang_Repository extends JpaRepository<sys_lookup_values_lang, Long > {

    @Query("select v.DESCRIPTION,v.id from sys_lookup_values_lang v , Erp_partner_classes l join erp_partner_class_lang e  ON e.PARTNER_CLASS_ID=l.id and l.CURRANCY_ID = v.LOOKUP_ID where l.PARTNER_TYPE_ID=47 and e.PARTNER_CLASS_ID=?1 AND e.LANGUAGE_CODE='US' and v.LANGUAGE_CODE='US'  ")
    Map<String,Long> findPartnerCurrency(long id);

    @Query("select v.DESCRIPTION,v.id from sys_lookup_values_lang v , Erp_partner_classes l join erp_partner_class_lang e  ON e.PARTNER_CLASS_ID=l.id and l.PAYMENT_METHOD_ID = v.LOOKUP_ID where l.PARTNER_TYPE_ID=47 and e.PARTNER_CLASS_ID=?1 AND v.LANGUAGE_CODE='US' and e.LANGUAGE_CODE='US' ")
    Map<String,Long> findPartnerPaymentMethod(long id);

    @Query("select v.DESCRIPTION,s.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID where s.LOOKUP_PARENT_ID=?1 and s.LookupType='Cities' and v.LANGUAGE_CODE='US' ")
    List<Map<String,Long>> findCitiesBasedOnCountry(long id);

    @Query("select la from sys_lookup_values_lang la join SYS_LOOKUP_VALUES v on la.LOOKUP_ID=v.id where v.LookupType='Currency' AND la.LANGUAGE_CODE='US'")
    List<sys_lookup_values_lang> findAllCurrencies();

    @Query("select la from sys_lookup_values_lang la join SYS_LOOKUP_VALUES v on la.LOOKUP_ID=v.id where v.LookupType='Payment Methods' AND la.LANGUAGE_CODE='US'")
    List<sys_lookup_values_lang> findAllPaymentMethods();

    @Query("select la from sys_lookup_values_lang la join SYS_LOOKUP_VALUES v on la.LOOKUP_ID=v.id where v.LookupType='CustomerType' AND la.LANGUAGE_CODE='US'")
    List<sys_lookup_values_lang> findAllCustomerType();

    @Query("select la from sys_lookup_values_lang la join SYS_LOOKUP_VALUES v on la.LOOKUP_ID=v.id where v.LookupType='Active Status' AND la.LANGUAGE_CODE='US'")
    List<sys_lookup_values_lang> findAllStatuses();

    @Query("select la from sys_lookup_values_lang la join SYS_LOOKUP_VALUES v on la.LOOKUP_ID=v.id where v.LookupType='Countries' AND la.LANGUAGE_CODE='US'")
    List<sys_lookup_values_lang> findAllCountries();

    @Query("select la from sys_lookup_values_lang la join SYS_LOOKUP_VALUES v on la.LOOKUP_ID=v.id where v.LookupType='Cities' AND la.LANGUAGE_CODE='US'")
    List<sys_lookup_values_lang> findAllCities();

    @Query("select la from sys_lookup_values_lang la join SYS_LOOKUP_VALUES v on la.LOOKUP_ID=v.id where v.LookupType='Document Types' AND la.LANGUAGE_CODE='US'")
    List<sys_lookup_values_lang> findDocumentType();

    @Query("select la.DESCRIPTION from sys_lookup_values_lang la where la.LOOKUP_ID=?1 and la.LANGUAGE_CODE='US'")
    String findLookup(long lookupid);

    @Query("select v.DESCRIPTION,s.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID where s.LookupType=?1 and v.LANGUAGE_CODE='US' ")
    List<Map<String,Long>> findLookupValuesBasedOnType(String lookupType);

    @Query("select v.DESCRIPTION,s.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID where s.LookupType=?1 and s.LOOKUP_PARENT_ID=?2 and v.LANGUAGE_CODE='US' ")
    List<Map<String,Long>> findLookupValuesBasedOnTypeandParent(String lookupType,long parent);

    /*@Query("select s.LookupType,s.LOOKUP_CODE,v.DESCRIPTION,s.LOOKUP_PARENT_ID,s.EnableFlag,s.id,v.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID  where (s.LookupType=?1 or v.LOOKUP_ID=?2 or s.LOOKUP_PARENT_ID=?3) AND v.LANGUAGE_CODE='US' ")
    List<String> findAllLookupsForSearch(String type,long value,long parent);*/

    @Query("select s.LookupType,s.LOOKUP_CODE,v.DESCRIPTION,s.LOOKUP_PARENT_ID,s.EnableFlag,s.id,v.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID  where (s.LookupType=?1 ) AND v.LANGUAGE_CODE='US' ")
    List<String> findAllLookupsForSearch(String type);

    @Query("select s.LookupType,s.LOOKUP_CODE,v.DESCRIPTION,s.LOOKUP_PARENT_ID,s.EnableFlag,s.id,v.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID  where (s.LookupType=?1 and (v.LOOKUP_ID=?2 or s.LOOKUP_PARENT_ID=?2)) AND v.LANGUAGE_CODE='US' ")
    List<String> findAllLookupsForSearch(String type,long value);

    @Query("select s.LookupType,s.LOOKUP_CODE,v.DESCRIPTION,s.LOOKUP_PARENT_ID,s.EnableFlag,s.id,v.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID  where s.LookupType=?1 and v.LOOKUP_ID=?2 and s.LOOKUP_PARENT_ID=?3 AND v.LANGUAGE_CODE='US' ")
    List<String> findAllLookupsForSearch(String type,long value,long parent);

    @Query("select s.LookupType,s.LOOKUP_CODE,v.DESCRIPTION,s.LOOKUP_PARENT_ID,s.EnableFlag,s.id,v.id from sys_lookup_values_lang v  join SYS_LOOKUP_VALUES s  ON s.id=v.LOOKUP_ID  where s.id=?1  ")
    List<String> findLookupForEdit(long id);

    @Query("select la from sys_lookup_values_lang la  where la.LOOKUP_ID=?1  ")
    List<sys_lookup_values_lang> findLookupsForDelete(long id);
}
