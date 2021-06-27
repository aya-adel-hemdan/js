package online.ordering.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;

import org.springframework.format.annotation.DateTimeFormat;

import com.sun.istack.NotNull;

@Entity
//@Table(name = "customer_byuser")
public class User {
 
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    
    @Column(unique = true ,nullable=false,length=100)   
	private String username;
    
    @Column(nullable=false)  
    private String password;
    
    @Email (message="please enter a valid email")
    @Column(unique = true,nullable=false )
    private String email;
    
  //  private List<String> AllPasswords;
    private String resetPasswordToken;
    
    private int PasswordAllowedAccesses;
    private int PasswordAccessCount;
    
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date EndDate;
    
    private Date StartDate;
    
    private int Allowed_days;
    
    
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getResetPasswordToken() {
		return resetPasswordToken;
	}

	public void setResetPasswordToken(String resetPasswordToken) {
		this.resetPasswordToken = resetPasswordToken;
	}

	public int getPasswordAllowedAccesses() {
		return PasswordAllowedAccesses;
	}

	public void setPasswordAllowedAccesses(int passwordAllowedAccesses) {
		PasswordAllowedAccesses = passwordAllowedAccesses;
	}

	public int getPasswordAccessCount() {
		return PasswordAccessCount;
	}

	public void setPasswordAccessCount(int passwordAccessCount) {
		PasswordAccessCount = passwordAccessCount;
	}

	public Date getEndDate() {
		return EndDate;
	}

	public void setEndDate(Date endDate) {
		EndDate = endDate;
	}

	public Date getStartDate() {
		return StartDate;
	}

	public void setStartDate(Date startDate) {
		StartDate = startDate;
	}

	public int getAllowed_days() {
		return Allowed_days;
	}

	public void setAllowed_days(int allowed_days) {
		Allowed_days = allowed_days;
	}
	
		
/*
	public List<String> getAllPasswords() {
		return AllPasswords;
	}

	public void setAllPasswords(List<String> allPasswords) {
		AllPasswords = allPasswords;
	}
     
	*/
	
    // getters and setters...
    
    
}