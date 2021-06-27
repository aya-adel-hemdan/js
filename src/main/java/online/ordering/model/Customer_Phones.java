package online.ordering.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sal_customer_phones")
public class Customer_Phones {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="PHONE_ID") 
	private long phoneID;
	
	@Column(name="CUSTOMER_ID")
	private long customer_id;
	
	@Column(name="PHONE_NO")
	private String PHONE_NO;
	
	@Column(name="CREATED_BY") 
    private long CreatedBy;

    @Column(name="CREATION_DATE") 
    private Date CreationDate;
    
    @Column(name="LAST_UPDATE_BY") 
    private long LastUpdatedBy;
    
    @Column(name="LAST_UPDATE_DATE") 
    private Date LastUpdateDate;

	public long getPHONE_ID() {
		return phoneID;
	}

	public void setPHONE_ID(long pHONE_ID) {
		phoneID = pHONE_ID;
	}

	public long getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(long customer_id) {
		this.customer_id = customer_id;
	}

	public String getPHONE_NO() {
		return PHONE_NO;
	}

	public void setPHONE_NO(String pHONE_NO) {
		PHONE_NO = pHONE_NO;
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


