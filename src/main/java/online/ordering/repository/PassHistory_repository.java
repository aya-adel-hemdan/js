package online.ordering.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import online.ordering.model.PasswordsHistory;


public interface PassHistory_repository extends JpaRepository<PasswordsHistory, Long>{

	@Query("SELECT p FROM PasswordsHistory p WHERE p.name = ?1")
	List<PasswordsHistory> findByname(String name);
}
