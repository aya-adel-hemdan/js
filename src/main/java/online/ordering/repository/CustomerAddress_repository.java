package online.ordering.repository;

import online.ordering.model.Customer_Persons;
import org.springframework.data.jpa.repository.JpaRepository;

import online.ordering.model.Customer_Address;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerAddress_repository extends JpaRepository<Customer_Address, Long>{

    Customer_Address findByaddressID(long id);

    @Query("select a.COUNTRY_ID,a.CITY_ID,a.ADDRESS,a.PRIMARY_FLAG,a.addressID  from Customer_Address a  where a.customer_id=?1  ")
    List<String> findCustomerAddressForEdit(long id);
}
