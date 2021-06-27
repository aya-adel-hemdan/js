package online.ordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import online.ordering.model.Customer_Persons;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerPersons_repository extends JpaRepository<Customer_Persons, Long>{

    Customer_Persons findBypersonID(long id);
    //List<Customer_Persons> findBycustomerIdAndpersonTypeId(long id,long type);
    List<Customer_Persons> findByCustomerIdAndPersonTypeId(long id,long type);

    @Query("select m.FULL_NAME,m.TITLE,m.PHONE_NO,m.EMAIL,m.personID from Customer_Persons m  where m.customerId=?1 and m.personTypeId=1 ")
    List<String> findCustomerManagersForEdit(long id);

    @Query("select m.FULL_NAME,m.TITLE,m.PHONE_NO,m.EMAIL,m.personID from Customer_Persons m  where m.customerId=?1 and m.personTypeId=2 ")
    List<String> findCustomerContactForEdit(long id);
}
