package online.ordering.repository;

import online.ordering.model.sal_customer_lang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface sal_customer_lang_repository extends JpaRepository<sal_customer_lang, Long> {

    @Query("select la.DESCRIPTION,c.CustomerCode,la.langId,c.customerId from sal_customer_lang la join sal_Customer c ON c.customerId=la.customerId where  la.LANGUAGE_CODE='US' ")
    List<String> findAllCustomersForSearch();

    @Query("select la.DESCRIPTION,c.CustomerCode,la.langId,c.customerId from sal_customer_lang la join sal_Customer c ON c.customerId=la.customerId where la.DESCRIPTION=?1 and c.PartnerClassId=?2 and c.ActiveStatusId=?3 and la.LANGUAGE_CODE='US' ")
    List<String> findAllCustomersForSearch(String name,long classid,long statusid);

    @Query("select la.DESCRIPTION,c.CustomerCode,la.langId,c.customerId from sal_customer_lang la join sal_Customer c ON c.customerId=la.customerId where la.DESCRIPTION=?1 and (c.PartnerClassId=?2 or c.ActiveStatusId=?3) and la.LANGUAGE_CODE='US' ")
    List<String> findCustomersForSearch(String name,long classid,long statusi);

    @Query("select la.DESCRIPTION,c.CustomerCode,la.langId,c.customerId from sal_customer_lang la join sal_Customer c ON c.customerId=la.customerId where c.PartnerClassId=?1 and c.ActiveStatusId=?2 and la.LANGUAGE_CODE='US' ")
    List<String> findCustomersForSearch(long classid,long statusid);

    @Query("select la.DESCRIPTION,c.CustomerCode,la.langId,c.customerId from sal_customer_lang la join sal_Customer c ON c.customerId=la.customerId where (la.DESCRIPTION=?1 or c.PartnerClassId=?2 or c.ActiveStatusId=?3) and la.LANGUAGE_CODE='US' ")
    List<String> findCustomersForSearchByOne(String name,long classid,long statusid);

    @Query("select c.CustomerCode,c.CustomerName,c.CustomerTypeId,c.PartnerClassId,c.paymentMethod_id,c.Currency_id,c.CreditLimit,c.ActiveStatusId,c.TaxCardNo,c.TaxFileNumber,c.CommercialRecord,c.StartDate ,c.EndDate ,la.DESCRIPTION,c.customerId from sal_customer_lang la join sal_Customer c ON la.customerId=c.customerId where c.customerId=?1  ")
    List<String> findCustomerMainDataForEdit(long id);

    @Query("select la from sal_customer_lang la  where la.customerId=?1  ")
    List<sal_customer_lang> findCustomersForDelete(long id);
}
