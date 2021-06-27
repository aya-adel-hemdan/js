package online.ordering.lookup;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sys_lookup_values")
public class SYS_LOOKUP_VALUES {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    
    @Column(unique = true ,nullable=false,name="LOOKUP_TYPE")   
	private String LookupType;
    
    @Column(unique = true ,nullable=false, name="LOOKUP_CODE")   
	private String LOOKUP_CODE ;
    
    @Column(name="DESCRIPTION")  
    private String Description;
    
    @Column(name="ENABLE_FLAG")  
    private int EnableFlag;
    
    @Column(name="VIEW_APPLICATION_ID")  
    private long ViewApplicationId;
    
    @Column(name="CREATED_BY")  
    private long CreatedBy;

    @Column(name="CREATION_DATE")  
    private Date CreationDate;
    
    @Column(name="LAST_UPDATE_BY")  
    private long LastUpdatedBy;
    
    @Column(name="LAST_UPDATE_DATE")  
    private Date LastUpdateDate;
            
    @Column(name="START_DATE_ACTIVE")  
	private Date StartDateActive;
	
    @Column(name="END_DATE_ACTIVE")  
	private Date EndDateActive;
	
    @Column(name="LOOKUP_PARENT_ID")  
	private long LOOKUP_PARENT_ID;
	

    public long getLookupID() {
		return id;
	}
	public void setLookupID(long lookupID) {
		id = lookupID;
	}
	public String getLookupType() {
		return LookupType;
	}
	public void setLookupType(String lookupType) {
		LookupType = lookupType;
	}
	public String getLOOKUP_CODE() {
		return LOOKUP_CODE;
	}
	public void setLOOKUP_CODE(String lOOKUP_CODE) {
		LOOKUP_CODE = lOOKUP_CODE;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public int getEnableFlag() {
		return EnableFlag;
	}
	public void setEnableFlag(int enableFlag) {
		EnableFlag = enableFlag;
	}
	public long getViewApplicationId() {
		return ViewApplicationId;
	}
	public void setViewApplicationId(long viewApplicationId) {
		ViewApplicationId = viewApplicationId;
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
	
	public Date getStartDateActive() {
		return StartDateActive;
	}
	public void setStartDateActive(Date startDateActive) {
		StartDateActive = startDateActive;
	}
	public Date getEndDateActive() {
		return EndDateActive;
	}
	public void setEndDateActive(Date endDateActive) {
		EndDateActive = endDateActive;
	}
	public long getLOOKUP_PARENT_ID() {
		return LOOKUP_PARENT_ID;
	}
	public void setLOOKUP_PARENT_ID(long lOOKUP_PARENT_ID) {
		LOOKUP_PARENT_ID = lOOKUP_PARENT_ID;
	}

	
}
