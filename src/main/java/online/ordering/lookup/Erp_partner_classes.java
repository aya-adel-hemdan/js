package online.ordering.lookup;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name="erp_partner_classes")
public class Erp_partner_classes {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="PARTNER_CLASS_ID")
	private long id;
	
	private String PARTNER_CLASS_CODE;
	
	private long PARTNER_TYPE_ID;
	
	private String DESCRIPTION;
	
	private long CURRANCY_ID;
	
	private long TAX_SCHEDULE_ID;
	
	private long PAYMENT_METHOD_ID;
	
	private int ACTIVE_FLAG=1;
	
	@Column(name="CREATED_BY")  
    private long CreatedBy;

    @Column(name="CREATION_DATE")  
    private Date CreationDate;
    
    @Column(name="LAST_UPDATE_BY")  
    private long LastUpdatedBy;
    
    @Column(name="LAST_UPDATE_DATE")  
    private Date LastUpdateDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPARTNER_CLASS_CODE() {
		return PARTNER_CLASS_CODE;
	}

	public void setPARTNER_CLASS_CODE(String pARTNER_CLASS_CODE) {
		PARTNER_CLASS_CODE = pARTNER_CLASS_CODE;
	}

	public long getPARTNER_TYPE_ID() {
		return PARTNER_TYPE_ID;
	}

	public void setPARTNER_TYPE_ID(long pARTNER_TYPE_ID) {
		PARTNER_TYPE_ID = pARTNER_TYPE_ID;
	}

	public String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}

	public long getCURRANCY_ID() {
		return CURRANCY_ID;
	}

	public void setCURRANCY_ID(long cURRANCY_ID) {
		CURRANCY_ID = cURRANCY_ID;
	}

	public long getTAX_SCHEDULE_ID() {
		return TAX_SCHEDULE_ID;
	}

	public void setTAX_SCHEDULE_ID(long tAX_SCHEDULE_ID) {
		TAX_SCHEDULE_ID = tAX_SCHEDULE_ID;
	}

	public long getPAYMENT_METHOD_ID() {
		return PAYMENT_METHOD_ID;
	}

	public void setPAYMENT_METHOD_ID(long pAYMENT_METHOD_ID) {
		PAYMENT_METHOD_ID = pAYMENT_METHOD_ID;
	}

	public int getACTIVE_FLAG() {
		return ACTIVE_FLAG;
	}

	public void setACTIVE_FLAG(int aCTIVE_FLAG) {
		ACTIVE_FLAG = aCTIVE_FLAG;
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

