package online.ordering.repository;

import online.ordering.lookup.Erp_partner_classes;
import online.ordering.model.ErrorMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ErrorMessage_repository extends JpaRepository<ErrorMessage, Long > {


}
