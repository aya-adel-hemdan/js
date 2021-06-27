package online.ordering.error;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import online.ordering.model.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandling {

	@ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
        ErrorResponse error = new ErrorResponse("Server Error", details);
        return new ResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(SQLException.class)
    public final ResponseEntity<Object> handleSQLException(SQLException ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getErrorCode()+ex.getSQLState());
        ErrorResponse error = new ErrorResponse("SQL error", details);
        System.out.println(new ResponseEntity(error, HttpStatus.NOT_FOUND));
        return new ResponseEntity(error, HttpStatus.NOT_FOUND);
    }

}
