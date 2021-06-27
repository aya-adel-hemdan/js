package online.ordering.repository;

import java.util.List;

import online.ordering.lookup.Erp_partner_classes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import online.ordering.lookup.SYS_LOOKUP_VALUES;

public interface LookupValue_repository extends JpaRepository<SYS_LOOKUP_VALUES, Long >{

	@Query("SELECT c FROM SYS_LOOKUP_VALUES c WHERE c.LookupType ='Currency'")
	List<SYS_LOOKUP_VALUES> findCurrencies();
	
	@Query("SELECT p FROM SYS_LOOKUP_VALUES p WHERE p.LookupType ='Payment Methods'")
	List<SYS_LOOKUP_VALUES> findPaymentMethods();
	
	@Query("SELECT a FROM SYS_LOOKUP_VALUES a WHERE a.LookupType ='Active Status'")
	List<SYS_LOOKUP_VALUES> findActiveStatus();
			
	@Query("SELECT l FROM SYS_LOOKUP_VALUES l WHERE l.LookupType ='CustomerClass'")
	List<SYS_LOOKUP_VALUES> findCustomerClass();
	
	@Query("SELECT t FROM SYS_LOOKUP_VALUES t WHERE t.LookupType ='CustomerType'")
	List<SYS_LOOKUP_VALUES> findCustomerType();
	
	@Query("SELECT d FROM SYS_LOOKUP_VALUES d WHERE d.LookupType ='Document Types'")
	List<SYS_LOOKUP_VALUES> findDocumentTypes();
	
	@Query("SELECT n FROM SYS_LOOKUP_VALUES n WHERE n.LookupType ='Countries'")
	List<SYS_LOOKUP_VALUES> FindAllCountries();
	
	@Query("SELECT n FROM SYS_LOOKUP_VALUES n WHERE n.LookupType ='Cities'")
	List<SYS_LOOKUP_VALUES> FindAllCities();

	@Query("SELECT max( i.id ) FROM SYS_LOOKUP_VALUES i")
	long Last_Id ( ) ;

	@Query("select s from  SYS_LOOKUP_VALUES s  where s.Description=?1 ")
	List<SYS_LOOKUP_VALUES> findLookupDecription(String description);

	@Query("select s.Description from  SYS_LOOKUP_VALUES s  where s.id=?1 ")
	String findLookupDecriptionn(long id);


}
