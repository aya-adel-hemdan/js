package online.ordering.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sal_customer_persons")
public class Customer_Persons {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="PERSON_ID") 
	private long personID;
	
	@Column(name="CUSTOMER_ID")
	private long customerId;
	
	@Column(name="PERSON_TYPE_ID")
	private long personTypeId;
	
	@Column(name="FULL_NAME")
	private String FULL_NAME;
	
	@Column(name="TITLE")
	private String TITLE;
	
	@Column(name="PHONE_NO")
	private String PHONE_NO;
	
	@Column(name="EMAIL")
	private String EMAIL;
	
	@Column(name="CREATED_BY") 
    private long CreatedBy;

    @Column(name="CREATION_DATE") 
    private Date CreationDate;
    
    @Column(name="LAST_UPDATE_BY") 
    private long LastUpdatedBy;
    
    @Column(name="LAST_UPDATE_DATE") 
    private Date LastUpdateDate;

	public long getPERSON_ID() {
		return personID;
	}

	public void setPERSON_ID(long personID) {
		this.personID = personID;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customer_id) {
		this.customerId = customer_id;
	}

	public long getPersonTypeId() {
		return personTypeId;
	}

	public void setPersonTypeId(long pERSON_TYPE_ID) {
		personTypeId = pERSON_TYPE_ID;
	}

	public String getFULL_NAME() {
		return FULL_NAME;
	}

	public void setFULL_NAME(String fULL_NAME) {
		FULL_NAME = fULL_NAME;
	}

	public String getTITLE() {
		return TITLE;
	}

	public void setTITLE(String tITLE) {
		TITLE = tITLE;
	}

	public String getPHONE_NO() {
		return PHONE_NO;
	}

	public void setPHONE_NO(String pHONE_NO) {
		PHONE_NO = pHONE_NO;
	}

	public String getEMAIL() {
		return EMAIL;
	}

	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}

	public long getCreatedBy() {
		return CreatedBy;
	}

	public void setCreatedBy(long createdBy) {
		CreatedBy = createdBy;
	}

	public Date getCreationDate() {
		return CreationDate;
	}

	public void setCreationDate(Date creationDate) {
		CreationDate = creationDate;
	}

	public long getLastUpdatedBy() {
		return LastUpdatedBy;
	}

	public void setLastUpdatedBy(long lastUpdatedBy) {
		LastUpdatedBy = lastUpdatedBy;
	}

	public Date getLastUpdateDate() {
		return LastUpdateDate;
	}

	public void setLastUpdateDate(Date lastUpdateDate) {
		LastUpdateDate = lastUpdateDate;
	}
    
    
}

