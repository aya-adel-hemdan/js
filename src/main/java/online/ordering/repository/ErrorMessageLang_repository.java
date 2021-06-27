package online.ordering.repository;

import online.ordering.model.ErrorMessageLang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ErrorMessageLang_repository extends JpaRepository<ErrorMessageLang, Long > {

    @Query("select la.message from ErrorMessageLang la join ErrorMessage e on la.errorid=e.id where e.errorCode=?1 and la.LANGUAGE_CODE='US'")
    String getErrorMessage(int code);
}

