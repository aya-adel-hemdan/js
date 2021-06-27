package online.ordering.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Repository;

import online.ordering.model.User;


@Repository
public interface User_repository extends JpaRepository<User, Long>{

	@Query("SELECT c FROM User c WHERE c.email = ?1")
	Optional<User> findByEmail(String email);
	
	@Query("SELECT c FROM User c WHERE c.resetPasswordToken = ?1")
	Optional<User> findByResetToken(String resetToken);

	@Query("SELECT c FROM User c WHERE c.username = ?1 " )
	Optional<User> findByUserName(String username);
	
}
