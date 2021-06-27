package online.ordering.repository;


import online.ordering.model.sal_customer_lang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import online.ordering.model.sal_Customer;

import java.util.List;

public interface salCustomer_repository extends JpaRepository<sal_Customer, Long>{

	@Query("SELECT max( i.customerId ) FROM sal_Customer i")
	long Last_Id ( ) ;

	@Query("select c.URL,c.email from sal_Customer c  where c.customerId=?1  ")
	List<String> findEmailandurl(long id);
}
