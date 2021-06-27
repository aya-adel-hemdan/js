package online.ordering.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sal_customer_address")
public class Customer_Address {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ADDRESS_ID") 
	private long addressID;
	
	@Column(name="CUSTOMER_ID")
	private long customer_id;
	
	@Column(name="COUNTRY_ID")
	private long COUNTRY_ID;
	
	@Column(name="CITY_ID")
	private long CITY_ID;
	
	@Column(name="ADDRESS")
	private String ADDRESS;
	
	@Column(name="PRIMARY_FLAG")
	private int PRIMARY_FLAG;
	
	@Column(name="ACTIVE_STATUS_ID")
	private int ACTIVE_STATUS_ID;
	
	@Column(name="CREATED_BY") 
    private long CreatedBy;

    @Column(name="CREATION_DATE") 
    private Date CreationDate;
    
    @Column(name="LAST_UPDATE_BY") 
    private long LastUpdatedBy;
    
    @Column(name="LAST_UPDATE_DATE") 
    private Date LastUpdateDate;

	public long getADDRESS_ID() {
		return addressID;
	}

	public void setADDRESS_ID(long aDDRESS_ID) {
		addressID = aDDRESS_ID;
	}

	public long getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(long customer_id) {
		this.customer_id = customer_id;
	}

	public long getCOUNTRY_ID() {
		return COUNTRY_ID;
	}

	public void setCOUNTRY_ID(long cOUNTRY_ID) {
		COUNTRY_ID = cOUNTRY_ID;
	}

	public long getCITY_ID() {
		return CITY_ID;
	}

	public void setCITY_ID(long cITY_ID) {
		CITY_ID = cITY_ID;
	}

	public String getADDRESS() {
		return ADDRESS;
	}

	public void setADDRESS(String aDDRESS) {
		ADDRESS = aDDRESS;
	}

	public int getPRIMARY_FLAG() {
		return PRIMARY_FLAG;
	}

	public void setPRIMARY_FLAG(int pRIMARY_FLAG) {
		PRIMARY_FLAG = pRIMARY_FLAG;
	}

	public int getACTIVE_STATUS_ID() {
		return ACTIVE_STATUS_ID;
	}

	public void setACTIVE_STATUS_ID(int aCTIVE_STATUS_ID) {
		ACTIVE_STATUS_ID = aCTIVE_STATUS_ID;
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



