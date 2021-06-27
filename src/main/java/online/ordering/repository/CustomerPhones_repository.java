package online.ordering.repository;

import online.ordering.model.Customer_Address;
import org.springframework.data.jpa.repository.JpaRepository;

import online.ordering.model.Customer_Phones;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerPhones_repository extends JpaRepository<Customer_Phones, Long>{

    Customer_Phones findByphoneID(long id);

    @Query("select p.PHONE_NO,p.phoneID from Customer_Phones p  where p.customer_id=?1  ")
    List<String> findCustomerPhonesForEdit(long id);


}
