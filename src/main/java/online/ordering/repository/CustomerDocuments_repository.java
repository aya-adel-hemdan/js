package online.ordering.repository;

import online.ordering.model.PasswordsHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import online.ordering.model.Customer_Documents;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerDocuments_repository extends JpaRepository<Customer_Documents, Long>{


    Customer_Documents findByDocId(long id);

    @Query("select d from Customer_Documents d where d.customerId=?1")
    List<Customer_Documents> findCustomerId(long id);

    @Query("select D.DOC_TYPE_ID,D.COUNTRY_ID,D.ISSUE_DATE,D.ISSUE_END_DATE,D.DOCUMENT_PHOTO_PATH,D.REMARKS,D.docId from Customer_Documents D  where D.customerId=?1  ")
    List<String> findCustomerDocumentsForEdit(long id);
}



